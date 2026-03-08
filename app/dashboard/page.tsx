import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage(){
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
      </div>
    </div>
  );
}
