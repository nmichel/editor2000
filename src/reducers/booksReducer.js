import { v4 as uuidv4 } from "uuid";
import { ADD_BOOK, REMOVE_BOOK } from '../constants/action-types';

const INITIAL_STATE = [
  {title: 'book 1', author: 'Victor Hugo', id: uuidv4()},
  {title: 'book 2', author: 'Jules Verne', id: uuidv4()}
];

function booksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        { ...action.payload, id: uuidv4() }
      ];

    case REMOVE_BOOK:
      const newState = [...state];
      const idx = state.findIndex(({ id }) => id === action.payload);
      newState.splice(idx, 1);
      return newState;

    default:
      return state;
  }
};

export default booksReducer;
