import { v4 as uuidv4 } from 'uuid';
import {getDefaultParamsForName} from '../components/registry';

import { SET_TEXT, SET_IMAGE_URL, SET_STYLE_VALUE, ADD_STYLE, DELETE_STYLE, APPEND_COMPONENT, PREPEND_COMPONENT, DELETE_COMPONENT } from '../constants/action-types';

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

const INITIAL_STATE = {
  list: [
    id5
  ],
  states: {
    [id1]: {component: 'text', params: {text: 'hello \n world!'}, style: {whiteSpace: 'pre-wrap'}},
    [id2]: {component: 'image', params: {url: 'https://picsum.photos/id/249/200/300'}, style: {}},
    [id3]: {component: 'text', params: {text: 'Je \n suis \n ton \ Père!'}, style: {whiteSpace: 'pre-wrap', fontSize: '20px'}},
    [id4]: {component: 'layout', params: {ids: [id2, id3]}, style: {flexDirection: 'column'}},
    [id5]: {component: 'layout', params: {ids: [id4, id1]}, style: {flexDirection: 'column'}},
  }};

function componentsReducer(state = INITIAL_STATE, action) {
  const newState = {list: [...state.list], states: {...state.states}};
  const newStates = newState.states;
  const id = action.id

  switch (action.type) {
    case SET_TEXT:  {
      newStates[id] = {
        ...newStates[id],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    case SET_IMAGE_URL: {
      newStates[id] = {
        ...newStates[id],
        ...action.payload, // BUG : Will override entirely params ! 
      };
      return newState;
    }

    case SET_STYLE_VALUE: {
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const newStyle = {...oldStyle, [params.property]: params.value};

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case ADD_STYLE: {
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const newStyle = {...oldStyle, [params.property]: params.value};

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case DELETE_STYLE: {
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const {[params.property]: _, ...newStyle} = oldStyle;

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case APPEND_COMPONENT: {
      const params = action.payload.params;
      const targetComponentType = (state.states[id] && state.states[id].component)|| "";
      if (targetComponentType !== 'layout') {
        return state;
      }

      const newComponentId = uuidv4();
      newStates[newComponentId] = {...getDefaultParamsForName(params.name)};

      const newIds = [...newStates[id].params.ids, newComponentId];
      newStates[id] = {
        ...newStates[id],
        params: {ids: newIds}
      }

      return newState;
    }

    case PREPEND_COMPONENT: {
      const params = action.payload.params;
      const targetComponentType = (state.states[id] && state.states[id].component)|| "";
      if (targetComponentType !== 'layout') {
        return state;
      }

      const newComponentId = uuidv4();
      newStates[newComponentId] = {...getDefaultParamsForName(params.name)};

      const newIds = [newComponentId, ...newStates[id].params.ids];
      newStates[id] = {
        ...newStates[id],
        params: {ids: newIds}
      }

      return newState;
    }

    case DELETE_COMPONENT: {
      delete newStates[id];
      Object.keys(newStates).forEach((k) => {
        const componentState = newStates[k];
        if (componentState.params.ids !== undefined) {
          const ids = componentState.params.ids
          const idx = ids.indexOf(id)
          if (idx > -1) {
            const newIds = [...ids.slice(0, idx), ...ids.slice(idx+1)]
            newStates[k].params.ids = newIds;
          }
        }
      })
      return newState;
    }

    default:
      return state;
  }
};

export default componentsReducer;
