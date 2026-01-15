# CurioLife CMS Quick Reference

## Content Types Overview

| Type | Purpose | Key Features | API Endpoint |
|------|---------|--------------|--------------|
| **Devotional** | Daily spiritual reflections | Scripture refs, reflection prompts, prayer | `/api/devotionals` |
| **Prayer** | Guided prayer experiences | Typed prayers, steps, audio support | `/api/prayers` |
| **Study** | Multi-session learning tracks | Ordered sessions, objectives, prerequisites | `/api/studies` |
| **Challenge** | Time-bound campaigns | Date ranges, related content, participation rules | `/api/challenges` |

## Common Metadata Components

All content types share these metadata components for consistency:

- **Theme** (`metadata.theme`): Topical categorization (e.g., "Prayer", "Faith Development")
- **Difficulty** (`metadata.difficulty`): Beginner | Intermediate | Advanced
- **Duration** (`metadata.duration`): Estimated time to complete (1-480 minutes)
- **Scripture Reference** (`metadata.scripture-reference`): Biblical grounding (book, chapter, verses, translation)

## Devotional Fields

```
title* (string, max 200)
subtitle (string, max 300)
slug* (uid from title)
scriptureReferences* (component, repeatable)
bodyContent* (richtext)
reflection (richtext)
prayer (text)
themes (component, repeatable)
difficulty* (component)
duration* (component)
featuredImage (media, images only)
publishDate (date)
tags (json)
```

## Prayer Fields

```
title* (string, max 200)
slug* (uid from title)
prayerType* (enum: Guided, Written, Audio-Backed, Contemplative, Intercessory, Gratitude, Petition)
description (text, max 500)
introduction (richtext)
steps (component, repeatable - for guided prayers)
writtenPrayer (richtext - for written prayers)
scriptureReferences (component, repeatable)
themes (component, repeatable)
difficulty* (component)
duration* (component)
audienceNotes (text, max 300)
audioFile (media, audios only)
featuredImage (media, images only)
tags (json)
```

## Study Fields

```
title* (string, max 200)
slug* (uid from title)
description* (text, max 1000)
overview (richtext)
sessions* (component, repeatable)
themes (component, repeatable)
difficulty* (component)
totalDuration* (component)
objectives (json array)
prerequisites (text, max 500)
completionCriteria (text, max 500)
featuredImage (media, images only)
author (string, max 100)
tags (json)
```

## Challenge Fields

```
name* (string, max 200)
slug* (uid from name)
description* (text, max 1000)
detailedDescription (richtext)
startDate* (date)
endDate* (date)
challengeType* (enum: Seasonal, Time-Bound, Open-Ended, Recurring)
participationRules (richtext)
associatedDevotionals (relation to devotionals)
associatedPrayers (relation to prayers)
associatedStudies (relation to studies)
themes (component, repeatable)
difficulty (component)
estimatedCommitment (component)
goals (json array)
rewards (text, max 500)
featuredImage (media, images only)
bannerImage (media, images only)
isActive (boolean, default false)
tags (json)
```

## Content Components

### Prayer Step (`content.prayer-step`)
Used in guided prayers to structure the experience.

```
title (string, max 200)
instruction* (text)
duration (integer, minutes)
order* (integer, min 1)
```

### Study Session (`content.study-session`)
Ordered sessions within a study track.

```
title* (string, max 200)
description (text, max 500)
content* (richtext)
scriptureReferences (component, repeatable)
order* (integer, min 1)
estimatedMinutes (integer, default 15)
```

## API Filtering Examples

### Get Beginner Content
```
GET /api/devotionals?filters[difficulty][level][$eq]=Beginner
```

### Get Short Devotionals (Under 15 Minutes)
```
GET /api/devotionals?filters[duration][estimatedMinutes][$lte]=15
```

### Get Active Challenges
```
GET /api/challenges?filters[isActive][$eq]=true
```

### Get Content by Theme
```
GET /api/prayers?filters[themes][name][$eq]=Gratitude
```

### Get Recent Content (Published After Date)
```
GET /api/devotionals?filters[publishedAt][$gte]=2026-01-01
```

### Combine Filters
```
GET /api/studies?filters[difficulty][level][$eq]=Beginner&filters[totalDuration][estimatedMinutes][$lte]=60
```

## Editorial Workflow

All content types support draft/publish workflow:

1. **Create Draft**: Editor creates new content (unpublished by default)
2. **Review**: Reviewer assesses content quality and theological accuracy
3. **Publish**: Approved content becomes visible via API
4. **Unpublish**: Content can be pulled back to draft state

Only **published** content appears in API responses to mobile app.

## Admin Panel Structure

```
Content Manager
├── Devotionals       (Create, edit, publish devotionals)
├── Prayers          (Create, edit, publish prayers)
├── Studies          (Create, edit, publish studies)
└── Challenges       (Create, edit, publish challenges)

Content-Type Builder
├── Collection Types  (View/edit content type schemas)
└── Components       (View/edit reusable components)

Settings
├── Users & Permissions → Roles  (Configure Editor/Reviewer/Admin)
└── API Tokens                   (Generate tokens for mobile app)
```

## Next Steps After Setup

1. Start dev server: `npm run develop`
2. Create admin account at http://localhost:1337/admin
3. Configure roles in Settings → Users & Permissions
4. Create first content item to test schema
5. Test API endpoints at http://localhost:1337/api/{content-type}
6. Generate API token for mobile app in Settings → API Tokens

## File Locations

- **Content Type Schemas**: `src/api/{type}/content-types/{type}/schema.json`
- **Component Schemas**: `src/components/{category}/{name}.json`
- **Controllers**: `src/api/{type}/controllers/{type}.js`
- **Services**: `src/api/{type}/services/{type}.js`
- **Routes**: `src/api/{type}/routes/{type}.js`

## Common Tasks

### Add New Content Type
1. Create directory: `src/api/{name}/content-types/{name}/`
2. Add schema.json with `draftAndPublish: true`
3. Create controller, service, route using Strapi factories
4. Restart Strapi to register new type

### Add New Component
1. Create file: `src/components/{category}/{name}.json`
2. Define schema with attributes
3. Use in content type schema via `component: "{category}.{name}"`
4. Restart Strapi to register component

### Modify Existing Schema
1. Edit schema.json file
2. Restart Strapi
3. Strapi will auto-migrate database (dev mode only)
4. For production, export content before schema changes

---

**Fields marked with * are required**

See [CONTENT_MODEL.md](CONTENT_MODEL.md) for comprehensive documentation.
