import React from 'react';
import {useTranslation} from 'react-i18next';
import commonStyle from '../common.module.scss';

const YesNo = ({onYes, onNo}) => {
  const {t} = useTranslation();

  return (
    <div className={`${commonStyle.yesno} ${commonStyle.toolbar_button_group}`}>
      <div className={`${commonStyle.toolbar_button}`} onClick={onYes}>{t('YesNo.yes')}</div>
      <div className={`${commonStyle.toolbar_button}`} onClick={onNo}>{t('YesNo.no')}</div>
    </div>
  );
}

export default YesNo;
