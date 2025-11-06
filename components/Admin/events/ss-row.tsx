"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area.png";
import { Event } from "@/lib/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import {
  deleteEventRow,
  resetImageEvents,
  saveImageEvents,
  updateEventData,
} from "@/lib/server-actions";
import toast from "react-hot-toast";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { uploadImageClient } from "../players/ss-row";

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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    event.image?.url || null
  );

  const debouncedFormData = useDebouncedValue(formData, 1000);
  const debouncedFile = useDebouncedValue(file, 1000);

  const hasChangedFormData = useRef(false);
  const hasChangedFile = useRef(false);

  useEffect(() => {
    if (!hasChangedFormData.current) return;
    const saveToDatabase = async () => {
      setIsSaving(true);
      try {
        await updateEventData(event._id, {
          ...debouncedFormData,
          datetime: new Date(formData.datetime),
        });
        setLastSaved(new Date());
      } catch (error) {
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    };

    saveToDatabase();
  }, [debouncedFormData]);

  useEffect(() => {
    if (!hasChangedFile.current || !debouncedFile) return;
    const saveFileToDatabase = async () => {
      setIsSaving(true);
      try {
        const imageInfo = await uploadImageClient(file);
        if (!imageInfo) return toast.error("Failed to upload image.");
        const response = await saveImageEvents(event._id, imageInfo);
        if (!response.success) {
          toast.error("Failed to save image.");
          throw new Error("Failed to save image.");
        }
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to save: ", error);
      } finally {
        setIsSaving(false);
      }
    };

    saveFileToDatabase();
  }, [debouncedFile]);

  const handleChange = (field: keyof Event, value: string | boolean | Date) => {
    if (!hasChangedFormData.current) hasChangedFormData.current = true;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    hasChangedFile.current = true;
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to remove this event from the schedule? This action cannot be undone."
      )
    )
      return;
    const res = await deleteEventRow(event._id);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error("Something went wrong.");
    }
  };

  const handleImageReset = async () => {
    setIsSaving(true);
    setFile(null);
    setPreviewUrl(null);
    const res = await resetImageEvents(event._id);
    if (!res.success) {
      toast.error("An error occurred.");
    }
    setIsSaving(false);
    setLastSaved(new Date());
  };

  const formatDateTimeLocal = (date: Date | string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <tr className="border">
      <td className="border">
        <button
          onClick={handleDelete}
          className="w-full cursor-pointer flex justify-center py-2"
        >
          <FaTrash size={32} />
        </button>
      </td>
      <td className="border relative group">
        <label htmlFor={`image_${event._id}`} className="cursor-pointer">
          {previewUrl ? (
            <img src={previewUrl} alt="image" />
          ) : (
            <Image src={UploadAreaImage} alt="Upload area image" width={180} />
          )}
        </label>
        <input
          type="file"
          id={`image_${event._id}`}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
        {previewUrl !== null && (
          <button
            onClick={handleImageReset}
            className="absolute hidden top-1 right-1 group-hover:block rounded-full p-1 bg-white cursor-pointer"
          >
            <FaXmark size={20} />
          </button>
        )}
      </td>
      <td className="border">
        <input
          type="datetime-local"
          id={`datetime_${event._id}`}
          className="py-1 px-2 outline-0"
          value={
            formData.datetime ? formatDateTimeLocal(formData.datetime) : ""
          }
          onChange={(e) => handleChange("datetime", e.target.value)}
        />
      </td>
      <td className="border pr-2">
        <select
          name="teamLevel"
          id={`team-level_${event._id}`}
          className="py-1 px-2 outline-0"
          value={formData.team}
          onChange={(e) => handleChange("team", e.target.value)}
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
          id={`away-team_${event._id}`}
          className="py-1 px-2 outline-0"
          value={formData.away ? "Yes" : "No"}
          onChange={(e) => handleChange("away", e.target.value === "Yes")}
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
          id={`opponent_${event._id}`}
          className="py-1 px-2 outline-0"
          value={formData.opponent}
          onChange={(e) => handleChange("opponent", e.target.value)}
        />
      </td>
      <td className="border">
        <input
          type="text"
          id={`location_${event._id}`}
          className="py-1 px-2 outline-0"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </td>
    </tr>
  );
};

export default EventsSSRow;
