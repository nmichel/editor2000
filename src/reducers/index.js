import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';
import booksReducer from './booksReducer';
import langReducer from './langReducer';

const rootReducer = combineReducers({
  components: componentsReducer,
  books: booksReducer,
  lang: langReducer,
});

export default rootReducer;
