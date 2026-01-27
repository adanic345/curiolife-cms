# Seed Production Database via API

Your current API token only has **read** permissions. To seed via API, you need a token with **create** permissions.

---

## Step 1: Create a Full-Access API Token

1. Go to your admin panel: https://YOUR-STRAPI-URL.strapiapp.com/admin
2. Navigate to **Settings → API Tokens → Create new API Token**
3. Configure the token:
   - **Name**: `Seeding Token` (or any name)
   - **Token type**: `Full access` (or custom with create permissions)
   - **Token duration**: `Unlimited` (or set expiration after seeding)

4. Click **Save**
5. **Copy the token** (you'll only see it once)

---

## Step 2: Run the Seeding Script

### Option A: Using the Token Directly

```bash
STRAPI_API_TOKEN="your-new-token-here" npm run seed:api
```

### Option B: Set Environment Variable

Create a `.env.local` file:

```bash
STRAPI_API_URL=https://YOUR-STRAPI-URL.strapiapp.com/api
STRAPI_API_TOKEN=your-new-token-here
```

Then run:

```bash
npm run seed:api
```

---

## Step 3: Verify Content Created

After seeding, verify via API:

```bash
# Get devotionals (should return 3)
curl "https://YOUR-STRAPI-URL.strapiapp.com/api/devotionals" \
  -H "Authorization: Bearer YOUR_READ_TOKEN"

# Get prayers (should return 3)
curl "https://YOUR-STRAPI-URL.strapiapp.com/api/prayers" \
  -H "Authorization: Bearer YOUR_READ_TOKEN"

# Get studies (should return 2)
curl "https://YOUR-STRAPI-URL.strapiapp.com/api/studies" \
  -H "Authorization: Bearer YOUR_READ_TOKEN"

# Get challenges (should return 2)
curl "https://YOUR-STRAPI-URL.strapiapp.com/api/challenges" \
  -H "Authorization: Bearer YOUR_READ_TOKEN"
```

Or check the admin panel:
- https://YOUR-STRAPI-URL.strapiapp.com/admin
- Go to **Content Manager** and verify all content types have entries

---

## Step 4: Delete the Seeding Token (Security Best Practice)

After seeding is complete:

1. Go back to **Settings → API Tokens**
2. Delete the `Seeding Token`
3. Keep using your original read-only token for mobile app access

---

## What Gets Created

The script creates:
- **3 Devotionals**: Finding Peace in Prayer, The Power of Gratitude, Trusting God's Timing
- **3 Prayers**: Morning Centering Prayer (Guided), Prayer of Gratitude (Written), Evening Examen Prayer (Guided)
- **2 Studies**: Prayer 101 (7 sessions), The Psalms (3 sessions)
- **2 Challenges**: 30 Days of Gratitude, Lenten Prayer Journey

All content is automatically **published** with components (themes, difficulty, duration, scripture references, steps, sessions).

---

## Alternative: Using Strapi Cloud CLI

If Strapi Cloud offers a terminal:

1. Log in to [Strapi Cloud Dashboard](https://cloud.strapi.io/)
2. Navigate to your project
3. Look for **Terminal** or **Run Command** option
4. Run the local seed script:
   ```bash
   npm run seed
   ```

This uses the internal Strapi API and doesn't require an API token.

---

## Troubleshooting

### 403 Forbidden Error
- Your API token doesn't have `create` permissions
- Create a new token with **Full access** or custom permissions:
  - `devotional.create`
  - `prayer.create`
  - `study.create`
  - `challenge.create`

### "Content already exists" Errors
- The script doesn't check for duplicates
- If you need to re-seed, delete existing content via admin panel first

### Component Validation Errors
- Ensure your content type schemas match what the script expects
- Check that all required fields are provided

---

## Script Details

The script (`scripts/seed-via-api.js`):
- Uses `fetch()` to make REST API calls
- Creates components inline (themes, difficulty, duration, scripture references)
- Generates prayer steps for guided prayers
- Generates study sessions with scripture references
- Publishes all content immediately (`publishedAt` set)

---

**Ready to seed?** Create a full-access API token and run `STRAPI_API_TOKEN="your-token" npm run seed:api`
