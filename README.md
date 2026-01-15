# CurioLife Backend CMS

This is the backend content management system for CurioLife, a faith-based spiritual engagement platform. Built on Strapi 5.28.0.

## What This Is

This Strapi instance manages:
- **Spiritual Content**: Devotionals, prayers, studies, and challenges
- **Editorial Workflow**: Draft/review/publish lifecycle
- **Content Metadata**: Themes, difficulty levels, scripture references, duration
- **API Delivery**: Clean, stable APIs for mobile app consumption

**Important**: This is backend-only. No business logic, AI, or personalization happens here.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
npm run develop
```

This will:
- Start Strapi on http://localhost:1337
- Launch admin panel at http://localhost:1337/admin
- Prompt you to create first admin user

### 4. Configure Roles (First Time Only)

After creating your admin account:

1. Go to **Settings → Users & Permissions → Roles**
2. Create these roles:
   - **Editor**: Can create and edit drafts
   - **Reviewer**: Can approve/publish content
   - **Admin**: Full access

See [CONTENT_MODEL.md](CONTENT_MODEL.md) for detailed role configuration.

## Content Model

See [CONTENT_MODEL.md](CONTENT_MODEL.md) for complete documentation of:
- Content types (Devotional, Prayer, Study, Challenge)
- Shared components (themes, difficulty, scripture references)
- API conventions and filtering
- Editorial workflow
- Extension guidelines

## Available Commands

### `npm run develop`
Start development server with hot reload
- Admin panel: http://localhost:1337/admin
- API base: http://localhost:1337/api

### `npm run build`
Build admin panel for production

### `npm run start`
Start production server (requires build first)

### `npm run seed:example`
Seed database with example content (to be implemented)

## Project Structure

```
curiolife-cms/
├── config/              # Strapi configuration
├── src/
│   ├── api/            # Content types (devotional, prayer, study, challenge)
│   ├── components/     # Reusable components (metadata, content)
│   └── extensions/     # Custom extensions (keep minimal)
├── database/           # SQLite database (dev only)
├── public/             # Static assets
└── CONTENT_MODEL.md    # Content architecture documentation
```

## Core Principles

1. **Strapi-native features first** - Use built-in functionality before custom code
2. **Strongly typed schemas** - All content follows explicit schemas
3. **Composable components** - Reuse metadata and content blocks
4. **Draft/publish workflow** - All content types support editorial review
5. **No business logic** - Keep Strapi as content source of truth only

## API Access

All published content is accessible via REST API:

- Devotionals: `/api/devotionals`
- Prayers: `/api/prayers`
- Studies: `/api/studies`
- Challenges: `/api/challenges`

**Example**: Get beginner devotionals under 15 minutes:
```
GET /api/devotionals?filters[difficulty][level][$eq]=Beginner&filters[duration][estimatedMinutes][$lte]=15
```

See [Strapi documentation](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication) for filtering syntax.

## Production Deployment

Before deploying to production:

1. **Switch to PostgreSQL/MySQL**: Edit [config/database.js](config/database.js)
2. **Set environment variables**: `HOST`, `PORT`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`
3. **Build admin panel**: `npm run build`
4. **Start production server**: `npm run start`

See [Strapi deployment docs](https://docs.strapi.io/dev-docs/deployment) for platform-specific guides.

## Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Content Model Documentation](CONTENT_MODEL.md)
- [Strapi REST API Reference](https://docs.strapi.io/dev-docs/api/rest)

## Support

For CurioLife-specific questions, refer to internal documentation.

For Strapi questions:
- [Strapi Discord](https://discord.strapi.io)
- [Strapi Forum](https://forum.strapi.io/)
