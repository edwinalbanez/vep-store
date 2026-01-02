import { useAppearance } from "@/hooks/useAppearance";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  
  const [ appearance, updateAppearance ] = useAppearance();
  // console.log("theme");

  const tabs = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];
  
  return (
    <div
      className={cn(
        "inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800"
      )}
    >
      {/* eslint-disable-next-line no-unused-vars */}
      {tabs.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => updateAppearance(value)}
          className={cn(
            "flex items-center justify-between rounded-md px-2 py-1.5 transition-colors",
            appearance === value
              ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100"
              : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};

export { ThemeToggle };
