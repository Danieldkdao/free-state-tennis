import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Placeholder1 from "@/public/placeholder-1.png";
import Placeholder2 from "@/public/placeholder-2.png";
import FreeStateLogo from "@/public/free-state-logo.png";
import LionsLogo from "@/public/chestylogo.png";
import RacketsWhite from '@/public/racket-cross-icon-white.png';
import Image from "next/image";
import { FaArrowRight, FaCalendar, FaEye, FaX } from "react-icons/fa6";
import Marquee from "react-fast-marquee";

const Home = () => {
  const latestNews = [
    {
      title: "Meet the Free State Tennis Team: Player Spotlights",
      description:
        "Tennis is more than just a game at Free State—it's a passion that unites our players and builds lifelong skills. Dive into exclusive interviews with standout athletes like senior ace Mia Rodriguez, who shares her journey from local courts to varsity stardom. Discover what drives these young talents and how they're shaping the future of our school's athletic legacy.",
    },
    {
      title: "Upcoming Tennis Matches: Don’t Miss This Season's Schedule",
      description:
        "Tennis fans, get ready! The new season kicks off with high-stakes rivalries against neighboring schools, promising edge-of-your-seat action on the courts. Mark your calendars for the home opener on October 20th against Riverton High, followed by a tournament road trip that'll test our team's grit and strategy.",
    },
    {
      title: "Support Free State School Tennis: How You Can Help",
      description:
        "Tennis is more than just a sport at Lawrence State—it's a community cornerstone that inspires resilience and teamwork among our students. Whether through volunteering at matches, donating gear, or organizing fundraisers, your involvement can make a real difference in fueling our program's success. Join us in cheering on the team and helping secure resources for state-level competitions.",
    },
  ];

  const upcomingMatches = [
    {
      title: "Charity Exhibition Showdown",
      date: "Sun, Nov 16",
      location: "Lawrence Community Center",
    },
    {
      title: "LHS Tennis: Pre-Season Clash",
      date: "Sun, Nov 16",
      location: "Lawrence High School",
    },
    {
      title: "Greenleaf Park Skills Challenge",
      date: "Sun, Nov 16",
      location: "Greenleaf Park",
    },
  ];

  const infiniteRow = [
    <Image src={Placeholder2} alt="Placeholder image 2"/>,
    <Image src={Placeholder2} alt="Placeholder image 2"/>,
    <Image src={Placeholder2} alt="Placeholder image 2"/>,
    <Image src={Placeholder2} alt="Placeholder image 2"/>,
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[95%] md:w-[90%] lg:w-[85%] flex flex-col items-center justify-center gap-32 mt-10 mb-10">
        <div className="flex flex-col items-center gap-24">
          <h1 className="text-9xl font-bold text-center my-4">
            Passion For Tennis
          </h1>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between w-full">
              <p className="max-w-[430px]">
                Stay connected with the Free State High School Tennis Team!
                Follow our matches, see our progress, and be part of the energy
                that drives us every season.
              </p>
              <button className="text-white free-green-bg px-10 py-3 rounded-full cursor-pointer">
                Get Involved
              </button>
            </div>
            <div className="flex gap-10">
              <div className="flex-1">
                <Image
                  src={Placeholder1}
                  alt="Placeholder 1 image"
                  className="object-cover w-full"
                />
              </div>
              <div className="flex-1">
                <Image
                  src={Placeholder2}
                  alt="Placeholder 2 image"
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-4xl font-bold">Latest Posts</h1>
          <div className="grid grid-cols-3 gap-4">
            {latestNews.map((item, index) => {
              return (
                <div key={index} className="flex flex-col border">
                  <Image src={Placeholder1} alt="Placeholder 1 image" />
                  <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                    <h1 className="text-space-grotesk text-xl">{item.title}</h1>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="line-clamp-2">{item.description}</p>
                        <button className="flex items-center gap-1 cursor-pointer hover:gap-3 transition-all duration-200 ease-in-out">
                          <p>Read More</p>
                          <FaArrowRight />
                        </button>
                      </div>
                      <hr />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaEye />
                          <p>10</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendar />
                          <p>2/10/2025</p>
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
            <div className="free-green-bg flex flex-col items-center gap-10 py-20 px-15 w-full max-w-[550px]">
              <h1 className="text-4xl font-bold text-white">Our Mission</h1>
              <p className="text-white text-center">
                Free State High School Tennis is dedicated to fostering a love for
                tennis and teamwork. We aim to achieve excellence on and off the
                court while building our community's support for our talented
                athletes.
              </p>
            </div>
          </div>
          <div className="w-screen flex items-center justify-center free-green-bg py-20">
            <div className="w-[95%] md:w-[90%] lg:w-[85%] flex flex-col gap-8">
              <h1 className="text-4xl font-bold text-white">
                Upcoming Matches
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {upcomingMatches.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-white p-5 flex flex-col items-center gap-2"
                    >
                      <h1 className="text-2xl text-center text-white">
                        {item.title}
                      </h1>
                      <div className="flex items-center justify-center gap-2 text-white">
                        <p>{item.date}</p>
                        <p>|</p>
                        <p className="line-clamp-1 max-w-48">{item.location}</p>
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
                          src={LionsLogo}
                          alt="Lions Logo"
                          height={50}
                          width={50}
                        />
                      </div>
                      <button className="bg-white px-10 py-2 free-green-text cursor-pointer">
                        More info
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-full flex flex-col gap-8">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <Marquee speed={60} pauseOnHover={true}>
            {infiniteRow.map((item, index) => {
              return <div className="mx-5 h-full">
                {item}
              </div>;
            })}
          </Marquee>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
