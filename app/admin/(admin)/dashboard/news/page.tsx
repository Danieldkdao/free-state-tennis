import NewsMain from "@/components/Admin/news/news-main";
import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";

const NewsPage = async () => {
  await connectDB();
  const data = await newsModel.find();
  const news = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="overflow-auto pr-5 space-y-4">
      <NewsMain news={news} />
    </div>
  );
};

export default NewsPage;
