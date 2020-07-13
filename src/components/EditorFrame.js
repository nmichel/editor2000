import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaHamburger} from 'react-icons/fa';
import { getComponentForName, getEditorForName, getControlsForName } from './registry';
import { buildEventHandlerWrapper, noop } from '../misc/utils';
import commonStyle from './common.module.scss';
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
    <div className={`${styles.EditorFrame} ${styles.edit}`} onClick={handleNoopClickEvent}>
      <Toolbar {...props} />
      {React.createElement(component, {style, id, params})}
    </div>
  );
};

const EditorFrame = (props) => {
  const activeComponentId = useSelector((state) => state.components.active);
  const { id } = props;
  const Component = activeComponentId === id ? ComponentEditor : ComponentRenderer;

  return <Component {...props} />;
};

const Toolbar = (props) => {
  const [showBar, setShowBar] = useState(true);
  const {component: name, id} = props;
  const controls = getControlsForName(name);

  const renderTools = () =>
    controls.map((c, idx) =>
      <div className={`${styles.tool}`} key={idx}>
        {React.createElement(c, {id})}
      </div>);

  return (
    <div className={`${styles.Toolbar}`}>
      <div className={`${commonStyle.toolbar_button} ${showBar ? commonStyle.rotate : ""}`}><FaHamburger onClick={() => setShowBar(!showBar)} /></div>
      <div className={`${styles.controls} ${showBar ? styles.unfold : styles.fold}`}>
        {renderTools()}
      </div>
    </div>
  );
};

export default EditorFrame;
