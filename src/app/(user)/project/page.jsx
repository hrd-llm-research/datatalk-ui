"use server";
import { getAllConnection } from "@/services/projectAction";
import ProjectPage from "./components/ProjectPage";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  const connections = await getAllConnection(session);
  return <ProjectPage data={connections?.data?.payload} />;
}
