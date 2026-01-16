/**
 * CurioLife Brand Admin Panel Configuration
 * Applies brand colors, fonts, and themes to the Strapi admin interface
 */

import { CURIOLIFE_BRAND } from '../config/brand.config';

export const adminPanelConfig = {
  // Admin panel theme configuration
  theme: {
    colors: {
      // Primary Colors - Teal
      primary100: CURIOLIFE_BRAND.colors.primary.lighter,
      primary200: CURIOLIFE_BRAND.colors.primary.light,
      primary500: CURIOLIFE_BRAND.colors.primary.main,
      primary600: CURIOLIFE_BRAND.colors.primary.dark,
      primary700: '#0F7B6F',
      
      // Secondary Colors - Coral
      secondary100: CURIOLIFE_BRAND.colors.secondary.lighter,
      secondary200: CURIOLIFE_BRAND.colors.secondary.light,
      secondary500: CURIOLIFE_BRAND.colors.secondary.main,
      secondary600: CURIOLIFE_BRAND.colors.secondary.dark,
      secondary700: '#CC4A1A',
      
      // Danger - Purple
      danger100: '#EDD4F7',
      danger200: '#DCA8EE',
      danger500: CURIOLIFE_BRAND.colors.purple,
      danger600: '#702F89',
      danger700: '#5E2278',
      
      // Success - Teal
      success100: CURIOLIFE_BRAND.colors.primary.lighter,
      success200: CURIOLIFE_BRAND.colors.primary.light,
      success500: CURIOLIFE_BRAND.colors.primary.main,
      success600: CURIOLIFE_BRAND.colors.primary.dark,
      success700: '#0F7B6F',
      
      // Warning - Yellow
      warning100: '#FFFAED',
      warning200: '#FFF5DB',
      warning500: CURIOLIFE_BRAND.colors.yellow,
      warning600: '#DCC010',
      warning700: '#C4AB0B',
      
      // Neutral
      neutral0: CURIOLIFE_BRAND.colors.neutral[0],
      neutral100: CURIOLIFE_BRAND.colors.neutral[100],
      neutral150: CURIOLIFE_BRAND.colors.neutral[200],
      neutral200: CURIOLIFE_BRAND.colors.neutral[300],
      neutral300: CURIOLIFE_BRAND.colors.neutral[400],
      neutral400: CURIOLIFE_BRAND.colors.neutral[500],
      neutral500: CURIOLIFE_BRAND.colors.neutral[600],
      neutral600: CURIOLIFE_BRAND.colors.neutral[700],
      neutral700: CURIOLIFE_BRAND.colors.neutral[800],
      neutral800: CURIOLIFE_BRAND.colors.neutral[900],
      neutral900: CURIOLIFE_BRAND.colors.neutral[1000],
      neutral1000: CURIOLIFE_BRAND.colors.black,
    },
    
    shadows: {
      filterShadow: CURIOLIFE_BRAND.shadows.sm,
      popupShadow: CURIOLIFE_BRAND.shadows.lg,
      tableShadow: CURIOLIFE_BRAND.shadows.md,
      insetShadow: 'inset 0px 1px 4px rgba(35, 177, 160, 0.08)',
      lightShadow: CURIOLIFE_BRAND.shadows.xs,
    },
    
    sizes: {
      borderRadius: CURIOLIFE_BRAND.borderRadius.md,
    },
    
    fonts: {
      families: {
        base: CURIOLIFE_BRAND.typography.body.fontFamily,
      },
      sizes: CURIOLIFE_BRAND.typography.sizes,
      lineHeights: CURIOLIFE_BRAND.typography.lineHeights,
    },
  },
  
  // Admin panel configuration
  auth: {
    // Custom login page styling
    logo: null, // Set to your logo path
  },
  
  // Notification settings
  notifications: {
    releases: false,
    issueStrapiNotification: false,
  },
  
  // Disable tutorials
  tutorials: false,
  
  // Custom menu items (optional)
  menu: {
    // Add custom menu items here if needed
  },
};

/**
 * Extended configuration with custom styling
 */
export const brandConfig = {
  // Company branding
  company: {
    name: 'CurioLife',
    description: 'Curiosity & Life - Spiritual Growth Platform',
    logo: 'curiolife-logo.svg',
    favicon: 'favicon.ico',
  },
  
  // Admin panel customization
  adminPanel: {
    // Custom CSS class names for styling
    headerClass: 'curiolife-admin-header',
    sidebarClass: 'curiolife-admin-sidebar',
    contentClass: 'curiolife-admin-content',
  },
  
  // Content type styling
  contentTypes: {
    challenge: {
      color: CURIOLIFE_BRAND.colors.secondary.main,
      icon: '⚔️',
    },
    devotional: {
      color: CURIOLIFE_BRAND.colors.primary.main,
      icon: '📖',
    },
    prayer: {
      color: CURIOLIFE_BRAND.colors.purple,
      icon: '🙏',
    },
    study: {
      color: CURIOLIFE_BRAND.colors.blue,
      icon: '📚',
    },
  },
};

export default adminPanelConfig;
