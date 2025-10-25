"use client";

import NewsSSRow from "@/components/Admin/news/ss-row";

const NewsPage = () => {
  return (
    <div className="overflow-auto pr-5 space-y-4">
      <table>
        <thead>
          <tr className="border">
            <th className="border py-2 px-3">Image</th>
            <th className="border py-2 px-3">Title</th>
            <th className="border py-2 px-3 whitespace-nowrap">
              Length of Read
            </th>
            <th className="border py-2 px-3">Content</th>
          </tr>
        </thead>
        <tbody>
          <NewsSSRow />
        </tbody>
      </table>
    </div>
  );
};

export default NewsPage;
