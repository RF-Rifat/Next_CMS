"use client";
import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

interface ContentProps {
  title: string;
  sub: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Content: React.FC<ContentProps> = ({ title, sub, defaultValue = "", onChange }) => {
  const editorOptions = {
    buttonList: [
      [
        'formatBlock',
        'bold',
        'underline',
        'italic',
        'blockquote',
        'fontColor',
        'hiliteColor',
        'textStyle',
        'removeFormat',
        'align',
        'horizontalRule',
        'list',
        'lineHeight',
        'table',
        'link',
        'image',
        'video',
        'audio',
        'codeView'
      ]
    ]
  };

  return (
    <div className="mb-4 flex items-start flex-col">
      <div className='flex im'>
        <h1 className="w-full">
          {title}
        </h1>
      </div>
      
      <div className='w-full'>
        <SunEditor 
          setOptions={editorOptions} 
          placeholder={sub}
          setContents={defaultValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Content;