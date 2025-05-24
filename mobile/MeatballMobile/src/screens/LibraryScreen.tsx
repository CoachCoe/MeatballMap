import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import { mockBooks } from '@meatball/shared';

interface BookModalProps {
  visible: boolean;
  book: typeof mockBooks[0] | null;
  onClose: () => void;
}

function BookDetailsModal({ visible, book, onClose }: BookModalProps) {
  if (!book) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Image
              source={{ uri: book.coverUrl }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <Text style={styles.modalTitle}>{book.title}</Text>
            <Text style={styles.modalAuthor}>by {book.author}</Text>
            <Text style={styles.modalDetail}>Genre: {book.genre}</Text>
            <Text style={styles.modalDetail}>Published: {book.publishedYear}</Text>
            <Text style={styles.modalDetail}>Rating: {book.rating}/5</Text>
            <Text style={styles.modalDescription}>{book.description}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => Linking.openURL(book.buyLink)}
            >
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function LibraryScreen() {
  const [selectedBook, setSelectedBook] = useState<typeof mockBooks[0] | null>(
    null
  );

  const renderBook = ({ item }: { item: typeof mockBooks[0] }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => setSelectedBook(item)}
    >
      <Image
        source={{ uri: item.coverUrl }}
        style={styles.bookCover}
        resizeMode="cover"
      />
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        {item.author}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockBooks}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
      <BookDetailsModal
        visible={!!selectedBook}
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    marginBottom: 16,
  },
  bookCover: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  modalAuthor: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  modalDetail: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
}); 