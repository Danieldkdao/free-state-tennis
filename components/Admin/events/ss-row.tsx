"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area.png";
import { Event, Team } from "@/lib/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { getSignature, saveImageEvents, updateEventData } from "@/lib/server-actions";
import { UploadApiResponse } from "cloudinary";
import toast from "react-hot-toast";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(event.image?.url || null);

  const debouncedFormData = useDebouncedValue(formData, 1000);
  const debouncedFile = useDebouncedValue(file, 1000);

  const hasChangedFormData = useRef(false);
  const hasChangedFile = useRef(false);

  useEffect(() => {
    if (!hasChangedFormData.current) return;
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

  useEffect(() => {
    if (!hasChangedFile.current) return;
    const saveFileToDatabase = async () => {
      setIsSaving(true);
      try {
        const signatureResponse = await getSignature();
        if ("error" in signatureResponse) {
          toast.error("Failed to make signature.");
          throw new Error(signatureResponse.error);
        }
        const { timestamp, signature } = signatureResponse;
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", "free-state-tennis");

        const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

        const cloudinaryResponse = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        if (!cloudinaryResponse.ok) {
          const errorData = await cloudinaryResponse.json();
          toast.error(errorData.error.message);
          console.log(errorData.error.message);
          throw new Error(
            "Failed to upload cloudinary image: ",
            errorData.error.message
          );
        }
        const cloudinaryData: UploadApiResponse =
          await cloudinaryResponse.json();
        const url = cloudinaryData.secure_url;
        const publicId = cloudinaryData.public_id;

        const response = await saveImageEvents(event._id, { url, publicId });
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

  const handleChange = (field: keyof Event, value: string | boolean) => {
      hasChangedFormData.current = true;
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

  return (
    <tr className="border">
      <td className="border">
        <label htmlFor="image" className="cursor-pointer">
          {previewUrl ? (
            <img src={previewUrl} alt="image" />
          ) : (
            <Image src={UploadAreaImage} alt="Upload area image" width={180} />
          )}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
      </td>
      <td className="border">
        <input
          type="datetime-local"
          id="datetime"
          className="py-1 px-2 outline-0"
          value={formData.datetime || ""}
          onChange={(e) =>
            handleChange("datetime", e.target.value)
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
            handleChange("team", e.target.value)
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
          onChange={(e) =>
            handleChange("away", e.target.value === "Yes")
          }
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
          onChange={(e) =>
            handleChange("opponent", e.target.value)
          }
        />
      </td>
      <td className="border">
        <input
          type="text"
          id="location"
          className="py-1 px-2 outline-0"
          value={formData.location}
          onChange={(e) =>
            handleChange("location", e.target.value)
          }
        />
      </td>
    </tr>
  );
};

export default EventsSSRow;
