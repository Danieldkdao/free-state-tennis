"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { authClient } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";
import { postCommentServer } from "@/lib/server-actions";
import { useRouter } from "next/navigation";

const CommentBox = ({newsId}:{newsId: string}) => {
  const session = authClient.useSession();
  const [content, setContent] = useState("");
  const router = useRouter();

  const postComment = async () => {
    if(!session.data) return toast.error("You must be signed in to comment!");
    if(content.trim() === "") return toast.error("Your comment cannot be empty.");
    const name = session.data.user.name;
    const response = await postCommentServer(content, name, newsId);
    if(response.success){
      setContent("");
      router.refresh();
      toast.success(response.message);
    } else {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        placeholder="Please be respectful when commenting"
        className="outline-0 p-2 text-sm resize-none w-full border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      ></textarea>
      <button onClick={postComment} className="flex items-center gap-2 free-green-bg py-2 px-5 cursor-pointer text-white">
        <FaPaperPlane />
        Post Comment
      </button>
    </div>
  );
};

export default CommentBox;
