import StudentHeader from "../../components/StudentHeader";
import StudentMain from "../../components/StudentMainPage";
export default function StudentLayout({ children }) {
  return (
    <div>
      <StudentHeader />
      <StudentMain/>
      <main className="pt-16">{children}</main>
    </div>
  );
}