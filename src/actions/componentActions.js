import * as ActionTypes from '../constants/action-types'; 
import { createAction } from '../misc/reduxtils';

const load = createAction(ActionTypes.LOAD);

const save = createAction(ActionTypes.SAVE);

const editComponent = createAction(ActionTypes.EDIT_COMPONENT, (id) => {
  return { 
    id
  };
});

const cancelEdition = createAction(ActionTypes.CANCEL_EDITION);

const setParamValue = createAction(ActionTypes.SET_PARAM_VALUE, (id, param, value) => {
  return {
    id,
    payload: { param, value }
  };
});

const setStyleValue = createAction(ActionTypes.SET_STYLE_VALUE, (id, property, value) => {
  return {
    id,
    payload: { params: { property, value } }
  }
});

const addStyle = createAction(ActionTypes.ADD_STYLE, (id, property, value) => {
  return {
    id,
    payload: { params: { property, value } }
  }
});

const deleteStyle = createAction(ActionTypes.DELETE_STYLE, (id, property) => {
  return {
    id,
    payload: { params: { property } }
  }
});

const appendComponent = createAction(ActionTypes.APPEND_COMPONENT, (id, name) => {
  return {
    id,
    payload: { params: { name } }
  }
});

const prependComponent = createAction(ActionTypes.PREPEND_COMPONENT, (id, name) => {
  return {
    id,
    payload: { params: { name } }
  }
});

const deleteComponent = createAction(ActionTypes.DELETE_COMPONENT, (id, name) => {
  return {
    id,
    payload: {}
  }
});

const navigatePrev = createAction(ActionTypes.NAVIGATE_PREV, (id) => {
  return {
    id
  }
});

const navigateNext = createAction(ActionTypes.NAVIGATE_NEXT, (id) => {
  return {
    id
  }
});

const navigateUp = createAction(ActionTypes.NAVIGATE_UP, (id) => {
  return {
    id
  }
});

const navigateDown = createAction(ActionTypes.NAVIGATE_DOWN, (id) => {
  return {
    id
  }
});

const setOverlayTarget = createAction(ActionTypes.SET_OVERLAY_TARGET, (target) => {
  return {
    target
  }
});

const startDrag = createAction(ActionTypes.START_DRAG);

const dragOver = createAction(ActionTypes.DRAG_OVER, (id) => {
  return {
    id
  }
});

const drop = createAction(ActionTypes.DROP, (id) => {
  return {
    id
  }
});

export default {
  load,
  save,
  editComponent,
  cancelEdition,
  setParamValue,
  setStyleValue,
  addStyle,
  deleteStyle,
  appendComponent,
  prependComponent,
  deleteComponent,
  navigatePrev,
  navigateNext,
  navigateUp,
  navigateDown,
  setOverlayTarget,
  startDrag,
  dragOver,
  drop
}
