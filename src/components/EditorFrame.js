import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComponentForName, getEditorForName, getControlsForName } from './registry';
import { buildEventHandlerWrapper, noop } from '../misc/utils';
import styles from './EditorFrame.module.scss';
import actions from '../actions';

const ComponentRenderer = ({component: name, id, params, style}) => {
  const dispatch = useDispatch();
  const component = getComponentForName(name);

  const editComponent = () => dispatch(actions.editor.editComponent(id));
  const handleStartEditionClickEvent = buildEventHandlerWrapper(editComponent);

  return (
    <div onClick={handleStartEditionClickEvent}>
      {React.createElement(component, {style: style, id, params})}
    </div>
  );
};

const ComponentEditor = (props) => {
  const {component: name, id, params, style} = props;
  const component = getEditorForName(name);
  const handleNoopClickEvent = buildEventHandlerWrapper(noop);

  return (
    <div className={`${styles.EditorFrame} ${styles.edit}`} onClick={handleNoopClickEvent}>
      <Toolbar {...props} />
      {React.createElement(component, {style: style, id, params})}
    </div>
  );
};

const EditorFrame = (props) => {
  const activeComponentId = useSelector((state) => state.editor);
  const { id } = props;
  const Component = activeComponentId === id ? ComponentEditor : ComponentRenderer;

  return <Component {...props} />;
};

const Toolbar = (props) => {
  const {component: name, id} = props;
  const controls = getControlsForName(name);

  const renderTools = () =>
    controls.map((c, idx) =>
      <div className={`${styles.tool}`} key={idx}>
        {React.createElement(c, {id})}
      </div>);

  return (
    <div className={`${styles.Toolbar}`}>
      {renderTools()}
    </div>
  );
};

export default EditorFrame;
