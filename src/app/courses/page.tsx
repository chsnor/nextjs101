import { courses } from "@/data/coursesdata";
import CourseExplorer from "@/components/CourseExplorer";
export default function CoursesPage() {
  return (
    <>
      <CourseExplorer courses={courses} />
      {/* <section className="courseGrid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section> */}
    </>
  );
}
