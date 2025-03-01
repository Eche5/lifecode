"use server";
export const loginUser = async (username: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
    if (!response.ok) {
      throw new Error("username not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" }; // Return error message
  }
};

export const RegisterUser = async (username: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
    if (!response.ok) {
      throw new Error("username already exists");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" }; // Return error message
  }
};

export const updateUser = async (username: string, score: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, score }),
      }
    );
    if (!response.ok) {
      throw new Error("username already exists");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" }; // Return error message
  }
};

export const getLeaderBoard = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/get-all-users`
    );
    if (!response.ok) {
      throw new Error("username not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" }; // Return error message
  }
};
