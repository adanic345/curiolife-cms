# CurioLife API - Getting Started

**Quick start guide for frontend developers**

---

## 1. API Credentials

You'll receive these from the backend team:

```javascript
API_URL: "https://YOUR-PRODUCTION-URL/api"
API_TOKEN: "your-read-only-token-here"
```

**Important**: Store the token in environment variables, never commit it to git!

---

## 2. Your First API Call

```javascript
const API_URL = 'https://YOUR-URL/api';
const API_TOKEN = 'YOUR_TOKEN';

async function testAPI() {
  const response = await fetch(`${API_URL}/devotionals?pagination[pageSize]=1`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  });

  const data = await response.json();
  console.log('First devotional:', data.data[0]);
}
```

---

## 3. Available Content Types

| Endpoint | Description |
|----------|-------------|
| `/devotionals` | Daily spiritual reflections (10-15 min reads) |
| `/prayers` | Guided prayer experiences with steps |
| `/studies` | Multi-session learning tracks (7+ days) |
| `/challenges` | Time-bound spiritual campaigns (30 days, etc) |

---

## 4. Common Use Cases

### Display a List of Devotionals
```javascript
// Get recent devotionals with basic info
const params = new URLSearchParams({
  'fields[0]': 'title',
  'fields[1]': 'subtitle',
  'populate[featuredImage][fields][0]': 'url',
  'populate[difficulty][fields][0]': 'level',
  'sort': 'publishDate:desc',
  'pagination[pageSize]': '20',
});

const response = await fetch(`${API_URL}/devotionals?${params}`, {
  headers: { 'Authorization': `Bearer ${API_TOKEN}` },
});
```

### Get Full Devotional Content
```javascript
// When user taps on a devotional
const devotionalId = 'abc123'; // from list response

const response = await fetch(
  `${API_URL}/devotionals/${devotionalId}?populate=*`,
  { headers: { 'Authorization': `Bearer ${API_TOKEN}` } }
);

const devotional = await response.json();
// devotional.data contains full content
```

---

## 5. Response Structure

All responses follow this format:

```javascript
{
  data: [ /* array of items or single object */ ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 20,
      total: 100,
      pageCount: 5
    }
  }
}
```

---

## 6. Key Data Fields

### Devotional Object
```javascript
{
  id: 1,
  documentId: "abc123",           // Use this as unique ID
  title: "Finding Peace in Prayer",
  subtitle: "Discovering stillness...",
  bodyContent: "Main content here...",
  reflection: "Reflection questions...",
  prayer: "Prayer text...",
  publishDate: "2024-01-15",
  scriptureReferences: [
    {
      book: "Philippians",
      chapter: 4,
      verseStart: 6,
      verseEnd: 7,
      displayText: "Philippians 4:6-7"
    }
  ],
  difficulty: { level: "Beginner" },
  duration: { estimatedMinutes: 10 },
  featuredImage: {
    url: "/uploads/image.jpg",
    width: 1200,
    height: 800
  }
}
```

---

## 7. GraphQL Alternative

If you prefer GraphQL over REST:

**Endpoint**: `https://YOUR-URL/graphql`

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
            attributes { url }
          }
        }
      }
    }
  }
}
```

---

## 8. Next Steps

1. **Get your credentials** from backend team
2. **Read the full guide**: [docs/FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)
3. **Use the quick reference**: [docs/API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
4. **Test in GraphQL Playground**: `https://YOUR-URL/graphql`

---

## 9. Code Examples

The full guide includes complete examples for:
- ✅ React Native
- ✅ Swift (iOS)
- ✅ Kotlin (Android)
- ✅ GraphQL
- ✅ Error handling
- ✅ Caching strategies
- ✅ Pagination patterns

---

## 10. Need Help?

**Documentation**:
- Full guide: [FRONTEND_API_GUIDE.md](./FRONTEND_API_GUIDE.md)
- Quick reference: [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)

**Backend Team**: [Your contact info here]

**Interactive Testing**: GraphQL Playground at `/graphql`

---

**That's it!** You're ready to start integrating the CurioLife API. Start with a simple GET request to `/devotionals` and build from there. 🚀
