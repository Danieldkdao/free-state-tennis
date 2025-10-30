'use client';

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const Editor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
      quillRef.current.on("text-change", () => {
        if (quillRef.current) {
          console.log(quillRef.current.root.innerHTML);
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} className="min-h-36 max-h-40 max-w-96 w-full overflow-y-auto"></div>;
};

export default Editor;