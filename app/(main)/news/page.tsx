import NewsCard from '@/components/News/NewsCard';
import { news } from '@/app/data';
import React from 'react'

const NewsPage = () => {
  

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