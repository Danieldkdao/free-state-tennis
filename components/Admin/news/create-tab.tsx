import Image from "next/image";
import UploadAreaImage from "@/public/upload_area.png";
import Editor from "@/components/editor";

const CreateTab = () => {
  return (
    <form className="flex flex-col gap-4 items-start">
      <div>
        <p></p>
        <label htmlFor="image" className="cursor-pointer">
          <Image src={UploadAreaImage} alt="Upload area image" width={180} />
        </label>
        <input type="file" id="image" accept="image/*" className="hidden" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="py-2 px-3 text-lg outline-0 border w-full"
        />
      </div>
      <div>
        <label>Content</label>
        <div className="mt-2">
          <Editor />
        </div>
      </div>
      <button type="button" className="py-2 px-5 free-green-bg text-white cursor-pointer">
        Post news
      </button>
    </form>
  );
};

export default CreateTab;
