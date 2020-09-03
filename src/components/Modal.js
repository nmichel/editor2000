import React, { useState } from 'react';
import { noop } from '../misc/utils';
import styles from './Modal.module.scss';

const ModalContext = React.createContext({
  push: noop,
  pop: noop
});

const ModalStack = ({children}) => {
  const [modals, setModals] = useState([]);

  const push = (modal) => {
    setModals([modal, ...modals])
  };

  const pop = () => {
    const [_head, ...tail] = modals; 
    setModals(tail);
  };

  const actions = {
    push,
    pop
  }

  const renderModals = () => {
    if (modals.length > 0) {
      const Comp = modals[0];
      return (
        <div className={`${styles.ModalStack}`}>
          <Comp />
        </div>
      );
    }

    return null;
  }

  return (
    <ModalContext.Provider value={actions}>
      {renderModals()}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalStack as default, ModalContext };
