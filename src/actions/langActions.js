import { SET_LANG } from '../constants/action-types'; 

const setLang = (lang) => {
  return {
    type: SET_LANG,
    payload: lang,
  };
};

export default {
  setLang
}
