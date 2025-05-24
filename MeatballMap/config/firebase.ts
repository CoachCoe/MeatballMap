import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Enable DEV_MODE for testing
export const DEV_MODE = true;

// Initialize Firebase with empty config for dev mode
const app = initializeApp({
  apiKey: "dev-mode",
  authDomain: "dev-mode",
  projectId: "dev-mode",
  storageBucket: "dev-mode",
  messagingSenderId: "dev-mode",
  appId: "dev-mode"
});

export const auth = getAuth(app); 