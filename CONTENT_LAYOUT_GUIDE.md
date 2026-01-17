# Content Editor Layout Configuration

This guide shows how to configure your CurioLife content types with a WordPress-style layout: **content in the center, metadata on the right**.

---

## Overview

By default, Strapi shows all fields in a single column. We want to reorganize each content type so that:

**Center Panel (Main Content):**
- Title, subtitle, body text
- Primary content fields
- Rich text editors
- Scripture references, steps, sessions

**Right Sidebar (Metadata):**
- Featured images
- Dates (publish date, start/end dates)
- Tags
- Themes
- Difficulty & Duration
- Publish status
- Associations/Relations

---

## How to Configure Layouts

### Step 1: Access Content-Type Builder

1. Log in to your admin panel: http://localhost:1337/admin (or production URL)
2. Go to **Settings → Content-Type Builder** (gear icon in left sidebar)

### Step 2: Configure Each Content Type

For each content type (Devotional, Prayer, Study, Challenge), follow these steps:

#### For Devotional:

1. Click **Devotional** in Content-Type Builder
2. Click **Configure the view** button (top right)
3. Switch to **Edit View** tab
4. Drag and drop fields to organize them:

**Left Column (Main Content):**
- `title`
- `subtitle`
- `slug`
- `scriptureReferences` (component)
- `bodyContent` (rich text)
- `reflection` (rich text)
- `prayer` (text)

**Right Column (Metadata):**
- `featuredImage` (media)
- `publishDate` (date)
- `tags` (json)
- `themes` (component)
- `difficulty` (component)
- `duration` (component)

5. Click **Save**

---

## Recommended Layouts by Content Type

### Devotional Layout

```
┌─────────────────────────────────┬──────────────────┐
│ Center Panel                    │ Right Sidebar    │
├─────────────────────────────────┼──────────────────┤
│ • title                         │ • featuredImage  │
│ • subtitle                      │ • publishDate    │
│ • slug                          │ • tags           │
│ • scriptureReferences           │ • themes         │
│ • bodyContent (rich text)       │ • difficulty     │
│ • reflection (rich text)        │ • duration       │
│ • prayer (text)                 │                  │
└─────────────────────────────────┴──────────────────┘
```

**Why:**
- Writers focus on content (body, reflection, prayer)
- Metadata is easily accessible but doesn't distract
- Scripture references stay with main content

---

### Prayer Layout

```
┌─────────────────────────────────┬──────────────────┐
│ Center Panel                    │ Right Sidebar    │
├─────────────────────────────────┼──────────────────┤
│ • title                         │ • audioFile      │
│ • slug                          │ • themes         │
│ • prayerType (dropdown)         │ • difficulty     │
│ • description (text)            │ • duration       │
│ • introduction (rich text)      │ • audienceNotes  │
│ • writtenPrayer (rich text)     │ • tags           │
│ • steps (component - ordered)   │                  │
└─────────────────────────────────┴──────────────────┘
```

**Why:**
- Prayer content (introduction, written prayer, steps) stays central
- Audio file (optional) in sidebar
- Metadata doesn't interrupt prayer writing flow

---

### Study Layout

```
┌─────────────────────────────────┬──────────────────┐
│ Center Panel                    │ Right Sidebar    │
├─────────────────────────────────┼──────────────────┤
│ • title                         │ • themes         │
│ • slug                          │ • difficulty     │
│ • description (text)            │ • totalDuration  │
│ • overview (rich text)          │ • author         │
│ • sessions (component array)    │ • tags           │
│ • objectives (json array)       │                  │
│ • prerequisites (text)          │                  │
│ • completionCriteria (text)     │                  │
└─────────────────────────────────┴──────────────────┘
```

**Why:**
- Study content (sessions, objectives) is complex - needs center focus
- Sessions with scripture references stay together
- Metadata (difficulty, duration) in sidebar for quick reference

---

### Challenge Layout

```
┌─────────────────────────────────┬──────────────────┐
│ Center Panel                    │ Right Sidebar    │
├─────────────────────────────────┼──────────────────┤
│ • name                          │ • startDate      │
│ • slug                          │ • endDate        │
│ • description (text)            │ • challengeType  │
│ • detailedDescription (rich)    │ • isActive       │
│ • participationRules (rich)     │ • themes         │
│ • goals (json array)            │ • difficulty     │
│ • rewards (text)                │ • commitment     │
│                                 │ • tags           │
│                                 │ • associated*    │
└─────────────────────────────────┴──────────────────┘

*associated = associatedDevotionals, associatedPrayers, associatedStudies
```

**Why:**
- Challenge content (description, rules, goals) is editorial - needs focus
- Dates, type, active status are administrative - sidebar
- Relations to other content types grouped in sidebar

---

## Manual Configuration Steps

Since Strapi doesn't support programmatic layout configuration easily, you'll need to configure these manually via the UI:

### 1. Open Content-Type Builder
**Settings → Content-Type Builder**

### 2. For Each Content Type:

**Devotional:**
1. Click **Devotional**
2. Click **Configure the view** (eye icon)
3. Switch to **Edit View** tab
4. Drag fields to create 2-column layout:
   - Left: content fields
   - Right: metadata fields
5. Save

**Prayer:**
1. Click **Prayer**
2. Configure view → Edit View
3. Organize: content left, metadata right
4. Save

**Study:**
1. Click **Study**
2. Configure view → Edit View
3. Organize: sessions/content left, metadata right
4. Save

**Challenge:**
1. Click **Challenge**
2. Configure view → Edit View
3. Organize: challenge content left, dates/metadata right
4. Save

---

## Alternative: Configuration Files

If you want to automate this (advanced), you can create configuration files in the database. However, Strapi 5 stores content-manager configurations in the database, not in code files.

The configuration I created in `src/admin/config/content-layout.config.js` serves as a **reference document** showing the intended layout structure. You'll need to manually apply it via the UI.

---

## Benefits of WordPress-Style Layout

### For Content Editors:

✅ **Focused Writing** - Main content fields are uninterrupted by metadata
✅ **Cleaner Interface** - Less scrolling through irrelevant fields
✅ **Logical Grouping** - Editorial content vs administrative metadata
✅ **Faster Editing** - Find what you need quickly

### For Your Team:

✅ **Consistency** - All content types follow same pattern
✅ **Efficiency** - Editors spend less time hunting for fields
✅ **Professional Feel** - Similar to WordPress, familiar to many editors

---

## Quick Reference

### Fields to Put in Center (Main Content):
- `title`, `name`, `subtitle`
- `slug`
- `description`, `overview`
- `bodyContent`, `reflection`, `prayer` (rich text)
- `introduction`, `writtenPrayer`
- `steps` (prayer steps)
- `sessions` (study sessions)
- `scriptureReferences`
- `objectives`, `prerequisites`, `completionCriteria`
- `participationRules`, `goals`, `rewards`
- `detailedDescription`

### Fields to Put in Right Sidebar (Metadata):
- `featuredImage`, `audioFile` (media)
- `publishDate`, `startDate`, `endDate` (dates)
- `tags` (json)
- `themes`, `difficulty`, `duration` (components)
- `prayerType`, `challengeType` (enums)
- `isActive` (boolean)
- `author` (text)
- `audienceNotes` (text)
- `totalDuration`, `estimatedCommitment` (components)
- `associatedDevotionals`, `associatedPrayers`, `associatedStudies` (relations)

---

## Testing Your Layout

After configuring:

1. **Create a new devotional**
   - Verify main content fields are in center
   - Verify metadata is in right sidebar
   - Ensure layout feels natural

2. **Edit an existing prayer**
   - Check that steps are easy to manage
   - Verify metadata doesn't interrupt writing flow

3. **Review a study**
   - Ensure sessions are prominent and easy to edit
   - Check that themes/difficulty are accessible but not intrusive

4. **Update a challenge**
   - Verify dates and status are in sidebar
   - Check that challenge description has full focus

---

## Troubleshooting

### "I don't see Configure the view button"
- Make sure you're in **Content-Type Builder**, not Content Manager
- Look for the eye icon (👁️) or "Configure the view" button

### "Fields won't drag to 2 columns"
- Strapi may require you to set column widths manually
- Click on each field and set its width (e.g., 6 = half width, 12 = full width)
- For right sidebar, set fields to width 12 in the right column

### "Layout doesn't save"
- Ensure you click **Save** after making changes
- Clear browser cache and reload
- Check browser console for errors

### "Can I do this programmatically?"
- Strapi 5 stores layouts in database, not code
- Manual UI configuration is the recommended approach
- Alternatively, use Strapi's data transfer feature to export/import settings

---

## Next Steps

1. **Configure layouts** for all 4 content types via UI
2. **Test editing** each content type
3. **Train your team** on the new layout
4. **Document any customizations** specific to your workflow

---

## Reference Layout Configuration

See `src/admin/config/content-layout.config.js` for the programmatic structure of each layout. This file serves as documentation for what the layout should look like, even though you'll configure it manually via the UI.

---

**Remember:** These layouts are designed to maximize editor productivity and match the WordPress editing experience your team may be familiar with!
