import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import actions from '../actions';
import styles from "./App.module.scss";
import Books from './Books';
import Components from './Components';

import './Text';
import './Image';
import './Layout';

const LangButton = ({lang}) => {
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(actions.lang.setLang(lang))}>
      {lang}
    </div>
  );
}

const LangSelector = () => {
  const langs = ['fr', 'en'];
  const renderLangButtons = () => {
    return langs.map((lang) => <LangButton lang={lang} />)
  };

  return (
    <div>
      {renderLangButtons()}
    </div>
  );
}

function App() {
  const lang = useSelector((state) => state.lang);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div className={styles.App}>
      <LangSelector />
      <Books />
      <Components />
    </div>
  );
}

export default App;
