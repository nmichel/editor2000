import React from "react";
import { useSelector } from "react-redux";
import styles from './Books.module.scss';
import Book from './Book';

const Books = () => {
  const books = useSelector((state) => state.books);
  console.log('books', books);
  const renderBooks = () => {
    return books.map((book) => (
      <Book key={book.id} {...book} />
    ));
  };

  return (
    <div className={styles.Books}>
      {renderBooks()}
    </div>
  );
};

export default Books;
