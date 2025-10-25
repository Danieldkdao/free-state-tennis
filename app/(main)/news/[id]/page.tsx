import { news } from "@/app/data";
import { FaCircleXmark, FaPaperPlane } from "react-icons/fa6";
import Image from "next/image";
import Placeholder1 from "@/public/placeholder-1.png";

const NewsContentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  const newsContent = news.filter((item) => String(item.id) === id)[0];
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
            {newsContent.publishDate} &middot; {newsContent.readTimeMinutes} min
            read
          </p>
        </div>
        <p>{newsContent.content}</p>
        <Image
          src={Placeholder1}
          alt="Placeholder image 1"
          className="object-cover w-full max-h-96"
        />
        <hr />
        <div>
          <p>
            {newsContent.views} views &middot; {newsContent.comments} comments
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <h1 className="text-2xl font-bold">Comments</h1>
          <div>
            <div className="space-y-2 border-y py-4">
              <div className="flex items-center w-full gap-4">
                <h1 className="text-xl flex-1">Anonymous User</h1>
                <p className="text-sm">Posted on Nov 16, 2025</p>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati delectus natus reiciendis quidem dolor sit eveniet,
                maxime quo ipsum dignissimos accusamus architecto aut distinctio
                atque a quisquam! Distinctio, rerum expedita.
              </p>
            </div>
            <div className="space-y-2 border-y py-4">
              <div className="flex items-center w-full gap-4">
                <h1 className="text-xl flex-1">Anonymous User</h1>
                <p className="text-sm">Posted on Nov 16, 2025</p>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati delectus natus reiciendis quidem dolor sit eveniet,
                maxime quo ipsum dignissimos accusamus architecto aut distinctio
                atque a quisquam! Distinctio, rerum expedita.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <textarea name="" placeholder="Please be respectful when commenting" className="outline-0 p-2 text-sm resize-none w-full border" rows={4}></textarea>
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
