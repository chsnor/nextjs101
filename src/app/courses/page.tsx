import CourseCard from "@/components/CourseCard"
import {courses} from "@/data/coursesdata"

export default function CoursesPage() {
  return (
      <>
        <section className="courseGrid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </>
  );
}
