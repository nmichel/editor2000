import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import actions from '../../actions';
import commonStyle from '../common.module.scss';
import styles from '../EditorFrame.module.scss';

const Delete = ({id}) => {
  const dispatch = useDispatch();
  const deleteComponent = () => dispatch(actions.component.deleteComponent(id));

  return (
    <div onClick={deleteComponent} className={`${commonStyle.toolbar_button} ${styles.Cross}`}><FaTrashAlt /></div>
  )
};
  
export default Delete;
