import { selectApiBaseUrl } from "@/store/reducers/apiSlice";
import { useSelector } from "react-redux";

const baseUrl = useSelector(selectApiBaseUrl);

export const registerUser = async (
  baseUrl: string,
  userData: {
    name: string;
    email: string;
    phone: string;
    clerkUserId: string;
  }
) => {
  try {
    const response = await fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Register API error:", error);
    throw error;
  }
};
