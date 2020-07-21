import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import EditorFrame from './EditorFrame';
import Overlay from './Overlay';
import Toolbar from './Toolbar';
import styles from './Components.module.scss';

const Components = () => {
  const stateComponents = useSelector((state) => state.components);
  const [componentEl, setComponentEl] = useState(null);

  const setRef = (e) => setComponentEl(e);

  const renderComponents = () => stateComponents.list.map((id) => {
    const props = stateComponents.states[id];
    return <EditorFrame key={id} id={id} {...props} />
  });

  const renderToolbar = ({active, states}) => {
    const clazz = states[active].component;
    return (
      <Toolbar component={clazz} id={active} />
    );
  };

  const renderOverlay = () => {
    return stateComponents.element && <Overlay element={stateComponents.element} refElement={componentEl} />
  };

  return (
    <div className={styles.Editor}>
      <div className={styles.Header}>
        {stateComponents.active && renderToolbar(stateComponents)}
      </div>
      <div className={styles.Components} ref={setRef}>
        {renderOverlay()}
        {renderComponents()}
      </div>
    </div>
  );
};

export default Components;
