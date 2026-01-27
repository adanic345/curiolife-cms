# CurioLife CMS Documentation

Documentation for the CurioLife content management system and API.

---

## For Frontend Developers

### 📱 Mobile App Integration

**Start here**: [FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)
- Complete guide for integrating your mobile app
- REST API and GraphQL examples
- Code examples for React Native, Swift (iOS), and Kotlin (Android)
- Authentication, filtering, pagination, and more

**Quick Reference**: [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
- One-page cheat sheet
- Common patterns and examples
- Query parameters and response formats

---

## For Backend Developers

### 🔧 CMS Configuration

- **Content Types**: Devotionals, Prayers, Studies, Challenges
- **Components**: Scripture References, Themes, Difficulty, Duration
- **Plugins**: GraphQL, Documentation, CKEditor

### 📝 Content Guidelines

**Rich Text Editing**:
- Use Strapi's built-in **Blocks** editor for rich text fields
- Blocks provide a modern, block-based editing experience
- Returns structured JSON for easy rendering in mobile apps

**Data Seeding**:
- See `scripts/seed-via-api.js` for API-based seeding
- Use environment variables for credentials
- Never commit API tokens

---

## Documentation Index

### API Documentation
- **[FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)** - Complete API integration guide
- **[API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)** - Quick reference sheet

### CMS Documentation (Root Directory)
- **[SEED_VIA_API.md](../SEED_VIA_API.md)** - Database seeding instructions
- **[RICH_TEXT_EDITOR_GUIDE.md](../RICH_TEXT_EDITOR_GUIDE.md)** - Blocks editor guide
- **[PLUGINS_SETUP.md](../PLUGINS_SETUP.md)** - Plugin installation and usage

---

## Quick Links

### Production
- **Admin Panel**: https://YOUR-URL/admin
- **REST API**: https://YOUR-URL/api
- **GraphQL**: https://YOUR-URL/graphql
- **API Docs**: Settings → Documentation in admin panel

### Local Development
- **Admin Panel**: http://localhost:1337/admin
- **REST API**: http://localhost:1337/api
- **GraphQL**: http://localhost:1337/graphql

---

## Content Structure

### Devotional
Daily spiritual reflection with scripture, body content, and reflection questions.

**Key Fields**: `title`, `bodyContent`, `reflection`, `scriptureReferences`, `difficulty`, `duration`

### Prayer
Guided prayer experience with steps or written prayer text.

**Key Fields**: `title`, `prayerType`, `steps`, `writtenPrayer`, `duration`

**Types**: Guided, Written, Audio-Backed, Contemplative, Intercessory, Gratitude, Petition

### Study
Multi-session learning track with sessions and objectives.

**Key Fields**: `title`, `sessions`, `overview`, `objectives`, `totalDuration`

### Challenge
Time-bound spiritual engagement campaign.

**Key Fields**: `name`, `description`, `startDate`, `endDate`, `challengeType`, `isActive`

**Types**: Seasonal, Time-Bound, Open-Ended, Recurring

---

## Getting Help

### For API Questions
1. Check [FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)
2. Test in GraphQL Playground: `https://YOUR-URL/graphql`
3. Contact backend team

### For CMS Questions
1. Check Strapi documentation: https://docs.strapi.io
2. Review plugin guides in root directory
3. Contact CMS admin

---

## Security Notes

- ✅ Use **read-only** API tokens for mobile apps
- ❌ Never commit API tokens to git
- ✅ Store tokens in environment variables
- ❌ Never use full-access tokens in client-side code

---

**Last Updated**: January 2026
