'use client';

import { useState, useRef } from 'react';
import { mockUserProfile } from '@/data/mockUser';
import { mockBooks } from '@/data/mockBooks';

export default function AccountPage() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(mockUserProfile.photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        // In a real app, you'd upload this to a server and update the user's profile
        localStorage.setItem('userPhotoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const favoriteBooks = mockBooks.filter(book => 
    mockUserProfile.favoriteBooks.includes(book.id)
  );

  return (
    <div style={{
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: '32px',
        marginBottom: '32px',
        color: '#2c3e50',
      }}>
        My Account
      </h1>

      <div style={{
        display: 'flex',
        gap: '32px',
        marginBottom: '32px',
      }}>
        <div style={{
          textAlign: 'center',
        }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
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
              <span style={{ color: '#666', fontSize: '14px' }}>No photo uploaded</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Upload Photo
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Profile Information</h2>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold' }}>Name:</label>
              <p>{mockUserProfile.name}</p>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold' }}>Email:</label>
              <p>{mockUserProfile.email}</p>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold' }}>Location:</label>
              <p>{mockUserProfile.location}</p>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Favorite Books</h2>
            {favoriteBooks.length > 0 ? (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {favoriteBooks.map(book => (
                  <div
                    key={book.id}
                    style={{
                      width: '120px',
                    }}
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: '8px',
                      }}
                    />
                    <p style={{
                      fontSize: '14px',
                      color: '#2c3e50',
                      marginBottom: '4px',
                    }}>
                      {book.title}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                    }}>
                      {book.author}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No favorite books added yet. Visit the library to add some!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 