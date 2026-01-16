/**
 * CurioLife Brand Configuration
 * Colors, fonts, and design tokens based on the brand guide
 */

export const CURIOLIFE_BRAND = {
  // Primary Colors
  colors: {
    // Teal - Primary accent color
    primary: {
      main: '#23B1A0',
      dark: '#1A9A8D',
      light: '#A3EBE5',
      lighter: '#D1F4F0',
    },
    
    // Coral/Orange - Secondary accent color
    secondary: {
      main: '#FD6B41',
      dark: '#E55A2B',
      light: '#FFCFC1',
      lighter: '#FFE8E0',
    },
    
    // Additional palette colors
    yellow: '#F4D516',
    blue: '#3399CC',
    purple: '#823C9A',
    gray: '#505050',
    black: '#000000',
    
    // Neutral palette
    neutral: {
      0: '#FFFFFF',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#D0D0D0',
      500: '#999999',
      600: '#757575',
      700: '#505050',
      800: '#373737',
      900: '#1A1A1A',
      1000: '#000000',
    },
    
    // Semantic colors
    success: '#23B1A0', // Teal
    warning: '#F4D516', // Yellow
    danger: '#823C9A', // Purple
    info: '#3399CC', // Blue
  },
  
  // Typography
  typography: {
    // Headlines - All Round Gothic Book
    heading: {
      fontFamily: '"All Round Gothic", "Gotham", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    
    // Body - Gotham Book
    body: {
      fontFamily: '"Gotham", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      fontWeight: 400,
    },
    
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.375rem',
      xl: '1.625rem',
      xxl: '2.125rem',
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeights: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '2px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    xs: '0px 1px 1px rgba(35, 177, 160, 0.06)',
    sm: '0px 1px 4px rgba(35, 177, 160, 0.08)',
    md: '0px 2px 8px rgba(35, 177, 160, 0.08)',
    lg: '0px 8px 24px rgba(35, 177, 160, 0.15)',
    xl: '0px 12px 32px rgba(35, 177, 160, 0.2)',
  },
  
  // Z-index
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },
  
  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  
  // Logo
  logo: {
    name: 'CurioLife',
    description: 'Colorful dots pattern representing curiosity and life journey',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #23B1A0 0%, #1A9A8D 100%)',
    secondary: 'linear-gradient(135deg, #FD6B41 0%, #E55A2B 100%)',
    accent: 'linear-gradient(135deg, #F4D516 0%, #23B1A0 100%)',
    dark: 'linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)',
  },
};

/**
 * Get color by path
 * Usage: getColor('colors.primary.main')
 */
export const getColor = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], CURIOLIFE_BRAND);
};

/**
 * Create CSS custom properties from brand config
 */
export const generateCSSVariables = () => {
  const vars = {};
  
  Object.entries(CURIOLIFE_BRAND.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      vars[`--color-${key}`] = value;
    } else {
      Object.entries(value).forEach(([subKey, subValue]) => {
        vars[`--color-${key}-${subKey}`] = subValue;
      });
    }
  });
  
  Object.entries(CURIOLIFE_BRAND.typography.sizes).forEach(([key, value]) => {
    vars[`--font-size-${key}`] = value;
  });
  
  Object.entries(CURIOLIFE_BRAND.spacing).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = value;
  });
  
  Object.entries(CURIOLIFE_BRAND.shadows).forEach(([key, value]) => {
    vars[`--shadow-${key}`] = value;
  });
  
  return vars;
};

export default CURIOLIFE_BRAND;
