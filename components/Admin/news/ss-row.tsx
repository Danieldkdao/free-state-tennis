import Image from "next/image";
import React from "react";
import UploadAreaImage from "@/public/upload_area.png";
import Editor from "@/components/editor";

const NewsSSRow = () => {
  return (
    <tr className="border">
      <td>
        <label htmlFor="image" className="cursor-pointer">
          <Image src={UploadAreaImage} alt="Upload area image" width={180} />
        </label>
        <input type="file" id="image" accept="image/*" className="hidden" />
      </td>
      <td className="border">
        <input type="text" id="name" className="py-1 px-2 outline-0" />
      </td>
      <td className="border">
        <input type="number" id="name" className="py-1 px-2 outline-0" />
      </td>
      <td className="border">
        <Editor />
      </td>
    </tr>
  );
};

export default NewsSSRow;
