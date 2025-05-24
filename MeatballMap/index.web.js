import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

// Import Leaflet CSS
if (Platform.OS === 'web') {
  require('leaflet/dist/leaflet.css');
  require('./web/leaflet-fixes.css');

  // Set up DOM for web
  const setupDOM = () => {
    const rootTag = document.getElementById('root');
    if (rootTag) {
      rootTag.style.height = '100vh';
      rootTag.style.width = '100vw';
      rootTag.style.margin = '0';
      rootTag.style.padding = '0';
      rootTag.style.overflow = 'hidden';
    }

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.overflow = 'hidden';

    document.documentElement.style.height = '100vh';
    document.documentElement.style.width = '100vw';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.overflow = 'hidden';
  };

  // Run setup after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDOM);
  } else {
    setupDOM();
  }
}

registerRootComponent(App); 