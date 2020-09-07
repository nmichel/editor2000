import React, { useState, useContext } from 'react';
import styles from './Modal.module.scss';

const ModalContext = React.createContext({ push: undefined, pop: undefined });
ModalContext.displayName = 'ModalContext';

const ModalStack = ({children}) => {
  const [modals, setModals] = useState([]);

  const push = (modal) => {
    setModals((prevModals ) => [modal, ...prevModals]);
  };

  const pop = () => {
    setModals(([_head, ...tail]) => [...tail]);
  };

  const actions = {
    push,
    pop
  };

  const renderModals = () => {
    if (modals.length > 0) {
      const Comp = modals[0];
      return (
        <div className={`${styles.ModalStack}`}>
          <Comp />
        </div>
      );
    }
  };

  return (
    <ModalContext.Provider value={actions}>
      {renderModals()}
      {children}
    </ModalContext.Provider>
  );
};

const useStack = () => {
  const actions = useContext(ModalContext);
  return [actions.push, actions.pop];
}

export { ModalStack as default, useStack };
