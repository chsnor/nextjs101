import type { Game } from "@/types/game";

export const initialGames: Game[] = [
  {
    id: "game-1",
    title: "Path of Exile",
    platform: "PC",
    estimatedHours: 45,
    status: "กำลังเล่น",
    coverUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/header.jpg",
  },
  {
    id: "game-2",
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    estimatedHours: 80,
    status: "เล่นจบแล้ว",
    coverUrl:
      "https://cdn-image-f3580964b8e711e5b95f2ff191a1c838.baas.nintendo.com/1/b1fdf517f82111ea",
  },
  {
    id: "game-3",
    title: "Black Myth: Wukong",
    platform: "PlayStation 5",
    estimatedHours: 35,
    status: "ยังไม่เริ่ม",
    coverUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
  },
  {
    id: "game-4",
    title: "Cyberpunk 2077: Phantom Liberty",
    platform: "PC",
    estimatedHours: 30,
    status: "ยังไม่เริ่ม",
    coverUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
  },
  {
    id: "game-5",
    title: "Metaphor: ReFantazio",
    platform: "PlayStation 5",
    estimatedHours: 75,
    status: "ยังไม่เริ่ม",
    coverUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2679460/header.jpg",
  },
];
