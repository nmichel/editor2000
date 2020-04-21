import { ADD_BOOK, REMOVE_BOOK } from '../constants/action-types'; 

const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: book,
  };
};

const removeBook = (book) => {
  return {
    type: REMOVE_BOOK,
    payload: book,
  };
};

export default {
  addBook,
  removeBook
}
