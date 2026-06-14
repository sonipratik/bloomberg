"use client";

import { useAtom } from "jotai";
import {
  currentViewAtom,
  isDarkModeAtom,
} from "../atoms";
import { BloombergHeader } from "../core/bloomberg-header";
import { BloombergSidebar } from "../core/bloomberg-sidebar";
import { MarketView } from "../views/market-view";
import { MarketMoversView } from "../views/market-movers-view";
import { NewsView } from "../views/news-view";
import { RmiView } from "../views/rmi-view";
import { VolatilityView } from "../views/volatility-view";
import { bloombergColors } from "../lib/theme-config";

export function BloombergTerminal() {
  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
  const colors = isDarkMode ? bloombergColors.dark : bloombergColors.light;

  const renderCurrentView = () => {
    switch (currentView) {
      case "market":
        return <MarketView isDarkMode={isDarkMode} />;
      
      case "movers":
        return (
          <MarketMoversView
            isDarkMode={isDarkMode}
            onBack={() => setCurrentView("market")}
            marketData={{
              americas: [],
              emea: [],
              asiaPacific: [],
            }}
            onRefresh={() => {}}
            isLoading={false}
          />
        );
      
      case "volatility":
        return (
          <VolatilityView
            isDarkMode={isDarkMode}
            onBack={() => setCurrentView("market")}
            marketData={{
              americas: [],
              emea: [],
              asiaPacific: [],
            }}
            onRefresh={() => {}}
            isLoading={false}
          />
        );
      
      case "rmi":
        return <RmiView />;
      
      case "news":
        return (
          <NewsView
            isDarkMode={isDarkMode}
            onBack={() => setCurrentView("market")}
          />
        );
      
      default:
        return <MarketView isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className="flex flex-col h-screen font-mono overflow-hidden"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Top Header */}
      <BloombergHeader
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <BloombergSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isDarkMode={isDarkMode}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-2">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
}
