import logo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';
import { adminPanelConfig } from './config/admin-panel.config';
import './styles/branding.css';

export default {
  config: {
    // Locales configuration - customize text strings
    locales: ['en'],
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to CurioLife',
        'Auth.form.welcome.subtitle': 'Log in to your account',
        'Auth.form.register.title': 'Create your CurioLife account',
        'Auth.form.register.subtitle': 'Get started with CurioLife',
        'app.components.HomePage.welcome': 'Welcome to CurioLife',
        'app.components.HomePage.welcomeBlock.content': 'Manage your spiritual content and grow your community.',
        'Settings.application.title': 'CurioLife Settings',
        'global.application.title': 'CurioLife CMS',
      },
    },
    auth: {
      logo: logo,
    },
    head: {
      favicon: favicon,
      title: 'CurioLife Admin',
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
    theme: adminPanelConfig.theme,
  },
  bootstrap(app) {
    console.log('CurioLife Admin Panel loaded with brand colors');
  },
};
