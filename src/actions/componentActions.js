import { SET_TEXT, SET_IMAGE_URL } from '../constants/action-types'; 

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

export default {
  setText,
  setImageUrl
}
