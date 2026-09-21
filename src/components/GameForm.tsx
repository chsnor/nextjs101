"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { Game, GamePlatform, GameStatus } from "@/types/game";
import { InputField } from "@/components/ui/InputField";
import { z } from "zod";
import Image from "next/image";

export type GameDraft = {
  title: string;
  platform: GamePlatform | "";
  estimatedHours: string;
  status: GameStatus;
  coverUrl?: string;
};

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "ยังไม่เริ่ม",
  coverUrl: "",
};

const platforms: GamePlatform[] = [
  "PC",
  "PlayStation 5",
  "Nintendo Switch",
  "Xbox Series X/S",
  "Mobile",
];

const statuses: GameStatus[] = ["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"];

type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: String(game.estimatedHours),
    status: game.status,
    coverUrl: game.coverUrl || "",
  };
}

const gameSchema = z.object({
  title: z.string().trim().min(1, "กรุณาระบุชื่อเกม"),
  platform: z.string().min(1, "กรุณาเลือกแพลตฟอร์ม"),
  estimatedHours: z
    .string()
    .min(1, "กรุณาระบุจำนวนชั่วโมง")
    .refine((val) => {
      const num = Number(val);
      return Number.isInteger(num) && num > 0;
    }, "เวลาที่ใช้ต้องเป็นจำนวนเต็มบวก (ชั่วโมง)"),
  status: z.enum(["ยังไม่เริ่ม", "กำลังเล่น", "เล่นจบแล้ว"]),
  coverUrl: z.string().trim().optional(),
});

function validate(value: GameDraft): FormErrors {
  const result = gameSchema.safeParse(value);
  if (result.success) return {};

  const errors: แ = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof GameDraft;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  const isEditing = !!initialGame;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">
              {isEditing ? "แก้ไขข้อมูล" : "สร้างรายการใหม่"}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isEditing ? "แก้ไขข้อมูลเกม" : "เพิ่มเกมใหม่ลงคลัง Backlog"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition text-sm"
            aria-label="ปิดหน้าต่าง"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {draft.coverUrl && (
            <div className="relative aspect-21/9 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
              <Image
                src={draft.coverUrl}
                alt="พรีวิวภาพหน้าปก"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white">
                Live Preview
              </div>
            </div>
          )}

          <InputField
            id="title"
            name="title"
            label="ชื่อเกม"
            type="text"
            value={draft.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="เช่น Cyberpunk 2077, Elden Ring, Black Myth: Wukong"
          />

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              แพลตฟอร์ม
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {platforms.map((p) => {
                const isSelected = draft.platform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, platform: p }))
                    }
                    className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-semibold border transition text-center ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            {errors.platform ? (
              <p id="platform-error" className="text-red-500 text-xs mt-1.5 font-medium">
                {errors.platform}
              </p>
            ) : null}
          </div>

          <InputField
            id="estimatedHours"
            name="estimatedHours"
            label="เวลาเล่นโดยประมาณ (ชั่วโมง)"
            type="number"
            inputMode="numeric"
            min="1"
            value={draft.estimatedHours}
            onChange={handleChange}
            error={errors.estimatedHours}
            placeholder="เช่น 30"
          />

          <InputField
            id="coverUrl"
            name="coverUrl"
            label="URL รูปภาพหน้าปกเกม (ไม่บังคับ)"
            type="url"
            value={draft.coverUrl || ""}
            onChange={handleChange}
            placeholder="วางลิงก์รูปภาพ เช่น Steam CDN หรือรูปจากเว็บ"
          />

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              สถานะการเล่น
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
              {statuses.map((s) => {
                const isSelected = draft.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, status: s }))
                    }
                    className={`cursor-pointer py-2 rounded-xl text-xs font-bold transition text-center ${
                      isSelected
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              className="cursor-pointer px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
              onClick={() => {
                setDraft(emptyDraft);
                setErrors({});
                onCancel();
              }}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-900/20 active:scale-95"
            >
              {isEditing ? "บันทึกการแก้ไข" : "เพิ่มเกมลงคลัง"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}