import { Course } from "@/types/course";
type CourseCardProps = {
  course: Course;
};
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <>
      <article key={course.id} className="courseCard">
        <h2>{course.title}</h2>
        <p>รหัสวิชา: {course.code}</p>
        <p>{course.credits} หน่วยกิต</p>
        <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
      </article>
    </>
  );
}
