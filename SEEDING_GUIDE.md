# CurioLife Content Seeding Guide

This guide explains how to populate your CurioLife CMS with sample spiritual content.

---

## Quick Start

To seed your database with sample content:

```bash
npm run seed
```

This will populate your CurioLife CMS with:
- **3 Devotionals** (various themes and scripture references)
- **3 Prayers** (guided, written, and contemplative styles)
- **2 Studies** (Prayer 101 and Psalms study)
- **2 Challenges** (30 Days of Gratitude and Lenten Journey)

---

## What Gets Created

### Devotionals

1. **Finding Peace in Prayer**
   - Scripture: Philippians 4:6-7
   - Theme: Peace, Prayer, Stillness
   - Duration: 10 minutes
   - Difficulty: Beginner

2. **The Power of Gratitude**
   - Scripture: 1 Thessalonians 5:16-18
   - Theme: Gratitude, Thanksgiving
   - Duration: 10 minutes
   - Difficulty: Beginner

3. **Trusting God's Timing**
   - Scripture: Isaiah 40:31
   - Theme: Patience, Trust, Faith
   - Duration: 10 minutes
   - Difficulty: Beginner

### Prayers

1. **Morning Centering Prayer** (Guided)
   - 5 steps, 11 minutes total
   - Contemplative practice for starting your day
   - Includes: Breathing, presence, offering, listening, gratitude

2. **Prayer of Gratitude** (Written)
   - Structured thanksgiving prayer
   - 5 minutes
   - Suitable for all levels

3. **Evening Examen Prayer** (Guided)
   - 6 steps, 15 minutes total
   - Ignatian practice for reviewing your day
   - Includes: Awareness, gratitude, emotions, reflection, preparation, rest

### Studies

1. **Prayer 101: A 7-Day Journey**
   - 7 sessions, ~2 hours total
   - Topics: What is prayer, Lord's Prayer, adoration, confession, thanksgiving, supplication, rhythm
   - Perfect for beginners
   - Includes scripture references and reflection questions

2. **The Psalms: Prayers of the Heart**
   - 10-day exploration (3 sessions included in seed data)
   - Topics: Introduction, lament, thanksgiving
   - Teaches praying Scripture
   - Intermediate level

### Challenges

1. **30 Days of Gratitude** (Active)
   - Time-Bound challenge
   - Feb 1 - Mar 2, 2026
   - Daily prompts for gratitude practice
   - 15 minutes/day commitment

2. **Lenten Prayer Journey** (Inactive)
   - Seasonal challenge
   - Mar 5 - Apr 18, 2026
   - 40-day preparation for Easter
   - Weekly themes with daily content

---

## How It Works

### 1. First Run Check

The seed script checks if it has already run by storing a flag in Strapi's plugin store. This prevents accidental re-seeding and data duplication.

### 2. Permissions Setup

The script automatically configures public read permissions for all content types:
- `find` - List all entries
- `findOne` - Get single entry by ID

This allows your mobile app to fetch content without authentication (though you can still use API tokens for additional security).

### 3. Content Creation

Each content type is created with:
- **Main fields** from the seed data
- **Components** (themes, difficulty, duration, scripture references)
- **Published status** - All content is automatically published
- **Timestamps** - Creation and publication dates

### 4. Nested Components

The script creates nested components for:
- **Prayer Steps**: For guided prayers, ordered step-by-step
- **Study Sessions**: For multi-session studies, with scripture references
- **Scripture References**: Biblical grounding for all content
- **Themes**: Topical categorization
- **Difficulty & Duration**: Filtering metadata

---

## Testing After Seeding

### 1. Verify in Admin Panel

Go to your Strapi admin panel:
- http://localhost:1337/admin (local)
- https://fantastic-dog-ea69a42711.strapiapp.com/admin (production)

Navigate to **Content Manager** and verify:
- 3 published Devotionals
- 3 published Prayers
- 2 published Studies
- 2 published Challenges

### 2. Test API Endpoints

Using the commands from [PRODUCTION_API_EXAMPLES.md](PRODUCTION_API_EXAMPLES.md):

```bash
# Get all devotionals (should return 3)
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get beginner devotionals (should return all 3)
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals?filters[difficulty][level][\$eq]=Beginner" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get guided prayers (should return 2)
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers?filters[prayerType][\$eq]=Guided" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get active challenges (should return 1)
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/challenges?filters[isActive][\$eq]=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Verify Components

Check that nested components are properly created:

```bash
# Get prayer with steps
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers/1" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should include "steps" array with ordered prayer steps

# Get study with sessions
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/studies/1" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Should include "sessions" array with 7 ordered sessions
```

---

## Re-seeding

If you need to seed again (for testing or after clearing database):

### Option 1: Clear the Plugin Store Flag

In Strapi admin:
1. Go to **Settings → Advanced Settings**
2. Clear the `curiolife-setup.initHasRun` flag
3. Run `npm run seed` again

### Option 2: Clear Entire Database

**⚠️ Warning: This deletes ALL content**

For SQLite (development):
```bash
rm database/.tmp/data.db
npm run seed
```

For PostgreSQL/MySQL (production):
- Use database management tools to drop tables
- Restart Strapi to rebuild schema
- Run seed script

---

## Customizing Seed Data

To modify the sample content, edit:

**[data/curiolife-seed-data.json](data/curiolife-seed-data.json)**

This JSON file contains all the seed content. You can:
- Add more devotionals, prayers, studies, or challenges
- Modify existing content
- Change difficulty levels, durations, themes
- Update scripture references

After editing, run `npm run seed` to import your changes.

---

## Production Seeding

### Seeding Production Database

**Option 1: Run seed script on production server**

```bash
# SSH into your production server
ssh your-server

# Navigate to project
cd /path/to/curiolife-cms

# Run seed
npm run seed
```

**Option 2: Use Strapi Cloud deployment**

If using Strapi Cloud:
1. Deploy your code with the seed script included
2. Run seed command from Cloud dashboard terminal
3. Or trigger via deployment hooks

**Option 3: Manual content creation**

For production, you may prefer to manually create and curate content rather than using seed data. The seed script is primarily for:
- Development and testing
- Demo environments
- Quick prototyping

---

## Seed Data Structure

The seed data follows this structure:

```json
{
  "devotionals": [
    {
      "title": "...",
      "subtitle": "...",
      "bodyContent": "<p>...</p>",
      "reflection": "<p>...</p>",
      "prayer": "...",
      "publishDate": "2026-01-15",
      "tags": ["peace", "prayer"]
    }
  ],
  "prayers": [...],
  "studies": [...],
  "challenges": [...]
}
```

The seed script (`scripts/seed-curiolife.js`) transforms this data into full Strapi entries with components.

---

## Troubleshooting

### "Seed data has already been imported"

**Cause**: The seed script has already run.

**Solution**:
- If you want to re-seed, clear the plugin store flag or database
- If first-time seeding, check if content already exists in admin panel

### "Cannot read properties of undefined (reading 'attributes')"

**Cause**: Content type schema mismatch.

**Solution**:
- Ensure you've pulled latest code with correct schemas
- Restart Strapi to rebuild schemas
- Check that all content types exist in `src/api/`

### "Permission denied" errors

**Cause**: Public role permissions not set.

**Solution**:
- The seed script should automatically set permissions
- Manually check: Settings → Users & Permissions → Public role
- Ensure `find` and `findOne` are enabled for all content types

### Empty API responses after seeding

**Cause**: Content not published or permissions issue.

**Solution**:
- Verify content is Published (not Draft) in admin panel
- Check API token has read permissions
- Verify public role permissions set correctly

---

## Next Steps After Seeding

1. **Review Content**: Check the admin panel to see all created content
2. **Test APIs**: Use [PRODUCTION_API_EXAMPLES.md](PRODUCTION_API_EXAMPLES.md) to test endpoints
3. **Customize**: Edit or delete seed content as needed
4. **Add More**: Create your own devotionals, prayers, studies, and challenges
5. **Integrate**: Connect your mobile app to the populated API

---

## Files

- **[data/curiolife-seed-data.json](data/curiolife-seed-data.json)** - Sample content data
- **[scripts/seed-curiolife.js](scripts/seed-curiolife.js)** - Seeding script
- **package.json** - Contains `npm run seed` command

---

**Ready to seed?** Run `npm run seed` and watch your CurioLife CMS come to life with spiritual content! 🌱
