import React from 'react';
import {useSelector} from "react-redux";
import {registerComponent} from './registry';
import EditorFrame from './EditorFrame';
import styles from './Layout.module.scss';
import ChildAdder from './controls/ChildAdder';

const renderSubcomponents = (ids, states) => {
  return ids.map((id) => {
    const props = states[id];
    return <EditorFrame key={id} id={id} {...props} />
  })
}

const Layout = ({params, style}) => {
  const states = useSelector((state) => state.components.states);

  return (
    <div className={`${styles.Layout}`} style={style}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
};

const LayoutEditor = ({params, style}) => {
  const states = useSelector((state) => state.components.states);

  return (
    <div className={`${styles.Layout}`} style={style}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
}

registerComponent({
  name: 'layout',
  component: Layout,
  editor: LayoutEditor,
  controls: [ChildAdder],
  properties: {
    flexDirection: 'column'
  },
  default: {
    component: 'layout',
    params: {
      ids: []
    },
    style: {}
  }
});

export default Layout;
