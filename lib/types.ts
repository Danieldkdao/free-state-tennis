type PlayerClass = "Freshman" | "Sophomore" | "Junior" | "Senior";

export type News = {
  id: string;
  thumbnailUrl: string;
  readTimeMinutes: number;
  title: string;
  content: string;
  views: number;
  comments: number;
  publishDate: string;
};

export type Player = {
  id: number;
  name: string;
  class: PlayerClass;
  wins: number;
  losses: number;
  height: string;
  playing_style: string;
  yearsOnVarsity: number;
  isVarsity: boolean;
  hometown: string;
  bio: string;
  gender: "Boy" | "Girl",
  profileImageUrl: string | null;
};

export type Match = {
  date: string;
  time: string;
  locationType: "Home" | "Away";
  teamLevel: string;
  opponent: string;
  venue: string;
};