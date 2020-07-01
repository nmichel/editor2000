import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';
import booksReducer from './booksReducer';
import langReducer from './langReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
  components: componentsReducer,
  books: booksReducer,
  lang: langReducer,
  editor: editorReducer
});

const logWrapper = (state, action) => {
  console.log('action', action);
  return rootReducer(state, action);
};

export default logWrapper;
