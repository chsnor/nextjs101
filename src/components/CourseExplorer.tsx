"use client";
import CourseCard from "@/components/CourseCard";
import CourseForm, { CourseDraft } from "@/components/CourseForm";
import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText),
  );

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };
    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  return (
    <div>
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div className="searchWrap">
        <svg
          className="searchIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา..."
        />
      </div>

      {visibleCourses.length === 0 ? (
        <p className="emptyState">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <div className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
