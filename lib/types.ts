export type Comment = {
  user: string;
  comment: string;
  createdAt: Date;
};

export type classes = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type playingStyles =
  | "Unknown"
  | "Aggressive Baseliner"
  | "Counter-Puncher"
  | "Serve and Volley"
  | "All-Court Player";

export type levels = "TBD" | "Varsity" | "Junior Varsity";

export type teams = "Boy" | "Girl";

export type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export type Image = {
  url: string;
  publicId: string;
};

export type Results = {
  wins: number;
  losses: number;
};

export type Height = {
  ft: number | null;
  in: number | null;
};

export type News = {
  _id: string;
  title: string;
  content: string;
  image: Image | null;
  views: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};

export type Player = {
  _id: string;
  image: Image | null;
  name: string;
  bio: string;
  class: classes;
  singles: Results;
  doubles: Results;
  height: Height;
  playingStyle: playingStyles;
  isVarsity: levels;
  team: teams;
};

export type Event = {
  _id: string;
  datetime: Date;
  team: Team;
  away: boolean;
  opponent: string;
  image: Image | null;
  location: string;
};
