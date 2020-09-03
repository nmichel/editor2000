import { createStore } from 'redux';
import rootReducer from "../reducers/index";
import actions from '../actions';

import Store from '../misc/localstorage';
import HARDCODED_SAVED_DATA from '../misc/movies';

Store.saveToFile('default', JSON.parse(HARDCODED_SAVED_DATA));

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(actions.component.reset());

export default store;
