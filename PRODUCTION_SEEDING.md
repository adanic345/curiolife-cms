# Seeding Production Database (Strapi Cloud)

Your production instance is at: **https://fantastic-dog-ea69a42711.strapiapp.com**

---

## Option 1: Seed via Strapi Cloud Dashboard (Recommended)

### Step 1: Access Strapi Cloud Dashboard

1. Log in to [Strapi Cloud](https://cloud.strapi.io/)
2. Navigate to your project: **curiolife-cms**

### Step 2: Run Seed Command

In the Strapi Cloud dashboard:

1. Go to **Settings → Build & Deploy**
2. Find the **Run Command** or **Terminal** option
3. Run:
   ```bash
   npm run seed
   ```

This will populate your production database with sample content.

---

## Option 2: Create Content Manually in Admin Panel

If you prefer to manually create content (recommended for production):

### Access Admin Panel

Go to: https://fantastic-dog-ea69a42711.strapiapp.com/admin

### Create Sample Devotional

1. Navigate to **Content Manager → Devotionals**
2. Click **Create new entry**
3. Fill in the fields:

**Example Devotional:**
```
Title: Finding Peace in Prayer
Subtitle: A morning meditation on stillness before God
Slug: finding-peace-in-prayer (auto-generated)

Scripture References (click Add):
  - Book: Philippians
  - Chapter: 4
  - Verse Start: 6
  - Verse End: 7
  - Translation: NIV
  - Display Text: Philippians 4:6-7

Body Content: (use rich text editor)
<h2>Finding Stillness</h2>
<p>In the quiet moments of the morning, before the world awakens and demands our attention, we find a sacred space to meet with God...</p>

Reflection: (use rich text editor)
<p>Take a moment to reflect on these questions:</p>
<ul>
  <li>What burdens are you carrying that God is inviting you to lay down in prayer?</li>
</ul>

Prayer:
Heavenly Father, in this moment I choose to be still and know that You are God...

Themes (click Add):
  - Name: Prayer
  - Description: Content focused on prayer and communion with God

Difficulty (click Add):
  - Level: Beginner
  - Notes: Perfect for those new to devotional practice

Duration (click Add):
  - Estimated Minutes: 10
  - Unit: minutes

Publish Date: 2026-01-15

Tags: ["peace", "prayer", "morning"]
```

4. Click **Save**
5. Click **Publish**

---

## Option 3: Import via API (Advanced)

You can programmatically create content using the Strapi API:

### Example: Create a Devotional via API

```bash
API_URL="https://fantastic-dog-ea69a42711.strapiapp.com/api"
TOKEN="61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"

curl -X POST "$API_URL/devotionals" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Finding Peace in Prayer",
      "slug": "finding-peace-in-prayer",
      "bodyContent": "<p>Sample content...</p>",
      "scriptureReferences": [{
        "book": "Philippians",
        "chapter": 4,
        "verseStart": 6,
        "verseEnd": 7,
        "translation": "NIV",
        "displayText": "Philippians 4:6-7"
      }],
      "difficulty": {
        "level": "Beginner"
      },
      "duration": {
        "estimatedMinutes": 10,
        "unit": "minutes"
      },
      "publishedAt": "2026-01-15T00:00:00.000Z"
    }
  }'
```

**Note**: Your current API token may be read-only. Check token permissions in admin panel.

---

## Option 4: Export/Import from Local

### Step 1: Export from Local (if you seeded locally)

In your local environment:

```bash
# Run Strapi locally
npm run develop

# In admin panel (http://localhost:1337/admin):
# Settings → Transfer Tokens → Create token
# Settings → Data Transfer → Export
```

### Step 2: Import to Production

In production admin panel:

```bash
# https://fantastic-dog-ea69a42711.strapiapp.com/admin
# Settings → Data Transfer → Import
# Upload the exported file
```

---

## Verifying Seeded Content

After seeding (any method), verify content is available:

### 1. Check Admin Panel

- Log in to https://fantastic-dog-ea69a42711.strapiapp.com/admin
- Navigate to **Content Manager**
- Verify you see published content in:
  - Devotionals
  - Prayers
  - Studies
  - Challenges

### 2. Test API Endpoints

```bash
# Get devotionals (should return data)
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"

# Get prayers
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"

# Get studies
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/studies" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"

# Get challenges
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/challenges" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

You should see `"data": [...]` with actual content instead of empty arrays.

---

## Recommended Approach for Production

**For Production/Live Environment:**
- ✅ Manually create high-quality, curated content via admin panel
- ✅ Review and edit before publishing
- ✅ Add your own devotionals, prayers, studies

**For Development/Testing:**
- ✅ Use `npm run seed` for quick sample data
- ✅ Test API integration
- ✅ Prototype mobile app features

**The seed script is primarily for development.** For production, you likely want to create authentic, carefully-crafted spiritual content rather than using sample data.

---

## Next Steps

1. **Choose your seeding method** (manual creation recommended for production)
2. **Create or import content**
3. **Verify via admin panel and API**
4. **Test with mobile app**
5. **Continue adding authentic spiritual content**

---

For detailed seed data structure and local seeding, see [SEEDING_GUIDE.md](SEEDING_GUIDE.md).
