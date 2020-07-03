import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComponentForName, getEditorForName } from './registry';
import { buildEventHandlerWrapper, noop } from '../misc/utils';
import styles from './EditorFrame.module.scss';
import actions from '../actions';

const Cross = ({onClick}) => {
  const clickEventHandler = buildEventHandlerWrapper(onClick);

  return (
    <div onClick={clickEventHandler} className={`${styles.cross}`}>X</div>
  )};

const EditorFrame = ({component: name, id, params, style}) => {
  const dispatch = useDispatch();
  const activeComponentId = useSelector((state) => state.editor);
  const edit = activeComponentId === id;
  const component = edit ? getEditorForName(name) : getComponentForName(name);

  const editComponent = useCallback(
    () => dispatch(actions.editor.editComponent(id)),
    [dispatch, id]
  )

  const handleStartEditionClickEvent = buildEventHandlerWrapper(editComponent);
  const handleNoopClickEvent = buildEventHandlerWrapper(noop);

  const cancelEdition = useCallback(
    () => dispatch(actions.editor.cancelEdition()),
    [dispatch]
  )

  const renderComponent = () => {
    return React.createElement(component, {style: style, id, params})
  }

  if (edit) {
    return (
      <div className={`${styles.EditorFrame} ${styles.edit}`} onClick={handleNoopClickEvent}>
        <Cross onClick={cancelEdition} />
        {renderComponent()}
      </div>
    );
  }
  else {
    return (
      <div className={`${styles.EditorFrame}`} onClick={handleStartEditionClickEvent}>
        {renderComponent()}
      </div>
    );
  }
}

export default EditorFrame;
