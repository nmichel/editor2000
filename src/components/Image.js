import React, { useState } from 'react';
import { registerComponent } from './registry';

const Image = ({params, ...rest}) => (
  <img src={`${params.url}`} alt="img" {...rest} />
);

const ImageEditor = React.forwardRef((props, ref) => {
  const {id, params, style, ...rest} = props;

  const wrapperStyle = {
    display: 'flex',
    position: 'relative'
  };

  return (
    <div style={wrapperStyle} ref={ref} {...rest} >
      <Image params={params} style={style} />
    </div>
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
