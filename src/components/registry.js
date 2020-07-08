import Cross from '../components/controls/Cross';

const components = {};
window.components = components;

const registerComponent = (declaration) => {
  const {name, ...props} = declaration;
  let {controls = [], ...rest} = props;
  controls = [...controls, Cross];

  components[name] = {controls, ...rest};
};

const getRecordForName = (name) => components[name];

const getComponentForName = (name) => getRecordForName(name).component;

const getEditorForName = (name) => getRecordForName(name).editor;

const getControlsForName = (name) => getRecordForName(name).controls;

const getComponentNameList = () => Object.keys(components);

const getDefaultParamsForName = (name) => getRecordForName(name).default;

export {
  registerComponent,
  getComponentForName,
  getEditorForName,
  getControlsForName,
  getComponentNameList,
  getDefaultParamsForName
}
