# CurioLife Production API Examples

**Production URL**: `https://fantastic-dog-ea69a42711.strapiapp.com`

**API Token**: `61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7`

---

## ✅ Verified Working APIs

All endpoints are live and responding correctly:

- ✓ Devotionals: `/api/devotionals`
- ✓ Prayers: `/api/prayers`
- ✓ Studies: `/api/studies`
- ✓ Challenges: `/api/challenges`

---

## Quick Test Commands

### 1. Test Devotionals API

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### 2. Test Prayers API

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### 3. Test Studies API

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/studies" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### 4. Test Challenges API

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/challenges" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

---

## Current Response (No Content Yet)

All APIs currently return:

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

This is correct! Empty `data` array means:
- ✅ API is working
- ✅ Authentication is valid
- ⏳ No content has been created/published yet

---

## Mobile App Integration

### Using JavaScript/TypeScript (React Native, Expo, etc.)

```javascript
const API_BASE_URL = 'https://fantastic-dog-ea69a42711.strapiapp.com/api';
const API_TOKEN = '61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7';

// Fetch all devotionals
async function getDevotionals() {
  const response = await fetch(`${API_BASE_URL}/devotionals`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  return data.data; // Array of devotionals
}

// Fetch beginner devotionals under 15 minutes
async function getBeginnerDevotionals() {
  const params = new URLSearchParams({
    'filters[difficulty][level][$eq]': 'Beginner',
    'filters[duration][estimatedMinutes][$lte]': '15',
    'sort[0]': 'publishDate:desc'
  });

  const response = await fetch(`${API_BASE_URL}/devotionals?${params}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });

  const data = await response.json();
  return data.data;
}

// Fetch single devotional by ID
async function getDevotional(id) {
  const response = await fetch(`${API_BASE_URL}/devotionals/${id}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  const data = await response.json();
  return data.data;
}

// Fetch active challenges with associated content
async function getActiveChallenges() {
  const params = new URLSearchParams({
    'filters[isActive][$eq]': 'true',
    'populate[associatedDevotionals]': '*',
    'populate[associatedPrayers]': '*',
    'populate[associatedStudies]': '*'
  });

  const response = await fetch(`${API_BASE_URL}/challenges?${params}`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });

  const data = await response.json();
  return data.data;
}
```

### Using Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fantastic-dog-ea69a42711.strapiapp.com/api',
  headers: {
    'Authorization': 'Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7'
  }
});

// Get all devotionals
const { data } = await api.get('/devotionals');
console.log(data.data); // Array of devotionals

// Get filtered prayers
const prayers = await api.get('/prayers', {
  params: {
    'filters[prayerType][$eq]': 'Guided',
    'filters[duration][estimatedMinutes][$lte]': 10
  }
});
```

---

## Filter Examples (Ready to Use)

### Get Beginner Content

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals?filters[difficulty][level][\$eq]=Beginner" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### Get Short Duration Content (≤15 minutes)

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers?filters[duration][estimatedMinutes][\$lte]=15" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### Get Guided Prayers Only

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/prayers?filters[prayerType][\$eq]=Guided" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### Get Active Challenges

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/challenges?filters[isActive][\$eq]=true" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

### Combine Filters (Beginner + Short Duration)

```bash
curl "https://fantastic-dog-ea69a42711.strapiapp.com/api/devotionals?filters[difficulty][level][\$eq]=Beginner&filters[duration][estimatedMinutes][\$lte]=15&sort[0]=publishDate:desc" \
  -H "Authorization: Bearer 61bc175984c5da5c3c2d63f4bae9afda57446c5325e898fdf123d65d30176128af1b288e5edbfe79509a2481e8bf8ebce410cfc6e0bb9449834f6d98746decc6d364671e6a9088c4c27d120dda49892a2fa2aec62681ddfeecdc5c9c92c654f87480a92511a296f7285a052a80609c4812d5256457425bdd2b1d7117fd16e2c7"
```

---

## Next Steps

### 1. Create Sample Content

Go to your Strapi admin panel:
- **URL**: https://fantastic-dog-ea69a42711.strapiapp.com/admin
- Create and **publish** content (draft content won't appear in API)
- Test APIs again to see the content

### 2. Test with Sample Content

After creating content, the API will return structured data like:

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "attributes": {
        "title": "Morning Peace",
        "bodyContent": "<p>In the stillness...</p>",
        "difficulty": {
          "level": "Beginner"
        },
        "duration": {
          "estimatedMinutes": 10
        },
        "publishedAt": "2026-01-16T02:00:00.000Z"
      }
    }
  ]
}
```

### 3. Integrate with Mobile App

Use the JavaScript examples above in your React Native or mobile app to fetch content.

---

## Security Notes

⚠️ **Important**: The API token above has full read access to your content.

- **Keep it secure**: Don't commit to public repositories
- **Use environment variables** in your mobile app
- **Regenerate if compromised**: In Strapi admin → Settings → API Tokens

---

## Resources

- [API_TESTING.md](API_TESTING.md) - Comprehensive API testing guide with all examples
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Field definitions and schemas
- [CONTENT_MODEL.md](CONTENT_MODEL.md) - Complete content architecture

---

**All APIs tested and verified working! 🎉**

Ready to start creating spiritual content for your mobile app.
