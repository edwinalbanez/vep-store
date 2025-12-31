import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/Sidebar";

function DashboardHeader({ title }) {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-100 dark:border-zinc-900 px-4 md:px-8 py-4 flex items-center justify-between gap-4 h-13 shrink-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <h1 className="font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

export { DashboardHeader };
