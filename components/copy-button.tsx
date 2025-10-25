"use client";

import React from 'react'
import toast from 'react-hot-toast';
import { FaClipboard } from 'react-icons/fa6';

const CopyButton = ({text}: {text: string}) => {
  return (
    <button onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success(`${text} copied to clipboard!`);
      }} className="p-2 cursor-pointer rounded">
      <FaClipboard size={20}/>
    </button>
  )
}

export default CopyButton