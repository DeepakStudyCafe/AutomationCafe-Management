'use client';

import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize value only once on mount to avoid cursor jumping
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const addLink = () => {
    const url = prompt('Enter link URL:');
    if (url) execCommand('createLink', url);
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col h-full">
      <div className="bg-slate-50 border-b p-2 flex gap-1 flex-wrap">
        <button type="button" onClick={() => execCommand('bold')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('italic')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('underline')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Underline"><Underline className="w-4 h-4" /></button>
        <div className="w-px h-6 bg-slate-300 mx-1 self-center"></div>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Bullet List"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
        <div className="w-px h-6 bg-slate-300 mx-1 self-center"></div>
        <button type="button" onClick={addLink} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Add Link"><Link className="w-4 h-4" /></button>
        <button type="button" onClick={addImage} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Add Image"><ImageIcon className="w-4 h-4" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="flex-1 p-4 outline-none min-h-[200px] overflow-y-auto prose max-w-none text-sm"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}
