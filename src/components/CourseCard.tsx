import { Course } from "@/types/course";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </h2>
      <p style={{ fontWeight: 600, color: "var(--gray-700)" }}>
        รหัสวิชา: {course.code}
      </p>
      <p>
        {course.credit} หน่วยกิต · ผู้สอน {course.instructor}
      </p>
      <div className="cardActions">
        <button type="button" className="btn-edit" onClick={onEdit}>
          แก้ไข
        </button>
        <button type="button" className="btn-danger" onClick={onDelete}>
          ลบ
        </button>
      </div>
    </article>
  );
}
