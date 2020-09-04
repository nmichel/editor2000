import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Selector.module.scss';

const Selector = ({list, onSelect, onCancel}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const onListEntryClicked = (id) => {
    setSelected(list[id]);
    setSelectedId(id);
  }

  return (
    <div className={`${styles.Selector}`}>
      <div className={`${styles.List}`}>
        {list.map((item, idx) => <SelectorListEntry key={idx} id={idx} text={item} onSelected={onListEntryClicked} isActive={selectedId === idx}/>)}
      </div>

      <div className={`${styles.SelectFileBar}`}>
        File <input value={selected} onChange={(e) => setSelected(e.target.value) }/>  
      </div>

      <div className={`${styles.ButtonBar}`}>
        <div onClick={() => onSelect(selected)}>Select</div>
        <div onClick={onCancel}>Cancel</div>
      </div>
    </div>
  );
}

const SelectorListEntry = ({text, id, onSelected, isActive}) => {
  return (
    <div className={`${styles.ListItem} ${isActive ? styles.active : ""}`} onClick={() => onSelected(id)}>{text}</div>
  );
}

export default Selector;
