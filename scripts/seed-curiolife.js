'use strict';

const seedData = require('../data/curiolife-seed-data.json');

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'curiolife-setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // List all existing permissions for public role
  const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
  });

  // Create a map of existing permissions
  const existingPermissionsMap = new Map(
    existingPermissions.map(p => [p.action, p])
  );

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).forEach((controller) => {
    const actions = newPermissions[controller];
    actions.forEach((action) => {
      const actionName = `api::${controller}.${controller}.${action}`;

      // Only create if it doesn't already exist
      if (!existingPermissionsMap.has(actionName)) {
        allPermissionsToCreate.push(
          strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: actionName,
              role: publicRole.id,
            },
          })
        );
      }
    });
  });

  await Promise.all(allPermissionsToCreate);
  console.log(`✓ Set public read permissions for content types`);
}

// Create an entry
async function createEntry({ model, entry }) {
  try {
    await strapi.documents(`api::${model}.${model}`).create({
      data: {
        ...entry,
        publishedAt: new Date().toISOString(),
      },
    });
    console.log(`  ✓ Created ${model}: "${entry.title || entry.name}"`);
  } catch (error) {
    console.error(`  ✗ Error creating ${model}:`, error.message);
  }
}

async function importDevotionals() {
  console.log('\nImporting Devotionals...');

  for (const devotional of seedData.devotionals) {
    // Create components for this devotional
    const scriptureReferences = [
      {
        book: devotional.title === "Finding Peace in Prayer" ? "Philippians" :
              devotional.title === "The Power of Gratitude" ? "1 Thessalonians" : "Isaiah",
        chapter: devotional.title === "Finding Peace in Prayer" ? 4 :
                 devotional.title === "The Power of Gratitude" ? 5 : 40,
        verseStart: devotional.title === "Finding Peace in Prayer" ? 6 :
                    devotional.title === "The Power of Gratitude" ? 16 : 31,
        verseEnd: devotional.title === "Finding Peace in Prayer" ? 7 :
                  devotional.title === "The Power of Gratitude" ? 18 : 31,
        translation: "NIV",
        displayText: devotional.title === "Finding Peace in Prayer" ? "Philippians 4:6-7" :
                     devotional.title === "The Power of Gratitude" ? "1 Thessalonians 5:16-18" : "Isaiah 40:31"
      }
    ];

    const themes = [
      {
        name: devotional.tags[0].charAt(0).toUpperCase() + devotional.tags[0].slice(1),
        description: `Content focused on ${devotional.tags[0]}`
      }
    ];

    const difficulty = {
      level: "Beginner",
      notes: "Perfect for those new to devotional practice"
    };

    const duration = {
      estimatedMinutes: 10,
      unit: "minutes"
    };

    await createEntry({
      model: 'devotional',
      entry: {
        ...devotional,
        scriptureReferences,
        themes,
        difficulty,
        duration,
      },
    });
  }
}

async function importPrayers() {
  console.log('\nImporting Prayers...');

  for (const prayer of seedData.prayers) {
    let steps = [];

    // Add steps for guided prayers
    if (prayer.prayerType === "Guided" && prayer.slug === "morning-centering-prayer") {
      steps = [
        {
          title: "Arrive and Breathe",
          instruction: "Take three slow, deep breaths. With each exhale, release tension from your body. Arrive fully in this moment.",
          duration: 2,
          order: 1
        },
        {
          title: "Acknowledge God's Presence",
          instruction: "Silently or aloud, say: 'God, You are here with me now.' Notice His presence surrounding you.",
          duration: 1,
          order: 2
        },
        {
          title: "Offer Your Day",
          instruction: "Present your day to God: your schedule, your concerns, your hopes. Ask Him to guide your steps.",
          duration: 3,
          order: 3
        },
        {
          title: "Listen",
          instruction: "In silence, simply be with God. If thoughts arise, gently return your attention to His presence.",
          duration: 4,
          order: 4
        },
        {
          title: "Close with Gratitude",
          instruction: "Thank God for meeting you in this moment. Carry this awareness of His presence into your day.",
          duration: 1,
          order: 5
        }
      ];
    } else if (prayer.prayerType === "Guided" && prayer.slug === "evening-examen-prayer") {
      steps = [
        {
          title: "Become Aware of God's Presence",
          instruction: "Begin by acknowledging that God is with you now, and has been with you throughout this day.",
          duration: 1,
          order: 1
        },
        {
          title: "Review the Day with Gratitude",
          instruction: "Walk through your day hour by hour. For what moment today are you most grateful? Give thanks to God for that gift.",
          duration: 4,
          order: 2
        },
        {
          title: "Pay Attention to Your Emotions",
          instruction: "Notice the feelings that arose today. What brought you joy? What caused you stress? Share these honestly with God.",
          duration: 3,
          order: 3
        },
        {
          title: "Choose One Feature of the Day",
          instruction: "Select one moment where you felt particularly close to or distant from God. Reflect on that experience with Him.",
          duration: 3,
          order: 4
        },
        {
          title: "Look Toward Tomorrow",
          instruction: "Ask God to guide you tomorrow. What do you need from Him? How can you serve Him better?",
          duration: 2,
          order: 5
        },
        {
          title: "Rest in God's Love",
          instruction: "End by resting in God's unconditional love for you. Release the day into His hands.",
          duration: 2,
          order: 6
        }
      ];
    }

    const difficulty = {
      level: prayer.audienceNotes.includes("new") ? "Beginner" : "Intermediate",
      notes: prayer.audienceNotes
    };

    const duration = {
      estimatedMinutes: prayer.prayerType === "Guided" ?
        (steps.reduce((sum, step) => sum + (step.duration || 0), 0) || 10) : 5,
      unit: "minutes"
    };

    const themes = [
      {
        name: prayer.tags[0].charAt(0).toUpperCase() + prayer.tags[0].slice(1),
        description: `${prayer.prayerType} prayer focused on ${prayer.tags[0]}`
      }
    ];

    await createEntry({
      model: 'prayer',
      entry: {
        ...prayer,
        steps: steps.length > 0 ? steps : undefined,
        writtenPrayer: prayer.writtenPrayer || undefined,
        themes,
        difficulty,
        duration,
      },
    });
  }
}

async function importStudies() {
  console.log('\nImporting Studies...');

  for (const study of seedData.studies) {
    let sessions = [];

    if (study.slug === "prayer-101-7-day-journey") {
      sessions = [
        {
          title: "Day 1: What is Prayer?",
          description: "Understanding the biblical foundation of prayer as conversation with God",
          content: "<p>Prayer is fundamentally about relationship. It's not a formula or ritual—it's conversation with the living God who loves you and desires to know you.</p><p>In this session, we'll explore what prayer is (and isn't), examine Jesus' teaching on prayer, and begin to see prayer as natural conversation rather than formal duty.</p>",
          order: 1,
          estimatedMinutes: 15,
          scriptureReferences: [
            {
              book: "Matthew",
              chapter: 6,
              verseStart: 5,
              verseEnd: 15,
              translation: "NIV",
              displayText: "Matthew 6:5-15"
            }
          ]
        },
        {
          title: "Day 2: The Lord's Prayer as Template",
          description: "Learning from Jesus' model prayer",
          content: "<p>When the disciples asked Jesus to teach them to pray, He gave them what we now call the Lord's Prayer—not as mere words to recite, but as a template for all prayer.</p><p>Today we'll unpack this prayer phrase by phrase, discovering how it addresses adoration, provision, forgiveness, and protection.</p>",
          order: 2,
          estimatedMinutes: 20,
          scriptureReferences: [
            {
              book: "Matthew",
              chapter: 6,
              verseStart: 9,
              verseEnd: 13,
              translation: "NIV",
              displayText: "Matthew 6:9-13"
            }
          ]
        },
        {
          title: "Day 3: Adoration and Praise",
          description: "Beginning prayer by focusing on who God is",
          content: "<p>We often rush immediately to our requests, but biblical prayer begins with adoration—acknowledging who God is before asking for what we need.</p><p>Adoration reorients our perspective, reminding us of God's character, power, and love. It shifts our focus from our problems to His greatness.</p>",
          order: 3,
          estimatedMinutes: 15,
          scriptureReferences: [
            {
              book: "Psalm",
              chapter: 103,
              verseStart: 1,
              verseEnd: 5,
              translation: "NIV",
              displayText: "Psalm 103:1-5"
            }
          ]
        },
        {
          title: "Day 4: Confession and Repentance",
          description: "The freedom of honest confession before God",
          content: "<p>Confession isn't about groveling or earning God's love—it's about honesty that leads to freedom. 1 John 1:9 promises that when we confess our sins, God is faithful to forgive and cleanse us.</p><p>Today we'll explore how confession deepens intimacy with God and breaks the power of shame.</p>",
          order: 4,
          estimatedMinutes: 20,
          scriptureReferences: [
            {
              book: "1 John",
              chapter: 1,
              verseStart: 9,
              verseEnd: 9,
              translation: "NIV",
              displayText: "1 John 1:9"
            }
          ]
        },
        {
          title: "Day 5: Thanksgiving",
          description: "Cultivating gratitude in prayer",
          content: "<p>Thanksgiving transforms our prayer life and our perspective. When we bring our requests with thanksgiving (Philippians 4:6), we remember God's past faithfulness even as we ask for present help.</p><p>Today we'll practice thanksgiving prayer and explore how gratitude changes us.</p>",
          order: 5,
          estimatedMinutes: 15,
          scriptureReferences: [
            {
              book: "Philippians",
              chapter: 4,
              verseStart: 6,
              verseEnd: 7,
              translation: "NIV",
              displayText: "Philippians 4:6-7"
            }
          ]
        },
        {
          title: "Day 6: Supplication (Asking)",
          description: "Bringing our requests boldly before God",
          content: "<p>God invites us to ask. 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you' (Matthew 7:7). Prayer isn't about changing God's mind, but aligning our hearts with His will.</p><p>We'll explore how to pray bold prayers while trusting God's wisdom and timing.</p>",
          order: 6,
          estimatedMinutes: 20,
          scriptureReferences: [
            {
              book: "Matthew",
              chapter: 7,
              verseStart: 7,
              verseEnd: 11,
              translation: "NIV",
              displayText: "Matthew 7:7-11"
            }
          ]
        },
        {
          title: "Day 7: Building a Prayer Rhythm",
          description: "Creating a sustainable daily prayer practice",
          content: "<p>Prayer isn't just for crisis moments—it's meant to be the rhythm of our daily lives. 'Pray continually,' Paul writes (1 Thessalonians 5:17).</p><p>On this final day, we'll create a personalized prayer plan that fits your life and personality, establishing rhythms that will sustain you beyond this week.</p>",
          order: 7,
          estimatedMinutes: 25,
          scriptureReferences: [
            {
              book: "1 Thessalonians",
              chapter: 5,
              verseStart: 16,
              verseEnd: 18,
              translation: "NIV",
              displayText: "1 Thessalonians 5:16-18"
            }
          ]
        }
      ];
    } else if (study.slug === "psalms-prayers-of-the-heart") {
      sessions = [
        {
          title: "Day 1: Introduction to the Psalms",
          description: "Understanding the Psalms as Israel's prayer book",
          content: "<p>The Psalms are God's gift to us—150 prayers that teach us to pray with our whole hearts. They're honest, emotional, and beautifully human, yet inspired by God's Spirit.</p>",
          order: 1,
          estimatedMinutes: 15
        },
        {
          title: "Day 2: Psalms of Lament",
          description: "Learning to bring our pain to God",
          content: "<p>Nearly one-third of the Psalms are laments—honest cries to God in pain. Psalm 13 shows us it's okay to ask 'How long, O Lord?' God can handle our questions and our tears.</p>",
          order: 2,
          estimatedMinutes: 20
        },
        {
          title: "Day 3: Psalms of Thanksgiving",
          description: "Celebrating God's goodness and faithfulness",
          content: "<p>Psalm 107 overflows with thanksgiving: 'Give thanks to the Lord, for he is good; his love endures forever.' Thanksgiving psalms teach us to remember and celebrate God's past faithfulness.</p>",
          order: 3,
          estimatedMinutes: 15
        }
      ];
    }

    const difficulty = {
      level: study.prerequisites.includes("No prior") ? "Beginner" : "Intermediate",
      notes: study.prerequisites
    };

    const totalMinutes = sessions.reduce((sum, session) => sum + (session.estimatedMinutes || 15), 0);
    const totalDuration = {
      estimatedMinutes: totalMinutes,
      unit: "minutes"
    };

    const themes = [
      {
        name: study.tags[0].charAt(0).toUpperCase() + study.tags[0].slice(1),
        description: `Study focused on ${study.tags[0]}`
      }
    ];

    await createEntry({
      model: 'study',
      entry: {
        ...study,
        sessions,
        themes,
        difficulty,
        totalDuration,
      },
    });
  }
}

async function importChallenges() {
  console.log('\nImporting Challenges...');

  for (const challenge of seedData.challenges) {
    const difficulty = {
      level: "Beginner",
      notes: "Suitable for all experience levels"
    };

    const estimatedCommitment = {
      estimatedMinutes: 15,
      unit: "minutes"
    };

    const themes = [
      {
        name: challenge.tags[0].charAt(0).toUpperCase() + challenge.tags[0].slice(1),
        description: `${challenge.challengeType} challenge focused on ${challenge.tags[0]}`
      }
    ];

    await createEntry({
      model: 'challenge',
      entry: {
        ...challenge,
        difficulty,
        estimatedCommitment,
        themes,
      },
    });
  }
}

async function importSeedData() {
  console.log('\n========================================');
  console.log('CurioLife Content Seeding');
  console.log('========================================');

  // Allow public read of content types
  await setPublicPermissions({
    devotional: ['find', 'findOne'],
    prayer: ['find', 'findOne'],
    study: ['find', 'findOne'],
    challenge: ['find', 'findOne'],
  });

  // Create all entries
  await importDevotionals();
  await importPrayers();
  await importStudies();
  await importChallenges();

  console.log('\n========================================');
  console.log('✓ Seeding Complete!');
  console.log('========================================\n');
}

async function seedCurioLife() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      await importSeedData();
    } catch (error) {
      console.log('\n✗ Could not import seed data');
      console.error(error);
    }
  } else {
    console.log('\n⚠ Seed data has already been imported.');
    console.log('To reimport, delete the curiolife-setup store or clear your database.\n');
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedCurioLife();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
