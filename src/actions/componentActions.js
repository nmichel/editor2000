import * as ActionTypes from '../constants/action-types'; 

const load = () => {
  return {
    type: ActionTypes.LOAD
  }
}

const editComponent = (id) => {
  return { 
    type: ActionTypes.EDIT_COMPONENT,
    id
  };
};

const cancelEdition = () => {
  return {
    type: ActionTypes.CANCEL_EDITION
  };
};

const setParamValue = (id, param, value) => {
  return {
    type: ActionTypes.SET_PARAM_VALUE,
    id,
    payload: { param, value }
  };
};

const setStyleValue = (id, property, value) => {
  return {
    type: ActionTypes.SET_STYLE_VALUE,
    id,
    payload: { params: { property, value } }
  }
};

const addStyle = (id, property, value) => {
  return {
    type: ActionTypes.ADD_STYLE,
    id,
    payload: { params: { property, value } }
  }
};

const deleteStyle = (id, property) => {
  return {
    type: ActionTypes.DELETE_STYLE,
    id,
    payload: { params: { property } }
  }
};

const appendComponent = (id, name) => {
  return {
    type: ActionTypes.APPEND_COMPONENT,
    id,
    payload: { params: { name } }
  }
}

const prependComponent = (id, name) => {
  return {
    type: ActionTypes.PREPEND_COMPONENT,
    id,
    payload: { params: { name } }
  }
}

const deleteComponent = (id, name) => {
  return {
    type: ActionTypes.DELETE_COMPONENT,
    id,
    payload: {}
  }
}

const navigatePrev = (id) => {
  return {
    type: ActionTypes.NAVIGATE_PREV,
    id
  }
}

const navigateNext = (id) => {
  return {
    type: ActionTypes.NAVIGATE_NEXT,
    id
  }
}

const navigateUp = (id) => {
  return {
    type: ActionTypes.NAVIGATE_UP,
    id
  }
}

const navigateDown = (id) => {
  return {
    type: ActionTypes.NAVIGATE_DOWN,
    id
  }
}

const setOverlayTarget = (target) => {
  return {
    type: ActionTypes.SET_OVERLAY_TARGET,
    target
  }
}

export default {
  load,
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
  setOverlayTarget
}
