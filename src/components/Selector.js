import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Selector.module.scss';

const Selector = ({list, onSelect, onCancel}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');

  const onListEntryClicked = (id) => {
    setSelected(list[id]);
  }

  return (
    <div className={`${styles.Selector}`}>
      <div className={`${styles.List}`}>
        {list.map((item, idx) =>  <SelectorListEntry key={idx} id={idx} text={item} onSelected={onListEntryClicked} />)}
      </div>

      <input value={selected} onChange={(e) => setSelected(e.target.value) }/>  

      <div onClick={() => {console.log('ACTION !'); onSelect(selected)}}>Select</div>
      <div onClick={onCancel}>Cancel</div>
    </div>
  );
}

const SelectorListEntry = ({text, id, onSelected}) => {
  return (
    <div className={`${styles.ListItem}`} onClick={() => onSelected(id)}>{text}</div>
  );
}

export default Selector;
