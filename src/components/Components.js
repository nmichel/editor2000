import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getOnsitePropsForName} from './registry';
import EditorFrame from './EditorFrame';
import Overlay from './Overlay';
import Toolbar from './Toolbar';
import styles from './Components.module.scss';
import actions from '../actions';

const Components = () => {
  const dispatch = useDispatch();
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

  const renderOnSiteEditors = () => {
    const id = stateComponents.active;
    const clazz = stateComponents.states[id].component;
    const onsite = getOnsitePropsForName(clazz) || [];
  
    return onsite.map(([param, type]) => {
      return (
        <TextInputField url={stateComponents.states[id].params[param]} handleChangeFn={(text) => {
          dispatch(actions.component.setParamValue(id, param, text));
        }}/>
      );
    });
  };

  const renderOverlay = () => {
    return (
      stateComponents.element &&
      <Overlay element={stateComponents.element} refElement={componentEl}>
        {renderOnSiteEditors()}
      </Overlay>
    );
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

const TextInputField = ({url, handleChangeFn}) => {
  const [text, setText] = useState(url);

  useEffect(() => {
    setText(url);
  }, [url]);

  const handleChange = (event) => setText(event.target.value)

  const handleKeyDown = (event) => {
    const code = event.keyCode;
    if (code === 13) {
      event.preventDefault();
      handleChangeFn(text);
    }
  }

  const style = {
    border: '1px dashed',
    borderRadius: '0',
    outline: 'none',
    padding: '10px',
    pointerEvents: 'all',
    zIndex: 2
  };

  return (
    <input style={style} type="text" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
  );
}

export default Components;
