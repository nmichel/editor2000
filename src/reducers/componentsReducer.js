import { v4 as uuidv4 } from 'uuid';
import { SET_TEXT, SET_IMAGE_URL } from '../constants/action-types';

const INITIAL_STATE = [
  {component: 'text', id: uuidv4(), params: {text: 'hello \n world!'}, style: {whiteSpace: 'pre-wrap'}},
  {component: 'image', id: uuidv4(), params: {url: 'https://picsum.photos/200/300'}},
  {component: 'text', id: uuidv4(), params: {text: 'Je \n suis \n ton \ Père!'}, style: {whiteSpace: 'pre-wrap', fontSize: '20px'}},
];

function componentsReducer(state = INITIAL_STATE, action) {
  const newState = [...state];
  const idx = state.findIndex(({ id }) => id === action.id);

  switch (action.type) {
    case SET_TEXT:  {
      newState[idx] = {
        ...newState[idx],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    case SET_IMAGE_URL: {
      newState[idx] = {
        ...newState[idx],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    default:
      return state;
  }
};

export default componentsReducer;
