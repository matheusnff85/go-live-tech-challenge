"use client";

type ActiveTab = "pratos" | "alimentos";

interface TabSwitcherProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function TabSwitcher({
  activeTab,
  setActiveTab,
}: TabSwitcherProps) {
  const baseClasses =
    "px-4 py-2 text-sm font-medium rounded-md transition-colors w-40";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "bg-white text-gray-600 hover:bg-gray-100";

  return (
    <div className="flex space-x-2 p-2 justify-center rounded-lg w-fit mx-auto bg-gray-200">
      <button
        onClick={() => setActiveTab("pratos")}
        className={`${baseClasses} ${
          activeTab === "pratos" ? activeClasses : inactiveClasses
        }`}
      >
        Pratos
      </button>
      <button
        onClick={() => setActiveTab("alimentos")}
        className={`${baseClasses} ${
          activeTab === "alimentos" ? activeClasses : inactiveClasses
        }`}
      >
        Alimentos
      </button>
    </div>
  );
}
