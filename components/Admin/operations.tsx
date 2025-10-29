"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { addNewRowServer } from "@/lib/server-actions";
import { useRouter } from "next/navigation";

const Operations = ({type}: {type: "player" | "event" | "news"}) => {
  const router = useRouter();
  const { lastSaved, isSaving } = usePlayer();
  const addNewRow = async () => {
    await addNewRowServer(type);
    router.refresh();
  }
  return (
    <div className="sticky left-0 top-0 z-10 pb-4 bg-white flex items-center gap-4">
      <button
        onClick={addNewRow}
        className="free-green-bg text-white text-center py-2 px-5 cursor-pointer"
      >
        Add row
      </button>
      <button className="free-green-bg text-white text-center py-2 px-5 cursor-pointer">
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
