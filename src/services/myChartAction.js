"use server";
import { auth } from "@/auth";
// import { charts } from "@/utils/mockData";
// import { auth } from "@/auth";

// const session = await auth();
// const token = session?.user?.accessToken;

// export async function getAllCharts() {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   const success = Math.random() * 0.5;
//   if (success) {
//     return {
//       success: true,
//       message: "Successfully get all visualizations",
//       data: charts,
//     };
//   } else {
//     return {
//       success: false,
//       message: "Visualizations not found!",
//       data: 0,
//     };
//   }
// }

// export async function renameVisualization(id, newName) {}

// export async function deleteChart(id) {
//   console.log(`Deleting chart ${id}`);
//   await new Promise((resolve) => setTimeout(resolve, 9000));

//   return { success: true, message: "Chart deleted successfully" };
// }
// Delete a specific visualization chart by ID
