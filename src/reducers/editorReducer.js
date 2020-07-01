import { EDIT_COMPONENT, CANCEL_EDITION } from '../constants/action-types';

const INITIAL_STATE = null;

function editorReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_COMPONENT:
      return action.id;

    case CANCEL_EDITION:
      return null;

    default:
      return state;
  }
};

export default editorReducer;
