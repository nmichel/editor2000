import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Components.module.scss';
import EditorFrame from './EditorFrame';
import Toolbar from './Toolbar';

const Components = () => {
  const list = useSelector((state) => state.components.list);
  const stateComponents = useSelector((state) => state.components);
  const states = useSelector((state) => state.components.states);
  const { t } = useTranslation();

  const renderComponents = () => list.map((id) => {
    const props = states[id];
    return <EditorFrame key={id} id={id} {...props} />
  });

  const renderToolbar = ({active, states}) => {
    const clazz = states[active].component;
    return (
      <Toolbar component={clazz} id={active} />
    );
  };

  return (
    <div className={styles.Editor}>
      <div className={styles.Header}>
        <h1>{t("Editor.title")}</h1>
        {stateComponents.active && renderToolbar(stateComponents)}
      </div>
      <div className={styles.Components}>
        {renderComponents()}
      </div>
    </div>
  );
};

export default Components;
