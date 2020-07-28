import { v4 as uuidv4 } from 'uuid';
import * as ActionTypes from '../constants/action-types';
import {getDefaultParamsForName} from '../components/registry';

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

const INITIAL_STATE = {
  active: null,
  element: null,
  list: [
    id5
  ],
  states: {
    [id1]: {component: 'text', parent: id5, params: {text: 'hello \n world!'}, style: {whiteSpace: 'pre-wrap'}},
    [id2]: {component: 'image', parent: id4, params: {url: 'https://picsum.photos/id/249/200/300'}, style: {}},
    [id3]: {component: 'text', parent: id4, params: {text: 'Je \n suis \n ton \n Père!'}, style: {whiteSpace: 'pre-wrap', fontSize: '20px'}},
    [id4]: {component: 'layout', parent: id5, params: {ids: [id2, id3]}, style: {flexDirection: 'column'}},
    [id5]: {component: 'layout', params: {ids: [id4, id1]}, style: {flexDirection: 'column'}},
  }};

function componentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const savedState = localStorage.getItem('component_editor');
      if (!savedState) {
        return INITIAL_STATE;
      }

      return JSON.parse(savedState);
    }

    case ActionTypes.SAVE: {
      const {element: _drop, ...storableState} = state; // element is a DOM reference. Don't try to save it !
      localStorage.setItem('component_editor', JSON.stringify(storableState));
      return state;
    }

    case ActionTypes.EDIT_COMPONENT: {
      const id = action.id
      return {...state, active: id};
    }

    case ActionTypes.CANCEL_EDITION: {
      return {...state, active: null, element: null};
    }

    case ActionTypes.SET_PARAM_VALUE: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      newStates[id].params = {...newStates[id].params, [action.payload.param]: action.payload.value};
      return newState;
    }

    case ActionTypes.SET_STYLE_VALUE: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const newStyle = {...oldStyle, [params.property]: params.value};

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case ActionTypes.ADD_STYLE: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const newStyle = {...oldStyle, [params.property]: params.value};

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case ActionTypes.DELETE_STYLE: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      const params = action.payload.params;
      const oldStyle = newStates[id].style;
      const {[params.property]: _, ...newStyle} = oldStyle;

      newStates[id] = {
        ...newStates[id],
        style: newStyle
      }
      return newState;
    }

    case ActionTypes.APPEND_COMPONENT: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      const params = action.payload.params;
      const targetComponentType = (state.states[id] && state.states[id].component)|| "";
      if (targetComponentType !== 'layout') {
        return state;
      }

      const newComponentId = uuidv4();
      newStates[newComponentId] = {parent: id, ...getDefaultParamsForName(params.name)};

      const newIds = [...newStates[id].params.ids, newComponentId];
      newStates[id] = {
        ...newStates[id],
        params: {ids: newIds}
      }

      return newState;
    }

    case ActionTypes.PREPEND_COMPONENT: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;
      const params = action.payload.params;
      const targetComponentType = (state.states[id] && state.states[id].component)|| "";
      if (targetComponentType !== 'layout') {
        return state;
      }

      const newComponentId = uuidv4();
      newStates[newComponentId] = {parent: id, ...getDefaultParamsForName(params.name)};

      const newIds = [newComponentId, ...newStates[id].params.ids];
      newStates[id] = {
        ...newStates[id],
        params: {ids: newIds}
      }

      return newState;
    }

    case ActionTypes.DELETE_COMPONENT: {
      const id = action.id
      const newState = {...state, states: {...state.states}};
      const newStates = newState.states;

      if (id === newState.active) {
        newState.active = null;
      }

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

    case ActionTypes.NAVIGATE_PREV: {
      const id = action.id
      const target = state.states[id];
      const parentId = target.parent;
      if (!parentId) {
        return state;
      }

      const parent = state.states[parentId];
      const ids = parent.params.ids;
      const idx = ids.indexOf(id);
      if (idx === 0) {
        return state;
      }

      return {...state, active: ids[idx-1]};
    }

    case ActionTypes.NAVIGATE_NEXT: {
      const id = action.id
      const target = state.states[id];
      const parentId = target.parent;
      if (!parentId) {
        return state;
      }

      const parent = state.states[parentId];
      const ids = parent.params.ids;
      const idx = ids.indexOf(id);
      if (idx === ids.length-1) {
        return state;
      }

      return {...state, active: ids[idx+1]};
    }

    case ActionTypes.NAVIGATE_UP: {
      const id = action.id
      const target = state.states[id];
      const parentId = target.parent;
      if (!parentId) {
        return state;
      }

      return {...state, active: parentId};
    }

    case ActionTypes.NAVIGATE_DOWN: {
      const id = action.id
      const target = state.states[id];
      if (!target.params.ids || target.params.ids.length === 0) {
        return state;
      }

      return {...state, active: target.params[0]};
    }

    case ActionTypes.SET_OVERLAY_TARGET: {
      return {...state, element: action.target};
    }

    default:
      return state;
  }
};

export default componentsReducer;
