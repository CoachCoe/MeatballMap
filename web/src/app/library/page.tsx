'use client';

import { useState } from 'react';
import { mockBooks, Book } from '@/data/mockBooks';
import BookModal from '@/components/BookModal';

export default function LibraryPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div style={{
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: '32px',
        marginBottom: '24px',
        color: '#2c3e50',
      }}>
        My Library
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px',
      }}>
        {mockBooks.map(book => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
              transform: 'scale(1)',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            />
            <h3 style={{
              fontSize: '18px',
              marginBottom: '4px',
              color: '#2c3e50',
            }}>
              {book.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
            }}>
              {book.author}
            </p>
          </div>
        ))}
      </div>

      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
} 