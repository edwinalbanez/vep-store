import { ChevronsUpDown } from "lucide-react";
import {
  CollapsibleText,
} from "@/components/ui/Sidebar";
import { useSidebar } from "@/context/SidebarContext";

export const UserMenu = ({ children }) => {
  return (
    <div className="bg-white dark:bg-black rounded-md shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-200 ease-in-out origin-bottom-left">
      {children}
    </div>
  );
};

const InitialLetter = ({
  letter,
  className = "",
}) => {
  return (
    <div
      className={`w-8 h-8 bg-gray-200 dark:bg-gray-100/20 rounded-full flex items-center justify-center shrink-0 text-gray-600 dark:text-white font-semibold ${className}`}
    >
      {letter}
    </div>
  );
};

// interface User {
//   name: string;
//   email: string;
// }

export function UserInfo({ user }) {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-zinc-700 bg-gray-50/50 dark:bg-black">
      <InitialLetter letter={user.name[0]} />
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {user.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {user.email}
        </span>
      </div>
    </div>
  );
}

export const UserMenuContent = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

export const UserMenuButton = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100/15 transition-colors text-left group`}
    >
      {children}
    </button>
  );
};

export const UserMenuTrigger = ({ user }) => {
  const { open: openSidebar } = useSidebar();
  const sidebarSpacing = openSidebar ? "px-1.5" : "px-3.5";
  return (
    <div className="p-2">
      <button
        className={`flex w-full cursor-pointer items-center py-1.5 text-gray-900 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-100/10 transition-all duration-300 group ${sidebarSpacing}`}
      >
        <InitialLetter letter={user.name[0]} />
        <CollapsibleText className="flex w-full items-center gap-2 justify-between">
          {user.name}
          <ChevronsUpDown className="w-4 h-4" />
        </CollapsibleText>
      </button>
    </div>
  );
};
