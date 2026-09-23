export const GAME_PLATFORMS = [
  "PC",
  "PlayStation 5",
  "Nintendo Switch",
  "Xbox Series X/S",
  "Mobile",
] as const;

export type GamePlatform = (typeof GAME_PLATFORMS)[number];

export const GAME_STATUSES = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"] as const;

export type GameStatus = (typeof GAME_STATUSES)[number];

export type Game = {
  id: string;
  title: string;
  platform: GamePlatform;
  estimatedHours: number;
  status: GameStatus;
  coverUrl?: string;
};
