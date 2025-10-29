import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";
import { FaCircleXmark, FaPaperPlane } from "react-icons/fa6";
import Image from "next/image";
import Placeholder1 from "@/public/placeholder-1.png";

const NewsContentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  await connectDB();
  const newsContent = await newsModel.findById(id).lean();
  if (!newsContent)
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
  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="w-[65%] p-10 border space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{newsContent.title}</h1>
          <p>
            {new Date(newsContent.createdAt).toLocaleDateString()} &middot;{" "}
            {Math.ceil(newsContent.content.length / 1000)} min read
          </p>
        </div>
        <p>{newsContent.content}</p>
        {newsContent.image ? (
          <Image
            src={newsContent.image}
            alt={newsContent.title}
            width={800}
            height={400}
            className="object-cover w-full max-h-96"
          />
        ) : (
          <Image
            src={Placeholder1}
            alt="Placeholder image 1"
            className="object-cover w-full max-h-96"
          />
        )}
        <hr />
        <div>
          <p>
            {newsContent.views} views &middot; {newsContent.comments.length}{" "}
            comments
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <h1 className="text-2xl font-bold">Comments</h1>
          <div>
            {newsContent.comments.map((comment, index) => (
              <div key={index} className="space-y-2 border-y py-4">
                <div className="flex items-center w-full gap-4">
                  <h1 className="text-xl flex-1">{comment.user}</h1>
                  <p className="text-sm">
                    Posted on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <textarea
              name=""
              placeholder="Please be respectful when commenting"
              className="outline-0 p-2 text-sm resize-none w-full border"
              rows={4}
            ></textarea>
            <button className="flex items-center gap-2 free-green-bg py-2 px-5 cursor-pointer text-white">
              <FaPaperPlane />
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContentPage;
