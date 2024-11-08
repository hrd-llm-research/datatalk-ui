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
const session = await auth();
const token = session?.user?.accessToken;
// Get All Visualization charts
export async function getAllVisualizationChartsService() {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/visualization/get-all-visulizations`, {
    method: "GET",
    cache: "no-store",
    // headers: {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiQGdtYWlsLmNvbSIsImV4cCI6MTczMTU0NjI0OX0.TXtBrgu-lA3-SQuvyxbFspTD5fkkBDLUcmLRLqSeYuw",
    //   "Content-Type": "application/json",
    // },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json(); // Use res.json() as a function
  // console.log("Data in All saved chart:", data);

  return data;
}

export async function deleteVisualizationByIdService(visualizationId) {
  // console.log("::::::::::::::::::::", visualizationId);
  const baseUrl = process.env.BASE_URL; // Ensure BASE_URL is set in .env

  try {
    const res = await fetch(
      `${baseUrl}/visualization/delete-visualization/${visualizationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiQGdtYWlsLmNvbSIsImV4cCI6MTczMTU0NjI0OX0.TXtBrgu-lA3-SQuvyxbFspTD5fkkBDLUcmLRLqSeYuw",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to delete visualization. Status:", res.status);
      throw new Error("Failed to delete visualization.");
    }

    const data = await res.json();
    console.log("Delete response:", data); // Log response to confirm deletion

    return data; // Assuming the response contains a success message
  } catch (error) {
    console.error("Error deleting visualization:", error);
    return { success: false, message: error.message };
  }
}

// Rename a specific visualization by ID
// export async function renameVisualizationByIdService(visualizationId, newName) {
//   console.log("visualization name:", newName);
//   console.log("New name:");
//   const baseUrl = process.env.BASE_URL;
//   try {
//     const res = await fetch(
//         // http://110.74.194.123:8086/api/visualization/rename-visualization/8e51749c-87fb-4987-83de-cb5415d5618c?visualization_name=Hello
//       `${baseUrl}/visualization/rename-visualization/${visualizationId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!res.ok) {
//       const errorText = await res.text();
//       throw new Error(`Error: ${errorText}`);
//     }

//     const resultData = await res.json();
//     return resultData;
//   } catch (error) {
//     console.error("There was an error renaming the visualization:", error);
//     throw error;
//   }
// }
export async function renameVisualizationByIdService(visualizationId, newName) {
    // Log the visualization ID and the new name
    console.log("Visualization ID:", visualizationId);
    console.log("New Name:", newName);
  
    const baseUrl = process.env.BASE_URL;
    try {
      const res = await fetch(
        `${baseUrl}/visualization/rename-visualization/${visualizationId}?visualization_name=${encodeURIComponent(newName)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response from server:", errorText);
        throw new Error(`Error: ${errorText}`);
      }
  
      const resultData = await res.json();
      console.log("Renaming succeeded:", resultData); // Log the successful response
      return resultData;
    } catch (error) {
      console.error("There was an error renaming the visualization:", error);
      throw error;
    }
  }
  