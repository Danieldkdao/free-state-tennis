"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area_player.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Session } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadImageClient } from "../Admin/players/ss-row";
import { submitPlayerForm } from "@/lib/server-actions";
import LoadingSpinner from "@/components/loading-spinner";

const heightSchema = z.object({
  ft: z.number().nullable(),
  in: z.number().nullable(),
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  class: z.string(),
  height: heightSchema,
  playingStyle: z.string(),
  team: z.string(),
});

export type FormType = z.infer<typeof formSchema>;

const PlayerForm = ({
  session,
}: {
  session: Session;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const name = session.user.name || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (data: FormType) => {
    if (isSubmitting) return;
    if (session.user.formCompleted) {
      toast.error(
        "You've already completed this form. To complete again wait for the admins to reset the form."
      );
      return;
    }

    const imageInfo = await uploadImageClient(file);
    const response = await submitPlayerForm(data, imageInfo, session.user.id);
    if (response.success) {
      router.push("/");
      toast.success(response.message);
    } else {
      toast.error("Something went wrong.");
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  };

  const handleImageReset = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
      className="flex flex-col gap-4 items-start mt-4"
    >
      <div className="space-y-2 mb-2 group">
        <label className="block font-medium text-gray-700">Player Image</label>
        <div className="relative">
          <label htmlFor="image" className="cursor-pointer">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Player image preview"
                width={120}
                height={200}
                className="object-cover"
              />
            ) : (
              <Image
                src={UploadAreaImage}
                alt="Upload area image"
                height={150}
              />
            )}
          </label>
          {previewUrl !== null && (
            <button
              onClick={handleImageReset}
              className="absolute hidden top-1 right-1 group-hover:block rounded-full p-1 bg-white cursor-pointer"
            >
              <FaXmark size={20} />
            </button>
          )}
        </div>

        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <div className="w-full">
        <label htmlFor="name" className="block  font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="bio" className="block  font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          rows={3}
          className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0 resize-none"
          {...register("bio")}
        ></textarea>
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">
            {errors.bio.message as string}
          </p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="class" className="block font-medium text-gray-700">
          Class
        </label>
        <select
          id="class"
          className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
          {...register("class")}
        >
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label htmlFor="heightFt" className="block font-medium text-gray-700">
            Height (ft)
          </label>
          <input
            type="number"
            id="heightFt"
            placeholder="Optional"
            className="mt-1 block w-full shadow-sm border border-gray-300 outline-0 py-2 px-3"
            {...register("height.ft", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
          />
        </div>
        <div>
          <label
            htmlFor="heightIn"
            className="block  font-medium text-gray-700"
          >
            Height (in)
          </label>
          <input
            type="number"
            id="heightIn"
            placeholder="Optional"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            {...register("height.in", {
              setValueAs: (v) => (v === "" ? null : Number(v)),
            })}
          />
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="playingStyle"
          className="block  font-medium text-gray-700"
        >
          Playing Style
        </label>
        <select
          id="playingStyle"
          className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
          {...register("playingStyle")}
        >
          <option>Unknown</option>
          <option>Aggressive Baseliner</option>
          <option>Counter-Puncher</option>
          <option>Serve and Volley</option>
          <option>All-Court Player</option>
        </select>
      </div>
      <div className="w-full">
        <label htmlFor="team" className="block font-medium text-gray-700">
          Team
        </label>
        <select
          id="team"
          className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
          {...register("team")}
        >
          <option>Boy</option>
          <option>Girl</option>
        </select>
      </div>
      <button
        disabled={isSubmitting}
        className={`py-2 px-5 free-green-bg text-white cursor-pointer flex items-center gap-2 ${
          isSubmitting ? "opacity-60" : ""
        }`}
      >
        {isSubmitting && (
          <LoadingSpinner
            color="border-white"
            size="h-5 w-5"
            thickness="border-2"
          />
        )}
        Submit
      </button>
    </form>
  );
};

export default PlayerForm;
