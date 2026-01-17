/**
 * CurioLife Content Manager Layout Configuration
 * Organizes edit views similar to WordPress:
 * - Main content in center panel
 * - Metadata (dates, tags, images, publish status) in right sidebar
 */

/**
 * Devotional Edit Layout
 */
export const devotionalLayout = {
  edit: [
    // Left/Center Panel - Main Content
    [
      {
        name: 'title',
        size: 12,
      },
      {
        name: 'subtitle',
        size: 12,
      },
      {
        name: 'slug',
        size: 12,
      },
      {
        name: 'scriptureReferences',
        size: 12,
      },
      {
        name: 'bodyContent',
        size: 12,
      },
      {
        name: 'reflection',
        size: 12,
      },
      {
        name: 'prayer',
        size: 12,
      },
    ],
    // Right Sidebar - Metadata
    [
      {
        name: 'featuredImage',
        size: 12,
      },
      {
        name: 'publishDate',
        size: 12,
      },
      {
        name: 'tags',
        size: 12,
      },
      {
        name: 'themes',
        size: 12,
      },
      {
        name: 'difficulty',
        size: 12,
      },
      {
        name: 'duration',
        size: 12,
      },
    ],
  ],
};

/**
 * Prayer Edit Layout
 */
export const prayerLayout = {
  edit: [
    // Left/Center Panel - Main Content
    [
      {
        name: 'title',
        size: 12,
      },
      {
        name: 'slug',
        size: 12,
      },
      {
        name: 'prayerType',
        size: 12,
      },
      {
        name: 'description',
        size: 12,
      },
      {
        name: 'introduction',
        size: 12,
      },
      {
        name: 'writtenPrayer',
        size: 12,
      },
      {
        name: 'steps',
        size: 12,
      },
    ],
    // Right Sidebar - Metadata
    [
      {
        name: 'audioFile',
        size: 12,
      },
      {
        name: 'themes',
        size: 12,
      },
      {
        name: 'difficulty',
        size: 12,
      },
      {
        name: 'duration',
        size: 12,
      },
      {
        name: 'audienceNotes',
        size: 12,
      },
      {
        name: 'tags',
        size: 12,
      },
    ],
  ],
};

/**
 * Study Edit Layout
 */
export const studyLayout = {
  edit: [
    // Left/Center Panel - Main Content
    [
      {
        name: 'title',
        size: 12,
      },
      {
        name: 'slug',
        size: 12,
      },
      {
        name: 'description',
        size: 12,
      },
      {
        name: 'overview',
        size: 12,
      },
      {
        name: 'sessions',
        size: 12,
      },
      {
        name: 'objectives',
        size: 12,
      },
      {
        name: 'prerequisites',
        size: 12,
      },
      {
        name: 'completionCriteria',
        size: 12,
      },
    ],
    // Right Sidebar - Metadata
    [
      {
        name: 'themes',
        size: 12,
      },
      {
        name: 'difficulty',
        size: 12,
      },
      {
        name: 'totalDuration',
        size: 12,
      },
      {
        name: 'author',
        size: 12,
      },
      {
        name: 'tags',
        size: 12,
      },
    ],
  ],
};

/**
 * Challenge Edit Layout
 */
export const challengeLayout = {
  edit: [
    // Left/Center Panel - Main Content
    [
      {
        name: 'name',
        size: 12,
      },
      {
        name: 'slug',
        size: 12,
      },
      {
        name: 'description',
        size: 12,
      },
      {
        name: 'detailedDescription',
        size: 12,
      },
      {
        name: 'participationRules',
        size: 12,
      },
      {
        name: 'goals',
        size: 12,
      },
      {
        name: 'rewards',
        size: 12,
      },
    ],
    // Right Sidebar - Metadata
    [
      {
        name: 'startDate',
        size: 12,
      },
      {
        name: 'endDate',
        size: 12,
      },
      {
        name: 'challengeType',
        size: 12,
      },
      {
        name: 'isActive',
        size: 12,
      },
      {
        name: 'themes',
        size: 12,
      },
      {
        name: 'difficulty',
        size: 12,
      },
      {
        name: 'estimatedCommitment',
        size: 12,
      },
      {
        name: 'tags',
        size: 12,
      },
      {
        name: 'associatedDevotionals',
        size: 12,
      },
      {
        name: 'associatedPrayers',
        size: 12,
      },
      {
        name: 'associatedStudies',
        size: 12,
      },
    ],
  ],
};

/**
 * Export all layouts
 */
export const contentLayouts = {
  'api::devotional.devotional': devotionalLayout,
  'api::prayer.prayer': prayerLayout,
  'api::study.study': studyLayout,
  'api::challenge.challenge': challengeLayout,
};

export default contentLayouts;
