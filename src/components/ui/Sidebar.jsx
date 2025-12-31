import { useIsMobile } from "@/hooks/useMobile";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import {
  ChevronsLeft,
  Menu,
  X
} from "lucide-react";
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  useSidebar,
  SidebarContext
} from "@/context/SidebarContext";

// type SidebarContext = {
//   open: boolean,
//   setOpen: (open: boolean) => void,
//   openMobile: boolean,
//   setOpenMobile: (open: boolean) => void,
//   isMobile: boolean,
//   toggleSidebar: () => void,
// };


const SidebarProvider = ({ children }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const contextValue =
    useMemo(() => ({
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  className = "",
  children,
}) => {
  const { open, openMobile } = useSidebar();

  const mobileStyles = openMobile ? "translate-x-0" : "-translate-x-full";
  const desktopStyles = open ? "md:w-64" : "md:w-20";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-1 w-64 bg-(--snow) dark:bg-[#171717] border-r border-gray-200 dark:border-transparent flex flex-col transition-all duration-300 ease-in-out shadow-2xl md:static md:translate-x-0 md:shadow-none
        ${mobileStyles}
        ${desktopStyles}
        ${className}
      `}
    >
      {children}
    </aside>
  );
};

const SidebarTrigger = ({
  className = "",
  onClick,
}) => {
  const { open, isMobile, toggleSidebar } = useSidebar();

  if (isMobile) {
    return (
      <button
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        className={`md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg ${className}`}
      >
        <Menu className="w-6 h-6" />
      </button>
    );
  }

  return (
    <button
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className="hidden md:block p-2 -ml-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100/15 rounded-lg transition-colors"
    >
      {open ? (
        <ChevronsLeft className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );
};

const SidebarHeader = ({
  className = "",
  children,
}) => {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-900 h-13 min-h-13">
      <div
        className={`flex items-center overflow-x-hidden overflow-y-auto ${className}`}
      >
        {children}
      </div>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const SidebarContent = ({
  className,
  children,
}) => {
  return (
    <nav
      className={`flex-1 px-4 overflow-y-auto overflow-x-hidden ${className}`}
    >
      {children}
    </nav>
  );
};

const SidebarGroup = ({ group }) => {
  const { open } = useSidebar();
  const closedSidebarStyles = !open ? "md:h-0 md:opacity-0 md:p-0 md:m-1" : "";
  return (
    <div>
      <div
        className={`m-2 mt-2 p-1 transition-all duration-300 overflow-hidden h-6 opacity-100 ${closedSidebarStyles}`}
      >
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {group.title}
        </p>
      </div>

      <div className="space-y-1">
        {group.items.map(item => (
          <SidebarLink key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

function SidebarNav({
  navGroups,
  className = "",
}) {
  return (
    <div className={className}>
      {navGroups.map(group => 
        <SidebarGroup key={group.title} group={group} />
      )}
    </div>
  );
}

const CollapsibleText = ({
  children,
  className = "",
}) => {
  const { open } = useSidebar();
  const closeSibebarStyle = "md:opacity-0 md:max-w-0 md:ml-0";
  return (
    <span
      className={`
        whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out opacity-100 max-w-52 ml-3 dark:text-white
        ${!open ? closeSibebarStyle : ""}  
        ${className}`}
    >
      {children}
    </span>
  );
};

function Tooltip({ text, visible }) {
  if (visible) {
    return (
      <div className="hidden md:group-hover:block absolute left-16 bg-gray-900 dark:bg-gray-200 text-white dark:text-black text-xs px-2 py-1 rounded ml-2 z-1 whitespace-nowrap">
        {text}
      </div>
    );
  }
}

const SidebarLink = ({ item }) => {
  const location = useLocation();
  const { open } = useSidebar();

  return (
    <Link
      to={item.href}
      rel="noreferrer"
      className={clsx(
        "flex items-center px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-100/15 transition-colors group",
        {
          "bg-gray-200/65 dark:bg-gray-100/10": location.pathname === item.href,
          "md:px-3.5": !open,
        }
      )}
    >
      {item.icon && (
        <item.icon className="w-4.5 h-4.5 shrink-0 dark:text-white" />
      )}
      <CollapsibleText className="text-sm">{item.title}</CollapsibleText>
      <Tooltip text={item.title} visible={!open} />
    </Link>
  );
};

const SidebarFooter = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

const MobileOverlay = () => {
  const { openMobile, toggleSidebar } = useSidebar();
  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden
        ${openMobile ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}
      onClick={toggleSidebar}
    />
  );
};

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarNav,
  SidebarFooter,
  SidebarLink,
  CollapsibleText,
  MobileOverlay
};
