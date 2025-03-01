"use server";
export const getAllDestinations = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/get-all-destinations`
    );
    if (!response.ok) {
      throw new Error("failed to fetch user order");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};