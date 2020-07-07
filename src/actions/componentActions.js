import { SET_TEXT, SET_IMAGE_URL, SET_STYLE_VALUE } from '../constants/action-types'; 

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

export default {
  setText,
  setImageUrl,
  setStyleValue
}
