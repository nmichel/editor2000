import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComponentForName, getEditorForName } from './registry';
import { buildEventHandlerWrapper, noop } from '../misc/utils';
import styles from './EditorFrame.module.scss';
import actions from '../actions';

const Cross = () => {
  const dispatch = useDispatch();
  const cancelEdition = useCallback(
    () => dispatch(actions.editor.cancelEdition()),
    [dispatch]
  )
  const clickEventHandler = buildEventHandlerWrapper(cancelEdition);

  return (
    <div onClick={clickEventHandler} className={`${styles.cross}`}>X</div>
  )
};

const ComponentRenderer = ({component: name, id, params, style}) => {
  const dispatch = useDispatch();
  const component = getComponentForName(name);

  const editComponent = useCallback(
    () => dispatch(actions.editor.editComponent(id)),
    [dispatch, id]
  )

  const handleStartEditionClickEvent = buildEventHandlerWrapper(editComponent);

  return (
    <div onClick={handleStartEditionClickEvent}>
      {React.createElement(component, {style: style, id, params})}
    </div>
  );
};

const ComponentEditor = ({component: name, id, params, style}) => {
  const component = getEditorForName(name);
  const handleNoopClickEvent = buildEventHandlerWrapper(noop);

  return (
    <div className={`${styles.EditorFrame} ${styles.edit}`} onClick={handleNoopClickEvent}>
      <Cross />
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

export default EditorFrame;
