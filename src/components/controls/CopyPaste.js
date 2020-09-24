import React from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FaCopy, FaPaste} from 'react-icons/fa';
import actions from '../../actions';
import styles from '../common.module.scss';

const CopyPaste = ({id}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const copyComponent = () => dispatch(actions.component.copyComponent(id));
  const pasteComponent = () => dispatch(actions.component.pasteComponent(id));

  return (
    <div className={`${styles.toolbar_button_section}`}>
      <div className={`${styles.toolbar_button_section_title}`}>{t('CopyPaste.title')}</div>
      <div className={`${styles.toolbar_button_group}`}>
        <div className={`${styles.toolbar_button}`} onClick={copyComponent}>
          <FaCopy />
        </div>
        <div className={`${styles.toolbar_button}`} onClick={pasteComponent}>
        <FaPaste />
        </div>
      </div>
    </div>
  );
};

export default CopyPaste;