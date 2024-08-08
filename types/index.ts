export type RootStackParamList = {
  HomeTab: undefined;
  HomeMenu: undefined;
  Game: { difficulty: string; mode: string };
  Profile: undefined;
};

export type GameMode = "Find Flag by Name" | "Find Name by Flag";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface GameHistory {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  date: string;
}

export interface Country {
  country: string;
}

export interface CountriesData {
  [code: string]: Country;
}
