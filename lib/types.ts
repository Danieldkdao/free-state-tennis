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

export type yearsOnVarsity = 1 | 2 | 3 | 4;

export type isVarsity = "TBD" | "Varsity" | "Junior Varsity";

export type teams = "Boy" | "Girl";

export type Team =
  | "Boys Varsity"
  | "Boys Junior Varsity"
  | "Girls Varsity"
  | "Girls Junior Varsity";

export type News = {
  _id: string;
  title: string;
  content: string;
  image: string | null;
  views: number;
  comments: Comment[];
  createdAt: Date;
};

export type Player = {
  _id: string;
  image: string | null;
  name: string;
  bio: string;
  class: classes;
  wins: number | null;
  losses: number | null;
  heightFt: number | null;
  heightIn: number | null;
  playingStyle: playingStyles;
  yearsOnVarsity: yearsOnVarsity;
  isVarsity: isVarsity;
  seasonsPlayed: string[];
  team: teams;
};

export type Event = {
  _id: string;
  datetime: string;
  team: Team;
  away: boolean;
  opponent: string;
  image: string | null;
  location: string;
};
