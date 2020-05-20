import React, { useState } from 'react';
import { getComponentForName, getEditorForName } from './registry';
import styles from './EditorFrame.module.scss';

const Cross = ({onClick}) => <div onClick={onClick} className={`${styles.cross}`}>X</div>;

const EditorFrame = ({component: name, id, params, style}) => {
  const [edit, setEdit] = useState(false);
  const component = edit ? getEditorForName(name) : getComponentForName(name);

  const renderComponent = () => {
    return React.createElement(component, {style: style, id, params})
  }

  if (edit) {
    return (
      <div className={`${styles.EditorFrame} ${styles.edit}`}>
        <Cross onClick={() => setEdit(false)} />
        {renderComponent()}
      </div>
    );
  }
  else {
    return (
      <div className={`${styles.EditorFrame}`} onClick={() => setEdit(!edit)}>
        {renderComponent()}
      </div>
    );
  }
}

export default EditorFrame;
