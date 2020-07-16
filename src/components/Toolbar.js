import React, {useState} from 'react';
import {FaHamburger} from 'react-icons/fa';
import {getControlsForName} from './registry';
import styles from './Toolbar.module.scss';
import commonStyle from './common.module.scss';

const Toolbar = ({component: name, id}) => {
  const [showBar, setShowBar] = useState(true);
  const controls = getControlsForName(name);

  const renderTools = () =>
    controls.map((c, idx) =>
      <div className={`${styles.tool}`} key={idx}>
        {React.createElement(c, {id})}
      </div>);

  return (
    <div className={`${styles.Toolbar}`}>
      <div className={`${commonStyle.toolbar_button} ${showBar ? commonStyle.rotate : ""}`}><FaHamburger onClick={() => setShowBar(!showBar)} /></div>
      <div className={`${styles.controls} ${showBar ? styles.unfold : styles.fold}`}>
        {renderTools()}
      </div>
    </div>
  );
};

export default Toolbar;
