import { v4 as uuidv4 } from 'uuid';
import { SET_TEXT, SET_IMAGE_URL } from '../constants/action-types';

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

const INITIAL_STATE = {
  list: [
    id5
  ],
  states: {
    [id1]: {component: 'text', params: {text: 'hello \n world!'}, style: {whiteSpace: 'pre-wrap'}},
    [id2]: {component: 'image', params: {url: 'https://picsum.photos/id/249/200/300'}},
    [id3]: {component: 'text', params: {text: 'Je \n suis \n ton \ Père!'}, style: {whiteSpace: 'pre-wrap', fontSize: '20px'}},
    [id4]: {component: 'layout', params: {ids: [id2, id3]}, style: {}},
    [id5]: {component: 'layout', params: {ids: [id4, id1]}, style: {flexDirection: 'column'}},
  }};

function componentsReducer(state = INITIAL_STATE, action) {
  const newState = {list: [...state.list], states: {...state.states}};
  const newStates = newState.states;
  const id = action.id

  switch (action.type) {
    case SET_TEXT:  {
      newStates[id] = {
        ...newStates[id],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    case SET_IMAGE_URL: {
      newStates[id] = {
        ...newStates[id],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    default:
      return state;
  }
};

export default componentsReducer;
