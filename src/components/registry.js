const components = {};

const registerComponent = (declaration) => {
  const {name, ...props} = declaration;
  components[name] = props;
};

const getComponentForName = (name) => {
  return components[name].component;
}

const getEditorForName = (name) => {
  return components[name].editor;
}

export {
  registerComponent,
  getComponentForName,
  getEditorForName
}
