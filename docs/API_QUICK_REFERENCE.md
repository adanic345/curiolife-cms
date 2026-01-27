# CurioLife API - Quick Reference

One-page reference for mobile app developers.

---

## Authentication

```javascript
headers: {
  'Authorization': 'Bearer YOUR_READ_ONLY_TOKEN'
}
```

---

## Base URLs

```
Production: https://YOUR-URL/api
GraphQL:    https://YOUR-URL/graphql
```

---

## Endpoints

| Resource | List | Single Item |
|----------|------|-------------|
| Devotionals | `GET /devotionals` | `GET /devotionals/:id` |
| Prayers | `GET /prayers` | `GET /prayers/:id` |
| Studies | `GET /studies` | `GET /studies/:id` |
| Challenges | `GET /challenges` | `GET /challenges/:id` |

---

## Common Patterns

### List View (Minimal Data)
```http
GET /devotionals?fields[0]=title&fields[1]=subtitle&populate[featuredImage][fields][0]=url
```

### Detail View (Full Data)
```http
GET /devotionals/:id?populate=*
```

### Filter
```http
GET /devotionals?filters[difficulty][level][$eq]=Beginner
```

### Sort
```http
GET /devotionals?sort=publishDate:desc
```

### Paginate
```http
GET /devotionals?pagination[page]=1&pagination[pageSize]=10
```

---

## Query Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `fields` | `?fields[0]=title` | Select specific fields |
| `populate` | `?populate=*` | Include related data |
| `filters` | `?filters[field][$eq]=value` | Filter results |
| `sort` | `?sort=field:desc` | Sort results |
| `pagination` | `?pagination[page]=1` | Paginate |

---

## Filter Operators

| Operator | Example | Meaning |
|----------|---------|---------|
| `$eq` | `[field][$eq]=value` | Equals |
| `$ne` | `[field][$ne]=value` | Not equals |
| `$gt` | `[field][$gt]=value` | Greater than |
| `$gte` | `[field][$gte]=value` | Greater than or equal |
| `$lt` | `[field][$lt]=value` | Less than |
| `$lte` | `[field][$lte]=value` | Less than or equal |
| `$contains` | `[field][$contains]=text` | Contains |

---

## Response Format

```json
{
  "data": [ /* items or single object */ ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "total": 100
    }
  }
}
```

---

## JavaScript Example

```javascript
const API_URL = 'https://YOUR-URL/api';
const API_TOKEN = 'YOUR_TOKEN';

async function fetchDevotionals() {
  const response = await fetch(`${API_URL}/devotionals?populate=*`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });
  const json = await response.json();
  return json.data;
}
```

---

## GraphQL Example

```graphql
query {
  devotionals(pagination: { limit: 10 }) {
    data {
      id
      documentId
      attributes {
        title
        bodyContent
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

---

## Data Structures

### Devotional
```typescript
{
  id, documentId, title, subtitle, bodyContent,
  reflection, prayer, scriptureReferences[],
  themes[], difficulty, duration, featuredImage
}
```

### Prayer
```typescript
{
  id, documentId, title, prayerType, introduction,
  steps[], writtenPrayer, scriptureReferences[],
  themes[], difficulty, duration
}
```

### Study
```typescript
{
  id, documentId, title, description, overview,
  sessions[], themes[], difficulty, totalDuration
}
```

### Challenge
```typescript
{
  id, documentId, name, description, startDate,
  endDate, challengeType, participationRules,
  themes[], difficulty, isActive
}
```

---

## Error Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized (check token)
- `404` - Not Found
- `500` - Server Error

---

## Need More Details?

See **[FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)** for complete documentation with code examples for React Native, Swift, and Kotlin.
