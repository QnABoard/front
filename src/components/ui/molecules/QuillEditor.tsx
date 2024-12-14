import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const QuillEditor = ({ value, setValue }: QuillEditorProps) => {
  console.log(value);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'code'],
      ['clean'],
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
    'link',
    'code',
    'image',
  ];

  return (
    <ReactQuill
      theme='snow'
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
