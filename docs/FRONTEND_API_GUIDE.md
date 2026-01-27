# CurioLife API - Frontend Developer Guide

Complete guide for integrating the CurioLife mobile app with the Strapi backend.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Response Format](#response-format)
5. [Common Patterns](#common-patterns)
6. [GraphQL Alternative](#graphql-alternative)
7. [Code Examples](#code-examples)
8. [Data Structures](#data-structures)

---

## Quick Start

### Base URL
```
Production: https://YOUR-PRODUCTION-URL.strapiapp.com/api
Local: http://localhost:1337/api
```

### Authentication
All API requests require an API token in the Authorization header:

```http
Authorization: Bearer YOUR_API_TOKEN_HERE
```

**Security Note**: Use a **read-only** token for the mobile app. Never use full-access tokens in client-side code.

### Basic Request Example
```bash
curl "https://YOUR-URL/api/devotionals" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Authentication

### Getting Your API Token

Your backend team will provide a read-only API token. In your app config:

```javascript
// React Native / JavaScript
const API_CONFIG = {
  baseURL: 'https://YOUR-URL/api',
  token: process.env.STRAPI_API_TOKEN, // Store in environment variables
};

// Swift (iOS)
struct APIConfig {
    static let baseURL = "https://YOUR-URL/api"
    static let token = ProcessInfo.processInfo.environment["STRAPI_API_TOKEN"] ?? ""
}

// Kotlin (Android)
object APIConfig {
    const val BASE_URL = "https://YOUR-URL/api"
    val TOKEN = BuildConfig.STRAPI_API_TOKEN
}
```

### Making Authenticated Requests

```javascript
// JavaScript/React Native
async function fetchDevotionals() {
  const response = await fetch(`${API_CONFIG.baseURL}/devotionals`, {
    headers: {
      'Authorization': `Bearer ${API_CONFIG.token}`,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
```

---

## API Endpoints

### Content Types

| Endpoint | Description | List | Single Item |
|----------|-------------|------|-------------|
| `/devotionals` | Daily spiritual reflections | GET | GET `/:id` |
| `/prayers` | Guided prayer experiences | GET | GET `/:id` |
| `/studies` | Multi-session learning tracks | GET | GET `/:id` |
| `/challenges` | Time-bound spiritual campaigns | GET | GET `/:id` |

### REST API Pattern

**List all items:**
```http
GET /api/devotionals
```

**Get single item:**
```http
GET /api/devotionals/{documentId}
```

**Filter, sort, paginate:**
```http
GET /api/devotionals?filters[difficulty][level][$eq]=Beginner&sort=publishDate:desc&pagination[pageSize]=10
```

---

## Response Format

All Strapi responses follow this structure:

```json
{
  "data": [ /* or single object for detail view */ ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 10
    }
  }
}
```

### List View Response
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Finding Peace in Prayer",
      "subtitle": "Discovering stillness in God's presence",
      "publishDate": "2024-01-15",
      "featuredImage": {
        "url": "/uploads/image.jpg",
        "width": 1200,
        "height": 800
      },
      "difficulty": {
        "level": "Beginner"
      },
      "duration": {
        "estimatedMinutes": 10
      }
    }
  ],
  "meta": { "pagination": {...} }
}
```

### Detail View Response
Single item returns object directly in `data` field with all populated relations.

---

## Common Patterns

### 1. List View (Lightweight)

**Use Case**: Display list of devotionals with basic info for browsing

**Best Practice**: Only fetch fields you need to display

```http
GET /api/devotionals?fields[0]=title&fields[1]=subtitle&fields[2]=publishDate&populate[featuredImage][fields][0]=url&populate[difficulty][fields][0]=level&populate[duration][fields][0]=estimatedMinutes
```

**JavaScript Helper**:
```javascript
async function getDevotionalsList() {
  const params = new URLSearchParams({
    'fields[0]': 'title',
    'fields[1]': 'subtitle',
    'fields[2]': 'publishDate',
    'populate[featuredImage][fields][0]': 'url',
    'populate[difficulty][fields][0]': 'level',
    'populate[duration][fields][0]': 'estimatedMinutes',
  });

  const response = await fetch(`${API_CONFIG.baseURL}/devotionals?${params}`);
  const json = await response.json();

  // Transform to app format
  return json.data.map(item => ({
    id: item.documentId,
    title: item.title,
    subtitle: item.subtitle,
    date: item.publishDate,
    imageUrl: item.featuredImage?.url,
    difficulty: item.difficulty?.level,
    duration: item.duration?.estimatedMinutes,
  }));
}
```

### 2. Detail View (Full Content)

**Use Case**: User taps on devotional, load full content

**Best Practice**: Populate all relations with `populate=*`

```http
GET /api/devotionals/{documentId}?populate=*
```

**JavaScript Helper**:
```javascript
async function getDevotionalDetail(documentId) {
  const response = await fetch(
    `${API_CONFIG.baseURL}/devotionals/${documentId}?populate=*`,
    {
      headers: {
        'Authorization': `Bearer ${API_CONFIG.token}`,
      },
    }
  );
  const json = await response.json();

  return {
    id: json.data.documentId,
    title: json.data.title,
    bodyContent: json.data.bodyContent,
    reflection: json.data.reflection,
    prayer: json.data.prayer,
    scriptureReferences: json.data.scriptureReferences,
    themes: json.data.themes,
    difficulty: json.data.difficulty?.level,
    duration: json.data.duration?.estimatedMinutes,
    featuredImage: json.data.featuredImage?.url,
  };
}
```

### 3. Filtering

**Filter by difficulty:**
```http
GET /api/devotionals?filters[difficulty][level][$eq]=Beginner
```

**Filter by date range:**
```http
GET /api/devotionals?filters[publishDate][$gte]=2024-01-01&filters[publishDate][$lte]=2024-12-31
```

**Filter by theme:**
```http
GET /api/devotionals?filters[themes][name][$eq]=Prayer
```

**JavaScript Helper**:
```javascript
async function filterDevotionals({ difficulty, theme, startDate, endDate }) {
  const params = new URLSearchParams();

  if (difficulty) {
    params.append('filters[difficulty][level][$eq]', difficulty);
  }
  if (theme) {
    params.append('filters[themes][name][$eq]', theme);
  }
  if (startDate) {
    params.append('filters[publishDate][$gte]', startDate);
  }
  if (endDate) {
    params.append('filters[publishDate][$lte]', endDate);
  }

  const response = await fetch(`${API_CONFIG.baseURL}/devotionals?${params}`);
  return await response.json();
}
```

### 4. Sorting

**Sort by date (newest first):**
```http
GET /api/devotionals?sort=publishDate:desc
```

**Sort by multiple fields:**
```http
GET /api/devotionals?sort[0]=difficulty.level:asc&sort[1]=publishDate:desc
```

### 5. Pagination

**Page 1, 10 items:**
```http
GET /api/devotionals?pagination[page]=1&pagination[pageSize]=10
```

**Infinite scroll:**
```javascript
async function loadMoreDevotionals(page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'sort': 'publishDate:desc',
  });

  const response = await fetch(`${API_CONFIG.baseURL}/devotionals?${params}`);
  const json = await response.json();

  return {
    items: json.data,
    hasMore: json.meta.pagination.page < json.meta.pagination.pageCount,
    nextPage: json.meta.pagination.page + 1,
  };
}
```

---

## GraphQL Alternative

GraphQL is available at `/graphql` endpoint. Use it if you prefer flexible queries over REST.

### GraphQL Endpoint
```
https://YOUR-URL/graphql
```

### Example Query
```graphql
query GetDevotionals($limit: Int!) {
  devotionals(pagination: { limit: $limit }, sort: "publishDate:desc") {
    data {
      id
      documentId
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

### Variables
```json
{
  "limit": 10
}
```

### JavaScript with GraphQL
```javascript
async function fetchWithGraphQL(query, variables = {}) {
  const response = await fetch(`${API_CONFIG.baseURL.replace('/api', '')}/graphql`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  return await response.json();
}
```

---

## Code Examples

### React Native Complete Example

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const API_CONFIG = {
  baseURL: 'https://YOUR-URL/api',
  token: process.env.STRAPI_API_TOKEN,
};

// List Screen
function DevotionalListScreen({ navigation }) {
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotionals();
  }, []);

  async function fetchDevotionals() {
    try {
      const params = new URLSearchParams({
        'fields[0]': 'title',
        'fields[1]': 'subtitle',
        'populate[featuredImage][fields][0]': 'url',
        'populate[difficulty][fields][0]': 'level',
        'sort': 'publishDate:desc',
      });

      const response = await fetch(`${API_CONFIG.baseURL}/devotionals?${params}`, {
        headers: { 'Authorization': `Bearer ${API_CONFIG.token}` },
      });

      const json = await response.json();
      setDevotionals(json.data);
    } catch (error) {
      console.error('Failed to fetch devotionals:', error);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DevotionalDetail', { id: item.documentId })}
      >
        <View style={{ padding: 16 }}>
          {item.featuredImage && (
            <Image
              source={{ uri: API_CONFIG.baseURL.replace('/api', '') + item.featuredImage.url }}
              style={{ width: '100%', height: 200 }}
            />
          )}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.subtitle}</Text>
          <Text>Difficulty: {item.difficulty?.level}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={devotionals}
      renderItem={renderItem}
      keyExtractor={item => item.documentId}
      refreshing={loading}
      onRefresh={fetchDevotionals}
    />
  );
}

// Detail Screen
function DevotionalDetailScreen({ route }) {
  const { id } = route.params;
  const [devotional, setDevotional] = useState(null);

  useEffect(() => {
    fetchDevotionalDetail();
  }, [id]);

  async function fetchDevotionalDetail() {
    const response = await fetch(
      `${API_CONFIG.baseURL}/devotionals/${id}?populate=*`,
      { headers: { 'Authorization': `Bearer ${API_CONFIG.token}` } }
    );

    const json = await response.json();
    setDevotional(json.data);
  }

  if (!devotional) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{devotional.title}</Text>
      <Text style={{ fontSize: 16, color: '#666' }}>{devotional.subtitle}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Scripture References:</Text>
        {devotional.scriptureReferences?.map((ref, idx) => (
          <Text key={idx}>{ref.displayText}</Text>
        ))}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>{devotional.bodyContent}</Text>
      </View>

      {devotional.reflection && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Reflection:</Text>
          <Text>{devotional.reflection}</Text>
        </View>
      )}
    </View>
  );
}
```

### Swift (iOS) Example

```swift
import Foundation

struct APIConfig {
    static let baseURL = "https://YOUR-URL/api"
    static let token = "YOUR_TOKEN"
}

struct Devotional: Codable {
    let id: Int
    let documentId: String
    let title: String
    let subtitle: String?
    let bodyContent: String
    let featuredImage: MediaFile?
    let difficulty: Difficulty?

    struct MediaFile: Codable {
        let url: String
    }

    struct Difficulty: Codable {
        let level: String
    }
}

struct APIResponse<T: Codable>: Codable {
    let data: T
    let meta: Meta?

    struct Meta: Codable {
        let pagination: Pagination?
    }

    struct Pagination: Codable {
        let page: Int
        let pageSize: Int
        let total: Int
    }
}

class APIService {
    func fetchDevotionals() async throws -> [Devotional] {
        let url = URL(string: "\(APIConfig.baseURL)/devotionals?populate=*")!
        var request = URLRequest(url: url)
        request.setValue("Bearer \(APIConfig.token)", forHTTPHeaderField: "Authorization")

        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(APIResponse<[Devotional]>.self, from: data)
        return response.data
    }

    func fetchDevotional(id: String) async throws -> Devotional {
        let url = URL(string: "\(APIConfig.baseURL)/devotionals/\(id)?populate=*")!
        var request = URLRequest(url: url)
        request.setValue("Bearer \(APIConfig.token)", forHTTPHeaderField: "Authorization")

        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(APIResponse<Devotional>.self, from: data)
        return response.data
    }
}
```

---

## Data Structures

### Devotional
```typescript
interface Devotional {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  slug: string;
  bodyContent: string;
  reflection?: string;
  prayer?: string;
  publishDate?: string;
  featuredImage?: MediaFile;
  scriptureReferences: ScriptureReference[];
  themes?: Theme[];
  difficulty: Difficulty;
  duration: Duration;
  tags?: string[];
}
```

### Prayer
```typescript
interface Prayer {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  prayerType: 'Guided' | 'Written' | 'Audio-Backed' | 'Contemplative' | 'Intercessory' | 'Gratitude' | 'Petition';
  description?: string;
  introduction?: string;
  steps?: PrayerStep[];
  writtenPrayer?: string;
  scriptureReferences?: ScriptureReference[];
  themes?: Theme[];
  difficulty: Difficulty;
  duration: Duration;
  audienceNotes?: string;
  audioFile?: MediaFile;
  featuredImage?: MediaFile;
  tags?: string[];
}

interface PrayerStep {
  title?: string;
  instruction: string;
  duration?: number; // minutes
  order: number;
}
```

### Study
```typescript
interface Study {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  overview?: string;
  sessions: StudySession[];
  themes?: Theme[];
  difficulty: Difficulty;
  totalDuration: Duration;
  objectives?: string[];
  prerequisites?: string;
  completionCriteria?: string;
  featuredImage?: MediaFile;
  author?: string;
  tags?: string[];
}

interface StudySession {
  title: string;
  description?: string;
  content: string;
  order: number;
  estimatedMinutes?: number;
  scriptureReferences?: ScriptureReference[];
}
```

### Challenge
```typescript
interface Challenge {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  startDate: string;
  endDate: string;
  challengeType: 'Seasonal' | 'Time-Bound' | 'Open-Ended' | 'Recurring';
  participationRules?: string;
  themes?: Theme[];
  difficulty?: Difficulty;
  estimatedCommitment?: Duration;
  goals?: string[];
  rewards?: string;
  featuredImage?: MediaFile;
  bannerImage?: MediaFile;
  isActive: boolean;
  tags?: string[];
}
```

### Common Components

```typescript
interface ScriptureReference {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  translation: string;
  displayText: string;
}

interface Theme {
  name: string;
  description?: string;
  category?: string;
}

interface Difficulty {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  notes?: string;
}

interface Duration {
  estimatedMinutes: number;
  unit: string;
}

interface MediaFile {
  id: number;
  name: string;
  url: string;
  width?: number;
  height?: number;
  size: number;
  mime: string;
}
```

---

## Error Handling

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (token doesn't have permission)
- `404` - Not Found (item doesn't exist)
- `500` - Server Error

### Error Response Format
```json
{
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Missing or invalid credentials",
    "details": {}
  }
}
```

### JavaScript Error Handling
```javascript
async function safeAPICall(url) {
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${API_CONFIG.token}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Show user-friendly error message
    throw error;
  }
}
```

---

## Performance Tips

### 1. Only Request What You Need
Use field selection to reduce payload size:
```javascript
// Good: Only fetch what you display
?fields[0]=title&fields[1]=subtitle

// Bad: Fetch everything when you only need title
// (no field selection)
```

### 2. Paginate Lists
Don't load all items at once:
```javascript
?pagination[pageSize]=20
```

### 3. Cache Responses
Cache API responses in your app to reduce network calls:
```javascript
const cache = new Map();

async function getCachedDevotionals() {
  if (cache.has('devotionals')) {
    return cache.get('devotionals');
  }

  const data = await fetchDevotionals();
  cache.set('devotionals', data);
  return data;
}
```

### 4. Use GraphQL for Complex Queries
If you need data from multiple endpoints, GraphQL can reduce round-trips.

---

## Testing

### Test Credentials
Your backend team will provide test credentials for development.

### API Playground
GraphQL playground available at: `https://YOUR-URL/graphql`

### Sample Request
```bash
curl "https://YOUR-URL/api/devotionals?pagination[pageSize]=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Support

**Backend Team Contact**: [Your backend team email]

**API Documentation**: Available in Strapi admin at Settings → Documentation

**GraphQL Schema**: Available in GraphQL playground

---

## Quick Reference

### Common Endpoints
```
GET  /api/devotionals              # List all
GET  /api/devotionals/:id          # Get single
GET  /api/prayers                  # List all
GET  /api/prayers/:id              # Get single
GET  /api/studies                  # List all
GET  /api/studies/:id              # Get single
GET  /api/challenges               # List all
GET  /api/challenges/:id           # Get single
```

### Common Query Parameters
```
?fields[0]=title               # Select specific fields
?populate=*                    # Populate all relations
?filters[field][$eq]=value     # Filter
?sort=field:desc               # Sort
?pagination[page]=1            # Paginate
```

### Authentication Header
```
Authorization: Bearer YOUR_API_TOKEN
```

---

**Ready to integrate?** Start with the Quick Start section and use the code examples for your platform. Contact the backend team if you need help or have questions about the API!
