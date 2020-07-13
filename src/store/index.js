import { createStore } from 'redux';
import rootReducer from "../reducers/index";
import actions from '../actions';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(actions.component.load());

export default store;
