import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getOnsitePropsForName} from './registry';
import ControlPanel from './ControlPanel';
import EditorFrame from './EditorFrame';
import Overlay from './Overlay';
import Toolbar from './Toolbar';
import styles from './Components.module.scss';
import actions from '../actions';

const ComponentOnsiteEditor = ({refElement}) => {
  const dispatch = useDispatch();
  const element = useSelector((state) => state.components.element);
  const active = useSelector((state) => state.components.active);
  const component = useSelector((state) => state.components.states[state.components.active]);

  const renderOnSiteEditors = () => {
    const clazz = component.component;
    const onsite = getOnsitePropsForName(clazz) || [];
  
    return onsite.map(([param, type], idx) => {
      return (
        <TextInputField key={idx} url={component.params[param]} handleChangeFn={(text) => {
          dispatch(actions.component.setParamValue(active, param, text));
        }}/>
      );
    });
  };

  return (
    element && component
      ? <Overlay element={element} refElement={refElement}>
          {renderOnSiteEditors()}
        </Overlay>
      : null
  )
};

const ComponentToolbar = () => {
  const active = useSelector((state) => state.components.active);
  const component = useSelector((state) => state.components.states[state.components.active]);

  return (
    active && component ? <Toolbar component={component.component} id={active} /> : null
  );
};

const Components = () => {
  const stateComponentsRoot = useSelector((state) => state.components.root);
  const stateComponentsStatesRoot = useSelector((state) => state.components.states[state.components.root]);
  const [componentEl, setComponentEl] = useState(null);

  const setRef = (e) => setComponentEl(e);

  return (
    <div className={styles.Editor}>
      <div className={styles.Header}>
        <ComponentToolbar />
      </div>
      <div className={styles.Components} ref={setRef}>
        <ComponentOnsiteEditor refElement={componentEl} />
        {stateComponentsStatesRoot && <EditorFrame key={stateComponentsRoot} id={stateComponentsRoot} {...stateComponentsStatesRoot} />}
      </div>
      <ControlPanel />
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
