"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../services/auth";

import TabSwitcher from "../components/tab-switcher";
import AlimentosList from "./alimentos/alimento-list";
import PratosList from "./pratos/prato-list";

type ActiveTab = "pratos" | "alimentos";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("pratos");
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando...
      </div>
    );
  }
  if (user) {
    return (
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento</h1>
          <p className="text-gray-500 mt-1">
            Crie, edite e visualize pratos e alimentos.
          </p>
        </header>

        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="mt-6">
          {activeTab === "pratos" && <PratosList />}
          {activeTab === "alimentos" && <AlimentosList />}
        </main>
      </div>
    );
  }
  return null;
}
