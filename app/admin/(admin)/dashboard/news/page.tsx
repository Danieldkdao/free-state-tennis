import NewsMain from "@/components/Admin/news/news-main";
import { connectDB } from "@/db/db";
import adminNewsModel from "@/db/schemas/adminNewsModel";

const NewsPage = async () => {
  await connectDB();
  const data = await adminNewsModel.find();
  const news = data.map((item) => item.toObject());

  return (
    <div className="overflow-auto pr-5 space-y-4">
      <NewsMain />
    </div>
  );
};

export default NewsPage;
