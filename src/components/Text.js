import React from 'react';
import { useDispatch } from "react-redux";
import { bindComponentToName, bindEditorToName } from './registry';
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

bindComponentToName('text', Text);
bindEditorToName('text', TextEditor);

export default Text;
