"use client";

import { Comment } from "@/lib/types";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

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
    const maxPageButtons = 3;
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage === 1) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {comments.length === 0 ? (
          <h1>Be the first to comment!</h1>
        ) : (
          currentComments.map((comment, index) => (
            <div key={index} className="space-y-2 border-t py-4">
              <div className="flex items-center w-full gap-4">
                <h1 className="text-xl flex-1">{comment.user}</h1>
                <p className="text-sm">
                  Posted on{" "}
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(comment.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-sm">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
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
              className={`py-2 px-4 rounded-md mx-1 ${
                currentPage === pageNumber ? "free-green-bg text-white" : ""
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
  );
};

export default CommentSection;
