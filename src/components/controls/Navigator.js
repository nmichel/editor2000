import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from 'react-icons/fa';
import {getComponentNameList} from '../registry';
import actions from '../../actions';
import styles from '../common.module.scss';

const Navigator = ({id}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigatePrev = () => dispatch(actions.component.navigatePrev(id));
  const navigateNext = () => dispatch(actions.component.navigateNext(id));
  const navigateUp = () => dispatch(actions.component.navigateUp(id));
  const navigateDown = () => dispatch(actions.component.navigateDown(id));

  return (
    <div className={`${styles.toolbar_button_section}`}>
      <div className={`${styles.toolbar_button_section_title}`}>{t('navigate')}</div>
      <div className={`${styles.toolbar_button_group}`}>
        <div className={`${styles.toolbar_button}`} onClick={navigatePrev}>
          <FaRegArrowAltCircleLeft />
        </div>
        <div className={`${styles.toolbar_button}`} onClick={navigateNext}>
        <FaRegArrowAltCircleRight />
        </div>
        <div className={`${styles.toolbar_button}`} onClick={navigateUp}>
          <FaRegArrowAltCircleUp />
        </div>
        <div className={`${styles.toolbar_button}`} onClick={navigateDown}>
        <FaRegArrowAltCircleDown />
        </div>
      </div>
    </div>
  );
};

export default Navigator;