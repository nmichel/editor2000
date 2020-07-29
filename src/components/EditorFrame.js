import React, {useState, useLayoutEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {getComponentForName, getEditorForName} from './registry';
import {buildEventHandlerWrapper, noop} from '../misc/utils';
import actions from '../actions';

const EditorFrame = ({component: name, id, active, ...rest}) => {
  const dispatch = useDispatch();
  const component = active ? (getEditorForName(name) || getComponentForName(name)) : getComponentForName(name);
  const [componentEl, setComponentEl] = useState(null);

  useLayoutEffect(() => {
    if (active) {
      dispatch(actions.component.setOverlayTarget(componentEl));
    }
  }, [componentEl, dispatch, active]);

  const onClick = useMemo(() => {
    if (active) {
      return buildEventHandlerWrapper(noop);
    }
    else {
      const editComponent = () => dispatch(actions.component.editComponent(id));
      return buildEventHandlerWrapper(editComponent);
    }
  }, [active, id, dispatch]);

  const setRef = (e) => setComponentEl(e);

  return React.createElement(component, {...rest, id: id, onClick: onClick, ref: setRef});
};

export default EditorFrame;
