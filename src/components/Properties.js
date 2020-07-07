import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import actions from '../actions';
import styles from './Properties.module.scss';

const PropertyEditor = ({id, k, v}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(v);

  const handleOnValidate = (event) => {
    if (event.key === 'Enter') {
      dispatch(actions.component.setStyleValue(id, k, value));
    }
  }

  const handleOnChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div className={`${styles.PropertyEditor}`}>
      <span>{k}</span>
      <input value={value} onKeyPress={handleOnValidate} onChange={handleOnChange} />
    </div>
  );
}

const PropertyList = ({id}) => {
  const states = useSelector((state) => state.components.states);
  const component = states[id];
  const style = component.style;

  return (
    <div>
      <div>{id}</div>
      {Object.entries(style).map(([k, v]) => {
        return <PropertyEditor key={`${id}_${k}`} id={id} k={k} v={v} />;
      })}
    </div>
  );
};

const Properties = () => {
  const { t } = useTranslation();
  const activeComponentId = useSelector((state) => state.editor);
//  <h1>{t("Properties.title")}</h1>

  return (
    <div className={styles.Properties}>
      {activeComponentId && <PropertyList id={activeComponentId} />}
      {!activeComponentId && <span>{t("Properties.select_component")}</span>}
    </div>
  );
};

export default Properties;