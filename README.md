# MeatballMap

MeatballMap is a cross-platform application that helps users discover and track their reading journey. The app features an interactive map interface, a digital library, and user profiles.

## Project Structure

The project is organized as a monorepo with three main directories:

```
meatball/
├── web/               # Next.js web application
├── mobile/            # React Native mobile app
│   └── MeatballMobile/
└── shared/            # Shared types and data
    ├── types/         # TypeScript interfaces
    └── data/          # Mock data for development
```

## Features

- 📱 Cross-platform support (Web and Mobile)
- 🗺️ Interactive map interface
- 📚 Digital library with book details
- 👤 User authentication and profiles
- 💾 Shared business logic between platforms
- 🎨 Modern and responsive UI

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- For mobile development:
  - iOS: Xcode (Mac only)
  - Android: Android Studio
  - Expo CLI (`npm install -g expo-cli`)
  - Expo Go app on your mobile device for testing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/CoachCoe/MeatballMap.git
cd MeatballMap
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install mobile dependencies
cd mobile/MeatballMobile
npm install

# Install web dependencies
cd ../../web
npm install
```

3. Set up Firebase:
- Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
- Enable Authentication with Email/Password sign-in method
- Create a web app and a mobile app in your Firebase project
- Add the following configuration:

For web (`web/.env.local`):
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

For mobile (`mobile/MeatballMobile/src/context/AuthContext.tsx`):
```typescript
const firebaseConfig = {
  apiKey: 'your_api_key',
  authDomain: 'your_auth_domain',
  projectId: 'your_project_id',
  storageBucket: 'your_storage_bucket',
  messagingSenderId: 'your_messaging_sender_id',
  appId: 'your_app_id'
};
```

4. Start the development servers:

For web:
```bash
# From the root directory
npm run web
```

For mobile:
```bash
# From the root directory
npm run mobile

# Or from the mobile directory
cd mobile/MeatballMobile
npm start
```

## Development

### Web Application (Next.js)
- The web app runs on `http://localhost:3001`
- Built with Next.js, TypeScript, and Tailwind CSS
- Uses Firebase for authentication and data storage

### Mobile Application (React Native)
- Built with React Native and Expo
- Uses the same Firebase backend as the web app
- Shared business logic with the web version
- Test on your device using Expo Go app
- Supports both iOS and Android

### Shared Code
The `shared` directory contains code used by both web and mobile apps:
- TypeScript interfaces for books and user profiles
- Mock data for development
- Common business logic
- Authentication context

### Module Resolution
The project uses module aliases for clean imports:
- Web: Uses TypeScript path aliases
- Mobile: Uses Babel module resolver
- Both platforms can import from `@meatball/shared`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Expo](https://expo.dev/) 