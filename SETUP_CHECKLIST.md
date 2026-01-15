# CurioLife CMS Setup Checklist

Use this checklist to ensure proper setup and configuration of the CurioLife backend CMS.

## Initial Setup

- [ ] **Clone repository** and navigate to project directory
- [ ] **Install dependencies**: `npm install`
- [ ] **Copy environment file**: `cp .env.example .env`
- [ ] **Review environment variables** in `.env` (can keep defaults for development)
- [ ] **Start development server**: `npm run develop`
- [ ] **Wait for Strapi to build** and launch admin panel
- [ ] **Create first admin account** at http://localhost:1337/admin

## Admin Configuration

### Create Roles

- [ ] Navigate to **Settings → Users & Permissions → Roles**
- [ ] Create **Editor** role:
  - Can create and update own content
  - Cannot publish (leave publish permissions unchecked)
  - Can view all content types
- [ ] Create **Reviewer** role:
  - Can view all content
  - Can update all content
  - **Can publish and unpublish** (check publish permissions)
- [ ] Keep **Admin** role with full permissions (already exists)

### Configure API Tokens

- [ ] Navigate to **Settings → API Tokens**
- [ ] Click **Create new API Token**
- [ ] Name: "Mobile App - Production" (or appropriate name)
- [ ] Token type: **Read-only** (mobile app only reads published content)
- [ ] Token duration: **Unlimited** (or set expiration as needed)
- [ ] **Copy and securely store the token** (shown only once)
- [ ] Create additional tokens for different environments (staging, development) as needed

## Content Verification

### Test Content Type Schemas

- [ ] Navigate to **Content Manager** in admin panel
- [ ] Verify all content types appear:
  - [ ] Devotionals
  - [ ] Prayers
  - [ ] Studies
  - [ ] Challenges

### Create Sample Devotional

- [ ] Go to **Content Manager → Devotionals**
- [ ] Click **Create new entry**
- [ ] Fill in required fields:
  - [ ] Title (e.g., "Test Devotional - Finding Peace")
  - [ ] Scripture References component (book, chapter, verses)
  - [ ] Body Content (rich text)
  - [ ] Difficulty level (Beginner/Intermediate/Advanced)
  - [ ] Duration (e.g., 10 minutes)
- [ ] **Save as draft**
- [ ] Verify draft appears in list
- [ ] **Publish** the entry
- [ ] Verify published status

### Create Sample Prayer

- [ ] Go to **Content Manager → Prayers**
- [ ] Click **Create new entry**
- [ ] Fill in required fields:
  - [ ] Title (e.g., "Morning Gratitude Prayer")
  - [ ] Prayer Type (select from dropdown)
  - [ ] Difficulty level
  - [ ] Duration
- [ ] Add prayer steps (if guided) or written prayer text
- [ ] **Save and publish**

### Create Sample Study

- [ ] Go to **Content Manager → Studies**
- [ ] Click **Create new entry**
- [ ] Fill in required fields:
  - [ ] Title (e.g., "Introduction to Prayer - 7 Days")
  - [ ] Description
  - [ ] Sessions (add at least 2 sessions with order numbers)
  - [ ] Difficulty level
  - [ ] Total Duration
- [ ] **Save and publish**

### Create Sample Challenge

- [ ] Go to **Content Manager → Challenges**
- [ ] Click **Create new entry**
- [ ] Fill in required fields:
  - [ ] Name (e.g., "30 Days of Gratitude")
  - [ ] Description
  - [ ] Start Date (today or future date)
  - [ ] End Date (30 days from start)
  - [ ] Challenge Type
- [ ] Set **isActive** to true
- [ ] Optionally link to sample devotionals/prayers created above
- [ ] **Save and publish**

## API Testing

### Test API Endpoints

Open your browser or use `curl` to test these endpoints:

- [ ] **List all devotionals**: http://localhost:1337/api/devotionals
  - Should return published devotional in data array
- [ ] **List all prayers**: http://localhost:1337/api/prayers
  - Should return published prayer
- [ ] **List all studies**: http://localhost:1337/api/studies
  - Should return published study
- [ ] **List all challenges**: http://localhost:1337/api/challenges
  - Should return published challenge

### Test API Filtering

- [ ] **Filter by difficulty**:
  ```
  http://localhost:1337/api/devotionals?filters[difficulty][level][$eq]=Beginner
  ```
- [ ] **Filter by duration**:
  ```
  http://localhost:1337/api/devotionals?filters[duration][estimatedMinutes][$lte]=15
  ```
- [ ] **Filter active challenges**:
  ```
  http://localhost:1337/api/challenges?filters[isActive][$eq]=true
  ```

### Test Draft/Publish Workflow

- [ ] Create new devotional and **save as draft** (don't publish)
- [ ] Verify it does NOT appear in API response: http://localhost:1337/api/devotionals
- [ ] Publish the devotional
- [ ] Verify it NOW appears in API response
- [ ] **Unpublish** the devotional
- [ ] Verify it disappears from API response

## Mobile App Integration

- [ ] **Share API base URL** with mobile team: http://localhost:1337/api (dev) or production URL
- [ ] **Share API token** created earlier (securely)
- [ ] **Share documentation**:
  - [ ] [CONTENT_MODEL.md](CONTENT_MODEL.md) - Complete content architecture
  - [ ] [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - API endpoints and filtering
- [ ] **Coordinate API response format** with mobile team expectations
- [ ] **Test sample API calls** from mobile app

## Production Readiness

### Database Migration

- [ ] **Choose production database**: PostgreSQL or MySQL
- [ ] **Update** `config/database.js` with production credentials
- [ ] **Test connection** before deployment
- [ ] **Export development content** (if keeping sample data)
- [ ] **Import to production database** after migration

### Environment Variables

- [ ] **Generate secure values** for production `.env`:
  - [ ] `APP_KEYS` (generate 2-4 random strings)
  - [ ] `API_TOKEN_SALT` (random string)
  - [ ] `ADMIN_JWT_SECRET` (random string)
  - [ ] `TRANSFER_TOKEN_SALT` (random string)
  - [ ] `JWT_SECRET` (random string)
- [ ] Set `HOST` and `PORT` for production environment
- [ ] **Never commit** `.env` to version control

### Build and Deploy

- [ ] **Build admin panel**: `npm run build`
- [ ] **Test production build** locally: `npm run start`
- [ ] **Verify admin panel** works: http://localhost:1337/admin
- [ ] **Verify API endpoints** work in production mode
- [ ] **Deploy to hosting platform** (see Strapi deployment docs)
- [ ] **Configure HTTPS** for production
- [ ] **Set up monitoring** and error logging

### Post-Deployment Verification

- [ ] Admin panel accessible at production URL
- [ ] Can log in with admin account
- [ ] All content types visible and functional
- [ ] API endpoints return expected data
- [ ] Mobile app can authenticate with API token
- [ ] Mobile app can fetch and display content

## Ongoing Maintenance

- [ ] **Backup database regularly** (automated backups recommended)
- [ ] **Monitor API usage** and performance
- [ ] **Review and update roles/permissions** as team grows
- [ ] **Keep Strapi updated** to latest stable version
- [ ] **Document any custom extensions** or modifications
- [ ] **Maintain editorial workflow** governance (draft → review → publish)

## Troubleshooting

### Common Issues

**Cannot start Strapi**:
- Check Node.js version (18.x - 22.x required)
- Delete `.strapi` directory and restart
- Check for port conflicts (default 1337)

**Content not appearing in API**:
- Verify content is **published**, not draft
- Check API token has correct permissions
- Review role permissions for public access

**Schema changes not reflecting**:
- Restart Strapi after schema modifications
- Clear `.strapi` cache directory
- Check console for migration errors

**Database errors**:
- For SQLite: Delete `database/*.sqlite` and restart (loses data)
- Check database connection settings in `config/database.js`
- Review Strapi logs for specific error messages

---

**Setup Complete?**

Once all checkboxes are complete, your CurioLife backend CMS is ready for content creation and mobile app integration.

See [README.md](README.md) for day-to-day usage and [CONTENT_MODEL.md](CONTENT_MODEL.md) for content architecture details.
