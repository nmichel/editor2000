import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getComponentForName, getEditorForName} from './registry';
import {buildEventHandlerWrapper, noop} from '../misc/utils';
import styles from './EditorFrame.module.scss';
import actions from '../actions';

const ComponentRenderer = ({component: name, id, params, style}) => {
  const dispatch = useDispatch();
  const component = getComponentForName(name);

  const editComponent = () => dispatch(actions.component.editComponent(id));
  const handleStartEditionClickEvent = buildEventHandlerWrapper(editComponent);

  return (
    React.createElement(component, {style, id, params, onClick: handleStartEditionClickEvent})
  );
};

const ComponentEditor = (props) => {
  const {component: name, id, params, style} = props;
  const component = getEditorForName(name);
  const handleNoopClickEvent = buildEventHandlerWrapper(noop);

  return (
    React.createElement(component, {className: `${styles.EditorFrame} ${styles.edit}`, style, id, params, onClick: handleNoopClickEvent})
  );
};

const EditorFrame = (props) => {
  const activeComponentId = useSelector((state) => state.components.active);
  const { id } = props;
  const Component = activeComponentId === id ? ComponentEditor : ComponentRenderer;

  return <Component {...props} />;
};

export default EditorFrame;
