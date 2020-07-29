import React, {useState, useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getComponentForName, getEditorForName} from './registry';
import {buildEventHandlerWrapper, noop} from '../misc/utils';
import actions from '../actions';

const ComponentRenderer = ({component: name, id, ...rest}) => {
  const dispatch = useDispatch();
  const component = getComponentForName(name);

  const editComponent = () => dispatch(actions.component.editComponent(id));
  const handleStartEditionClickEvent = buildEventHandlerWrapper(editComponent);

  return (
    component ? React.createElement(component, {...rest, id, onClick: handleStartEditionClickEvent}) : null
  );
};

const ComponentEditor = ({component: name, ...rest}) => {
  const dispatch = useDispatch();
  const component = getEditorForName(name);
  const handleNoopClickEvent = buildEventHandlerWrapper(noop);
  const [componentEl, setComponentEl] = useState(null);

  useLayoutEffect(() => {
    dispatch(actions.component.setOverlayTarget(componentEl));
  }, [componentEl, dispatch]);

  const setRef = (e) => setComponentEl(e);

  return (
    React.createElement(component, {...rest, onClick: handleNoopClickEvent, ref: setRef})
  );
};

const EditorFrame = (props) => {
  const { active, ...rest } = props;
  const Component = active ? ComponentEditor : ComponentRenderer;

  return <Component {...rest} />;
};

export default EditorFrame;
