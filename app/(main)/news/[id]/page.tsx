import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";
import { FaCircleXmark } from "react-icons/fa6";
import Image from "next/image";
import Logo from "@/public/free-state-logo.png";
import CommentBox from "@/components/news/comment-box";
import { News } from "@/lib/types";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import crypto from "crypto";
import CommentSection from "@/components/news/comment-section";

const NewsContentPage = async (props: PageProps<"/news/[id]">) => {
  const { id } = await props.params;

  await connectDB();
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  let newsContent: News | null = null;

  if (session) {
    const userId = session.user.id;
    newsContent = await newsModel
      .findOneAndUpdate(
        { _id: id, views: { $nin: [userId] } },
        { $push: { views: userId } },
        { new: true }
      )
      .lean();
    if (!newsContent) {
      newsContent = await newsModel.findById(id).lean();
    }
  } else {
    const userId = crypto.randomBytes(64).toString("hex");
    newsContent = await newsModel
      .findByIdAndUpdate(
        id,
        {
          $push: { views: userId },
        },
        { new: true }
      )
      .lean();
  }

  if (!newsContent) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 h-screen">
        <h1 className="text-4xl font-bold text-center">404 News Not Found</h1>
        <FaCircleXmark size={150} color="#9C1D15" />
        <p className="text-center max-w-[600px]">
          Looks like the news you were looking for doesn't exist! The website
          might be down or you might be at the wrong url.
        </p>
      </div>
    );
  }

  const news: News = JSON.parse(JSON.stringify(newsContent));
  const comments = news.comments.reverse();

  return (
    <div className="mt-8 flex items-center justify-center w-full">
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[65%] p-10 border space-y-4 rounded-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{news.title}</h1>
          <p className="mb-4 text-xl">
            {new Date(news.createdAt).toLocaleDateString()}
          </p>
          {news.image ? (
            <Image
              src={news.image.url}
              alt={news.title}
              width={800}
              height={400}
              className="object-cover w-full max-h-96"
            />
          ) : (
            <Image
              src={Logo}
              alt="Placeholder image 1"
              className="object-cover w-full max-h-96"
            />
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: news.content }}
          className="format-text"
        ></div>
        <hr />
        <div>
          <p>
            {news.views.length} views &middot; {news.comments.length} comments
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <h1 className="text-2xl font-bold">Comments</h1>
          <CommentSection comments={comments} />
          <CommentBox newsId={news._id} />
        </div>
      </div>
    </div>
  );
};

export default NewsContentPage;
