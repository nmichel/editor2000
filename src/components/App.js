import React from 'react';
import styles from "./App.module.scss";
import Books from './Books';

function App() {
  return (
    <div className={styles.App}>
      <Books />
    </div>
  );
}

export default App;
