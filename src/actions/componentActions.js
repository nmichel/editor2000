import * as ActionTypes from '../constants/action-types'; 

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

const setText = (id, text) => {
  return {
    type: ActionTypes.SET_TEXT,
    id,
    payload: { params: { text } }
  };
};

const setImageUrl = (id, url) => {
  return {
    type: ActionTypes.SET_IMAGE_URL,
    id,
    payload: { params: { url } }
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

export default {
  editComponent,
  cancelEdition,
  setText,
  setImageUrl,
  setStyleValue,
  addStyle,
  deleteStyle,
  appendComponent,
  prependComponent,
  deleteComponent,
  navigatePrev,
  navigateNext,
  navigateUp,
  navigateDown
}
