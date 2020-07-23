import React, { useState } from 'react';
import { registerComponent } from './registry';

const Image = ({params, ...rest}) => (
  <img src={`${params.url}`} alt="img" {...rest} />
);

const ImageEditor = React.forwardRef(({params, ...rest}, ref) => {
  return (
    <img src={`${params.url}`} alt="img" ref={ref} {...rest} />
  );
});

registerComponent({
  name: 'image',
  component: Image,
  editor: ImageEditor,
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
