import Image from "next/image";
import Logo from "@/public/free-state-logo.png";
import { News } from "@/lib/types";
import Link from "next/link";
import { load } from "cheerio";

export const showDateCreated = (d: Date | string | number) => {
  const date = new Date(d);
  return date.toLocaleDateString();
};

const NewsCard = ({ news }: { news: News }) => {
  const content = load(news.content).text();

  return (
    <Link href={`/news/${news._id}`}>
      <div className="flex flex-col md:flex-row w-full border rounded-lg overflow-hidden">
        <div className="flex-1">
          {news.image ? (
            <Image
              src={news.image.url}
              alt={news.title}
              width={800}
              height={400}
              className="object-cover w-full max-h-80"
            />
          ) : (
            <Image
              src={Logo}
              alt="Placeholder image 1"
              className="object-cover w-full max-h-80"
            />
          )}
        </div>
        <div className="p-5 flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{news.title}</h1>
          <p>{showDateCreated(news.createdAt)}</p>
          <p className="line-clamp-4 mb-10">{content}</p>
          <hr />
          <div className="gap-4 flex items-center">
            <p>{news.views.length} views</p>
            <p>{news.comments.length} comments</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
