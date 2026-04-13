'use client';

// 移动端底部独立导航组件

interface NavItem {
  key: string;
  label: string;
  icon: string;
}

interface MobileBottomNavProps {
  tabs: NavItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function MobileBottomNav({ tabs, activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-milk-white border-t border-seed-shadow/10 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex-1 flex items-center justify-center h-full transition-colors ${
                isActive ? "text-seed-shadow" : "text-seed-shadow/40"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[10px] font-medium leading-none">{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
