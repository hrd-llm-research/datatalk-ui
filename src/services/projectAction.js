"use server";
import { auth } from "@/auth";
export async function submitConnectionAction(data) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const url = new URL(`${process.env.BASE_URL}/database/createDatabase`);
  url.searchParams.append("schema_name", data.schema);
  url.searchParams.append("types", data.databaseType);

  const payload = {
    connection_name: data.connectionName,
    ip_address: data.host,
    database_name: data.database,
    username: data.username,
    password: data.password,
    port: Number(data.port),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message =
        res.status === 409
          ? errorData.detail || "Connection name already exists."
          : errorData.message || "Failed to submit connection.";
      console.error("Error submitting connection:", errorData);
      return { success: false, message };
    }

    const responseData = await res.json();
    return {
      success: true,
      message: "Connection submitted successfully!",
      data: responseData,
    };
  } catch (error) {
    console.error("Network error during connection submission:", error);
    return {
      success: false,
      message: "An error occurred while submitting the connection.",
    };
  }
}

export async function testConnectionAction(data) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const payload = {
    connection_name: data.connectionName,
    ip_address: data.host,
    database_name: data.database,
    username: data.username,
    password: data.password,
    port: Number(data.port),
  };
  console.log("seyha", payload);
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/database/databaseConnection/${data.databaseType}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    console.log(res)
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error Details:", errorData);
      throw new Error(
        "Connection test failed: " +
          (errorData.message || "Unprocessable entity")
      );
    }
    const responseData = await res.json();
    return { success: true, message: "Connection successful!", responseData };
  } catch (error) {
    console.error("Error testing connection:", error);
    return { success: false, message: "Connection failed. Please try again." };
  }
}

export async function renameProject(id, newName) {
  const session = await auth();
  const token = session?.user?.accessToken;
  const url = new URL(`${process.env.BASE_URL}/database/ConnectionName/${id}`);
  url.searchParams.append("newConnectionName", newName);
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error renaming project:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to rename project.",
      };
    }

    console.log("Project renamed successfully");
    return { success: true, message: "Project renamed successfully" };
  } catch (error) {
    console.error("Error during project rename:", error);
    return {
      success: false,
      message: "An error occurred while renaming the project.",
    };
  }
}
export async function deleteProject(id) {
  const session = await auth();
  const token = session?.user?.accessToken;
  const url = new URL(`${process.env.BASE_URL}/database/deleteDatabase`);
  url.searchParams.append("databaseId", id);

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error deleting project:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to delete project.",
      };
    }

    console.log("Project deleted successfully");
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error during project deletion:", error);
    return {
      success: false,
      message: "An error occurred while deleting the project.",
    };
  }
}

export async function getAllConnection(session) {
  const token = session?.user?.accessToken;

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/database/getAllUserConnection`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch connections");
    }
    const data = await res.json();
    console.log("this is connection for database : ", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching connections:", error);
    return { success: false, message: error.message };
  }
}
