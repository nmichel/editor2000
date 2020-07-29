import React from 'react';
import { registerComponent } from './registry';

const Image = React.forwardRef(({params, ...rest}, ref) => {
  return (
    <img src={`${params.url}`} alt="img" ref={ref} {...rest} />
  );
});

registerComponent({
  name: 'image',
  component: Image,
  onsite: [
    ['url', 'text']
  ],
  default: {
    component: 'image',
    params: {
      url: 'https://picsum.photos/id/249/200/300'
    },
    style: {}
  }
});

export default Image;
