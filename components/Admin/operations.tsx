"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { addNewRowServer, publish } from "@/lib/server-actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Operations = ({ type }: { type: "player" | "event" }) => {
  const router = useRouter();
  const { lastSaved, isSaving } = usePlayer();
  
  const addNewRow = async () => {
    await addNewRowServer(type);
    router.refresh();
  };

  const handlePublish = async () => {
    if (
      window.confirm(
        "Are you sure you want to publish the changes? This will overwrite the public data."
      )
    ) {
      const response = await publish(type);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="sticky left-0 top-0 z-10 pb-4 bg-white flex items-center gap-4">
      <button
        onClick={addNewRow}
        className="free-green-bg text-white text-center py-2 px-5 cursor-pointer"
      >
        Add row
      </button>
      <button
        onClick={handlePublish}
        className="free-green-bg text-white text-center py-2 px-5 cursor-pointer"
      >
        Publish
      </button>
      <div className="text-sm">
        {isSaving && <span className="text-yellow-600">💾 Saving...</span>}
        {!isSaving && lastSaved && (
          <span className="text-green-600">
            ✓ Saved {new Date(lastSaved).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Operations;
