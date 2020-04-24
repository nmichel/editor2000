import { SET_LANG } from '../constants/action-types';

const INITIAL_STATE = 'fr';

function langReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LANG:
      return action.payload;

    default:
      return state;
  }
};

export default langReducer;
