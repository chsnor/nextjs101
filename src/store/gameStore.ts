import { Game, GameStatus } from "@/types/game";
import { initialGames } from "@/data/games";
import { create } from "zustand";
export type GameState = {
  games: Game[];
  lastDeletedGame: Game | null;
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (id: string, updated: Omit<Game, "id">) => void;
  deleteGame: (id: string) => void;
  restoreGame: () => void;
  cycleStatus: (id: string) => void;
};

const nextStatusMap: Record<GameStatus, GameStatus> = {
  ยังไม่เริ่ม: "กำลังเล่น",
  กำลังเล่น: "เล่นจบแล้ว",
  เล่นจบแล้ว: "ยังไม่เริ่ม",
};

export const useGameStore = create<GameState>((set) => ({
  games: initialGames,
  lastDeletedGame: null,
  addGame: (newGame) =>
    set((state) => ({
      games: [
        {
          ...newGame,
          id: `game-${crypto.randomUUID()}`,
        },
        ...state.games,
      ],
    })),

  updateGame: (id, updated) =>
    set((state) => ({
      games: state.games.map((game) =>
        game.id === id ? { ...updated, id } : game,
      ),
    })),

  deleteGame: (id) =>
    set((state) => {
      const target = state.games.find((g) => g.id === id) || null;
      return {
        games: state.games.filter((g) => g.id !== id),
        lastDeletedGame: target,
      };
    }),

  restoreGame: () =>
    set((state) => {
      if (!state.lastDeletedGame) return state;
      return {
        games: [state.lastDeletedGame, ...state.games],
        lastDeletedGame: null,
      };
    }),

  cycleStatus: (id) =>
    set((state) => ({
      games: state.games.map((game) =>
        game.id === id ? { ...game, status: nextStatusMap[game.status] } : game,
      ),
    })),
}));
