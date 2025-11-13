import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";
import { News } from "@/lib/types";
import Image from "next/image";
import NoNewsCurrently from "@/public/no-news-currently.png";
import NewsMain from "@/components/News/news-main";

const NewsPage = async () => {
  await connectDB();
  const data = await newsModel.find().sort({ createdAt: -1, _id: -1 });
  if (!data.length) {
    return (
      <div className="w-full flex justify-center">
        <Image src={NoNewsCurrently} alt="No news currently image" />
      </div>
    );
  }
  const news: News[] = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="w-full mt-8 space-y-4">
      <h1 className="text-4xl font-bold">All News</h1>
      <NewsMain news={news} />
    </div>
  );
};

export default NewsPage;
