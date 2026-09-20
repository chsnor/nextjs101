export type GamePlatform = "PC" | "PlayStation 5" | "Nintendo Switch" | "Xbox Series X/S" | "Mobile";

export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

export type Game = {
  id: string;
  title: string;
  platform: GamePlatform;
  estimatedHours: number;
  status: GameStatus;
  coverUrl?: string;
};
