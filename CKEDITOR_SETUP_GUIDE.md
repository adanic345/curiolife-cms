# CKEditor Setup Guide

CKEditor has been installed and enabled, but it needs to be configured through the Strapi admin UI.

## Why Not Automatic?

The CKEditor plugin for Strapi 5 doesn't support programmatic field type changes in schema files. Instead, you must use the Content-Type Builder UI to switch rich text fields to CKEditor.

## How to Enable CKEditor for Each Field

### Step 1: Access Content-Type Builder

1. Log into your admin panel: http://localhost:1337/admin
2. Go to **Settings** (gear icon in left sidebar)
3. Click **Content-Type Builder**

### Step 2: Update Each Content Type

You'll need to do this for each rich text field in your content types:

#### For **Devotional**:

1. Click **Devotional** in the Content-Type Builder
2. Click the **Edit** (pencil icon) button next to `bodyContent` field
3. Under "Type", change from "Rich text (Markdown)" to **"CKEditor"**
4. Click **Finish**
5. Repeat for `reflection` field
6. Click **Save** (top right)

#### For **Prayer**:

1. Click **Prayer** in the Content-Type Builder
2. Edit `introduction` field
3. Change type to **"CKEditor"**
4. Click **Finish**
5. Edit `writtenPrayer` field
6. Change type to **"CKEditor"**
7. Click **Finish**
8. Click **Save**

#### For **Study**:

1. Click **Study** in the Content-Type Builder
2. Edit `overview` field
3. Change type to **"CKEditor"**
4. Click **Finish**
5. Click **Save**

#### For **Challenge**:

1. Click **Challenge** in the Content-Type Builder
2. Edit `detailedDescription` field
3. Change type to **"CKEditor"**
4. Click **Finish**
5. Edit `participationRules` field
6. Change type to **"CKEditor"**
7. Click **Finish**
8. Click **Save**

#### For **Study Session** Component:

1. In Content-Type Builder, scroll to **Components**
2. Find and click **content** category
3. Click **Study Session**
4. Edit `content` field
5. Change type to **"CKEditor"**
6. Click **Finish**
7. Click **Save**

### Step 3: Restart Server

After making all changes, you may need to restart the Strapi server:

```bash
# If running in terminal, press Ctrl+C then:
npm run develop
```

### Step 4: Test CKEditor

1. Go to **Content Manager**
2. Create or edit any Devotional, Prayer, Study, or Challenge
3. Rich text fields should now show the CKEditor toolbar with full formatting options

---

## What You'll See

**Before**: Plain markdown-style text editor with minimal formatting

**After**: Full WYSIWYG editor with:
- Bold, italic, underline, strikethrough
- Headings (H1-H6)
- Bullet and numbered lists
- Block quotes
- Links
- Code blocks
- Tables
- Horizontal rules
- And more formatting options

---

## Fields to Update

### Content Types:

**Devotional**:
- bodyContent → CKEditor
- reflection → CKEditor

**Prayer**:
- introduction → CKEditor
- writtenPrayer → CKEditor

**Study**:
- overview → CKEditor

**Challenge**:
- detailedDescription → CKEditor
- participationRules → CKEditor

### Components:

**Study Session**:
- content → CKEditor

---

## Troubleshooting

### "CKEditor option not showing in dropdown"

- Ensure the plugin is installed: `npm list @_sh/strapi-plugin-ckeditor`
- Check that `ckeditor5` is enabled in `config/plugins.js`
- Restart Strapi server
- Clear browser cache

### "Field errors when editing content"

If you see React errors when editing, it might be a compatibility issue:

1. Make sure you're using the latest version of the plugin
2. Check that your Node version is between 18.0.0 and 22.x.x (current: v23.11.0 may cause issues)
3. Consider downgrading Node to v22 LTS if problems persist

### "Changes not saving"

- Make sure you click **Finish** after editing each field
- Click **Save** at the top right after all field changes
- Wait for the "Saved successfully" notification

---

## For Production

After you've configured CKEditor locally and tested it:

1. The field type changes are stored in the database, not in code
2. In production, you'll need to manually configure the same fields through the UI
3. OR use Strapi's data transfer feature to export/import settings:

```bash
# Export from local
npx strapi transfer --to https://fantastic-dog-ea69a42711.strapiapp.com

# This will transfer content-types configuration including field types
```

---

## Alternative: Keep Default Rich Text Editor

If CKEditor causes issues or is too complex, Strapi's default rich text editor works perfectly fine:

- Supports Markdown
- Has basic formatting
- Renders cleanly in APIs
- No compatibility issues
- Lighter weight

The choice is yours!

---

**Note**: Once you've configured CKEditor through the UI, commit any database changes if using version control for the database, or document the field changes for your team.
