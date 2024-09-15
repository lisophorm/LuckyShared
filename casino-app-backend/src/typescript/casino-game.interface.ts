import { GameCategory } from "./game-category.interface";
import { GameTypes } from "./game-types.interface";

export interface CasinoGame {
  categories: string[];
  features: any[];
  themes: any[];
  icons: any[];
  backgrounds: any[];
  id: string;
  server_game_id: string;
  extearnal_game_id: string;
  front_game_id: string;
  name: string;
  title: string | null;
  ratio: string;
  status: string;
  provider: string;
  show_as_provider: string;
  provider_title: string;
  game_options: any | null;
  blocked_countries: any | null;
  has_age_restriction: number;
  icon_2: string;
  background: string;
  types: GameTypes;
  game_skin_id: string;
  cats: GameCategory[];
  feats: any[];
  thms: any[];
  active: string;
}
