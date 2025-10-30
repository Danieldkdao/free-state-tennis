"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area_player.png";
import { Player } from "@/lib/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import {
  deletePlayerRow,
  saveImagePlayers,
  updatePlayerData,
  getSignature,
} from "@/lib/server-actions";
import { usePlayer } from "@/hooks/usePlayer";
import { FaTrash } from "react-icons/fa6";
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

export const yearsOnVarsity = ["0", "1", "2", "3", "4"];

export const isVarsity = ["TBD", "Varsity", "Junior Varsity"];

export const genders = ["Boy", "Girl"];

const PlayerSSRow = ({ player }: { player: Player }) => {
  const [formData, setFormData] = useState(player);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(player.image?.url || null);

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

        const response = await saveImagePlayers(player._id, { url, publicId });
        if(!response.success){
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

  const handleChange = (field: keyof Player, value: string | number | null) => {
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
    toast.success(res.message);
  };

  return (
    <tr className="border relative">
      <td className="border">
        <button
          onClick={handleDelete}
          className="w-full cursor-pointer flex justify-center"
        >
          <FaTrash size={32} />
        </button>
      </td>
      <td>
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
      <td className="border">
        <input
          type="number"
          value={formData.wins !== null ? formData.wins : ""}
          onChange={(e) =>
            handleChange(
              "wins",
              e.target.value === "" ? null : parseInt(e.target.value)
            )
          }
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={formData.losses !== null ? formData.losses : ""}
          onChange={(e) =>
            handleChange(
              "losses",
              e.target.value === "" ? null : parseInt(e.target.value)
            )
          }
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={formData.heightFt !== null ? formData.heightFt : ""}
          onChange={(e) =>
            handleChange(
              "heightFt",
              e.target.value === "" ? null : parseInt(e.target.value)
            )
          }
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          value={formData.heightIn !== null ? formData.heightIn : ""}
          onChange={(e) =>
            handleChange(
              "heightIn",
              e.target.value === "" ? null : parseInt(e.target.value)
            )
          }
          className="py-1 px-2 w-full outline-0"
        />
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
          value={formData.yearsOnVarsity}
          onChange={(e) =>
            handleChange("yearsOnVarsity", parseInt(e.target.value))
          }
          className="py-1 px-2 outline-0 w-full"
        >
          {yearsOnVarsity.map((item, i) => (
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
