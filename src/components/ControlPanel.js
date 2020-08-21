import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FaHamburger, FaSave, FaFolderOpen, FaFile } from 'react-icons/fa';
import Properties from './Properties';
import actions from '../actions';
import commonStyle from './common.module.scss';
import styles from './ControlPanel.module.scss';

const Row = ({children}) => {
  return (
    <div className={`${styles.Row}`}>
      {children}
    </div>
  );
};

const Group = ({title = null, children}) => {
  return (
    <div className={`${styles.Group}`}>
      {title && <div className={`${styles.GroupTitle}`}>{title}</div>}
      <div className={`${styles.GroupContent}`}>
        {children}
      </div>
    </div>
  );
};

const Item = ({children}) => {
  return (
    <div className={`${styles.Item}`}>
      {children}
    </div>
  );
};

const SaveButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.component.save());
  };

  return (
    <div className={`${styles.Button}`} onClick={onClick}>
      <FaSave />
    </div>
  );
};

const OpenButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.component.load());
  };

  return (
    <div className={`${styles.Button}`} onClick={onClick}>
      <FaFolderOpen />
    </div>
  );
};

const NewButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.component.reset());
  };

  return (
    <div className={`${styles.Button}`} onClick={onClick}>
      <FaFile />
    </div>
  );
};

const ControlPanel = () => {
  const { t } = useTranslation();
  const [showBar, setShowBar] = useState(true);

  return (
    <div className={`${styles.ControlPanel}`}>
      <div className={`${commonStyle.toolbar_button} ${showBar ? commonStyle.rotate : ""} ${styles.hamburger_button}`}><FaHamburger onClick={() => setShowBar(!showBar)} /></div>
      {showBar &&
        <>
          <Row>
            <Group>
              <Item><NewButton/></Item>
            </Group>
            <Group title="file">
              <Item><SaveButton/></Item>
              <Item><OpenButton/></Item>
            </Group>
          </Row>

          <Row>
            <Properties />
          </Row>
        </>}
    </div>
  );
};

export default ControlPanel;
