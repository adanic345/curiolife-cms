# 🎨 CurioLife Brand Quick Start

Your Strapi CMS has been customized with the CurioLife brand colors, fonts, and design system.

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run develop
```

### 2. Open Admin Panel
```
http://localhost:1337/admin
```

### 3. Login & View Brand Colors
The admin panel now features:
- **Teal (#23B1A0)** - Primary buttons, links, and navigation
- **Coral (#FD6B41)** - Secondary actions and accents
- **Gotham** - Body text font
- **All Round Gothic** - Headlines font

---

## 📁 Brand Files Location

```
src/admin/
├── app.js                           ← Main configuration
├── vite.config.js                   ← Build configuration
├── config/
│   ├── brand.config.js              ← Design tokens
│   └── admin-panel.config.js        ← Admin-specific config
└── styles/
    └── branding.css                 ← Custom styling
```

---

## 🎨 Color Reference

### Primary Palette
```
Teal:       #23B1A0  ← Primary (buttons, links, navigation)
Coral:      #FD6B41  ← Secondary (accents, highlights)
Yellow:     #F4D516  ← Warnings
Blue:       #3399CC  ← Info
Purple:     #823C9A  ← Danger
Gray:       #505050  ← Secondary text
Black:      #000000  ← Primary text
```

### Content Type Colors
```
Challenge:    Coral #FD6B41    ⚔️
Devotional:   Teal #23B1A0     📖
Prayer:       Purple #823C9A   🙏
Study:        Blue #3399CC     📚
```

---

## 🔤 Typography

- **Headlines**: All Round Gothic Book (400)
- **Body**: Gotham Book (400)
- **Sizes**: 0.75rem to 2.125rem

---

## ✨ Features Applied

✅ Teal and Coral color scheme
✅ Gotham and All Round Gothic fonts
✅ Styled buttons, inputs, and forms
✅ Custom sidebar and header
✅ Table and card styling
✅ Smooth animations and transitions
✅ Focus and hover states
✅ Success/warning/danger indicators
✅ Badge and badge styling
✅ Custom scrollbars

---

## 📝 Customizing the Brand

### Change a Color
Edit `/src/admin/config/brand.config.js`:
```javascript
colors: {
  primary: {
    main: '#YOUR_COLOR',
  }
}
```

### Change a Font
Edit `/src/admin/styles/branding.css`:
```css
body {
  font-family: "Your Font", sans-serif !important;
}
```

### Add Custom Styling
Edit `/src/admin/styles/branding.css`:
```css
.strapi-admin button {
  /* Your styles */
}
```

---

## 📚 Documentation

- **Full Guide**: See `BRAND_CUSTOMIZATION.md`
- **Applied Changes**: See `BRAND_APPLICATION.md`
- **Strapi Docs**: https://docs.strapi.io/

---

## 🎯 Next Steps

1. Run `npm run develop`
2. Log into admin panel
3. Verify colors and fonts look good
4. Make any customizations needed
5. Deploy to production with `npm run build && npm start`

---

## ⚡ Quick Commands

```bash
# Development
npm run develop

# Production build
npm run build

# Start production server
npm start

# Seed data
npm run seed

# Seed via API
npm run seed:api
```

---

**Status**: ✅ Complete and Ready to Use!

Enjoy your brand-customized CurioLife CMS! 🎉
