import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FaHamburger, FaSave, FaFolderOpen, FaFile } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Properties from './Properties';
import Selector from './Selector';
import ConfirmDialog from './ConfirmDialog';
import Tree from './Tree';
import { useStack } from './Modal';
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
  const [push, pop] = useStack();
  const [saveToFilename, setSaveToFilename] = useState(null);

  const confirmSaveFile = () => {
    pop();
    pop();
    saveToFilename && dispatch(actions.component.save(saveToFilename));
  }

  const confirmDialogComponent = () => <ConfirmDialog text={"confirm"} onConfirm={confirmSaveFile} onCancel={() => pop()} />

  const setFilenameToSave = (filename) => {
    setSaveToFilename(filename);
    push(confirmDialogComponent);
  }

  const filenames = Store.listFilenames();
  const selectorComponent = () => <Selector list={filenames} onSelect={setFilenameToSave} onCancel={() => pop()} />
  const showSelectorDialog = () => push(selectorComponent);

  return (
    <div className={`${styles.Button}`} onClick={showSelectorDialog}>
      <FaSave />
    </div>
  );
};

const OpenButton = () => {
  const dispatch = useDispatch();
  const [push, pop] = useStack();

  const filenames = Store.listFilenames();
  const loadFile = (filename) => {
    pop();
    dispatch(actions.component.load(filename))
  }

  const component = () => <Selector list={filenames} onSelect={loadFile} onCancel={() => pop()} />

  const onClick = () => {
    push(component);
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
