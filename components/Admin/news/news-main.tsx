"use client";

import { News } from "@/lib/types";
import ListRow from "./list-row";
import { useState } from "react";
import { FaCircleXmark, FaPlus } from "react-icons/fa6";
import CreateTab from "./create-tab";
import { createNews, updateNews } from "@/lib/server-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadImageClient } from "../players/ss-row";

export type ShowModalData = {
  buttonText: string;
  defaultContent: string;
  defaultImage: string | null;
  defaultTitle: string;
  submitFunc: (formData: FormData, ...args: any) => Promise<any>;
};

const NewsMain = ({ news }: { news: News[] }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<ShowModalData | null>(null);

  const createObject: ShowModalData = {
    buttonText: "Post news",
    defaultContent: "",
    defaultImage: null,
    defaultTitle: "",
    submitFunc: async (formData: FormData, file: File | null) => {
      const imageInfo = await uploadImageClient(file);
      if(!imageInfo) return toast.error("Failed to upload image.");
      const response = await createNews(formData, imageInfo);
      if(response.success){
        toast.success(response.message);
        router.refresh();
        setShowModal(null);
      } else {
        toast.error("Error posting news. Please try again later.");
      }
    },
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setShowModal(createObject);
        }}
        className="free-green-bg text-white py-2 px-5 cursor-pointer flex items-center gap-2"
      >
        <FaPlus />
        Create news
      </button>
      <table>
        <thead>
          <tr className="border">
            <th className="py-2 px-3 border">Image</th>
            <th className="py-2 px-3 border">Timestamps</th>
            <th className="py-2 px-3 border">Title</th>
            <th className="py-2 px-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {news.reverse().map((item) => (
            <ListRow key={item._id} news={item} setShowModal={setShowModal} />
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="bg-red-400">
          <div className="fixed inset-0 free-green-bg opacity-60"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg bg-white rounded-lg p-8 shadow-xl z-50 overflow-y-auto space-y-4 max-h-[550px]">
            <div className="flex items-center w-full justify-between">
              <h1 className="text-2xl font-medium">
                {showModal.buttonText === "Post news"
                  ? "Create news"
                  : "Update news"}
              </h1>
              <button
                onClick={() => setShowModal(null)}
                className="cursor-pointer"
              >
                <FaCircleXmark size={30} />
              </button>
            </div>
            <CreateTab
              buttonText={showModal.buttonText}
              defaultContent={showModal.defaultContent}
              defaultImage={showModal.defaultImage}
              defaultTitle={showModal.defaultTitle}
              submitFunc={showModal.submitFunc}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsMain;
