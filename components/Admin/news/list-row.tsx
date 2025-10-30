"use client";

import { deleteNews, updateNews } from "@/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPenToSquare, FaSquareArrowUpRight, FaTrash } from "react-icons/fa6";
import Logo from "@/public/free-state-logo.png";
import { News } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { ShowModalData } from "./news-main";
import { splitDatetime } from "@/components/schedule/Event";

type ListRowPropTypes = {
  news: News;
  setShowModal: Dispatch<SetStateAction<ShowModalData | null>>;
};

const ListRow = ({ news, setShowModal }: ListRowPropTypes) => {
  const router = useRouter();

  const updateObject: ShowModalData = {
    buttonText: "Update news",
    defaultContent: news.content,
    defaultImage: news.image?.url || null,
    defaultTitle: news.title,
    submitFunc: async (formData: FormData) => {
      const response = await updateNews(formData, news._id);
      if (response.success) {
        toast.success(response.message);
        router.refresh();
        setShowModal(null);
      } else {
        toast.error(response.message);
      }
    },
  };

  const timeCreatedAt = news.createdAt
    ? splitDatetime(news.createdAt).time
    : "Not defined";
  const dateCreatedAt = news.createdAt
    ? splitDatetime(news.createdAt).date
    : "Not defined";

  const timeUpdatedAt = news.updatedAt
    ? splitDatetime(news.updatedAt).time
    : "Not defined";
  const dateUpdatedAt = news.updatedAt
    ? splitDatetime(news.updatedAt).date
    : "Not defined";

  return (
    <>
      <tr className="border max-w-96">
        <td className="py-2 px-3 border">
          <Image src={news.image?.url || Logo} alt={news.title} width={100} />
        </td>
        <td className="py-2 px-3 border space-y-2">
          <div className="space-y-1">
            <p className="font-bold">Created At</p>
            <p className="whitespace-nowrap">
              {dateCreatedAt} at {timeCreatedAt}
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-bold">Updated At</p>
            <p className="whitespace-nowrap">
              {dateUpdatedAt} at {timeUpdatedAt}
            </p>
          </div>
        </td>
        <td className="py-2 px-3 border">
          <p className="whitespace-nowrap line-clamp-1">{news.title}</p>
        </td>
        <td className="py-2 px-3 border">
          <div className="flex gap-2">
            <Link href={`/news/${news._id}`} target="_blank">
              <button className="p-3 free-green-bg text-white rounded-md cursor-pointer">
                <FaSquareArrowUpRight size={30} />
              </button>
            </Link>
            <button
              onClick={() => {
                setShowModal(updateObject);
              }}
              className="p-3 free-green-bg text-white rounded-md cursor-pointer"
            >
              <FaPenToSquare size={30} />
            </button>
            <button
              onClick={async () => {
                const response = await deleteNews(news._id);
                if (response.success) {
                  toast.success(response.message);
                  router.refresh();
                  setShowModal(null);
                } else {
                  toast.error(response.message);
                }
              }}
              className="p-3 free-green-bg text-white rounded-md cursor-pointer"
            >
              <FaTrash size={30} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ListRow;
