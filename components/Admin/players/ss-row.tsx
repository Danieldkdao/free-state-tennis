"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area_player.png";
import { Height, Player, Results } from "@/lib/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import {
  deletePlayerRow,
  saveImagePlayers,
  updatePlayerData,
  resetImagePlayers,
} from "@/lib/server-actions";
import { usePlayer } from "@/hooks/usePlayer";
import { FaTrash, FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { UploadApiResponse } from "cloudinary";

export const classes = ["Freshman", "Sophomore", "Junior", "Senior"];

export const playingStyles = [
  "Unknown",
  "Aggressive Baseliner",
  "Counter-Puncher",
  "Serve and Volley",
  "All-Court Player",
];

export const isVarsity = ["TBD", "Varsity", "Junior Varsity"];

export const genders = ["Boy", "Girl"];

export const uploadImageClient = async (file: File | null) => {
  if(!file) return null;
  const formData = new FormData();
  formData.append("file", file as Blob);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );
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
  }
  const cloudinaryData: UploadApiResponse = await cloudinaryResponse.json();
  const url = cloudinaryData.secure_url;
  const publicId = cloudinaryData.public_id;
  return { url, publicId };
}

const PlayerSSRow = ({ player }: { player: Player }) => {
  const [formData, setFormData] = useState(player);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    player.image?.url || null
  );

  const { setIsSaving, setLastSaved } = usePlayer();

  const debouncedFormData = useDebouncedValue(formData, 1000);
  const debouncedFile = useDebouncedValue(file, 1000);

  const hasChangedFormData = useRef(false);
  const hasChangedFile = useRef(false);

  useEffect(() => {
    if (!hasChangedFormData.current) return;
    const saveToDatabase = async () => {
      setIsSaving(true);
      try {
        await updatePlayerData(player._id, debouncedFormData);
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to save: ", error);
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
        if(!imageInfo) return toast.error("Failed to upload image.");
        const response = await saveImagePlayers(player._id, imageInfo);
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

  const handleChange = (
    field: keyof Player,
    value: string | number | null | Results | Height
  ) => {
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

  const handleDelete = async () => {
    const isOk = confirm(
      "Are you sure you want to delete this player from the spreadsheet? This action cannot be undone."
    );
    if (!isOk) return;
    const res = await deletePlayerRow(player._id);
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
    const res = await resetImagePlayers(player._id);
    if (!res.success) {
      toast.error("An error occurred.");
    }
    setIsSaving(false);
    setLastSaved(new Date());
  };

  return (
    <tr className="border">
      <td className="border">
        <button
          onClick={handleDelete}
          className="w-full cursor-pointer flex justify-center"
        >
          <FaTrash size={32} />
        </button>
      </td>
      <td className="relative group">
        <label htmlFor={`image_${player._id}`} className="cursor-pointer">
          {previewUrl ? (
            <img src={previewUrl} alt="image" />
          ) : (
            <Image src={UploadAreaImage} alt="Upload area image" width={180} />
          )}
        </label>
        <input
          type="file"
          id={`image_${player._id}`}
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
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="py-1 px-2 outline-0"
        />
      </td>
      <td className="border">
        <textarea
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={3}
          className="py-1 px-2 resize-none outline-0"
        />
      </td>
      <td className="border pr-2">
        <select
          value={formData.class}
          onChange={(e) => handleChange("class", e.target.value)}
          className="py-1 px-2 outline-0"
        >
          {classes.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border px-4">
        <div className="flex items-center">
          <label htmlFor={`single-wins_${player._id}`}>Wins</label>
          <input
            id={`single-wins_${player._id}`}
            type="number"
            value={formData.singles.wins}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              const value = parsedValue ? parsedValue : 0;
              const object: Results = {
                wins: value,
                losses: formData.singles.losses,
              };
              handleChange("singles", object);
            }}
            className="py-1 px-2 outline-0 w-16 font-bold"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor={`single-losses_${player._id}`}>Losses</label>
          <input
            id={`single-losses_${player._id}`}
            type="number"
            value={formData.singles.losses}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              const value = parsedValue ? parsedValue : 0;
              const object: Results = {
                wins: formData.singles.wins,
                losses: value,
              };
              handleChange("singles", object);
            }}
            className="py-1 px-2 w-16 outline-0 font-bold"
          />
        </div>
      </td>
      <td className="border px-4">
        <div className="flex items-center">
          <label htmlFor={`doubles-wins_${player._id}`}>Wins</label>
          <input
            id={`doubles-wins_${player._id}`}
            type="number"
            value={formData.doubles.wins}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              const value = parsedValue ? parsedValue : 0;
              const object: Results = {
                wins: value,
                losses: formData.doubles.losses,
              };
              handleChange("doubles", object);
            }}
            className="py-1 px-2 outline-0 w-16 font-bold"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor={`doubles-losses_${player._id}`}>Losses</label>
          <input
            id={`doubles-losses_${player._id}`}
            type="number"
            value={formData.doubles.losses}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              const value = parsedValue ? parsedValue : 0;
              const object: Results = {
                wins: formData.doubles.wins,
                losses: value,
              };
              handleChange("doubles", object);
            }}
            className="py-1 px-2 w-16 outline-0 font-bold"
          />
        </div>
      </td>
      <td className="border px-4">
        <div className="flex items-center">
          <input
            id={`height-ft_${player._id}`}
            type="number"
            placeholder="Opt."
            value={formData.height.ft !== null ? formData.height.ft : ""}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : parseInt(e.target.value);
              const object: Height = {
                ft: value,
                in: formData.height.in,
              };
              handleChange("height", object);
            }}
            className="py-1 px-2 outline-0 w-16 font-bold"
          />
          <label htmlFor={`height-ft_${player._id}`}>ft</label>
        </div>
        <div className="flex items-center">
          <input
            id={`height-in_${player._id}`}
            type="number"
            placeholder="Opt."
            value={formData.height.in !== null ? formData.height.in : ""}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : parseInt(e.target.value);
              const object: Height = {
                ft: formData.height.ft,
                in: value,
              };
              handleChange("height", object);
            }}
            className="py-1 px-2 w-16 outline-0 font-bold"
          />
          <label htmlFor={`height-in_${player._id}`}>in</label>
        </div>
      </td>
      <td className="border pr-2">
        <select
          value={formData.playingStyle}
          onChange={(e) => handleChange("playingStyle", e.target.value)}
          className="py-1 px-2 outline-0"
        >
          {playingStyles.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border pr-2">
        <select
          value={formData.isVarsity}
          onChange={(e) => handleChange("isVarsity", e.target.value)}
          className="py-1 px-2 outline-0"
        >
          {isVarsity.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td className="border px-4">
        <select
          value={formData.team}
          onChange={(e) => handleChange("team", e.target.value)}
          className="py-1 px-2 outline-0"
        >
          {genders.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default PlayerSSRow;
