import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComponentForName, getEditorForName } from './registry';
import styles from './EditorFrame.module.scss';
import actions from '../actions';

const Cross = ({onClick}) => <div onClick={onClick} className={`${styles.cross}`}>X</div>;

const EditorFrame = ({component: name, id, params, style}) => {
  const dispatch = useDispatch();

  const activeComponentId = useSelector((state) => state.editor);
  const edit = activeComponentId === id;
  const component = edit ? getEditorForName(name) : getComponentForName(name);

  const editComponent = useCallback(
    () => dispatch(actions.editor.editComponent(id)),
    [dispatch, id]
  )

  const cancelEdition = useCallback(
    () => dispatch(actions.editor.cancelEdition()),
    [dispatch]
  )

  const renderComponent = () => {
    return React.createElement(component, {style: style, id, params})
  }

  if (edit) {
    return (
      <div className={`${styles.EditorFrame} ${styles.edit}`}>
        <Cross onClick={cancelEdition} />
        {renderComponent()}
      </div>
    );
  }
  else {
    return (
      <div className={`${styles.EditorFrame}`} onClick={editComponent}>
        {renderComponent()}
      </div>
    );
  }
}

export default EditorFrame;
