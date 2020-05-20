import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Components.module.scss';
import EditorFrame from './EditorFrame';

const Components = () => {
  const components = useSelector((state) => state.components);
  const { t } = useTranslation();

  const renderComponents = () => components.map((props) => <EditorFrame key={props.id} {...props} />);

  return (
    <div className={styles.Components}>
      <h1>{t("Editor.title")}</h1>
      {renderComponents()}
    </div>
  );
};

export default Components;
