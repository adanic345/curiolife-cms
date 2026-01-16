# 📚 CurioLife Brand Documentation Index

Welcome! Your Strapi CMS has been customized with the CurioLife brand. Here's where to find what you need:

---

## 🚀 Getting Started (START HERE!)

### **[BRAND_QUICK_START.md](./BRAND_QUICK_START.md)** ⭐
**Read this first!** Quick overview and getting started guide.
- How to start the dev server
- Quick color reference
- Key features
- Basic customization tips

---

## 📖 Complete Guides

### **[BRAND_SUMMARY.md](./BRAND_SUMMARY.md)**
Comprehensive summary of all changes made.
- What was done
- Files created
- Design system breakdown
- Maintenance tips
- Next steps

### **[BRAND_CUSTOMIZATION.md](./BRAND_CUSTOMIZATION.md)**
Detailed customization guide for your team.
- How to change colors
- How to change fonts
- Custom styling examples
- Component-specific instructions
- Troubleshooting guide

### **[BRAND_APPLICATION.md](./BRAND_APPLICATION.md)**
Technical details of applied changes.
- Color scheme explanation
- Typography details
- File modifications
- Component customizations
- Verification checklist

---

## 🎨 Brand Elements

### Colors Applied
- **Primary (Teal)**: `#23B1A0` - Buttons, links, navigation
- **Secondary (Coral)**: `#FD6B41` - Accents, secondary actions
- **Yellow**: `#F4D516` - Warnings
- **Blue**: `#3399CC` - Info
- **Purple**: `#823C9A` - Danger/Critical
- **Gray**: `#505050` - Secondary text
- **Black**: `#000000` - Primary text

### Fonts Applied
- **Headlines**: All Round Gothic (Book weight)
- **Body**: Gotham (Book weight)
- **Fallback**: Inter, system fonts

### Content Type Colors
- Challenge: Coral #FD6B41 (⚔️)
- Devotional: Teal #23B1A0 (📖)
- Prayer: Purple #823C9A (🙏)
- Study: Blue #3399CC (📚)

---

## 📁 Configuration Files

### Main Configuration
```
src/admin/app.js
```
- Main admin panel configuration
- Imports brand config and styles
- Theme colors applied here

### Design Tokens
```
src/admin/config/brand.config.js
```
- All colors, typography, spacing
- Design system tokens
- Utility functions

### Admin Panel Config
```
src/admin/config/admin-panel.config.js
```
- Admin-specific theme configuration
- Content type styling
- Custom class names

### Custom Styles
```
src/admin/styles/branding.css
```
- Font imports
- Component styling
- Animations and transitions
- CSS custom properties

### Build Configuration
```
src/admin/vite.config.js
```
- Vite build setup
- Plugin configuration
- Development server settings

---

## 🚀 Quick Commands

```bash
# Development server
npm run develop

# Production build
npm run build

# Start production
npm start

# Seed data
npm run seed
```

---

## 📊 What Was Created

### 5 Configuration/Style Files
✅ `src/admin/app.js` - Main config
✅ `src/admin/vite.config.js` - Build config
✅ `src/admin/config/brand.config.js` - Design tokens
✅ `src/admin/config/admin-panel.config.js` - Admin config
✅ `src/admin/styles/branding.css` - Custom styles

### 4 Documentation Files
✅ `BRAND_QUICK_START.md` - Quick start
✅ `BRAND_SUMMARY.md` - Complete summary
✅ `BRAND_CUSTOMIZATION.md` - Customization guide
✅ `BRAND_APPLICATION.md` - Applied changes
✅ `BRAND_INDEX.md` - This file

---

## 🎯 By Role

### Admin/Manager
→ Read: [BRAND_QUICK_START.md](./BRAND_QUICK_START.md)

### Designer/Product Manager
→ Read: [BRAND_SUMMARY.md](./BRAND_SUMMARY.md)

### Developer
→ Read: [BRAND_CUSTOMIZATION.md](./BRAND_CUSTOMIZATION.md) then [BRAND_APPLICATION.md](./BRAND_APPLICATION.md)

### DevOps/Deployment
→ Check: npm commands in [BRAND_QUICK_START.md](./BRAND_QUICK_START.md)

---

## ✅ Verification Checklist

After starting the dev server, check for:

- [ ] Teal colored buttons (#23B1A0)
- [ ] Coral colored secondary buttons (#FD6B41)
- [ ] Gotham font in body text
- [ ] All Round Gothic in headlines (if available)
- [ ] Dark sidebar with teal highlights
- [ ] Teal links and navigation
- [ ] Yellow warnings
- [ ] Purple danger states
- [ ] Smooth animations on hover
- [ ] Proper focus states on inputs

---

## 🔧 Common Tasks

### Change Primary Color
**File**: `src/admin/config/brand.config.js`
**Section**: `colors.primary.main`
```javascript
main: '#NEW_COLOR',
```

### Change Secondary Color
**File**: `src/admin/config/brand.config.js`
**Section**: `colors.secondary.main`
```javascript
main: '#NEW_COLOR',
```

### Change Font
**File**: `src/admin/styles/branding.css`
**Section**: Import and body font-family
```css
@import url('https://fonts.googleapis.com/css2?family=NewFont:wght@400;700&display=swap');

body {
  font-family: "New Font", sans-serif !important;
}
```

### Add Custom Component Styling
**File**: `src/admin/styles/branding.css`
Add your CSS rules using the provided CSS variables:
```css
.your-class {
  color: var(--color-primary-main);
  font-family: "Gotham", sans-serif;
}
```

### Override a Specific Element
**File**: `src/admin/styles/branding.css`
Use the `!important` flag if needed:
```css
.strapi-admin .specific-element {
  background-color: var(--color-secondary-main) !important;
}
```

---

## 📈 Design System Overview

### Color System
- 7 primary colors
- 5 tonal variants per primary color
- Semantic color usage (success, warning, danger, info)
- Complete neutral grayscale

### Typography System
- 2 font families
- 7 font sizes
- 4 line height options
- Professional hierarchy

### Spacing System
- 6 spacing units
- Consistent scaling (1.5x multiplier)

### Component System
- Styled buttons, inputs, forms
- Navigation and sidebar styling
- Table and card styling
- Modal and dialog styling
- Badge and tag styling
- Smooth animations

---

## 🌐 External Resources

- **Strapi Documentation**: https://docs.strapi.io/
- **Vite Documentation**: https://vitejs.dev/
- **CSS Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **Google Fonts**: https://fonts.google.com/

---

## 💡 Tips & Tricks

### Using CSS Variables
All brand colors are available as CSS variables in your custom CSS:
```css
var(--color-primary-main)
var(--color-secondary-main)
var(--color-success-main)
var(--color-warning-main)
var(--color-danger-main)
```

### Importing Brand Config in Custom Code
```javascript
import { CURIOLIFE_BRAND } from './config/brand.config.js';
const tealColor = CURIOLIFE_BRAND.colors.primary.main;
```

### Building Brand-Specific Components
Use the design tokens for consistency:
```javascript
const buttonColor = CURIOLIFE_BRAND.colors.primary.main;
const fontSize = CURIOLIFE_BRAND.typography.sizes.base;
```

---

## 🆘 Troubleshooting

### Colors not showing?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server: `npm run develop`
3. Check `src/admin/app.js` for correct imports

### Fonts not loading?
1. Check `src/admin/styles/branding.css` for correct import URL
2. Verify font names match exactly
3. Check browser console for font loading errors

### Styles conflicting?
1. Check the order of CSS imports
2. Use browser DevTools to inspect elements
3. Look for conflicting `!important` rules

---

## 📝 Maintenance Schedule

### Daily
- Run development server
- Test color and font rendering
- Check for visual regressions

### Weekly
- Review any style changes
- Test across different browsers
- Verify mobile responsiveness

### Monthly
- Update Strapi if needed
- Review design consistency
- Gather user feedback

### Quarterly
- Full design audit
- Update brand assets if needed
- Optimize performance

---

## 📞 Questions?

- **How do I customize colors?** → See [BRAND_CUSTOMIZATION.md](./BRAND_CUSTOMIZATION.md)
- **What colors were applied?** → See [BRAND_SUMMARY.md](./BRAND_SUMMARY.md)
- **How do I start the server?** → See [BRAND_QUICK_START.md](./BRAND_QUICK_START.md)
- **Where are the config files?** → See this file under "Configuration Files"
- **How do I troubleshoot?** → See [BRAND_CUSTOMIZATION.md](./BRAND_CUSTOMIZATION.md) troubleshooting section

---

## 🎉 Final Notes

Your CurioLife CMS is now fully branded with:
✅ Professional color scheme (Teal & Coral)
✅ Readable typography (Gotham & All Round Gothic)
✅ Polished components and animations
✅ Easy-to-maintain configuration
✅ Comprehensive documentation

**Everything is ready to go. Happy coding!** 🚀

---

**Last Updated**: January 15, 2026
**Version**: 1.0
**Status**: ✅ Complete & Ready

Start here: [BRAND_QUICK_START.md](./BRAND_QUICK_START.md)
