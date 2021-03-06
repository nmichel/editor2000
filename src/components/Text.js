import React from 'react';
import { useDispatch } from "react-redux";
import { registerComponent } from './registry';
import actions from '../actions';

const Text = React.forwardRef(({id, params, ...rest}, ref) => {
  return (
    <div {...rest} ref={ref}>
      {params.text}
    </div>
  );
});

const TextEditor = React.forwardRef(({id, params, ...rest}, ref) => {
  const dispatch = useDispatch();

  const updateText = (text) => {
    text =
      text
        .replace(/<div[^/]*>/g, "\n")
        .replace(/<div[^/]*\/>/g, "\n")
        .replace(/<br>/g, "\n")
        .replace(/<\/div>/g, "")
        .replace(/<\/div>/g, "")
        .replace(/<\w*\s*.*>/g, "")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
    dispatch(actions.component.setParamValue(id, 'text', text));
  }

  return (
    <div contentEditable="true" suppressContentEditableWarning="true" id={id} onBlur={(e)=>{updateText(e.currentTarget.innerHTML)}} ref={ref} {...rest}>
      {params.text}
    </div>
  );
});

registerComponent({
  name: 'text',
  component: Text,
  editor: TextEditor,
  default: {
    component: 'text',
    params: {
      text: ' ++++++ '
    },
    style: {}
  }
});

export default Text;
