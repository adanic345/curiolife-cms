# CurioLife Content Model Documentation

## Overview

This document describes the content architecture for the CurioLife backend Strapi CMS. The system is designed to manage spiritual content with strong typing, editorial workflow, and clean API delivery to mobile clients.

## Design Principles

1. **Strapi-native**: Uses built-in features before custom logic
2. **Strongly typed**: Schema-driven with validation
3. **Composable**: Shared components for reusability
4. **Metadata-rich**: Filtering and categorization support
5. **Draft/publish workflow**: All content types support editorial review

## Content Types

### 1. Devotional

**Purpose**: Daily spiritual reflection and meditation content

**Key Attributes**:
- `title` (required): Main heading
- `subtitle`: Optional secondary heading
- `scriptureReferences` (required): One or more biblical references
- `bodyContent` (required): Main devotional text (rich text)
- `reflection`: Optional guided reflection prompts
- `prayer`: Optional closing prayer text
- `themes`: Repeatable theme components for categorization
- `difficulty` (required): Beginner/Intermediate/Advanced
- `duration` (required): Estimated completion time
- `publishDate`: Optional scheduled publication date

**API Endpoint**: `/api/devotionals`

**Use Case**: Mobile app displays daily devotionals filtered by user preferences (theme, difficulty, duration)

---

### 2. Prayer

**Purpose**: Guided prayer experiences and templates

**Key Attributes**:
- `title` (required): Prayer name
- `prayerType` (required): Guided, Written, Audio-Backed, Contemplative, Intercessory, Gratitude, Petition
- `description`: Summary of prayer purpose
- `introduction`: Optional rich text introduction
- `steps`: Repeatable prayer step components (for guided prayers)
- `writtenPrayer`: Full-text prayer (for written prayers)
- `scriptureReferences`: Optional biblical grounding
- `themes`: Categorization
- `difficulty` (required): Audience suitability
- `duration` (required): Time commitment
- `audienceNotes`: Context about who this prayer is for
- `audioFile`: Optional audio guidance

**API Endpoint**: `/api/prayers`

**Use Case**: Mobile app provides structured prayer experiences with audio support and timed steps

---

### 3. Study

**Purpose**: Multi-session spiritual learning tracks

**Key Attributes**:
- `title` (required): Study name
- `description` (required): What the study covers
- `overview`: Rich text introduction
- `sessions` (required): Repeatable ordered study sessions
- `themes`: Topical categorization
- `difficulty` (required): Complexity level
- `totalDuration` (required): Complete study time commitment
- `objectives`: JSON array of learning goals
- `prerequisites`: What participants should know first
- `completionCriteria`: How to know you've finished
- `author`: Content creator attribution

**API Endpoint**: `/api/studies`

**Use Case**: Mobile app delivers multi-day study programs with session tracking and completion metrics

---

### 4. Challenge

**Purpose**: Seasonal or time-bound spiritual engagement campaigns

**Key Attributes**:
- `name` (required): Challenge title
- `description` (required): What participants will do
- `detailedDescription`: Rich text campaign details
- `startDate` (required): When challenge begins
- `endDate` (required): When challenge concludes
- `challengeType` (required): Seasonal, Time-Bound, Open-Ended, Recurring
- `participationRules`: How to engage
- `associatedDevotionals`: Related devotional content
- `associatedPrayers`: Related prayer content
- `associatedStudies`: Related study tracks
- `themes`: Categorization
- `difficulty`: Recommended participant level
- `estimatedCommitment`: Time per day/week
- `goals`: JSON array of challenge objectives
- `rewards`: What participants gain
- `isActive`: Boolean flag for current challenges

**API Endpoint**: `/api/challenges`

**Use Case**: Mobile app promotes active challenges and bundles related content for participant engagement

---

## Shared Components

### Metadata Components

Located in `src/components/metadata/`

#### 1. Theme (`metadata.theme`)
- `name` (required): Theme label (max 100 chars)
- `description`: Theme explanation (max 500 chars)

**Examples**: "Prayer", "Faith Development", "Scripture Study", "Spiritual Disciplines"

#### 2. Difficulty (`metadata.difficulty`)
- `level` (required): Beginner | Intermediate | Advanced
- `notes`: Optional context (max 200 chars)

**Purpose**: Helps mobile app match content to user spiritual maturity

#### 3. Duration (`metadata.duration`)
- `estimatedMinutes` (required): 1-480 minutes
- `unit`: minutes | hours | days

**Purpose**: Enables filtering by available time commitment

#### 4. Scripture Reference (`metadata.scripture-reference`)
- `book` (required): Biblical book name
- `chapter` (required): Chapter number
- `verseStart`: Optional starting verse
- `verseEnd`: Optional ending verse
- `translation`: Bible version (default: NIV)
- `displayText`: Formatted reference string

**Purpose**: Grounds content in biblical text and enables scripture-based browsing

### Content Components

Located in `src/components/content/`

#### 1. Rich Text Block (`content.rich-text-block`)
- `content` (required): Formatted text with markdown support

**Purpose**: Reusable formatted content sections

#### 2. Prayer Step (`content.prayer-step`)
- `title`: Step name
- `instruction` (required): What to do
- `duration`: Optional time for this step (minutes)
- `order` (required): Sequence position (1+)

**Purpose**: Structures guided prayer experiences with timed progression

#### 3. Study Session (`content.study-session`)
- `title` (required): Session name
- `description`: Session overview
- `content` (required): Rich text lesson material
- `scriptureReferences`: Repeatable biblical grounding
- `order` (required): Session sequence (1+)
- `estimatedMinutes`: Time to complete (default: 15)

**Purpose**: Orders multi-part studies with consistent session structure

---

## Editorial Workflow

All content types have `draftAndPublish: true` enabled, providing:

1. **Draft** - Content being created/edited
2. **Published** - Live content visible to mobile API

**Planned Roles** (to be configured in Strapi admin):
- **Editor**: Create and edit drafts
- **Reviewer**: Approve/reject content for publication
- **Admin**: Override permissions, manage roles, publish directly

**Current State**: Roles must be configured through Strapi admin panel after first startup

---

## API Conventions

### Standard Endpoints

All content types expose standard REST endpoints:
- `GET /api/{plural}` - List all published content
- `GET /api/{plural}/:id` - Get single published item
- `POST /api/{plural}` - Create new draft (authenticated)
- `PUT /api/{plural}/:id` - Update draft (authenticated)
- `DELETE /api/{plural}/:id` - Delete (authenticated)

### Filtering Support

Mobile clients can filter by:
- `themes` - Spiritual topics
- `difficulty.level` - Beginner/Intermediate/Advanced
- `duration.estimatedMinutes` - Time commitment range
- `publishDate` - Recent content
- `tags` - Custom metadata

**Example**: `GET /api/devotionals?filters[difficulty][level][$eq]=Beginner&filters[duration][estimatedMinutes][$lte]=15`

### Response Shape

All responses follow Strapi's standard format:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "...",
      "publishedAt": "2026-01-15T10:00:00.000Z",
      ...
    }
  }
}
```

**Stability Commitment**: Schema changes will be additive only. Removal or renaming requires versioned API.

---

## Extending the Model

### Adding New Content Types

1. Create schema in `src/api/{name}/content-types/{name}/schema.json`
2. Ensure `draftAndPublish: true` is set
3. Use existing components where possible
4. Create controller/service/routes using Strapi factories
5. Document in this file

### Adding New Components

1. Place in appropriate directory:
   - `src/components/metadata/` - Reusable categorization
   - `src/components/content/` - Structural content blocks
2. Use `collectionName` for explicit DB table naming
3. Update this documentation

### Prohibited Extensions

- **No business logic in Strapi**: AI prompts, personalization rules, user behavior tracking belong in application layer
- **No custom middleware for filtering**: Use native Strapi filters and policies
- **No authentication logic**: Strapi handles admin auth; mobile auth is external

---

## Database

**Current**: SQLite (development)
**Production**: PostgreSQL or MySQL recommended

Migration path: Export content via Strapi admin, reconfigure `config/database.js`, import to new DB.

---

## File Structure

```
src/
├── api/
│   ├── challenge/
│   │   ├── content-types/challenge/schema.json
│   │   ├── controllers/challenge.js
│   │   ├── services/challenge.js
│   │   └── routes/challenge.js
│   ├── devotional/
│   ├── prayer/
│   └── study/
├── components/
│   ├── content/
│   │   ├── prayer-step.json
│   │   ├── rich-text-block.json
│   │   └── study-session.json
│   └── metadata/
│       ├── difficulty.json
│       ├── duration.json
│       ├── scripture-reference.json
│       └── theme.json
├── bootstrap.js
└── index.js
```

---

## Next Steps

1. **Run Strapi**: `npm run develop`
2. **Configure Admin**: Create first admin user
3. **Set Up Roles**: Define Editor/Reviewer/Admin permissions
4. **Seed Data**: Run `npm run seed:example` (once implemented)
5. **Test APIs**: Verify mobile client can consume published content
6. **Configure Production DB**: Before deploying to production

---

## Version History

- **v0.1.0** (2026-01-15): Initial content model with Devotional, Prayer, Study, Challenge types
