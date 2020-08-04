export function createAction(name, fn = () => ({})) {
  // No arrow function here !
  // Parameters must be bound at run time, not lexically.
  const actionFn = function() {
    const res = fn(...arguments);
    return {...res, type: name};
  }
  actionFn.toString = () => name;

  return actionFn;
}

export function createReducer(initialState, reducers) {
  return (state = initialState, action) => {
    const reducerFn = reducers[action.type];
    return reducerFn ? reducerFn(state, action) : state;
  }
}

export function cascadeReducers() {
  const fns = [...arguments];
  return (state, action) =>
    fns.reduce((stateIn, reducer) => reducer(stateIn, action), state)
}
