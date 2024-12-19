import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null); // React ref 사용

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'code-block',
  ];

  return (
    <ReactQuill
      ref={quillRef} // ref를 설정
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme='snow'
    />
  );
};

export default RichTextEditor;
