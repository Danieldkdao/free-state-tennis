"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area_player.png";
import { Player } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { deletePlayerRow, updatePlayerData } from "@/lib/server-actions";
import { usePlayer } from "@/hooks/usePlayer";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

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

  const handleChange = (
    field: keyof Player,
    value: string | number | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          <Image src={UploadAreaImage} alt="Upload area image" width={180} />
        </label>
        <input type="file" id="image" accept="image/*" className="hidden" />
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
