import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Book } from '../types/book';

// Sample data - replace with actual data from your backend
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.',
    link: 'https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567',
    publishedYear: 1925,
    genre: 'Classic',
    rating: 4.5,
    dateAdded: '2024-03-20',
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
    description: '1984 is a dystopian novel and cautionary tale by English writer George Orwell. It was published in June 1949, having been written during the last stages of World War II. The novel is set in a totalitarian superstate called Oceania, whose regime maintains power through surveillance, manipulation of language, and control of history.',
    link: 'https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934',
    publishedYear: 1949,
    genre: 'Dystopian Fiction',
    rating: 4.7,
    dateAdded: '2024-03-19',
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    description: 'To Kill a Mockingbird is a novel by the American author Harper Lee. Published in 1960, it was instantly successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.',
    link: 'https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0446310786',
    publishedYear: 1960,
    genre: 'Literary Fiction',
    rating: 4.8,
    dateAdded: '2024-03-18',
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    description: 'Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
    link: 'https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/0141439513',
    publishedYear: 1813,
    genre: 'Romance',
    rating: 4.6,
    dateAdded: '2024-03-17',
  },
];

export default function LibraryPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const BookModal = ({ book }: { book: Book }) => (
    <View style={styles.modalContent}>
      <ScrollView>
        <Image
          source={{ uri: book.coverImage }}
          style={styles.modalImage}
          resizeMode="contain"
        />
        <Text style={styles.modalTitle}>{book.title}</Text>
        <Text style={styles.modalAuthor}>by {book.author}</Text>
        {book.publishedYear && (
          <Text style={styles.modalDetail}>Published: {book.publishedYear}</Text>
        )}
        {book.genre && (
          <Text style={styles.modalDetail}>Genre: {book.genre}</Text>
        )}
        {book.rating && (
          <Text style={styles.modalDetail}>Rating: {book.rating}/5</Text>
        )}
        <Text style={styles.modalDescription}>{book.description}</Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            // Handle link opening
            if (Platform.OS === 'web') {
              window.open(book.link, '_blank');
            }
            // Add handling for mobile platforms
          }}
        >
          <Text style={styles.linkButtonText}>View Book Details</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Library</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {sampleBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => handleBookPress(book)}
            >
              <Image
                source={{ uri: book.coverImage }}
                style={styles.coverImage}
                resizeMode="cover"
              />
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.bookAuthor} numberOfLines={1}>
                {book.author}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedBook && <BookModal book={selectedBook} />}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  bookCard: {
    width: Platform.OS === 'web' ? 200 : (Dimensions.get('window').width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 280 : 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    margin: Platform.OS === 'web' ? '10%' : 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 400 : 300,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  modalDetail: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  linkButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 