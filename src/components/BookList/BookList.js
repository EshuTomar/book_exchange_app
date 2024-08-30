import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore, storage } from '../../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './BookList.module.css';
import { toast } from 'react-toastify';

const BookList = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('New');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const genres = [
    'Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy',
    'Biography', 'History', 'Self-help', 'Romance', 'Horror', 'Children', 'Other'
  ];

  const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'];

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) {
      toast.error("Please upload image also")
      return;
    }

    setUploading(true);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `bookCovers/${uuidv4()}-${coverImage.name}`);
      await uploadBytes(imageRef, coverImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Save book data to Firestore
      await setDoc(doc(firestore, 'books', uuidv4()), {
        title,
        author,
        genre,
        condition,
        price: parseFloat(price),
        description,
        coverImage: imageUrl,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage('Book listed successfully!');
      // Reset form
      setTitle('');
      setAuthor('');
      setGenre('');
      setCondition('New');
      setPrice('');
      setDescription('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error listing book:', error);
      
      toast.error("Failed to list book. Please try again")
    }

    setUploading(false);
  };

  return (
    <div className={styles.listBookContainer}>
      <h2 className={styles.title}>List a Book</h2>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter book title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Enter author's name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="" disabled>Select genre</option>
            {genres.map((gen) => (
              <option key={gen} value={gen}>{gen}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            {conditions.map((cond) => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            placeholder="Enter price"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter book description"
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="coverImage">Book Cover Image</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={uploading}>
          {uploading ? 'Uploading...' : 'List Book'}
        </button>
      </form>
    </div>
  );
};

export default BookList;
