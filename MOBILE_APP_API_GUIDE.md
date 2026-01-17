# Mobile App API Integration Guide

This guide shows how to efficiently fetch CurioLife content for a mobile app with list views and detail views.

---

## API Pattern: List → Detail

### Mobile App Flow:
1. **List View**: Fetch lightweight data (title, image, id)
2. **User Selection**: User taps an item
3. **Detail View**: Fetch full content by ID

---

## Devotionals

### List View - Lightweight

Get all devotionals with just the essentials for displaying in a list:

```bash
GET /api/devotionals?fields[0]=title&fields[1]=subtitle&fields[2]=documentId&fields[3]=publishDate&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[difficulty][fields][0]=level&populate[duration][fields][0]=estimatedMinutes
```

**JavaScript/Axios Example:**
```javascript
const response = await axios.get(`${API_URL}/devotionals`, {
  params: {
    'fields[0]': 'title',
    'fields[1]': 'subtitle',
    'fields[2]': 'documentId',
    'fields[3]': 'publishDate',
    'populate[featuredImage][fields][0]': 'url',
    'populate[featuredImage][fields][1]': 'alternativeText',
    'populate[difficulty][fields][0]': 'level',
    'populate[duration][fields][0]': 'estimatedMinutes'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

// Returns array perfect for RecyclerView/FlatList
const devotionalsList = response.data.data.map(item => ({
  id: item.documentId,
  title: item.title,
  subtitle: item.subtitle,
  imageUrl: item.featuredImage?.url,
  difficulty: item.difficulty?.level,
  duration: item.duration?.estimatedMinutes,
  publishDate: item.publishDate
}));
```

**Response Shape:**
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123def",
      "title": "Finding Peace in Prayer",
      "subtitle": "A morning meditation on stillness before God",
      "publishDate": "2026-01-15",
      "featuredImage": {
        "url": "/uploads/peace_prayer_thumb.jpg",
        "alternativeText": "Peaceful morning scene"
      },
      "difficulty": {
        "level": "Beginner"
      },
      "duration": {
        "estimatedMinutes": 10
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 3
    }
  }
}
```

### Detail View - Full Content

When user taps a devotional, fetch everything:

```bash
GET /api/devotionals/{documentId}?populate=*
```

**JavaScript/Axios Example:**
```javascript
// User tapped devotional with documentId "abc123def"
const response = await axios.get(`${API_URL}/devotionals/abc123def`, {
  params: {
    populate: '*'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const devotional = response.data.data;
// Now you have full content including:
// - bodyContent (rich text)
// - reflection
// - prayer
// - scriptureReferences (array)
// - themes (array)
// - tags
```

---

## Prayers

### List View - Lightweight

```bash
GET /api/prayers?fields[0]=title&fields[1]=documentId&fields[2]=prayerType&fields[3]=description&populate[duration][fields][0]=estimatedMinutes&populate[difficulty][fields][0]=level
```

**JavaScript/Axios Example:**
```javascript
const response = await axios.get(`${API_URL}/prayers`, {
  params: {
    'fields[0]': 'title',
    'fields[1]': 'documentId',
    'fields[2]': 'prayerType',
    'fields[3]': 'description',
    'populate[duration][fields][0]': 'estimatedMinutes',
    'populate[difficulty][fields][0]': 'level'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const prayersList = response.data.data.map(item => ({
  id: item.documentId,
  title: item.title,
  type: item.prayerType, // "Guided", "Written", etc.
  description: item.description,
  duration: item.duration?.estimatedMinutes,
  difficulty: item.difficulty?.level
}));
```

### Detail View - Full Prayer with Steps

```bash
GET /api/prayers/{documentId}?populate[steps]=*&populate[themes]=*&populate[scriptureReferences]=*&populate[difficulty]=*&populate[duration]=*
```

**JavaScript Example:**
```javascript
const response = await axios.get(`${API_URL}/prayers/${documentId}`, {
  params: {
    'populate[steps]': '*',
    'populate[themes]': '*',
    'populate[scriptureReferences]': '*',
    'populate[difficulty]': '*',
    'populate[duration]': '*'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const prayer = response.data.data;
// For guided prayers, prayer.steps is ordered array:
// [
//   { order: 1, title: "Arrive and Breathe", instruction: "...", duration: 2 },
//   { order: 2, title: "Acknowledge God's Presence", instruction: "...", duration: 1 }
// ]
```

---

## Studies

### List View - Lightweight

```bash
GET /api/studies?fields[0]=title&fields[1]=documentId&fields[2]=description&populate[difficulty][fields][0]=level&populate[totalDuration][fields][0]=estimatedMinutes
```

**JavaScript Example:**
```javascript
const response = await axios.get(`${API_URL}/studies`, {
  params: {
    'fields[0]': 'title',
    'fields[1]': 'documentId',
    'fields[2]': 'description',
    'populate[difficulty][fields][0]': 'level',
    'populate[totalDuration][fields][0]': 'estimatedMinutes'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const studiesList = response.data.data.map(item => ({
  id: item.documentId,
  title: item.title,
  description: item.description,
  difficulty: item.difficulty?.level,
  totalDuration: item.totalDuration?.estimatedMinutes
}));
```

### Detail View - Study with All Sessions

```bash
GET /api/studies/{documentId}?populate[sessions][populate][scriptureReferences]=*&populate[themes]=*&populate[difficulty]=*&populate[totalDuration]=*
```

**JavaScript Example:**
```javascript
const response = await axios.get(`${API_URL}/studies/${documentId}`, {
  params: {
    'populate[sessions][populate][scriptureReferences]': '*',
    'populate[themes]': '*',
    'populate[difficulty]': '*',
    'populate[totalDuration]': '*'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const study = response.data.data;
// study.sessions is ordered array:
// [
//   {
//     order: 1,
//     title: "Day 1: What is Prayer?",
//     content: "<p>...</p>",
//     scriptureReferences: [...]
//   },
//   ...
// ]
```

---

## Challenges

### List View - Lightweight

```bash
GET /api/challenges?fields[0]=name&fields[1]=documentId&fields[2]=description&fields[3]=startDate&fields[4]=endDate&fields[5]=isActive&fields[6]=challengeType&populate[difficulty][fields][0]=level&populate[estimatedCommitment][fields][0]=estimatedMinutes
```

**JavaScript Example:**
```javascript
const response = await axios.get(`${API_URL}/challenges`, {
  params: {
    'fields[0]': 'name',
    'fields[1]': 'documentId',
    'fields[2]': 'description',
    'fields[3]': 'startDate',
    'fields[4]': 'endDate',
    'fields[5]': 'isActive',
    'fields[6]': 'challengeType',
    'populate[difficulty][fields][0]': 'level',
    'populate[estimatedCommitment][fields][0]': 'estimatedMinutes'
  },
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  }
});

const challengesList = response.data.data.map(item => ({
  id: item.documentId,
  name: item.name,
  description: item.description,
  startDate: item.startDate,
  endDate: item.endDate,
  isActive: item.isActive,
  type: item.challengeType,
  difficulty: item.difficulty?.level,
  dailyCommitment: item.estimatedCommitment?.estimatedMinutes
}));
```

### Detail View - Full Challenge

```bash
GET /api/challenges/{documentId}?populate=*
```

---

## Filtering & Sorting

### Filter by Difficulty

```bash
# Get only beginner devotionals
GET /api/devotionals?filters[difficulty][level][$eq]=Beginner&fields[0]=title&fields[1]=documentId
```

### Filter by Active Status

```bash
# Get only active challenges
GET /api/challenges?filters[isActive][$eq]=true&fields[0]=name&fields[1]=documentId
```

### Sort by Date

```bash
# Get devotionals sorted by newest first
GET /api/devotionals?sort[0]=publishDate:desc&fields[0]=title&fields[1]=documentId&fields[2]=publishDate
```

### Pagination

```bash
# Get 10 devotionals per page
GET /api/devotionals?pagination[page]=1&pagination[pageSize]=10&fields[0]=title&fields[1]=documentId
```

---

## Complete Mobile App Example

### React Native / Flutter / Swift Integration

```javascript
// API Service
class CurioLifeAPI {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  // List devotionals for RecyclerView/FlatList
  async getDevotionalsList() {
    const response = await fetch(`${this.baseURL}/devotionals?fields[0]=title&fields[1]=subtitle&fields[2]=documentId&populate[featuredImage][fields][0]=url&populate[difficulty][fields][0]=level&populate[duration][fields][0]=estimatedMinutes`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    const json = await response.json();

    return json.data.map(item => ({
      id: item.documentId,
      title: item.title,
      subtitle: item.subtitle,
      imageUrl: item.featuredImage?.url,
      difficulty: item.difficulty?.level,
      duration: item.duration?.estimatedMinutes
    }));
  }

  // Get full devotional when user taps
  async getDevotional(documentId) {
    const response = await fetch(`${this.baseURL}/devotionals/${documentId}?populate=*`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });

    const json = await response.json();
    return json.data;
  }

  // Similar methods for prayers, studies, challenges...
}

// Usage in your app
const api = new CurioLifeAPI(
  'https://fantastic-dog-ea69a42711.strapiapp.com/api',
  'YOUR_READ_ONLY_TOKEN'
);

// On app launch / devotionals screen
const devotionals = await api.getDevotionalsList();
// Display in list/grid view

// When user taps a devotional
const fullDevotional = await api.getDevotional(selectedId);
// Show full content, scripture, reflection, prayer
```

---

## Performance Tips

### 1. Use Field Selection
Always specify exactly which fields you need. Don't use `populate=*` for list views.

### 2. Implement Pagination
Don't fetch all content at once. Use pagination:
```bash
?pagination[page]=1&pagination[pageSize]=10
```

### 3. Cache List Data
Cache the lightweight list data locally and only refresh periodically.

### 4. Prefetch Popular Content
Prefetch top devotionals/prayers in the background.

### 5. Image Optimization
Request specific image sizes from Strapi (if you upload different formats).

---

## Testing Your List → Detail Flow

### 1. Get List of Devotionals
```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals?fields[0]=title&fields[1]=documentId" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### 2. Pick a documentId from Response
Look for `"documentId": "xyz123"`

### 3. Get Full Content
```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals/xyz123?populate=*" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

---

## Summary

✅ **List Views**: Use field selection to get only title, id, image
✅ **Detail Views**: Use `populate=*` or selective population to get full content
✅ **User Flow**: List → User Selects → Fetch Full Content by ID
✅ **Efficient**: No over-fetching data on list views
✅ **Fast**: Lightweight list responses load instantly

Your mobile app can efficiently display browsable lists and fetch detailed content only when needed!
