import logo from './extensions/logo.svg';
import favicon from './extensions/favicon.ico';
import { adminPanelConfig } from './config/admin-panel.config';
import './styles/branding.css';

export default {
  config: {
    auth: {
      logo: logo,
    },
    head: {
      favicon: favicon,
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
