import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import langReducer from './langReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  lang: langReducer,
});

export default rootReducer;
