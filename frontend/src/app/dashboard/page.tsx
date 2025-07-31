"use client";

import { useState } from "react";
import TabSwitcher from "../components/tab-switcher";
//import PratosList from './pratos/PratosList';
import AlimentosList from "./alimentos/alimento-list";

type ActiveTab = "pratos" | "alimentos";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("pratos");

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
        {/* Renderização condicional baseada na aba ativa */}
        {/*{activeTab === 'pratos' && <PratosList />}*/}
        {activeTab === "alimentos" && <AlimentosList />}
      </main>
    </div>
  );
}
