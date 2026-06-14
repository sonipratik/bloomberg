"use client";

import { useAtom } from "jotai";
import { currentViewAtom, isDarkModeAtom } from "../atoms";
import { bloombergColors } from "../lib/theme-config";

export function BloombergTerminal() {
  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const [isDarkMode] = useAtom(isDarkModeAtom);
  const colors = isDarkMode ? bloombergColors.dark : bloombergColors.light;

  return (
    <div 
      className="flex flex-col h-screen font-mono p-4" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="text-2xl font-bold mb-4">Bloomberg Terminal</div>
      
      <div className="mb-4">
        Current View: <span className="text-[#ff9900]">{currentView}</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["market", "movers", "volatility", "rmi", "news"].map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view as any)}
            className="px-4 py-2 border border-[#333] hover:bg-[#333] transition-colors"
          >
            {view.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 border border-[#333]">
        <p className="text-sm text-gray-400">
          Note: Some components (Header, Sidebar, Views) are missing from the repository.
          Please run the commands above and share the output so I can fix the structure.
        </p>
      </div>
    </div>
  );
}
