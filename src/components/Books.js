import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Books.module.scss';
import Book from './Book';

const Books = () => {
  const books = useSelector((state) => state.books);
  const { t } = useTranslation();

  const renderBooks = () => {
    return books.map((book) => (
      <Book key={book.id} {...book} />
    ));
  };

  return (
    <div className={styles.Books}>
      <h1>{t("Editor.title")}</h1>
      {renderBooks()}
    </div>
  );
};

export default Books;
