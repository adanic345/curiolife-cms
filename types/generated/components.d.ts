import type { Schema, Struct } from '@strapi/strapi';

export interface ContentPrayerStep extends Struct.ComponentSchema {
  collectionName: 'components_content_prayer_steps';
  info: {
    description: 'Individual step in guided prayer';
    displayName: 'Prayer Step';
  };
  attributes: {
    duration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    instruction: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface ContentRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_text_blocks';
  info: {
    description: 'Formatted text content with markdown support';
    displayName: 'Rich Text Block';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface ContentStudySession extends Struct.ComponentSchema {
  collectionName: 'components_content_study_sessions';
  info: {
    description: 'Individual session within a study track';
    displayName: 'Study Session';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    estimatedMinutes: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<15>;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    scriptureReferences: Schema.Attribute.Component<
      'metadata.scripture-reference',
      true
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface MetadataDifficulty extends Struct.ComponentSchema {
  collectionName: 'components_metadata_difficulties';
  info: {
    description: 'Content complexity and audience suitability';
    displayName: 'Difficulty Level';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Beginner'>;
    notes: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface MetadataDuration extends Struct.ComponentSchema {
  collectionName: 'components_metadata_durations';
  info: {
    description: 'Estimated time to complete content';
    displayName: 'Duration';
  };
  attributes: {
    estimatedMinutes: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 480;
          min: 1;
        },
        number
      >;
    unit: Schema.Attribute.Enumeration<['minutes', 'hours', 'days']> &
      Schema.Attribute.DefaultTo<'minutes'>;
  };
}

export interface MetadataScriptureReference extends Struct.ComponentSchema {
  collectionName: 'components_metadata_scripture_references';
  info: {
    description: 'Biblical reference for content grounding';
    displayName: 'Scripture Reference';
  };
  attributes: {
    book: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    chapter: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    displayText: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    translation: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'NIV'>;
    verseEnd: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    verseStart: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface MetadataTheme extends Struct.ComponentSchema {
  collectionName: 'components_metadata_themes';
  info: {
    description: 'Spiritual or topical theme categorization';
    displayName: 'Theme';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.prayer-step': ContentPrayerStep;
      'content.rich-text-block': ContentRichTextBlock;
      'content.study-session': ContentStudySession;
      'metadata.difficulty': MetadataDifficulty;
      'metadata.duration': MetadataDuration;
      'metadata.scripture-reference': MetadataScriptureReference;
      'metadata.theme': MetadataTheme;
    }
  }
}
