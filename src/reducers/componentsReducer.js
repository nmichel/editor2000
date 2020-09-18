import { v4 as uuidv4 } from 'uuid';
import Actions from '../actions/componentActions';
import { getDefaultParamsForName } from '../components/registry';
import { createReducer } from '../misc/reduxtils';
import Store from '../misc/localstorage';

const id1 = uuidv4();

const INITIAL_STATE = {
  active: null,
  element: null,
  root: id1,
  states: {
    [id1]: {active: false, component: 'layout', params: {ids: []}, style: {display: {active: true, value: 'flex'}, flexDirection: {active: true, value: 'column'}, padding: {active: true, value: '1em'}}},
  },
  dropTargetId: null,
  dragging: false
};

export default createReducer(INITIAL_STATE, {
  [Actions.reset]: (_state, _action) => {
    return INITIAL_STATE;
  },

  [Actions.load]: (_state, { filename }) => {
    // TODO error handling
    return Store.loadFromFile(filename);
  },

  [Actions.save]: (state, { filename }) => {
    const {element: _drop, ...storableState} = state; // element is a DOM reference. Don't try to save it !
    // TODO error handling
    Store.saveToFile(filename, storableState);
    return state;
  },

  [Actions.editComponent]: (state, action) => {
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
  },

  [Actions.cancelEdition]: (state, _action) => {
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
  },

  [Actions.setParamValue]: (state, action) => {
    const id = action.id
    const newStates = {...state.states};

    const oldComponentState = state.states[id];
    newStates[id] = {...oldComponentState, params: {...oldComponentState.params, [action.payload.param]: action.payload.value}};

    return {...state, states: newStates};
  },

  [Actions.setStyleValue]: (state, action) => {
    const id = action.id
    const newState = {...state, states: {...state.states}};
    const newStates = newState.states;
    const params = action.payload.params;
    const oldStyle = newStates[id].style;
    const oldProperty = oldStyle[params.property];
    const newStyle = {...oldStyle, [params.property]: {...oldProperty, value: params.value}};

    newStates[id] = {
      ...newStates[id],
      style: newStyle
    }
    return newState;
  },

  [Actions.setStyleState]: (state, action) => {
    const id = action.id
    const newState = {...state, states: {...state.states}};
    const newStates = newState.states;
    const params = action.payload.params;
    const oldStyle = newStates[id].style;
    const oldProperty = oldStyle[params.property];
    const newStyle = {...oldStyle, [params.property]: {...oldProperty, active: params.active}};

    newStates[id] = {
      ...newStates[id],
      style: newStyle
    }
    return newState;
  },

  [Actions.addStyle]: (state, action) => {
    const id = action.id
    const newState = {...state, states: {...state.states}};
    const newStates = newState.states;
    const params = action.payload.params;
    const oldStyle = newStates[id].style;
    const newStyle = {...oldStyle, [params.property]: {active: true, value: params.value}};

    newStates[id] = {
      ...newStates[id],
      style: newStyle
    }
    return newState;
  },

  [Actions.deleteStyle]: (state, action) => {
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
  },

  [Actions.appendComponent]: (state, action) => {
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
  },

  [Actions.prependComponent]: (state, action) => {
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
  },

  [Actions.deleteComponent]: (state, action) => {
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
          const newIds = [...ids.slice(0, idx), ...ids.slice(idx+1)];
          newStates[k] = {...newStates[k], params: {...newStates[k].params, ids: newIds}};
        }
      }
    })

    let hasOrphans = true;
    while (hasOrphans) {
      hasOrphans = Object.keys(newStates).reduce((accIn, k) => {
        const componentState = newStates[k];
        if (k !== state.root && !newStates[componentState.parent]) {
          delete newStates[k];
          return true;
        }
        return accIn;
      }, false);
    }

    return newState;
  },

  [Actions.navigatePrev]: (state, _action) => {
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
  },

  [Actions.navigateNext]: (state, action) => {
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
  },

  [Actions.navigateUp]: (state, action) => {
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
  },

  [Actions.navigateDown]: (state, action) => {
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
  },

  [Actions.setOverlayTarget]: (state, action) => {
    return {...state, element: action.target};
  },

  [Actions.startDrag]: (state, _action) => {
    return {...state, dragging: true};
  },

  [Actions.dragOver]: (state, action) => {
    if (action.id === state.dropTargetId) {
      // Drop target stays the same, do nothing
      return state;
    }

    let currentId = state.dropTargetId;
    let targetId = action.id;
    let newStates = {...state.states};

    // Cannot drop inside it-self, or in a child element
    let canDrop = true;
    let testDropId = targetId;
    while (canDrop && testDropId) {
      if (testDropId === state.active) {
        canDrop = false;
        break;
      }
      testDropId = state.states[testDropId].parent;
    }

    if (!canDrop) {
      if (! currentId) {
        return state; // No current drop target, just leave
      }

      const oldComponentState = state.states[currentId];
      newStates[currentId] = {...oldComponentState, dropTarget: false};
      return {...state, dropTargetId: null, states: newStates};
    }

    if (currentId) {
      const oldComponentState = state.states[currentId];
      newStates[currentId] = {...oldComponentState, dropTarget: false};
    }

    const oldComponentState = state.states[targetId];
    newStates[targetId] = {...oldComponentState, dropTarget: true};

    return {...state, dropTargetId: targetId, states: newStates};
  },

  [Actions.drop]: (state, _action) => {
    let newStates = {...state.states};
    let dropTargetId = state.dropTargetId;

    if (!dropTargetId) {
      return {...state, dropTargetId: null, dragging: false};
    }

    const oldComponentState = state.states[dropTargetId];
    newStates[dropTargetId] = {...oldComponentState, dropTarget: false};

    // Find the target's parent 
    const targetParentId = oldComponentState.parent;
    if (!targetParentId) {
      return {...state, dropTargetId: null, dragging: false};
    }

    const movedId = state.active;

    // Remove the moved node from its parent id list
    const movedParentId = state.states[movedId].parent;
    if (!movedParentId) {
      return {...state, dropTargetId: null, dragging: false};
    }

    const movedParent = state.states[movedParentId];
    const ids = movedParent.params.ids;
    const idx = ids.indexOf(movedId);
    if (idx === -1) {
      return {...state, dropTargetId: null, dragging: false};
    }

    const newIds = [...ids.slice(0, idx), ...ids.slice(idx+1)];
    newStates[movedParentId] = {...movedParent, params: {...movedParent.params, ids: newIds}};

    // Insert the moved node just before the target node in the latter parent id list
    const targetParent = newStates[targetParentId];
    const targetParentIds = targetParent.params.ids
    const idx1 = targetParentIds.indexOf(dropTargetId)
    if (idx1 === -1) {
      return {...state, dropTargetId: null, dragging: false};
    }

    const newIds1 = [...targetParentIds.slice(0, idx1), movedId, ...targetParentIds.slice(idx1)];
    newStates[targetParentId] = {...targetParent, params: {...targetParent.params, ids: newIds1}};

    // Update moved node parent
    const moved = state.states[movedId];
    newStates[movedId] = {...moved, parent: targetParentId};

    return {...state, dropTargetId: null, states: newStates, dragging: false};
  }
});
