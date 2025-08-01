"use client";
import React from "react";
import LoginForm from "../components/login-form";
import { loginUser } from "../../services/apiService";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError("");
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token);
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-blue-500">Login</h3>
          <p className="text-sm text-gray-500">
            Utilize seu email e senha para entrar.
          </p>
        </div>
        <LoginForm onSubmit={login} error={error} />
      </div>
    </div>
  );
}
