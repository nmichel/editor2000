import React from 'react';
import {useSelector} from "react-redux";
import {registerComponent} from './registry';
import EditorFrame from './EditorFrame';
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
    <div {...rest}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
};

const LayoutEditor = React.forwardRef(({params, ...rest}, ref) => {
  const states = useSelector((state) => state.components.states);

  return (
    <div ref={ref} {...rest}>
      {renderSubcomponents(params.ids, states)}
    </div>
  );
});

registerComponent({
  name: 'layout',
  component: Layout,
  editor: LayoutEditor,
  controls: [ChildAdder],
  default: {
    component: 'layout',
    params: {
      ids: []
    },
    style: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column'
    }
  }
});

export default Layout;
