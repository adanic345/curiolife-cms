# Rich Text Editor Guide - Strapi 5 Blocks

## Best Solution: Use Strapi 5's Built-in "Blocks" Editor

Good news! Strapi 5 has a modern, built-in rich text editor called **"Blocks"** that you've already discovered. This is actually the recommended approach instead of using third-party plugins like CKEditor.

## What is the Blocks Editor?

The Blocks editor is Strapi 5's new block-based content editor, similar to Notion or WordPress Gutenberg:

✅ **Block-based interface** - Add paragraphs, headings, lists, quotes as individual blocks
✅ **Rich formatting** - Bold, italic, underline, strikethrough, code, links
✅ **Media support** - Inline images
✅ **Better structure** - Organized content blocks instead of raw HTML
✅ **Modern UX** - Drag-and-drop, keyboard shortcuts
✅ **API-friendly** - Returns structured JSON instead of HTML
✅ **No plugins needed** - Built into Strapi 5 core
✅ **Fully supported** - Official Strapi feature, well-maintained

## How to Convert Your Fields to Blocks

You need to manually change each rich text field to use Blocks through the Content-Type Builder UI:

### Step 1: Access Content-Type Builder

1. Go to **Settings → Content-Type Builder**
2. Click on the content type you want to edit

### Step 2: Convert Rich Text Fields

For each rich text field:

1. Click **Edit** (pencil icon) next to the field
2. Under "Type", select **"Blocks"** instead of "Rich text (Markdown)"
3. Click **Finish**
4. Click **Save** (top right)

### Fields to Convert:

#### Devotional
- `bodyContent` → **Blocks**
- `reflection` → **Blocks**
- Delete `bodyTest` if it was just for testing

#### Prayer
- `introduction` → **Blocks**
- `writtenPrayer` → **Blocks**

#### Study
- `overview` → **Blocks**

#### Challenge
- `detailedDescription` → **Blocks**
- `participationRules` → **Blocks**

#### Study Session Component
1. Go to **Components → content**
2. Click **Study Session**
3. Edit `content` field → **Blocks**
4. Save

---

## Blocks vs Rich Text (Markdown)

### Rich Text (Markdown) - Old Default
- Plain markdown editor
- Returns markdown string
- Limited formatting options
- Legacy editor

### Blocks - New Default (Strapi 5+)
- Modern block-based editor
- Returns structured JSON
- Rich formatting and media support
- Recommended for all new projects

---

## What the Blocks Editor Provides

### Available Block Types:
- **Paragraph** - Standard text
- **Headings** - H1 through H6
- **Lists** - Bulleted and numbered
- **Quotes** - Block quotes
- **Code** - Code blocks with syntax highlighting
- **Images** - Inline images from media library

### Text Formatting:
- **Bold**, *Italic*, `Code`, ~~Strikethrough~~
- Links
- Inline code

### Editing Features:
- Drag and drop to reorder blocks
- `/` command to insert blocks quickly
- Keyboard shortcuts
- Clean, intuitive UI

---

## API Response Format

When using Blocks, the API returns structured JSON instead of HTML/Markdown:

```json
{
  "data": {
    "attributes": {
      "bodyContent": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "text": "This is a "
            },
            {
              "type": "text",
              "text": "paragraph",
              "bold": true
            },
            {
              "type": "text",
              "text": " with formatting."
            }
          ]
        },
        {
          "type": "heading",
          "level": 2,
          "children": [
            {
              "type": "text",
              "text": "A Heading"
            }
          ]
        }
      ]
    }
  }
}
```

### Rendering Blocks in Your Frontend

You'll need to parse the JSON structure and render it as HTML/components in your mobile app.

**React/React Native Example**:
```javascript
const renderBlock = (block) => {
  switch (block.type) {
    case 'paragraph':
      return <Text>{renderChildren(block.children)}</Text>;
    case 'heading':
      return <Heading level={block.level}>{renderChildren(block.children)}</Heading>;
    case 'list':
      return <List items={block.children} />;
    // ... etc
  }
};

const renderChildren = (children) => {
  return children.map(child => {
    if (child.bold) return <Bold>{child.text}</Bold>;
    if (child.italic) return <Italic>{child.text}</Italic>;
    return child.text;
  });
};
```

**Or use a library**: `@strapi/blocks-react-renderer` (for React web apps)

---

## Migration Strategy

### For Existing Content:

If you've already created devotionals/prayers with the old "Rich text (Markdown)" field:

1. **Option A**: Keep existing content in markdown, convert field type, and manually update old entries
2. **Option B**: Write a migration script to convert markdown to Blocks JSON format
3. **Option C**: Leave old entries as-is and only use Blocks for new content

### Recommended Approach:

Since you're just starting, **convert all fields to Blocks now** before creating much content. This way:
- Everything is consistent
- You get the best editing experience
- Your API responses are structured and easy to parse

---

## Why Not CKEditor?

We tried CKEditor but encountered issues:
- ❌ Plugin compatibility problems with Strapi 5
- ❌ Not registering as a field type option
- ❌ Frontend rendering errors
- ❌ Third-party maintenance dependency

The Blocks editor is better because:
- ✅ Built into Strapi 5 core
- ✅ Officially supported by Strapi
- ✅ Works perfectly out of the box
- ✅ Modern block-based UX
- ✅ JSON output is easier to work with than HTML

---

## Next Steps

1. **Convert fields to Blocks** via Content-Type Builder UI (see steps above)
2. **Test the editor** by creating a new devotional
3. **Build a renderer** in your mobile app to display Blocks JSON as formatted text
4. **Update existing content** if you have any from the old markdown editor
5. **Commit and push** to deploy to production

---

## Resources

- [Strapi Blocks Editor Documentation](https://docs.strapi.io/dev-docs/api/document-service#blocks)
- [Blocks React Renderer](https://github.com/strapi/blocks-react-renderer) (for web apps)
- [Custom Blocks Renderer](https://docs.strapi.io/dev-docs/plugins/developing-plugins#custom-fields) (build your own)

---

**Bottom Line**: Use Strapi 5's built-in **Blocks** editor. It's modern, powerful, officially supported, and works perfectly. No plugins needed!
