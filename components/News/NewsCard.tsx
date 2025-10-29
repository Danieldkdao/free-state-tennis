import Image from "next/image";

import Placeholder1 from "@/public/placeholder-1.png";
import { News } from "@/lib/types";
import Link from "next/link";

const showDateCreated = (d: Date | string | number) => {
  const date = new Date(d);
  return date.toLocaleDateString();
};

const NewsCard = ({ news }: { news: News }) => {
  return (
    <Link href={`/news/${news._id}`}>
      <div className="flex w-full border">
        <div className="flex-1">
          <Image
            src={Placeholder1}
            alt="Placeholder image 1"
            className="object-cover w-full max-h-96"
          />
        </div>
        <div className="p-5 flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{news.title}</h1>
          <p>
            {showDateCreated(news.createdAt)} &middot; {news.lengthOfRead} min
            read
          </p>
          <p className="line-clamp-4 mb-10">{news.content}</p>
          <hr />
          <div className="gap-4 flex items-center">
            <p>{news.views} views</p>
            <p>{news.comments.length} comments</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
