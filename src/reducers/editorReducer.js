import { EDIT_COMPONENT, CANCEL_EDITION, DELETE_COMPONENT } from '../constants/action-types';

const INITIAL_STATE = null;

function editorReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EDIT_COMPONENT:
      return action.id;

    case CANCEL_EDITION:
      return null;

    case DELETE_COMPONENT: {
      if (action.id === state) {
        return null;
      }

      return state;
    }

    default:
      return state;
  }
};

export default editorReducer;
