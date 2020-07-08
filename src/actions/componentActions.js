import { SET_TEXT, SET_IMAGE_URL, SET_STYLE_VALUE, ADD_STYLE, DELETE_STYLE, APPEND_COMPONENT, PREPEND_COMPONENT } from '../constants/action-types'; 

const setText = (id, text) => {
  return {
    type: SET_TEXT,
    id,
    payload: { params: { text } }
  };
};

const setImageUrl = (id, url) => {
  return {
    type: SET_IMAGE_URL,
    id,
    payload: { params: { url } }
  };
};

const setStyleValue = (id, property, value) => {
  return {
    type: SET_STYLE_VALUE,
    id,
    payload: { params: { property, value } }
  }
};

const addStyle = (id, property, value) => {
  return {
    type: ADD_STYLE,
    id,
    payload: { params: { property, value } }
  }
};

const deleteStyle = (id, property) => {
  return {
    type: DELETE_STYLE,
    id,
    payload: { params: { property } }
  }
};

const appendComponent = (id, name) => {
  return {
    type: APPEND_COMPONENT,
    id,
    payload: { params: { name } }
  }
}

const prependComponent = (id, name) => {
  return {
    type: PREPEND_COMPONENT,
    id,
    payload: { params: { name } }
  }
}

export default {
  setText,
  setImageUrl,
  setStyleValue,
  addStyle,
  deleteStyle,
  appendComponent,
  prependComponent
}
