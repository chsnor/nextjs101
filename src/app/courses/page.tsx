import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export default function CoursesPage() {
  return (
    <main className="page">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: 700 }}>รายวิชาทั้งหมด</h1>
      <CourseExplorer initialCourses={courses} />
    </main>
  );
}
