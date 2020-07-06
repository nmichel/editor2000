import React from 'react';
import { useDispatch } from "react-redux";
import { registerComponent } from './registry';
import actions from '../actions';

const Text = ({params, style}) => (
  <div style={style}>
    {params.text}
  </div>
);

const TextEditor = ({id, params, style}) => {
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
    dispatch(actions.component.setText(id, text));
  }

  return (
    <div contentEditable="true" suppressContentEditableWarning="true" style={style} onBlur={(e)=>{updateText(e.currentTarget.innerHTML)}}>
      {params.text}
    </div>
  );
}

registerComponent({
  name: 'text',
  component: Text,
  editor: TextEditor
});

export default Text;
