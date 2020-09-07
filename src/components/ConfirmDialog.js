import React from 'react';
import styles from './ConfirmDialog.module.scss';

const ConfirmDialog = ({ text, onConfirm, onCancel }) => {
  return (
    <div className={`${styles.ConfigDialog}`}>
      <div>{text}</div>
      <div className={`${styles.ButtonBar}`}>
        <div className={`${styles.Button}`} onClick={onConfirm}>Select</div>
        <div className={`${styles.Button}`} onClick={onCancel}>Cancel</div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
