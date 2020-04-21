import React from "react";
import styles from './Book.module.scss';

const Title = ({title}) => <div>{title}</div>
const Author = ({author}) => <div>{author}</div>

const Book = ({title, author}) => (
  <div className={styles.Book}>
    <Title title={title} />
    <Author author={author} />
  </div>
);

export default Book;
  