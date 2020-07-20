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

const Layout = ({params, ...rest}) => {
  const states = useSelector((state) => state.components.states);

  return (
    <div className={`${styles.Layout}`} {...rest}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
};

const LayoutEditor = React.forwardRef(({params, className = '', ...rest}, ref) => {
  const states = useSelector((state) => state.components.states);

  return (
    <div className={`${className} ${styles.Layout}`} ref={ref} {...rest}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
});

registerComponent({
  name: 'layout',
  component: Layout,
  editor: LayoutEditor,
  controls: [ChildAdder],
  properties: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  default: {
    component: 'layout',
    params: {
      ids: []
    },
    style: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
});

export default Layout;
