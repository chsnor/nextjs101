"use client";
import { useState } from "react";
import type { Game,GamePlatform,GameStatus } from "@/types/game";

export type GameDraft = {
    title:string;
    platform: GamePlatform | "";
    estimatedHours: string;
    status: GameStatus;
};
const emptyDraft: GameDraft = {
    title:"",
    platform:"",
    estimatedHours:"",
    status:"ยังไม่เริ่ม",
};
type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(Game?: Game): GameDraft {
  if (!Game) {
    return emptyDraft;
  }
  return {
    title: Game.title,
    platform: Game.platform,
    estimatedHours: String(Game.estimatedHours),
    status: Game.status,
  };
}