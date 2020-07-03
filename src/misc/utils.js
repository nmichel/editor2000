export const buildEventHandlerWrapper = (fn) => {
  return (e) => {
    e.stopPropagation();
    fn()
  }
};

export const noop = () => {};
