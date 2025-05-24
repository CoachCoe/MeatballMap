'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import NavMenu from '@/components/NavMenu';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>Loading map...</div>
    </div>
  )
});

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      maxHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <header style={{ 
        height: '64px', 
        flexShrink: 0,
        backgroundColor: '#2c3e50',
        zIndex: 10
      }}>
        <NavMenu />
      </header>
      <main style={{ 
        position: 'relative',
        flex: '1 1 auto',
        minHeight: 0,
        height: 'calc(100vh - 104px)', // 64px header + 40px footer
        overflow: 'hidden'
      }}>
        <MapComponent />
      </main>
      <footer style={{ 
        height: '40px', 
        flexShrink: 0,
        backgroundColor: '#2c3e50',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 10
      }}>
        <p>&copy; 2024 MeatballMap</p>
      </footer>
    </div>
  );
}
