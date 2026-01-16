# CurioLife Brand Customization Guide

This guide explains the brand customization that has been applied to your Strapi CMS admin panel.

## Color Scheme

All colors are based on the CurioLife brand guide:

### Primary Colors
- **Teal (Primary)**: `#23B1A0` - Used for primary buttons, links, and accents
- **Coral (Secondary)**: `#FD6B41` - Used for secondary actions and highlights
- **Yellow**: `#F4D516` - Used for warnings and alerts
- **Blue**: `#3399CC` - Used for info messages
- **Purple**: `#823C9A` - Used for danger and critical states
- **Gray**: `#505050` - Used for secondary text
- **Black**: `#000000` - Used for primary text and headers

### Color Usage
```
Primary (Teal #23B1A0):
- Primary buttons
- Links and navigation active states
- Success indicators
- Table highlights
- Focus states

Secondary (Coral #FD6B41):
- Secondary buttons
- Call-to-action elements
- Accent borders

Danger (Purple #823C9A):
- Delete/destructive actions
- Error states
- Critical alerts
```

## Typography

### Headlines
- **Font**: All Round Gothic Book
- **Weight**: 400
- **Letter Spacing**: 0.5px
- **Used for**: H1-H6, titles, and headings

### Body
- **Font**: Gotham Book
- **Weight**: 400
- **Used for**: All body text, labels, and descriptions

### Font Sizes
```
- xs: 0.75rem
- sm: 0.875rem
- base: 1rem (default)
- md: 1.125rem
- lg: 1.375rem
- xl: 1.625rem
- xxl: 2.125rem
```

## Files Modified

### 1. `/src/admin/app.js`
Main admin panel configuration file that applies the theme colors and typography to Strapi's admin interface.

**Key configuration:**
- Color palette (primary, secondary, danger, success, warning, neutral)
- Shadow definitions
- Font families and sizes
- Border radius

### 2. `/src/admin/styles/branding.css`
Custom CSS file that applies brand styling throughout the admin panel.

**Includes:**
- Font imports
- CSS custom properties (variables)
- Button and link styling
- Input focus states
- Table styling
- Sidebar customization
- Header styling
- Badge and component styling
- Smooth transitions and animations

### 3. `/src/admin/config/brand.config.js`
Centralized brand configuration that defines all design tokens.

**Exports:**
- `CURIOLIFE_BRAND` - Main brand object with all colors, typography, spacing, etc.
- `getColor()` - Function to retrieve colors by path
- `generateCSSVariables()` - Function to generate CSS custom properties

### 4. `/src/admin/config/admin-panel.config.js`
Specialized configuration for the admin panel layout and theme.

**Includes:**
- Admin panel color configuration
- Content type styling (Challenge, Devotional, Prayer, Study)
- Custom class names for styling
- Company branding information

### 5. `/src/admin/vite.config.js`
Vite configuration for the admin panel build.

## How to Customize Further

### Adding New Colors
Edit `/src/admin/config/brand.config.js`:

```javascript
export const CURIOLIFE_BRAND = {
  colors: {
    // Add new colors here
    newColor: {
      main: '#FFFFFF',
      dark: '#EEEEEE',
      light: '#F5F5F5',
    }
  }
};
```

### Changing Fonts
Edit `/src/admin/styles/branding.css`:

```css
/* Import new font */
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;700&display=swap');

/* Update font family */
body {
  font-family: "YourFont", sans-serif !important;
}
```

### Modifying Button Styles
Edit `/src/admin/styles/branding.css`:

```css
.strapi-admin button[type="submit"],
.strapi-admin [class*="Button"][class*="primary"] {
  background-color: var(--primary-color) !important;
  /* Add more customizations */
}
```

### Adjusting Spacing and Sizes
Edit `/src/admin/config/brand.config.js`:

```javascript
spacing: {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
}
```

## Brand Color References

### By Use Case

**User Interface**
- Primary: `#23B1A0` (Buttons, links, navigation)
- Secondary: `#FD6B41` (Secondary actions)
- Neutral: `#505050` - `#000000` (Text and backgrounds)

**States & Feedback**
- Success: `#23B1A0` (Teal)
- Warning: `#F4D516` (Yellow)
- Danger: `#823C9A` (Purple)
- Info: `#3399CC` (Blue)

**Content Types**
- Challenge: `#FD6B41` (Coral) - ⚔️
- Devotional: `#23B1A0` (Teal) - 📖
- Prayer: `#823C9A` (Purple) - 🙏
- Study: `#3399CC` (Blue) - 📚

## Running the Strapi Application

```bash
# Install dependencies
npm install

# Run in development mode
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

## Notes

- All color changes are applied through the theme configuration in `/src/admin/app.js`
- CSS overrides are applied via `/src/admin/styles/branding.css` for components that don't respond to theme configuration
- The brand configuration is centralized in `/src/admin/config/brand.config.js` for easy updates
- Font changes require the font files to be available (either imported from Google Fonts or installed locally)

## Troubleshooting

**Colors not applying:**
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Rebuild the project: `npm run build`
3. Restart the development server

**Fonts not loading:**
1. Check font imports in `/src/admin/styles/branding.css`
2. Verify font names match exactly in the CSS
3. Check browser console for font loading errors

**Styling conflicts:**
- Use `!important` in CSS rules only when necessary
- Check for conflicting CSS classes
- Inspect elements using browser dev tools

## Support

For questions about the brand implementation or customization, refer to:
- Strapi documentation: https://docs.strapi.io/
- Brand guide: See attached brand guide PDF
