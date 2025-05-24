import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavMenu() {
  const { user, logout } = useAuth();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load the photo URL from localStorage when the component mounts
    const savedPhotoUrl = localStorage.getItem('userPhotoUrl');
    if (savedPhotoUrl) {
      setPhotoUrl(savedPhotoUrl);
    }

    // Listen for storage changes (in case the photo is updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userPhotoUrl') {
        setPhotoUrl(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search for:', searchQuery);
  };

  const linkStyle = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  };

  return (
    <nav style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#2c3e50',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding: '0 16px',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          minWidth: 0,
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            whiteSpace: 'nowrap',
          }}>
            MeatballMap
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            <Link 
              href="/library" 
              style={linkStyle}
              onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              My Library
            </Link>
            <Link 
              href="/account" 
              style={linkStyle}
              onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              My Account
            </Link>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <input
              type="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                width: '200px',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginLeft: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Search
            </button>
          </form>

          <Link href="/account" style={{ textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: photoUrl ? 'transparent' : '#ffffff33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span style={{ color: 'white', fontSize: '16px' }}>
                  {user?.email?.[0].toUpperCase()}
                </span>
              )}
            </div>
          </Link>
          <span style={{
            color: 'white',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '160px',
          }}>
            {user?.email}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
} 