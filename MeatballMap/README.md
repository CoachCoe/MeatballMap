# MeatballMap

A cross-platform mapping application built with React Native (Expo) that works on web, iOS, and Android. The app uses Leaflet for web maps and react-native-maps for mobile platforms.

## Features

- Cross-platform support (Web, iOS, Android)
- Authentication system with multiple options:
  - Email/Password login
  - Google authentication
  - GitHub authentication
  - Password reset functionality
- Development mode for easy testing
- Responsive design
- Map integration with Leaflet (web) and react-native-maps (mobile)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase project (for production mode)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd MeatballMap
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `.env.local` file in the project root
   - Add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

   - For development mode without Firebase, set:
```env
NEXT_PUBLIC_DEV_MODE=true
```

## Running the App

### Development Mode
Development mode allows you to test the app without setting up Firebase:

```bash
# Start the web version
npm run web

# Start iOS simulator
npm run ios

# Start Android simulator
npm run android
```

In development mode:
- Authentication is mocked
- Any email/password combination works
- No Firebase configuration required

### Production Mode
For production mode, ensure you have:
1. Firebase project set up
2. Proper environment variables configured
3. Development mode disabled

Then run the app using the same commands as development mode.

## Project Structure

- `/components` - React Native components
- `/contexts` - React Context providers (Auth, etc.)
- `/config` - Configuration files
- `/web` - Web-specific files
- `/assets` - Images and other static assets

## Key Technologies

- React Native (Expo)
- Firebase Authentication
- Leaflet (web maps)
- react-native-maps (mobile maps)
- TypeScript
- Expo WebPack Config

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 