# CurioLife CMS - Plugins Setup

## Installed Plugins

We've installed and configured two essential Strapi plugins:

### 1. GraphQL API
**Package**: `@strapi/plugin-graphql` (v5.33.3)
**Purpose**: Alternative API query method with GraphQL

**Access Points**:
- **Development**: http://localhost:1337/graphql
- **Production**: https://fantastic-dog-ea69a42711.strapiapp.com/graphql

**Example Query**:
```graphql
query {
  devotionals {
    data {
      id
      attributes {
        title
        subtitle
        bodyContent
        publishDate
        featuredImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
```

### 2. Documentation Plugin
**Package**: `@strapi/plugin-documentation` (v5.33.3)
**Purpose**: Auto-generated OpenAPI/Swagger documentation for all APIs

**Access**: Settings → Documentation in admin panel

---

## GraphQL Usage

### Query Devotionals with GraphQL:
```graphql
query GetDevotionals {
  devotionals(pagination: { limit: 10 }) {
    data {
      id
      documentId
      attributes {
        title
        subtitle
        bodyContent
        reflection
        publishDate
        scriptureReferences {
          book
          chapter
          verseStart
          verseEnd
          displayText
        }
        themes {
          name
          category
        }
        difficulty {
          level
        }
        duration {
          estimatedMinutes
        }
      }
    }
  }
}
```

### Get Single Devotional by ID:
```graphql
query GetDevotional {
  devotional(documentId: "xyz123") {
    data {
      attributes {
        title
        bodyContent
        reflection
        prayer
      }
    }
  }
}
```

### Query Prayers:
```graphql
query GetPrayers {
  prayers(pagination: { limit: 10 }) {
    data {
      id
      documentId
      attributes {
        title
        prayerType
        introduction
        writtenPrayer
        duration {
          estimatedMinutes
        }
      }
    }
  }
}
```

### Filter and Sort:
```graphql
query GetDevotionalsFiltered {
  devotionals(
    filters: { difficulty: { level: { eq: "Beginner" } } }
    sort: "publishDate:desc"
    pagination: { limit: 5 }
  ) {
    data {
      attributes {
        title
        publishDate
      }
    }
  }
}
```

---

## Pushing to Production (Strapi Cloud)

All changes are in code files and will be deployed automatically when you push to GitHub:

### 1. Commit Changes:
```bash
git add .
git commit -m "Add GraphQL and Documentation plugins"
git push origin main
```

### 2. Strapi Cloud Deployment:
- Strapi Cloud automatically detects the push
- Runs `npm install` to install new plugins
- Rebuilds the admin panel
- Deploys to production

**Timeline**: 5-10 minutes after push

### 3. Verify in Production:
- **GraphQL**: Visit https://fantastic-dog-ea69a42711.strapiapp.com/graphql
- **Documentation**: Settings → Documentation in admin panel

---

## Files Modified

### Plugin Installation:
- `package.json` - Added 2 plugin dependencies

### Plugin Configuration:
- `config/plugins.js` - Enabled and configured GraphQL and Documentation plugins

---

## Troubleshooting

### "GraphQL endpoint 404"
- Ensure GraphQL plugin is enabled in `config/plugins.js`
- Restart Strapi server
- In production, wait for deployment to complete

### "Documentation plugin not visible"
- Check Settings menu in admin panel
- Ensure plugin is installed: `npm list @strapi/plugin-documentation`
- Restart Strapi server

---

## Benefits

### GraphQL:
✅ **Flexible queries** - Request exactly the fields you need
✅ **Nested data** - Fetch related data in one query
✅ **Type safety** - Schema-based validation
✅ **Efficient** - Reduce over-fetching and under-fetching
✅ **Developer tools** - GraphQL Playground for testing queries

### Documentation:
✅ **Auto-generated** - Always up-to-date API docs
✅ **Interactive** - Test API calls directly in browser
✅ **OpenAPI 3.0** - Industry standard format
✅ **Developer-friendly** - Easy onboarding for frontend team

---

## GraphQL vs REST

Both APIs are available. Choose based on your needs:

**Use GraphQL when**:
- You need flexible queries
- You want to avoid over-fetching
- You need nested/related data in one request
- Your frontend uses Apollo Client or similar

**Use REST when**:
- Simple CRUD operations
- Standard list/detail patterns
- Caching is critical
- Legacy systems integration

---

## Next Steps

1. **Push to GitHub** to deploy to production
2. **Explore GraphQL** by running queries in GraphQL Playground
3. **Review Documentation** in Settings → Documentation
4. **Train team** on GraphQL query syntax
5. **Update mobile app** to use GraphQL for efficient data fetching

---

## Note on CKEditor

CKEditor plugin was attempted but caused compatibility issues with Strapi 5.28.0. The default Strapi rich text editor will be used instead. This editor supports markdown and basic formatting.

For enhanced rich text editing in the future, consider:
- Upgrading to a newer Strapi version when CKEditor compatibility is confirmed
- Using a different rich text editor plugin
- Building a custom editor field

---

**Note**: The local server should automatically rebuild when plugins are installed. If you don't see changes, restart with `npm run develop`.
