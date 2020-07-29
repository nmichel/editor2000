import Cross from '../components/controls/Cross';
import Delete from '../components/controls/Delete';
import Navigator from '../components/controls/Navigator';

const components = {};
window.components = components;

const registerComponent = (declaration) => {
  const {name, ...props} = declaration;
  let {controls = [], ...rest} = props;
  controls = [Navigator, Delete, Cross, ...controls];

  components[name] = {controls, ...rest};
};

const getRecordForName = (name) => components[name] || {};

const getComponentForName = (name) => getRecordForName(name).component;

const getEditorForName = (name) => getRecordForName(name).editor;

const getControlsForName = (name) => getRecordForName(name).controls;

const getComponentNameList = () => Object.keys(components);

const getDefaultParamsForName = (name) => getRecordForName(name).default;

const getOnsitePropsForName = (name) => getRecordForName(name).onsite;

export {
  registerComponent,
  getComponentForName,
  getEditorForName,
  getControlsForName,
  getComponentNameList,
  getDefaultParamsForName,
  getOnsitePropsForName
}
