import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';
import {buildEventHandlerWrapper, noop} from '../misc/utils';
import styles from './Tree.module.scss';

const Tree = () => {
  const dispatch = useDispatch();
  const tree = useSelector(state => state.components);
  const { root, active, states } = tree;

  const renderSubcomponents = (id) => {
    return (
      <div className={`${styles.Subcomponents}`}>
        {states[id].params.ids.map((subId) => {
          return renderComponent(subId);
        })}
      </div>
    );
  };

  const renderComponent = (id) => {
    const compoDesc = states[id];

    const onClick = () => {
      const editComponent = () => dispatch(actions.component.editComponent(id));
      return buildEventHandlerWrapper(editComponent);
    };
  
    return (
      <div className={`${styles.Component}`} onClick={onClick()}>
        <span className={active === id ? `${styles.active}` : ""}>{id}</span>
        {compoDesc.params.ids && renderSubcomponents(id)}
      </div>
    );
  }

  return (
    <div className={`${styles.Tree}`}>
      {renderComponent(root)}
    </div>
  );
};

export default Tree;
