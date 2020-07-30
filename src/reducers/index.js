import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';
import langReducer from './langReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
  components: componentsReducer,
  lang: langReducer,
  editor: editorReducer
});

const logWrapper = (state, action) => {
  if (window.debug) {
    console.log('action', action);
  }
  return rootReducer(state, action);
};

export default logWrapper;
