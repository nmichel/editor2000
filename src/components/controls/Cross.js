import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';
import { buildEventHandlerWrapper } from '../../misc/utils';
import actions from '../../actions';
import commonStyle from '../common.module.scss';
import styles from '../EditorFrame.module.scss';

const Cross = () => {
  const dispatch = useDispatch();
  const cancelEdition = () => dispatch(actions.component.cancelEdition());
  const clickEventHandler = buildEventHandlerWrapper(cancelEdition);

  return (
    <div onClick={clickEventHandler} className={`${commonStyle.toolbar_button} ${styles.Cross}`}><FaTimesCircle /></div>
  )
};
  
export default Cross;
