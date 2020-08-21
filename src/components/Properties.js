import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
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

  const deleteProperty = () => {
    dispatch(actions.component.deleteStyle(id, k));
  }

  return (
    <div className={`${styles.PropertyEditor}`}>
      <span>{k}</span>
      <input value={value} onKeyPress={handleOnValidate} onChange={handleOnChange} />
      <button onClick={deleteProperty}><FaTrashAlt /></button>
    </div>
  );
}

const PropertyList = ({id}) => {
  const style = useSelector((state) => state.components.states[id].style);

  return (
    <div>
      <div>{id}</div>
      <div className={`${styles.PropertyList}`}>
        {Object.entries(style).map(([k, v]) => {
          return <PropertyEditor key={`${id}_${k}`} id={id} k={k} v={v} />;
        })}
      </div>
      <AddPropertyPanel id={id} />
    </div>
  );
};

const Properties = () => {
  const { t } = useTranslation();
  const activeComponentId = useSelector((state) => state.components.active);
//  <h1>{t("Properties.title")}</h1>

  return (
    <div className={styles.Properties}>
      {activeComponentId && <PropertyList id={activeComponentId} />}
      {!activeComponentId && <span className={`${styles.LabelSelectComponent}`}>{t("Properties.select_component")}</span>}
    </div>
  );
};

const AddPropertyPanel = ({id}) => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState("property");
  const [value, setValue] = useState("value");

  const addProperty = () => {
    dispatch(actions.component.addStyle(id, property, value))
  }

  return (
    <div className={`${styles.PropertyAdder}`}>
      <input value={property} onChange={(e) => setProperty(e.target.value)} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addProperty}><FaPlusCircle/></button>
    </div>
  );
}

export default Properties;