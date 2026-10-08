"use server";

export async function allordersservice(userId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();


    if (!response.ok) {
      return {
        statusMsg: "fail",
        message: data?.message || "There is an error",
      };
    }

    return data;
  } catch (error) {

    return {
      statusMsg: "fail",
      message: "Something went wrong",
    };
  }
}
