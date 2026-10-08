import { getMyToken } from "@/Utilities/getMyToken";

export default async function changeMyPassword(
  currentPassword: string,
  password: string,
  rePassword: string
) {
  try {
    const token = await getMyToken();

    if (!token || typeof token !== "string") {
      return {
        status: "error",
        message: "Authentication token is missing.",
      };
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          currentPassword,
          password,
          rePassword,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {

    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
