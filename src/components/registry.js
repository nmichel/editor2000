const components = {};
const editors = {};

const bindComponentToName = (name, component) => {
  components[name] = component;
}

const getComponentForName = (name) => {
  return components[name];
}

const bindEditorToName = (name, editor) => {
  editors[name] = editor;
}

const getEditorForName = (name) => {
  return editors[name];
}

export {
  bindComponentToName,
  getComponentForName,
  bindEditorToName,
  getEditorForName
}
