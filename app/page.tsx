import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Placeholder1 from "@/public/placeholder-1.png";
import Placeholder2 from "@/public/placeholder-2.png";
import FreeStateLogo from "@/public/free-state-logo.png";
import NoScheduledEvents from "@/public/no-events-scheduled-home.png";
import RacketsWhite from "@/public/racket-cross-icon-white.png";
import Image from "next/image";
import { FaArrowRight, FaCalendar, FaEye, FaX } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { connectDB } from "@/db/db";
import newsModel from "@/db/schemas/newsModel";
import eventModel from "@/db/schemas/eventModel";
import { Event, News } from "@/lib/types";
import { load } from "cheerio";
import { showDateCreated } from "@/components/news/news-card";
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
    <Image src={Placeholder2} alt="Placeholder image 2" />,
    <Image src={Placeholder2} alt="Placeholder image 2" />,
    <Image src={Placeholder2} alt="Placeholder image 2" />,
    <Image src={Placeholder2} alt="Placeholder image 2" />,
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[95%] md:w-[90%] lg:w-[85%] flex flex-col items-center justify-center gap-16 md:gap-32 mt-10 mb-10">
        <div className="flex flex-col items-center gap-12 md:gap-24 w-full lg:w-auto">
          <h1 className="text-6xl md:text-9xl font-bold text-center my-4">
            Passion For Tennis
          </h1>
          <div className="flex flex-col sm:flex-row gap-10 w-full">
            <div className="flex-1">
              <Image
                src={Placeholder1}
                alt="Placeholder 1 image"
                className="object-cover w-full rounded-lg"
              />
            </div>
            <div className="flex-1">
              <Image
                src={Placeholder2}
                alt="Placeholder 2 image"
                className="object-cover w-full rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold">Latest Posts</h1>
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
                    <h1 className="text-space-grotesk text-xl">{item.title}</h1>
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
        </div>
        <div>
          <div className="h-screen w-screen bg-[url('/placeholder-1.png')] bg-cover bg-center flex items-center justify-center">
            <div className="free-green-bg flex flex-col items-center gap-10 py-10 px-6 sm:px-10 md:px-16 sm:py-14 md:py-20 w-[85%] max-w-[550px] rounded-lg">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Mission
              </h1>
              <p className="text-white text-center text-sm sm:text-base">
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
                <div className="w-full flex justify-center ">
                  <Image
                    src={NoScheduledEvents}
                    alt="No scheduled events image"
                    className="size-96 object-cover"
                  />
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
                <div className="mx-5 h-full rounded-lg overflow-hidden">
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
