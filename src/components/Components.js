import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Components.module.scss';
import EditorFrame from './EditorFrame';

const Components = () => {
  const list = useSelector((state) => state.components.list);
  const states = useSelector((state) => state.components.states);
  const { t } = useTranslation();

  const renderComponents = () => list.map((id) => {
    const props = states[id];
    return <EditorFrame key={id} id={id} {...props} />
  });

  return (
    <div className={styles.Components}>
      <h1>{t("Editor.title")}</h1>
      {renderComponents()}
    </div>
  );
};

export default Components;
