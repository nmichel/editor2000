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

const Layout = React.forwardRef(({params, ...rest}, ref) => {
  return (
    <div ref={ref} {...rest}>
      {renderSubcomponents(params.ids)}
    </div>
  );
});

registerComponent({
  name: 'layout',
  component: Layout,
  controls: [ChildAdder],
  default: {
    component: 'layout',
    params: {
      ids: []
    },
    style: {
      alignItems: {active: true, value: 'center'},
      display: {active: true, value: 'flex'},
      flexDirection: {active: true, value: 'column'}
    }
  }
});

export default Layout;
