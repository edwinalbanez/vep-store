import { useState, useRef, useEffect, ReactNode, ComponentProps, useContext, createContext } from 'react';
import {
  User, CreditCard, Settings, Keyboard, Users, UserPlus,
  Github, LifeBuoy, Cloud, LogOut, Mail, MessageSquare,
  PlusCircle, ChevronRight
} from 'lucide-react';

// Hook para cerrar el menú al detectar clicks fuera del componente
function useOnClickOutside(ref, handler) {
  
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    //cuando se hace click tanto izquierdo como derecho en cualquier lugar
    document.addEventListener("mousedown", listener);

    //en móviles, cuando se toca la pantalla en cualquier lugar
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const DropdownContext = createContext(null);

// Hook para obtener los valores del contexto
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context;
}

export const Dropdown = ({
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(open => !open);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div ref={ref} className={`${className} relative inline-flex justify-center text-left`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({
  className,
  children
}) => {
  const { toggleDropdown } = useDropdown();
  return(
    <div onClick={toggleDropdown} className={className}>
      {children}
    </div>
  )
}

// type Align = 'top-center' | 'top-right' | 'top-left' | 
//   'bottom-center' | 'bottom-right' | 'bottom-left' | 
//   'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'


const positions = {
  ['top-center']: 'bottom-full',
  ['top-right']: 'bottom-full left-0',
  ['top-left']: 'bottom-full right-0',
  ['bottom-center']: 'top-full',
  ['bottom-right']: 'top-full left-0',
  ['bottom-left']: 'top-full right-0',
  ['right-top']: 'bottom-0 left-full',
  ['right-bottom']: 'left-full',
  ['left-top']: 'buttom-0 right-full',
  ['left-bottom']: 'right-full'
}

export const DropdownContent = ({
  className,
  align,
  children
}) => {
  const { isOpen } = useDropdown();
  return(
    <div className={`absolute z-1 w-56 rounded-md border border-slate-200 bg-white shadow-md transition-all duration-200 ease-in-out dark:border-zinc-700 dark:bg-(--carbon) dark:text-slate-100 ${className} ${positions[align]} ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
      {children}
    </div>
  )
}

// interface DropdownItemProps {
//   icon?: React.ElementType;
//   children: ReactNode;
//   shortcut?: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   className?: string;
// }

export const DropdownItem = ({
  icon: Icon,
  children,
  shortcut,
  onClick,
  disabled,
  className = ''
}) => {
  const context = useContext(DropdownContext);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    context?.toggleDropdown();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
        hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-800 dark:focus:bg-slate-800
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />}
      <span className="flex-1 text-left text-slate-700 dark:text-slate-200">{children}</span>
      {shortcut && <span className="ml-auto text-xs tracking-widest text-slate-400 dark:text-slate-500">{shortcut}</span>}
    </button>
  );
};

// interface SubMenuProps {
//   trigger: ReactNode;
//   icon?: React.ElementType;
//   children: ReactNode;
// }

export const DropdownSubMenu = ({ trigger, icon: Icon, children }) => {
  return (
    <div className="relative group w-full">
      <button className="flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=open]:bg-red-800">
        {Icon && <Icon className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />}
        <span className="flex-1 text-left text-slate-700 dark:text-slate-200">{trigger}</span>
        <ChevronRight className="ml-auto h-4 w-4 text-slate-500" />
      </button>

      {/* submenu */}
      <div className="absolute left-full top-0 ml-1 hidden w-48 rounded-md border border-slate-200 bg-white p-1 shadow-md group-hover:block dark:border-zinc-700 dark:bg-(--carbon) animate-in fade-in slide-in-from-left-1 duration-800">
        {children}
      </div>
    </div>
  );
};

export const DropdownLabel = ({ children }) => (
  <div className="px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
    {children}
  </div>
);

export const DropdownSeparator = () => (
  <div className="my-1 h-px bg-slate-200 dark:bg-zinc-700" />
);


export default function DemoDropdown() {
  return (
    <Dropdown>
        <DropdownTrigger>
          <button className="rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-950 dark:ring-slate-800 dark:hover:bg-slate-900 dark:text-white">
            Open
          </button>
        </DropdownTrigger>
        <DropdownContent align='bottom-center'>
          <DropdownLabel>My Account</DropdownLabel>
          <DropdownSeparator />

          <DropdownItem icon={User} shortcut="⇧⌘P">Profile</DropdownItem>
          <DropdownItem icon={CreditCard} shortcut="⌘B">Billing</DropdownItem>
          <DropdownItem icon={Settings} shortcut="⌘S">Settings</DropdownItem>
          <DropdownItem icon={Keyboard} shortcut="⌘K">Keyboard shortcuts</DropdownItem>

          <DropdownSeparator />

          <DropdownItem icon={Users}>Team</DropdownItem>

          {/* El Submenú anidado */}
          <DropdownSubMenu icon={UserPlus} trigger="Invite users">
            <DropdownItem icon={Mail}>Email</DropdownItem>
            <DropdownItem icon={MessageSquare}>Message</DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={PlusCircle}>More...</DropdownItem>
          </DropdownSubMenu>

          <DropdownItem icon={PlusCircle} shortcut="⌘T">New Team</DropdownItem>

          <DropdownSeparator />

          <DropdownItem icon={Github}>GitHub</DropdownItem>
          <DropdownItem icon={LifeBuoy}>Support</DropdownItem>
          <DropdownItem disabled icon={Cloud}>API</DropdownItem>

          <DropdownSeparator />

          <DropdownItem icon={LogOut} shortcut="⇧⌘Q">Log out</DropdownItem>
        </DropdownContent>
      </Dropdown>
  );
}