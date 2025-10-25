"use client";

import React, { useEffect, useRef } from 'react'
import "quill/dist/quill.snow.css";
import Quill from "quill";

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <div ref={editorRef} className="min-h-36 min-w-96"></div>
  )
}

export default Editor