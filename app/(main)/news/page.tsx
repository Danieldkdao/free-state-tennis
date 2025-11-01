import NewsCard from '@/components/news/NewsCard';
import { connectDB } from '@/db/db';
import newsModel from '@/db/schemas/newsModel';
import { News } from '@/lib/types';
import Image from 'next/image';
import NoNewsCurrently from '@/public/no-news-currently.png';

const NewsPage = async () => {
  await connectDB();
  const data = await newsModel.find();
  if(!data.length) {
    return (
          <div className="w-full flex justify-center">
            <Image src={NoNewsCurrently} alt="No news currently image" />
          </div>
        );
  }
  const news: News[] = data.map(item => JSON.parse(JSON.stringify(item)));

  return (
    <div className="w-full mt-8 space-y-4">
      <h1 className="text-4xl font-bold">All News</h1>
      <div className="w-full flex flex-col gap-4">
        {news.map(news => {
          return <NewsCard key={news._id} news={news} />
        })}
      </div>
    </div>
  )
}

export default NewsPage