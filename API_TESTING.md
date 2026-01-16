# CurioLife API Testing Guide

This guide shows you how to test all the CurioLife APIs with real examples.

**Note**: Before testing, you need to:
1. Start Strapi: `npm run develop`
2. Create admin account at http://localhost:1337/admin
3. Create and publish some sample content
4. (Optional) Generate an API token for authenticated requests

---

## Quick Test - Check if APIs are Available

### Test All Endpoints (No Content Yet)

```bash
# Test Devotionals API
curl http://localhost:1337/api/devotionals

# Test Prayers API
curl http://localhost:1337/api/prayers

# Test Studies API
curl http://localhost:1337/api/studies

# Test Challenges API
curl http://localhost:1337/api/challenges
```

**Expected Response** (when no content exists):
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

---

## Testing with Sample Content

After you create and publish content in the admin panel, test these examples:

### 1. Get All Devotionals

```bash
curl http://localhost:1337/api/devotionals
```

**Sample Response**:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123xyz",
      "attributes": {
        "title": "Finding Peace in Prayer",
        "subtitle": "A morning meditation on stillness",
        "slug": "finding-peace-in-prayer",
        "bodyContent": "<p>In the quiet moments of the morning...</p>",
        "reflection": "<p>Take time to reflect on...</p>",
        "prayer": "Lord, grant me peace...",
        "publishDate": "2026-01-16",
        "scriptureReferences": [
          {
            "id": 1,
            "book": "Philippians",
            "chapter": 4,
            "verseStart": 6,
            "verseEnd": 7,
            "translation": "NIV",
            "displayText": "Philippians 4:6-7"
          }
        ],
        "themes": [
          {
            "id": 1,
            "name": "Prayer",
            "description": "Content focused on prayer and communion with God"
          }
        ],
        "difficulty": {
          "id": 1,
          "level": "Beginner",
          "notes": "Perfect for those new to devotional practice"
        },
        "duration": {
          "id": 1,
          "estimatedMinutes": 10,
          "unit": "minutes"
        },
        "tags": ["morning", "peace", "prayer"],
        "createdAt": "2026-01-16T02:00:00.000Z",
        "updatedAt": "2026-01-16T02:00:00.000Z",
        "publishedAt": "2026-01-16T02:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

### 2. Get Single Devotional by ID

```bash
curl http://localhost:1337/api/devotionals/1
```

---

### 3. Filter by Difficulty Level

```bash
# Get only Beginner devotionals
curl "http://localhost:1337/api/devotionals?filters[difficulty][level][\$eq]=Beginner"

# Get Intermediate or Advanced
curl "http://localhost:1337/api/devotionals?filters[difficulty][level][\$eq]=Intermediate"
```

---

### 4. Filter by Duration (Time Commitment)

```bash
# Get devotionals 15 minutes or less
curl "http://localhost:1337/api/devotionals?filters[duration][estimatedMinutes][\$lte]=15"

# Get devotionals between 10-20 minutes
curl "http://localhost:1337/api/devotionals?filters[duration][estimatedMinutes][\$gte]=10&filters[duration][estimatedMinutes][\$lte]=20"
```

---

### 5. Filter by Theme

```bash
# Get devotionals with "Prayer" theme
curl "http://localhost:1337/api/devotionals?filters[themes][name][\$contains]=Prayer"
```

---

### 6. Filter by Date

```bash
# Get devotionals published after Jan 1, 2026
curl "http://localhost:1337/api/devotionals?filters[publishDate][\$gte]=2026-01-01"

# Get devotionals for today
curl "http://localhost:1337/api/devotionals?filters[publishDate][\$eq]=2026-01-16"
```

---

### 7. Pagination

```bash
# Get first page (10 items)
curl "http://localhost:1337/api/devotionals?pagination[page]=1&pagination[pageSize]=10"

# Get second page
curl "http://localhost:1337/api/devotionals?pagination[page]=2&pagination[pageSize]=10"
```

---

### 8. Sorting

```bash
# Sort by publish date (newest first)
curl "http://localhost:1337/api/devotionals?sort[0]=publishDate:desc"

# Sort by title alphabetically
curl "http://localhost:1337/api/devotionals?sort[0]=title:asc"
```

---

### 9. Combine Multiple Filters

```bash
# Get beginner devotionals under 15 minutes, published recently
curl "http://localhost:1337/api/devotionals?filters[difficulty][level][\$eq]=Beginner&filters[duration][estimatedMinutes][\$lte]=15&filters[publishDate][\$gte]=2026-01-01&sort[0]=publishDate:desc"
```

---

## Testing Prayers API

### Get All Prayers

```bash
curl http://localhost:1337/api/prayers
```

### Filter by Prayer Type

```bash
# Get only guided prayers
curl "http://localhost:1337/api/prayers?filters[prayerType][\$eq]=Guided"

# Get gratitude prayers
curl "http://localhost:1337/api/prayers?filters[prayerType][\$eq]=Gratitude"
```

### Get Prayers with Steps (Guided Prayers)

```bash
# This will include the prayer steps
curl http://localhost:1337/api/prayers/1
```

**Sample Response**:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Morning Gratitude Prayer",
      "prayerType": "Guided",
      "steps": [
        {
          "id": 1,
          "title": "Center Yourself",
          "instruction": "Take three deep breaths and quiet your mind",
          "duration": 2,
          "order": 1
        },
        {
          "id": 2,
          "title": "Give Thanks",
          "instruction": "List three things you're grateful for today",
          "duration": 3,
          "order": 2
        }
      ],
      "difficulty": {
        "level": "Beginner"
      },
      "duration": {
        "estimatedMinutes": 5
      }
    }
  }
}
```

---

## Testing Studies API

### Get All Studies

```bash
curl http://localhost:1337/api/studies
```

### Get Study with Sessions

```bash
curl http://localhost:1337/api/studies/1
```

**Sample Response**:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Prayer 101 - 7 Day Journey",
      "description": "Learn the fundamentals of prayer",
      "sessions": [
        {
          "id": 1,
          "title": "Day 1: What is Prayer?",
          "description": "Understanding prayer basics",
          "content": "<p>Prayer is...</p>",
          "order": 1,
          "estimatedMinutes": 15,
          "scriptureReferences": [
            {
              "book": "Matthew",
              "chapter": 6,
              "verseStart": 5,
              "verseEnd": 15,
              "displayText": "Matthew 6:5-15"
            }
          ]
        }
      ],
      "totalDuration": {
        "estimatedMinutes": 105
      },
      "objectives": [
        "Understand different types of prayer",
        "Build a daily prayer habit",
        "Learn to pray from scripture"
      ]
    }
  }
}
```

### Filter Studies by Total Duration

```bash
# Get short studies (under 2 hours total)
curl "http://localhost:1337/api/studies?filters[totalDuration][estimatedMinutes][\$lte]=120"
```

---

## Testing Challenges API

### Get All Challenges

```bash
curl http://localhost:1337/api/challenges
```

### Get Only Active Challenges

```bash
curl "http://localhost:1337/api/challenges?filters[isActive][\$eq]=true"
```

### Get Challenges by Date Range

```bash
# Get challenges starting this month
curl "http://localhost:1337/api/challenges?filters[startDate][\$gte]=2026-01-01&filters[startDate][\$lte]=2026-01-31"
```

### Get Challenge with Related Content

```bash
# This populates the associated devotionals, prayers, and studies
curl "http://localhost:1337/api/challenges/1?populate[associatedDevotionals]=*&populate[associatedPrayers]=*&populate[associatedStudies]=*"
```

**Sample Response**:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "30 Days of Gratitude",
      "challengeType": "Time-Bound",
      "startDate": "2026-02-01",
      "endDate": "2026-03-02",
      "isActive": true,
      "associatedDevotionals": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "title": "Day 1: What is Gratitude?"
            }
          }
        ]
      },
      "goals": [
        "Practice daily gratitude",
        "Transform your mindset",
        "Build lasting habits"
      ]
    }
  }
}
```

---

## Using with Authentication (API Token)

### Generate API Token

1. Go to http://localhost:1337/admin
2. Navigate to **Settings → API Tokens**
3. Click **Create new API Token**
4. Name: "Mobile App Test"
5. Token type: **Read-only** or **Full access**
6. Copy the token

### Use Token in Requests

```bash
# Replace YOUR_TOKEN_HERE with your actual token
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:1337/api/devotionals
```

---

## Testing from JavaScript/TypeScript

### Using Fetch API

```javascript
// Get all devotionals
const response = await fetch('http://localhost:1337/api/devotionals');
const data = await response.json();
console.log(data);

// Get beginner devotionals
const filtered = await fetch(
  'http://localhost:1337/api/devotionals?filters[difficulty][level][$eq]=Beginner'
);
const devotionals = await filtered.json();

// With authentication
const authenticated = await fetch('http://localhost:1337/api/prayers', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});

// Get devotionals
const { data } = await api.get('/devotionals', {
  params: {
    'filters[difficulty][level][$eq]': 'Beginner',
    'filters[duration][estimatedMinutes][$lte]': 15,
    'pagination[pageSize]': 10
  }
});

console.log(data.data); // Array of devotionals
```

---

## Testing with Postman

1. **Import Collection**: Create a new collection called "CurioLife API"

2. **Set Base URL**: Create environment variable:
   - `baseUrl`: `http://localhost:1337/api`
   - `token`: Your API token

3. **Create Requests**:
   - GET `{{baseUrl}}/devotionals`
   - GET `{{baseUrl}}/prayers`
   - GET `{{baseUrl}}/studies`
   - GET `{{baseUrl}}/challenges`

4. **Add Authorization Header**:
   - Type: Bearer Token
   - Token: `{{token}}`

---

## Common Response Fields

All content types return these standard fields:

- `id`: Numeric ID
- `documentId`: Unique string identifier (Strapi 5 feature)
- `attributes`: Object containing all content fields
- `createdAt`: ISO timestamp
- `updatedAt`: ISO timestamp
- `publishedAt`: ISO timestamp (null if draft)

---

## Error Responses

### 404 Not Found
```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found"
  }
}
```

### 403 Forbidden (Missing/Invalid Token)
```json
{
  "data": null,
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "Forbidden"
  }
}
```

### 400 Bad Request (Invalid Filter)
```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid filter format"
  }
}
```

---

## Next Steps

1. **Create sample content** in admin panel (http://localhost:1337/admin)
2. **Publish the content** (draft content won't appear in API)
3. **Test the examples above** using curl, Postman, or your mobile app
4. **Generate API token** for your mobile app
5. **Update your mobile app** to use these endpoints

---

## Helpful Resources

- [Strapi REST API Docs](https://docs.strapi.io/dev-docs/api/rest)
- [Filtering Guide](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)
- [Population Guide](https://docs.strapi.io/dev-docs/api/rest/populate-select)
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Field definitions
- [CONTENT_MODEL.md](CONTENT_MODEL.md) - Complete content architecture
