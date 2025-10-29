"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area.png";
import { Event, Team } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { updateEventData } from "@/lib/server-actions";

const teamLevels = [
  "Boys Varsity",
  "Girls Varsity",
  "Boys Junior Varsity",
  "Girls Junior Varsity",
];

const away = ["Yes", "No"];

const EventsSSRow = ({ event }: { event: Event }) => {
  const [formData, setFormData] = useState(event);
  const { setIsSaving, setLastSaved } = usePlayer();

  const debouncedFormData = useDebouncedValue(formData, 1000);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const saveToDatabase = async () => {
      setIsSaving(true);
      try {
        await updateEventData(event._id, debouncedFormData);
        setLastSaved(new Date());
      } catch (error) {
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    };

    saveToDatabase();
  }, [debouncedFormData]);

  return (
    <tr className="border">
      <td className="border">
        <label htmlFor="image" className="cursor-pointer">
          <Image src={UploadAreaImage} alt="Upload area image" width={180} />
        </label>
        <input type="file" id="image" accept="image/*" className="hidden" />
      </td>
      <td className="border">
        <input
          type="datetime-local"
          id="datetime"
          className="py-1 px-2 outline-0"
          value={formData.datetime || ""}
          onChange={(e) =>
            setFormData({ ...formData, datetime: e.target.value })
          }
        />
      </td>
      <td className="border pr-2">
        <select
          name="teamLevel"
          id="team-level"
          className="py-1 px-2 outline-0"
          value={formData.team}
          onChange={(e) =>
            setFormData({ ...formData, team: e.target.value as Team })
          }
        >
          {teamLevels.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border pr-2">
        <select
          name="away"
          id="away-team"
          className="py-1 px-2 outline-0"
          value={formData.away ? "Yes" : "No"}
          onChange={(e) => setFormData({ ...formData, away: e.target.value === "Yes" ? true : false })}
        >
          {away.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border">
        <input
          type="text"
          id="opponent"
          className="py-1 px-2 outline-0"
          value={formData.opponent}
          onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
        />
      </td>
      <td className="border">
        <input
          type="text"
          id="field2"
          className="py-1 px-2 outline-0"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </td>
    </tr>
  );
};

export default EventsSSRow;
