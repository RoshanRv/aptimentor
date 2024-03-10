import NewUser from "@/components/component/newUser";
import StudentDashboard from "@/components/component/studentDashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUser } from "./actions";
import StaffDashboard from "@/components/component/staffDashboard";

const Dashboard = async () => {
  const session = await getServerSession();

  // redirects to / if user is not logged in
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await getUser(session.user.email);

  // redirects to / if user is not found

  if (!user) redirect("/");

  const isNewUser = !user.institution;

  if (isNewUser) return <NewUser username={user.name} email={user.email} />;

  return (
    <main className="pt-20 pb-2 px-3 lg:px-6">
      {user.role === "student" ? (
        <StudentDashboard user={user} />
      ) : (
        user.role === "staff" && <StaffDashboard user={user} />
      )}
    </main>
  );
};

export default Dashboard;
