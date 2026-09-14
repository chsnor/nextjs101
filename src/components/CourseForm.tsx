"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { Course } from "@/types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};
  if (value.code.trim() === "") nextErrors.code = "กรุณาระบุรหัสวิชา";
  if (value.name.trim() === "") nextErrors.name = "กรุณาระบุชื่อวิชา";
  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }
  if (value.instructor.trim() === "") nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
  return nextErrors;
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
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

  const isEditing = !!initialCourse;

  return (
    <div className="courseForm">
      <h2>{isEditing ? " แก้ไขรายวิชา" : " เพิ่มรายวิชาใหม่"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="formGrid">
          <div className="formField">
            <label htmlFor="code">รหัสวิชา</label>
            <input
              id="code"
              name="code"
              type="text"
              value={draft.code}
              onChange={handleChange}
              aria-invalid={!!errors.code}
              aria-describedby={errors.code ? "code-error" : undefined}
              placeholder="เช่น CS101"
            />
            {errors.code ? <p id="code-error" className="fieldError">{errors.code}</p> : null}
          </div>

          <div className="formField">
            <label htmlFor="credit">หน่วยกิต</label>
            <input
              id="credit"
              name="credit"
              type="number"
              inputMode="numeric"
              min="1"
              max="6"
              value={draft.credit}
              onChange={handleChange}
              aria-invalid={!!errors.credit}
              aria-describedby={errors.credit ? "credit-error" : undefined}
              placeholder="1–6"
            />
            {errors.credit ? <p id="credit-error" className="fieldError">{errors.credit}</p> : null}
          </div>

          <div className="formField full">
            <label htmlFor="name">ชื่อวิชา</label>
            <input
              id="name"
              name="name"
              type="text"
              value={draft.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="ชื่อรายวิชาเต็ม"
            />
            {errors.name ? <p id="name-error" className="fieldError">{errors.name}</p> : null}
          </div>

          <div className="formField full">
            <label htmlFor="instructor">ผู้สอน</label>
            <input
              id="instructor"
              name="instructor"
              type="text"
              value={draft.instructor}
              onChange={handleChange}
              aria-invalid={!!errors.instructor}
              aria-describedby={errors.instructor ? "instructor-error" : undefined}
              placeholder="ชื่ออาจารย์ผู้สอน"
            />
            {errors.instructor ? <p id="instructor-error" className="fieldError">{errors.instructor}</p> : null}
          </div>
        </div>

        <div className="formActions">
          <button type="submit">{isEditing ? "บันทึกการแก้ไข" : "เพิ่มรายวิชา"}</button>
          {isEditing ? (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              ยกเลิก
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
