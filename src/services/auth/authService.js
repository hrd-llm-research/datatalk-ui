"use server";
import { auth, signIn, signOut } from "@/auth";

export async function SignInAction(formData) {
  try {
    const result = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (result?.error) {
      console.error("Sign-in failed:", result.error);
      return { success: false, message: result.error };
    }

    return { success: true, message: "Sign-in successful" };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return { success: false, message: "An error occurred during sign-in" };
  } finally {
    console.log("Sign-in process completed");
  }
}

export async function SignUpAction(formData) {
  const baseUrl = process.env.BASE_URL;
  console.log(formData);
  const payload = {
    email: formData.email,
    full_name: formData.firstName + " " + formData.lastName,
    password: formData.password,
  };
  if (!baseUrl) {
    console.error("BASE_URL is not defined in environment variables.");
    return { success: false, message: "Server configuration error" };
  }
  try {
    const response = await fetch(`${baseUrl}/auth/create-user`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create user:", errorData);
      return { success: false, message: errorData.detail || "Signup failed" };
    }

    return { success: true };
  } catch (e) {
    console.error("Authentication Error while creating user:", e);
    return { success: false, message: "An error occurred while creating user" };
  }
}
export async function verifyOTPAction(formData) {
  const url = new URL(`${process.env.BASE_URL}/auth/verify`);
  url.searchParams.append("email", formData.email);
  url.searchParams.append("otp_code", formData.pin);

  console.log("Request URL:", url.toString());
  try {
    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("OTP Verification failed:", errorData);
      return {
        success: false,
        message: errorData.detail || "OTP verification failed",
      };
    }

    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return {
      success: false,
      message: "An error occurred during OTP verification",
    };
  }
}
export default async function resendOTPAction(email) {
  const url = new URL(`${process.env.BASE_URL}/auth/resend`);
  url.searchParams.append("email", email);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Rsend OTP failed:", errorData);
      return {
        success: false,
        message: errorData.detail || "Resend OTP failed",
      };
    }
    return {
      success: true,
      message: "OTP resent successfully",
    };
  } catch (error) {
    console.error("Error During OTP resend:", error);
    return {
      success: false,
      message: "An error occurred during OTP resend",
    };
  }
}

export async function getCurrentUser() {
  const session = await auth();
  const token = session?.user?.accessToken;

  try {
    const response = await fetch(`${process.env.BASE_URL}/auth/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
export async function updateProfile(fullname) {
  const url = new URL(`${process.env.BASE_URL}/profile/edit-profile-user`);
  url.searchParams.append("full_name", fullname);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating profile:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to update profile.",
      };
    }

    const responseData = await response.json();
    return {
      success: true,
      message: "Profile updated successfully!",
      data: responseData,
    };
  } catch (error) {
    console.error("Network error during profile update:", error);
    return {
      success: false,
      message: "An error occurred while updating the profile.",
    };
  }
}

export async function SignOutService() {
  try {
    await signOut({ redirect: false });
    console.log("Sign-out successful");
    return true;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return false;
  }
}
// formData f {
//   newPassword: '1234567890',
//   confirmPassword: '1234567890',
//   email: 'penhseyha4980@gmail.com'
// }
export async function forgetPasswordService(formData) {
  const session = await auth();
  const token = session?.user?.accessToken;
  const url = new URL(`${process.env.BASE_URL}/auth/reset-password`);
  url.searchParams.append("email", formData.email);
  url.searchParams.append("new_password", formData.newPassword);
  url.searchParams.append("confirm_password", formData.confirmPassword);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to reset password:", errorData.message);
      return {
        success: false,
        message: errorData.message || "Password reset failed",
      };
    }
    console.log("Password reset successful");
    return { success: true };
  } catch (error) {
    console.error("Error during forget password:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
