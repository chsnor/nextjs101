import type { Game } from "@/types/game";

export const initialGames: Game[] = [
  {
    id: "game-1",
    title: "Path of exlie",
    platform: "PC",
    estimatedHours: 45,
    status: "กำลังเล่น",
  },
  {
    id: "game-2",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 80,
    status: "เล่นจบแล้ว",
  },
  {
    id: "game-3",
    title: "Black Myth: Wukong",
    platform: "PlayStation 5",
    estimatedHours: 35,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "game-4",
    title: "Cyberpunk 2077: Phantom Liberty",
    platform: "PC",
    estimatedHours: 30,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "game-5",
    title: "Metaphor: ReFantazio",
    platform: "PlayStation 5",
    estimatedHours: 75,
    status: "ยังไม่เริ่ม",
  },
];
