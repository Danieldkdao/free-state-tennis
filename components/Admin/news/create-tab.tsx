"use client";

import Image from "next/image";
import UploadAreaImage from "@/public/upload_area.png";
import Editor from "@/components/editor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type NewsForm = z.infer<typeof newsSchema>;

type CreateTabPropTypes = {
  buttonText: string;
  submitFunc: (formData: FormData, file: File | null, ...any: any) => Promise<any>;
  defaultContent: string;
  defaultTitle: string;
  defaultImage: string | null;
};

const CreateTab = ({
  buttonText,
  defaultContent,
  defaultImage,
  defaultTitle,
  submitFunc,
}: CreateTabPropTypes) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<NewsForm>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      content: defaultContent,
      title: defaultTitle,
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  }

  const onSubmit = async (data: NewsForm) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    await submitFunc(formData, file);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-start"
    >
      <div className="space-y-2">
        <p>Image</p>
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
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="py-2 px-3 outline-0 border border-gray-300 shadow-sm w-full max-w-72"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label>Content</label>
        <div className="mt-2">
          <Editor
            value={watch("content")}
            onChange={(value) => setValue("content", value)}
          />
        </div>
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`py-2 px-5 free-green-bg text-white cursor-pointer flex items-center gap-2 ${
          isLoading ? "opacity-60" : ""
        }`}
      >
        {isLoading && (
          <LoadingSpinner
            color="border-white"
            size="h-5 w-5"
            thickness="border-2"
          />
        )}
        {buttonText}
      </button>
    </form>
  );
};

export default CreateTab;
