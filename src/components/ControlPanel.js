import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FaHamburger, FaSave, FaFolderOpen, FaFile } from 'react-icons/fa';
import Properties from './Properties';
import Selector from './Selector';
import Tree from './Tree';
import actions from '../actions';
import Store from '../misc/localstorage';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showBar, setShowBar] = useState(true);
  const filenames = Store.listFilenames();

  const loadFile = (filename) => {
    console.log(`LOAD FILE ${filename}`);
    dispatch(actions.component.load(filename))
  }

  const saveFile = (filename) => {
    console.log(`SAVE TO FILE ${filename}`);
    dispatch(actions.component.save(filename))
  }

  return (
    <div className={`${styles.ControlPanel}`}>
      <div className={`${commonStyle.toolbar_button} ${showBar ? commonStyle.rotate : ""} ${styles.hamburger_button}`}><FaHamburger onClick={() => setShowBar(!showBar)} /></div>
      {showBar &&
        <>
          LOAD :
          <Selector list={filenames} onSelect={loadFile} onCancel={() => {}} />

          SAVE :
          <Selector list={filenames} onSelect={saveFile} onCancel={() => {}} />

          <Row>
            <Group>
              <Item><NewButton/></Item>
            </Group>
            <Group title="file">
            {/*
              <Item><SaveButton/></Item>
              <Item><OpenButton/></Item>
            */}
            </Group>
          </Row>

          <Row>
            <Group>
              <Properties />
            </Group>
          </Row>

          <Row>
            <Group>
              <Tree />
            </Group>
          </Row>
        </>}
    </div>
  );
};

export default ControlPanel;
