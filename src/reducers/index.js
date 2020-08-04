import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';
import langReducer from './langReducer';
import editorReducer from './editorReducer';
import { cascadeReducers } from '../misc/reduxtils';

const rootReducer = combineReducers({
  components: componentsReducer,
  lang: langReducer,
  editor: editorReducer
});

const logReducer = (state, action) => {
  if (window.debug) {
    console.log('action', action);
  }
  return state;
};

export default cascadeReducers(logReducer, rootReducer);
