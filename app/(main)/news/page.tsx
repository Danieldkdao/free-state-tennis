import NewsCard from '@/components/news/NewsCard';
import newsModel from '@/db/schemas/newsModel';

const NewsPage = async () => {
  const data = await newsModel.find();
  if(!data.length) {
    return <h1>No news found</h1>
  }
  const news = data.map(item => item.toObject());

  return (
    <div className="w-full mt-8 space-y-4">
      <h1 className="text-4xl font-bold">All News</h1>
      <div className="w-full flex flex-col gap-4">
        {news.map(news => {
          return <NewsCard key={news.id} news={news} />
        })}
      </div>
    </div>
  )
}

export default NewsPage