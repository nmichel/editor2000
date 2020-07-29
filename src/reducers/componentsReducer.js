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
  root: id5,
  states: {
    [id1]: {active: false, component: 'text', parent: id5, params: {text: 'hello \n world!'}, style: {whiteSpace: 'pre-wrap'}},
    [id2]: {active: false, component: 'image', parent: id4, params: {url: 'https://picsum.photos/id/249/200/300'}, style: {}},
    [id3]: {active: false, component: 'text', parent: id4, params: {text: 'Je \n suis \n ton \n Père!'}, style: {whiteSpace: 'pre-wrap', fontSize: '20px'}},
    [id4]: {active: false, component: 'layout', parent: id5, params: {ids: [id2, id3]}, style: {flexDirection: 'column'}},
    [id5]: {active: false, component: 'layout', params: {ids: [id4, id1]}, style: {flexDirection: 'column'}},
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
      const id = action.id;
      let newStates = {...state.states};

      const oldId = state.active;
      if (oldId) {
        const oldComponentState = state.states[oldId];
        newStates[oldId] = {...oldComponentState, active: false};
      }

      const oldComponentState = state.states[id];
      newStates[id] = {...oldComponentState, active: true};

      return {...state, active: id, states: newStates};
    }

    case ActionTypes.CANCEL_EDITION: {
      const id = state.active;
      if (id) {
        let newStates = {...state.states};
        const oldComponentState = state.states[id];
        newStates[id] = {...oldComponentState, active: false};
        return {...state, active: null, element: null, states: newStates};
      }
      else {
        return {...state, active: null, element: null};
      }
    }

    case ActionTypes.SET_PARAM_VALUE: {
      const id = action.id
      const newStates = {...state.states};

      const oldComponentState = state.states[id];
      newStates[id] = {...oldComponentState, params: {...oldComponentState.params, [action.payload.param]: action.payload.value}};
  
      return {...state, states: newStates};
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
      newStates[newComponentId] = {parent: id, active: false, ...getDefaultParamsForName(params.name)};

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
      newStates[newComponentId] = {parent: id, active: false, ...getDefaultParamsForName(params.name)};

      const newIds = [newComponentId, ...newStates[id].params.ids];
      newStates[id] = {
        ...newStates[id],
        params: {ids: newIds}
      }

      return newState;
    }

    case ActionTypes.DELETE_COMPONENT: {
      const id = action.id
      if (id === state.root) {
        return state;
      }

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

      let hasOrphans = true;
      while (hasOrphans) {
        hasOrphans = false;
        Object.keys(newStates).forEach((k) => {
          const componentState = newStates[k];
          if (k !== state.root && !newStates[componentState.parent]) {
            hasOrphans = true;
            delete newStates[k];
          }
        })
      }

      return newState;
    }

    case ActionTypes.NAVIGATE_PREV: {
      const currentId = state.active
      const currentState = state.states[currentId];
      const parentId = currentState.parent;
      if (!parentId) {
        return state;
      }

      const parent = state.states[parentId];
      const ids = parent.params.ids;
      const idx = ids.indexOf(currentId);
      if (idx === 0) {
        return state;
      }

      let targetId = ids[idx-1];
      let newStates = {...state.states};

      if (currentId) {
        const oldComponentState = state.states[currentId];
        newStates[currentId] = {...oldComponentState, active: false};
      }

      const oldComponentState = state.states[targetId];
      newStates[targetId] = {...oldComponentState, active: true};

      return {...state, active: targetId, states: newStates};
    }

    case ActionTypes.NAVIGATE_NEXT: {
      const currentId = state.active
      const currentState = state.states[currentId];
      const parentId = currentState.parent;
      if (!parentId) {
        return state;
      }

      const parent = state.states[parentId];
      const ids = parent.params.ids;
      const idx = ids.indexOf(currentId);
      if (idx === ids.length-1) {
        return state;
      }

      let targetId = ids[idx+1];
      let newStates = {...state.states};

      if (currentId) {
        const oldComponentState = state.states[currentId];
        newStates[currentId] = {...oldComponentState, active: false};
      }

      const oldComponentState = state.states[targetId];
      newStates[targetId] = {...oldComponentState, active: true};

      return {...state, active: targetId, states: newStates};
    }

    case ActionTypes.NAVIGATE_UP: {
      const currentId = action.id
      const currentState = state.states[currentId];
      const parentId = currentState.parent;
      if (!parentId) {
        return state;
      }

      let targetId = parentId;
      let newStates = {...state.states};

      if (currentId) {
        const oldComponentState = state.states[currentId];
        newStates[currentId] = {...oldComponentState, active: false};
      }

      const oldComponentState = state.states[targetId];
      newStates[targetId] = {...oldComponentState, active: true};

      return {...state, active: targetId, states: newStates};
    }

    case ActionTypes.NAVIGATE_DOWN: {
      const currentId = action.id;
      const currentState = state.states[currentId];
      if (!currentState.params.ids || currentState.params.ids.length === 0) {
        return state;
      }

      let targetId = currentState.params.ids[0];
      let newStates = {...state.states};

      if (currentId) {
        const oldComponentState = state.states[currentId];
        newStates[currentId] = {...oldComponentState, active: false};
      }

      const oldComponentState = state.states[targetId];
      newStates[targetId] = {...oldComponentState, active: true};

      return {...state, active: targetId, states: newStates};
    }

    case ActionTypes.SET_OVERLAY_TARGET: {
      return {...state, element: action.target};
    }

    default:
      return state;
  }
};

export default componentsReducer;
