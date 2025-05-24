import { Book } from '@/data/mockBooks';
import { useEffect } from 'react';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!book) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
      }} onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          ×
        </button>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          <img
            src={book.coverUrl}
            alt={book.title}
            style={{
              width: '200px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{book.title}</h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>by {book.author}</p>
            <p style={{ marginBottom: '8px' }}><strong>Genre:</strong> {book.genre}</p>
            <p style={{ marginBottom: '8px' }}><strong>Published:</strong> {book.publishedYear}</p>
            <p style={{ marginBottom: '16px' }}><strong>Rating:</strong> {book.rating}/5</p>
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#2c3e50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                marginTop: '8px',
              }}
            >
              Buy Now
            </a>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
          <h3 style={{ marginBottom: '8px' }}>Description</h3>
          <p style={{ lineHeight: '1.6' }}>{book.description}</p>
        </div>
      </div>
    </div>
  );
} 