import { Store } from "lucide-react";

export default function AppLogo() {
  return (
    <div className="w-9 h-9 bg-black dark:bg-white rounded-lg flex items-center justify-center shrink-0 transition-all duration-300">
      <Store className="w-6 h-6 text-white dark:text-black" />
    </div>
  );
}
