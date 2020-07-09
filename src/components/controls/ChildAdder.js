import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FaStepBackward, FaStepForward} from 'react-icons/fa';
import {getComponentNameList} from '../registry';
import actions from '../../actions';
import styles from '../common.module.scss';

const TypeSelector = ({chooseComponent})  => {
  const {t} = useTranslation();
  return (
    <select onChange={(e) => chooseComponent(e.target.value)}>
      <option value="">{t('choose a component')}</option>
      {getComponentNameList().map((name, idx) => <option key={idx} value={name}>{name}</option>)}
    </select>
  );
}

const ChildAdder = ({id}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [componentName, setComponentName] = useState('');
  const chooseComponent = (name) => {
    setComponentName(name);
  }

  const isValidComponent = () => componentName !== '';

  const prependComponent = () => dispatch(actions.component.prependComponent(id, componentName));
  const appendComponent = () => dispatch(actions.component.appendComponent(id, componentName));

  return (
    <div className={`${styles.toolbar_button_section}`}>
      <div className={`${styles.toolbar_button_section_title}`}>{t('add')}</div>
      <div className={`${styles.toolbar_button_group}`}>
        <div className={`${styles.toolbar_button} ${isValidComponent() ? '' : styles.inactive}`} onClick={isValidComponent() ? prependComponent : undefined}>
          <FaStepBackward />
        </div>
        <div className={`${styles.toolbar_button}`}>
          <TypeSelector chooseComponent={chooseComponent} />
        </div>
        <div className={`${styles.toolbar_button} ${isValidComponent() ? '' : styles.inactive}`} onClick={isValidComponent() ? appendComponent : undefined}>
        <FaStepForward />
        </div>
      </div>
    </div>
  );
};

export default ChildAdder;