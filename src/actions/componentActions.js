import { SET_TEXT, SET_IMAGE_URL, SET_STYLE_VALUE, ADD_STYLE, DELETE_STYLE } from '../constants/action-types'; 

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

export default {
  setText,
  setImageUrl,
  setStyleValue,
  addStyle,
  deleteStyle
}
