import CourseForm from "@/components/CourseForm";

export default function TestPage() {
  return (
    <CourseForm onSave={(draft) => console.log(draft)} onCancel={() => {}} />
  );
}
