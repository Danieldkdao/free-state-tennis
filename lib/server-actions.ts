"use server";

import adminPlayerModel from "@/db/schemas/adminPlayerSchema";
import adminEventModel from "@/db/schemas/adminEventModel";
import playerModel from "@/db/schemas/playerSchema";
import eventModel from "@/db/schemas/eventModel";
import newsModel from "@/db/schemas/newsModel";
import { Event, Image, Player } from "./types";
import { connectDB } from "@/db/db";
import { revalidatePath } from "next/cache";
import cloudinary from "@/db/cloudinary";

export const createNews = async (formData: FormData, file: File | null) => {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const res = await saveImageBuffer(file);
  const image =
    res && "url" in res ? { url: res.url, publicId: res.publicId } : null;

  const newNews = new newsModel({
    title,
    content,
    image,
  });

  await newNews.save();
  revalidatePath("/admin/dashboard/news");
  return {
    success: true,
    message: "News created successfully!",
  };
};

export const deleteNews = async (id: string) => {
  await connectDB();
  await newsModel.findByIdAndDelete(id);
  revalidatePath("/admin/dashboard/news");
  return {
    success: true,
    message: "News deleted successfully!",
  };
};

export const updateNews = async (
  formData: FormData,
  file: File | null,
  id: string
) => {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const res = await saveImageBuffer(file);
  const image =
    res && "url" in res ? { url: res.url, publicId: res.publicId } : null;
  const data = {
    title,
    content,
    image,
  };
  const oldImage = await newsModel.findByIdAndUpdate(id, data).select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
    console.log("Image deleted successfully!");
  }
  revalidatePath("/admin/dashboard/news");
  return {
    success: true,
    message: "News updated successfully!",
  };
};

export const addNewRowServer = async (type: "player" | "event") => {
  await connectDB();
  if (type === "player") {
    const newPlayer = new adminPlayerModel({
      image: null,
      name: "",
      bio: "",
      class: "Freshman",
      wins: null,
      losses: null,
      heightFt: null,
      heightIn: null,
      playingStyle: "Unknown",
      yearsOnVarsity: 0,
      isVarsity: "TBD",
      seasonsPlayed: [],
      team: "Boy",
    });
    await newPlayer.save();
  } else if (type === "event") {
    const date = new Date(Date.now());
    const isoString = date.toISOString();
    const newEvent = new adminEventModel({
      datetime: isoString,
      team: "Boys Varsity",
      away: true,
      opponent: "",
      image: undefined,
      location: "",
    });
    await newEvent.save();
  }
};

export const updatePlayerData = async (id: string, data: Partial<Player>) => {
  await connectDB();
  await adminPlayerModel.findByIdAndUpdate(id, data);
  revalidatePath("/admin/dashboard/players");
  return {
    success: true,
    message: "Admin player spreadsheet updated successfully!",
  };
};

export const deletePlayerRow = async (id: string) => {
  await connectDB();
  const deletedUser = await adminPlayerModel.findByIdAndDelete(id);
  if (deletedUser?.image?.publicId) {
    await deleteImage(deletedUser.image.publicId);
  }
  revalidatePath("/admin/dashboard/players");
  return {
    success: true,
    message: "Player row deleted successfully!",
  };
};

export const updateEventData = async (id: string, data: Partial<Event>) => {
  await connectDB();
  await adminEventModel.findByIdAndUpdate(id, data);
  revalidatePath("/admin/dashboard/events");
  return {
    success: true,
    message: "Admin events spreadsheet updated successfully!",
  };
};

export const publish = async (type: "player" | "event") => {
  await connectDB();
  if (type === "player") {
    const adminPlayers = await adminPlayerModel.find({}).lean();
    const validPlayers = adminPlayers.filter((p) => {
      return p.name.trim() !== "" && p.bio.trim() !== "";
    });

    await playerModel.deleteMany({});
    if (validPlayers.length > 0) {
      await playerModel.insertMany(validPlayers);
    } else {
      return {
        success: false,
        message: "Make sure the name and bio fields are filled in.",
      };
    }
    revalidatePath("/roster");
    revalidatePath("/admin/dashboard/players");
  } else if (type === "event") {
    const adminEvents = await adminEventModel.find({}).lean();
    const validEvents = adminEvents.filter((e) => {
      return e.datetime && e.opponent !== "" && e.location !== "";
    });

    await eventModel.deleteMany({});
    if (validEvents.length > 0) {
      await eventModel.insertMany(validEvents);
    } else {
      return {
        success: false,
        message:
          "Make sure that there is a date, an opponent, and a location for each event.",
      };
    }
    revalidatePath("/schedule");
    revalidatePath("/admin/dashboard/events");
  }
  return {
    success: true,
    message: "Published successfully!",
  };
};

export const saveImagePlayers = async (id: string, image: Image) => {
  const oldImage = await adminPlayerModel
    .findByIdAndUpdate(id, { $set: { image } })
    .select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
  }
  return { success: true, message: "Image saved successfully!" };
};

export const saveImageEvents = async (id: string, image: Image) => {
  const oldImage = await adminEventModel
    .findByIdAndUpdate(id, { $set: { image } })
    .select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
  }
  return { success: true, message: "Image saved successfully!" };
};

export const deleteImage = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result === "ok") {
    console.log("Cloudinary image deleted successfully!");
  } else {
    console.warn("Failed to delete cloudinary image.");
  }
};

export const getSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const paramsToSign = {
    timestamp,
    folder: "free-state-tennis",
  };

  try {
    const signature = await cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );
    return { timestamp, signature };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate signature." };
  }
};

export const saveImageBuffer = async (file: File | null) => {
  if (!file) return;
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "free-state-tennis",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });
    return { url: result.secure_url, publicId: result.publicId } as Image;
  } catch (error) {
    console.error(error);
    return { error: "Failed to upload image." };
  }
};
