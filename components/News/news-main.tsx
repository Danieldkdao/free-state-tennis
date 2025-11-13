"use client";

import { News } from "@/lib/types";
import NewsCard from "./NewsCard";
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { DateRangeStateType } from "../schedule/event-main";
import { formatDateTimeLocal } from "../admin/events/ss-row";

const NewsMain = ({ news }: { news: News[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeStateType>({
    start: null,
    end: null,
  });
  const [filteredNews, setFilteredNews] = useState([...news]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;

  useEffect(() => {
    let filteredNewsState = [...news];
    if (searchQuery.trim() !== "") {
      filteredNewsState = filteredNewsState.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (dateRange.start && dateRange.end) {
      filteredNewsState = filteredNewsState.filter((item) => {
        if (dateRange.start && dateRange.end) {
          return (
            new Date(item.createdAt) >= new Date(dateRange.start) &&
            new Date(item.createdAt) <= new Date(dateRange.end)
          );
        } else return true;
      });
    }
    setFilteredNews(filteredNewsState);
    setCurrentPage(1);
  }, [searchQuery, dateRange, news]);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full">
        <div className="w-full flex items-center ">
          <FaMagnifyingGlass />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for news"
            className="p-2 outline-0 w-full"
          />
        </div>
        <hr />
      </div>
      <div className="rounded-md p-5 border">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <h1 className="text-xl flex-1">Filters</h1>
          <FaChevronRight
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              showFilters ? "rotate-90" : ""
            }`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <hr />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label
                  className="font-bold cursor-pointer"
                  htmlFor="date-start"
                >
                  Start date:
                </label>
                <input
                  type="datetime-local"
                  id="date-start"
                  className="outline-0 cursor-pointer"
                  value={dateRange.start ? dateRange.start : ""}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      start:
                        e.target.value === ""
                          ? null
                          : formatDateTimeLocal(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold cursor-pointer" htmlFor="date-end">
                  End date:
                </label>
                <input
                  type="datetime-local"
                  id="date-end"
                  className="outline-0 cursor-pointer"
                  value={dateRange.end ? dateRange.end : ""}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      end:
                        e.target.value === ""
                          ? null
                          : formatDateTimeLocal(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {currentNews.length === 0 ? (
          <h1 className="text-2xl">No results found for "{searchQuery}"</h1>
        ) : (
          currentNews.map((news) => {
            return <NewsCard key={news._id} news={news} />;
          })
        )}
      </div>
      <div className="flex justify-center w-full">
        {totalPages > 1 && (
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="py-2 pr-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`py-2 px-4 rounded-md cursor-pointer mx-1 ${
                currentPage === pageNumber
                  ? "free-green-bg text-white"
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="py-2 pl-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default NewsMain;
