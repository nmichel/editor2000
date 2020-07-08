import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { registerComponent } from './registry';
import actions from '../actions';

const Image = ({params, style}) => (
  <img src={`${params.url}`} alt="img" style={style} />
);

const ImageEditor = (props) => {
  const {id} = props;
  const dispatch = useDispatch();

  const updateUrl = (url) => {
    dispatch(actions.component.setImageUrl(id, url));
  }

  return (
    <div>
      <Image {...props} />
      <TextInputField url={props.params.url} handleChangeFn={updateUrl} />
    </div>
  );
}

const TextInputField = ({url, handleChangeFn}) => {
  const [text, setText] = useState(url);

  const handleChange = (event) => setText(event.target.value)

  const handleKeyDown = (event) => {
    const code = event.keyCode;
    if (code === 13) {
      event.preventDefault();
      handleChangeFn(text);
    }
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
    </div>
  );
}

registerComponent({
  name: 'image',
  component: Image,
  editor: ImageEditor,
  default: {
    component: 'image',
    params: {
      url: 'https://picsum.photos/id/249/200/300'
    },
    style: {}
  }
});

export default Image;
