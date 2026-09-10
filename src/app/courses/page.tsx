import { courses } from "@/data/coursesdata";
import CourseExplorer from "@/components/CourseExplorer";

export default function CoursesPage() {
  return (
    <>
      <CourseExplorer courses={courses} />
    </>


  );
}
