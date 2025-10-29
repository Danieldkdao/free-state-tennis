"use server";

import adminPlayerModel from "@/db/schemas/adminPlayerSchema";
import adminEventModel from "@/db/schemas/adminEventModel";
import adminNewsModel from "@/db/schemas/adminNewsModel";
import { Event, News, Player } from "./types";
import { connectDB } from "@/db/db";
import { revalidatePath } from "next/cache";

export const addNewRowServer = async (type: "player" | "event" | "news") => {
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
  } else {
    const newNews = new adminNewsModel({
      title: "",
      lengthOfRead: undefined,
      content: "",
      image: undefined,
    });
    await newNews.save();
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
  await adminPlayerModel.findByIdAndDelete(id);
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

export const updateNewsData = async (id: string, data: Partial<News>) => {
  await connectDB();
  await adminNewsModel.findByIdAndUpdate(id, data);
  revalidatePath("/admin/dashboard/news");
  return {
    success: true,
    message: "Admin news spreadsheet updated successfully!",
  };
};
