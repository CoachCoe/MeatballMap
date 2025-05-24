# MeatballMap

MeatballMap is a web application that combines interactive mapping with a digital library management system. Users can explore maps while managing their personal book collection.

## Features

- **Interactive Map**: Full-screen map interface for exploration
- **Digital Library**: Personal book collection management
- **User Authentication**: Secure login and account management
- **Profile Management**: Customizable user profiles with photo upload
- **Book Search**: Search functionality for finding books
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14
- **Authentication**: Firebase Authentication
- **Styling**: Inline styles for maximum control and performance
- **Map Integration**: Custom map implementation via iframe
- **State Management**: React hooks and context
- **Image Storage**: Local storage for profile photos (development)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meatball-map.git
cd meatball-map
```

2. Install dependencies:
```bash
cd meatball-web
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the meatball-web directory with the following variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## Project Structure

```
meatball-web/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── context/         # React context providers
│   ├── data/           # Mock data and types
│   └── public/         # Static files
├── package.json
└── next.config.js
```

## Features in Development

- Book search implementation
- Library sorting and filtering
- Map markers and custom overlays
- Social features and book sharing
- Reading progress tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
