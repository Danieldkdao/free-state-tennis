import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image1 from "@/public/boys_team_image.jpg";
import Image2 from "@/public/girls_team_image.jpg";
import MarqueeImage1 from "@/public/marquee-image-1.jpg";
import MarqueeImage2 from "@/public/marquee-image-2.jpg";
import MarqueeImage3 from "@/public/marquee-image-3.jpg";
import FreeStateLogo from "@/public/free-state-logo.png";
import RacketsWhite from "@/public/racket-cross-icon-white.png";
import Image from "next/image";
import { FaArrowRight, FaCalendar, FaEye } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";
import eventModel from "@/db/schemas/eventModel";
import { Event, News } from "@/lib/types";
import { load } from "cheerio";
import { showDateCreated } from "@/components/News/news-card";
import Link from "next/link";
import { splitDatetime } from "@/components/schedule/Event";

const Home = async () => {
  await connectDB();
  const [news, events] = await Promise.all([
    newsModel.find().sort({ createdAt: -1, _id: -1 }).limit(3),
    eventModel
      .find({ datetime: { $gte: new Date() } })
      .sort({ datetime: 1, _id: 1 })
      .limit(3),
  ]);

  const latestNews: News[] = news.map((news) =>
    JSON.parse(JSON.stringify(news))
  );

  const upcomingMatches: Event[] = events.map((event) =>
    JSON.parse(JSON.stringify(event))
  );

  const infiniteRow = [
    <Image
      src={Image1}
      alt="Marquee image 1"
      className="object-cover size-96 rounded-md"
    />,
    <Image
      src={MarqueeImage1}
      alt="Marquee image 2"
      className="object-cover size-96 rounded-md"
    />,
    <Image
      src={MarqueeImage2}
      alt="Marquee image 3"
      className="object-cover size-96 rounded-md"
    />,
    <Image
      src={MarqueeImage3}
      alt="Marquee image 4"
      className="object-cover size-96 rounded-md"
    />,
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[95%] md:w-[90%] lg:w-[85%] flex flex-col items-center justify-center gap-16 md:gap-32 mt-10 mb-10">
        <div className="flex flex-col items-center gap-12 md:gap-24 w-full">
          <h1 className="text-6xl md:text-9xl font-bold text-center my-4">
            Firebirds Tennis
          </h1>
          <div className="flex flex-col sm:flex-row gap-10 w-full">
            <div className="flex-1">
              <Image
                src={Image1}
                alt="boys team image"
                className="object-cover w-full rounded-lg max-h-80"
              />
            </div>
            <div className="flex-1">
              <Image
                src={Image2}
                alt="girls team image"
                className="object-cover w-full rounded-lg max-h-80"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold">Latest Posts</h1>
          {latestNews.length === 0 ? (
            <div className="w-full flex justify-center">
              <div className="border rounded-md p-5 w-full max-w-96 flex flex-col items-center gap-2">
                <Image
                  src={FreeStateLogo}
                  alt="Free State logo"
                  width={100}
                  height={100}
                />
                <h1 className="text-2xl text-center">
                  No News Updates
                </h1>
                <p className="text-center text-gray-700">
                  There are no news updates available right now. Please return
                  shortly to see if new articles have been posted.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {latestNews.map((item, index) => {
                const content = load(item.content).text();
                return (
                  <div
                    key={index}
                    className="flex flex-col border rounded-lg overflow-hidden"
                  >
                    {item?.image ? (
                      <Image
                        src={item.image.url}
                        alt="News image"
                        width={400}
                        height={200}
                        className="w-full max-h-80 object-cover"
                      />
                    ) : (
                      <div className="h-full grid place-items-center">
                        <Image
                          src={FreeStateLogo}
                          alt="News image"
                          width={200}
                          height={200}
                          className="w-full max-h-80 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                      <h1 className="text-xl">
                        {item.title}
                      </h1>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <p className="line-clamp-2">{content}</p>
                          <Link
                            href={`/news/${item._id}`}
                            className="flex items-center gap-1 cursor-pointer hover:gap-3 transition-all duration-200 ease-in-out"
                          >
                            <p>Read More</p>
                            <FaArrowRight />
                          </Link>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaEye />
                            <p>{item.views.length}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCalendar />
                            <p>{showDateCreated(item.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="h-screen w-screen bg-[url('/free-state-bg.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className="free-green-bg flex flex-col items-center gap-10 py-10 px-6 sm:px-10 md:px-16 sm:py-14 w-[85%] max-w-[550px] rounded-lg mt-40">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Mission
              </h1>
              <p className="text-white text-center sm:text-lg">
                Free State High School Tennis is dedicated to fostering a love
                for tennis and teamwork. We aim to achieve excellence on and off
                the court while building our community's support for our
                talented athletes.
              </p>
            </div>
          </div>
          <div className="w-screen flex items-center justify-center free-green-bg py-20">
            <div className="w-[95%] md:w-[90%] lg:w-[85%] flex flex-col gap-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Upcoming Matches
              </h1>
              {upcomingMatches.length === 0 ? (
                <div className="w-full flex justify-center">
                  <div className="border rounded-md border-white p-5 w-full max-w-96 flex flex-col items-center gap-2">
                    <Image
                      src={FreeStateLogo}
                      alt="Free State logo"
                      width={100}
                      height={100}
                    />
                    <h1 className="text-2xl text-white text-center">
                      No Events Currently Scheduled
                    </h1>
                    <p className="text-center text-gray-200">
                      There are no events currently scheduled at this time.
                      Please check back later for any updates.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="border border-white p-5 flex flex-col items-center gap-2 rounded-lg"
                      >
                        <h1 className="text-2xl text-center text-white line-clamp-1">
                          {`Free State ${item.away ? "at" : "vs."} ${
                            item.opponent
                          }`}
                        </h1>
                        <div className="flex flex-col items-center text-white text-center w-full gap-2">
                          <p className="flex-1">
                            {splitDatetime(item.datetime).date}
                          </p>
                          <p className="text-center">{item.location}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 my-2">
                          <Image
                            src={FreeStateLogo}
                            alt="Free state logo"
                            height={50}
                            width={50}
                          />
                          <Image
                            src={RacketsWhite}
                            alt="Rackets crossing icon image"
                            width={70}
                            height={70}
                          />
                          <Image
                            src={item.image ? item.image.url : FreeStateLogo}
                            alt="Event image"
                            height={50}
                            width={50}
                            className="size-13 object-cover"
                          />
                        </div>
                        <Link
                          href="/schedule"
                          className="bg-white px-10 py-2 free-green-text cursor-pointer rounded-lg"
                        >
                          More info
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-full flex flex-col gap-8">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <Marquee speed={60} pauseOnHover={true}>
            {infiniteRow.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mx-5 h-full rounded-lg overflow-hidden"
                >
                  {item}
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
