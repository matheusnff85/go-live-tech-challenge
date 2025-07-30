import $ from "jquery";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await $.ajax({
      url: `${API_BASE_URL}/login`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
    });
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.responseJSON?.message || "Ocorreu um erro ao tentar fazer login.";
    throw new Error(errorMessage);
  }
};
