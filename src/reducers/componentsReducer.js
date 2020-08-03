import { v4 as uuidv4 } from 'uuid';
import * as ActionTypes from '../constants/action-types';
import {getDefaultParamsForName} from '../components/registry';

const id1 = uuidv4();

const HARDCODED_SAVED_DATA = '{"active":"95c6fe16-dc65-4eec-88b8-d08e6907813f","root":"b5d02377-f7d7-469e-b92d-8bf78522a76f","states":{"95c6fe16-dc65-4eec-88b8-d08e6907813f":{"active":true,"component":"text","parent":"b5d02377-f7d7-469e-b92d-8bf78522a76f","params":{"text":"hello \n world!"},"style":{"whiteSpace":"pre-wrap"}},"2cd9ba51-86da-4acf-95e9-de7c283d66f7":{"active":false,"component":"image","parent":"2bbf5ea0-e94a-4429-82d8-f1235ef4fbfe","params":{"url":"https://picsum.photos/id/249/200/300"},"style":{}},"84d6ce19-dd60-43ee-b0a7-bda90b96b7d0":{"active":false,"component":"text","parent":"2bbf5ea0-e94a-4429-82d8-f1235ef4fbfe","params":{"text":"Under the bridge"},"style":{"whiteSpace":"pre-wrap","fontSize":"20px"}},"2bbf5ea0-e94a-4429-82d8-f1235ef4fbfe":{"active":false,"component":"layout","parent":"b5d02377-f7d7-469e-b92d-8bf78522a76f","params":{"ids":["2cd9ba51-86da-4acf-95e9-de7c283d66f7","84d6ce19-dd60-43ee-b0a7-bda90b96b7d0"]},"style":{"flexDirection":"column"}},"b5d02377-f7d7-469e-b92d-8bf78522a76f":{"active":false,"component":"layout","params":{"ids":["e0c27bec-0e90-4422-869a-76740471165f","936f047f-45bf-4804-a638-8678f1f997cd","800b3628-fe62-4e14-90e0-2ac4f7e50234","2bbf5ea0-e94a-4429-82d8-f1235ef4fbfe","95c6fe16-dc65-4eec-88b8-d08e6907813f"]},"style":{"flexDirection":"row","display":"flex"}},"800b3628-fe62-4e14-90e0-2ac4f7e50234":{"parent":"b5d02377-f7d7-469e-b92d-8bf78522a76f","active":false,"component":"layout","params":{"ids":["c4ef5937-4ba0-43d0-bc94-551adb4f2638"]},"style":{"alignItems":"center","display":"flex","flexDirection":"column","padding":"1em"}},"936f047f-45bf-4804-a638-8678f1f997cd":{"parent":"b5d02377-f7d7-469e-b92d-8bf78522a76f","active":false,"component":"layout","params":{"ids":["c991db7b-95a5-43fa-a98a-2de1ca57f01c"]},"style":{"alignItems":"center","display":"flex","flexDirection":"column","padding":"1em"}},"c991db7b-95a5-43fa-a98a-2de1ca57f01c":{"parent":"936f047f-45bf-4804-a638-8678f1f997cd","active":false,"component":"image","params":{"url":"https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,671,1000_AL_.jpg"},"style":{}},"c4ef5937-4ba0-43d0-bc94-551adb4f2638":{"parent":"800b3628-fe62-4e14-90e0-2ac4f7e50234","active":false,"component":"image","params":{"url":"https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,666,1000_AL_.jpg"},"style":{}},"e0c27bec-0e90-4422-869a-76740471165f":{"parent":"b5d02377-f7d7-469e-b92d-8bf78522a76f","active":false,"component":"layout","params":{"ids":["432c5067-4b29-4e2f-b5da-4510bee3f225"]},"style":{"alignItems":"center","display":"flex","flexDirection":"column","padding":"1em"}},"432c5067-4b29-4e2f-b5da-4510bee3f225":{"parent":"e0c27bec-0e90-4422-869a-76740471165f","active":false,"component":"image","params":{"url":"https://m.media-amazon.com/images/M/MV5BMjM1NjE5NjQxN15BMl5BanBnXkFtZTgwMjYzMzQxMDE@._V1_.jpg"},"style":{}}},"dropTargetId":null}';

const INITIAL_STATE = {
  active: null,
  element: null,
  root: id1,
  states: {
    [id1]: {active: false, component: 'layout', params: {ids: []}, style: {display: 'flex', flexDirection: 'column', padding: '1em'}},
  },
  dropTargetId: null
};

function componentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const savedState = localStorage.getItem('component_editor');
      if (!savedState) {
        return JSON.parse(HARDCODED_SAVED_DATA);
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
            const newIds = [...ids.slice(0, idx), ...ids.slice(idx+1)];
            newStates[k] = {...newStates[k], params: {...newStates[k].params, ids: newIds}};
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

    case ActionTypes.DRAG_OVER: {
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
    }

    case ActionTypes.DROP: {
      let newStates = {...state.states};
      let dropTargetId = state.dropTargetId;

      if (!dropTargetId) {
        return {...state, dropTargetId: null};
      }

      const oldComponentState = state.states[dropTargetId];
      newStates[dropTargetId] = {...oldComponentState, dropTarget: false};

      // Find the target's parent 
      const targetParentId = oldComponentState.parent;
      if (!targetParentId) {
        return {...state, dropTargetId: null};
      }

      const movedId = state.active;

      // Remove the moved node from its parent id list
      const movedParentId = state.states[movedId].parent;
      if (!movedParentId) {
        return {...state, dropTargetId: null};
      }

      const movedParent = state.states[movedParentId];
      const ids = movedParent.params.ids;
      const idx = ids.indexOf(movedId);
      if (idx === -1) {
        return {...state, dropTargetId: null};
      }

      const newIds = [...ids.slice(0, idx), ...ids.slice(idx+1)];
      newStates[movedParentId] = {...movedParent, params: {...movedParent.params, ids: newIds}};

      // Insert the moved node just before the target node in the latter parent id list
      const targetParent = newStates[targetParentId];
      const targetParentIds = targetParent.params.ids
      const idx1 = targetParentIds.indexOf(dropTargetId)
      if (idx1 === -1) {
        return {...state, dropTargetId: null};
      }

      const newIds1 = [...targetParentIds.slice(0, idx1), movedId, ...targetParentIds.slice(idx1)];
      newStates[targetParentId] = {...targetParent, params: {...targetParent.params, ids: newIds1}};

      // Update moved node parent
      const moved = state.states[movedId];
      newStates[movedId] = {...moved, parent: targetParentId};

      return {...state, dropTargetId: null, states: newStates};
    }
    
    default:
      return state;
  }
};

export default componentsReducer;
