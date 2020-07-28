import React from 'react';
import {useSelector} from "react-redux";
import {registerComponent} from './registry';
import EditorFrame from './EditorFrame';
import ChildAdder from './controls/ChildAdder';

const Subcomponent = ({id}) => {
  const props = useSelector((state) => state.components.states[id]);

  return (
    <EditorFrame id={id} {...props} />
  );
};

const renderSubcomponents = (ids) => {
  return ids.map((id) => {
    return <Subcomponent key={id} id={id} />
  })
}

const Layout = ({params, ...rest}) => {
  return (
    <div {...rest}>
      {renderSubcomponents(params.ids)}
    </div>
  );
};

const LayoutEditor = React.forwardRef(({params, ...rest}, ref) => {
  return (
    <div ref={ref} {...rest}>
      {renderSubcomponents(params.ids)}
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
