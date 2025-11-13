"use server";

import adminPlayerModel from "@/db/schemas/adminPlayerSchema";
import adminEventModel from "@/db/schemas/adminEventModel";
import playerModel from "@/db/schemas/playerSchema";
import eventModel from "@/db/schemas/eventModel";
import newsModel from "@/db/schemas/newsModel";
import { Event, Image, Player, Results } from "./types";
import { connectDB } from "@/db/db";
import { revalidatePath } from "next/cache";
import cloudinary from "@/db/cloudinary";
import { FormType } from "@/components/player/player-form";
import userModel from "@/db/schemas/userModel";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const createNews = async (formData: FormData, image: Image | null) => {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

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
  image: Image | null,
  id: string
) => {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

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
      singles: {
        wins: 0,
        losses: 0,
      },
      doubles: {
        wins: 0,
        losses: 0,
      },
      height: {
        ft: null,
        in: null,
      },
      playingStyle: "Unknown",
      isVarsity: "TBD",
      team: "Boy",
    });
    await newPlayer.save();
  } else if (type === "event") {
    const newEvent = new adminEventModel({
      datetime: new Date(),
      team: "Boys Varsity",
      away: true,
      opponent: "",
      image: null,
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

export const submitPlayerForm = async (
  formData: FormType,
  image: Image | null,
  userId: string
) => {
  const results: Results = {
    wins: 0,
    losses: 0,
  };

  const newPlayer = new adminPlayerModel({
    ...formData,
    image,
    singles: results,
    doubles: results,
    isVarsity: "TBD",
  });
  await newPlayer.save();
  await userModel.findByIdAndUpdate(userId, { $set: { formCompleted: true } });
  return { success: true, message: "Form completed successfully!" };
};

export const deletePlayerRow = async (id: string) => {
  await connectDB();
  const deletedUser = await adminPlayerModel
    .findByIdAndDelete(id)
    .select("image");
  if (deletedUser?.image?.publicId) {
    await deleteImage(deletedUser.image.publicId);
  }
  revalidatePath("/admin/dashboard/players");
  return {
    success: true,
    message: "Player row deleted successfully!",
  };
};

export const deleteEventRow = async (id: string) => {
  const deletedEvent = await adminEventModel
    .findByIdAndDelete(id)
    .select("image");
  if (deletedEvent?.image?.publicId) {
    await deleteImage(deletedEvent.image.publicId);
  }
  revalidatePath("/admin/dashboard/events");
  return {
    success: true,
    message: "Event row deleted successfully!",
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

export const saveImageEvents = async (id: string, image: Image | null) => {
  const oldImage = await adminEventModel
    .findByIdAndUpdate(id, { $set: { image } })
    .select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
  }
  return { success: true, message: "Image saved successfully!" };
};

export const resetImagePlayers = async (id: string) => {
  const oldImage = await adminPlayerModel
    .findByIdAndUpdate(id, { $set: { image: null } })
    .select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
  }
  return { success: true, message: "Images reset successfully!" };
};

export const resetImageEvents = async (id: string) => {
  const oldImage = await adminEventModel
    .findByIdAndUpdate(id, { $set: { image: null } })
    .select("image");
  if (oldImage?.image?.publicId) {
    await deleteImage(oldImage.image.publicId);
  }
  return { success: true, message: "Images reset successfully!" };
};

export const deleteImage = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result === "ok") {
    console.log("Cloudinary image deleted successfully!");
  } else {
    console.warn("Failed to delete cloudinary image.");
  }
};

export const postCommentServer = async (
  comment: string,
  user: string,
  newsId: string
) => {
  const newComment = {
    comment,
    user,
  };
  await newsModel.findByIdAndUpdate(newsId, {
    $push: { comments: newComment },
  });
  return { success: true, message: "Comment posted successfully!" };
};
