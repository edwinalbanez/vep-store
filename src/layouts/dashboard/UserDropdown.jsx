import { useSidebar  } from '@/context/SidebarContext';
import {
  Dropdown,
  DropdownContent, 
  DropdownTrigger
} from '@/components/ui/Dropdown';
import {
  UserInfo,
  UserMenu,
  UserMenuButton,
  UserMenuContent,
  UserMenuTrigger
} from './UserMenu';
import {
  LogOut,
  Settings
} from 'lucide-react';

const UserDropdown = () => {
  const { open: openSidebar } = useSidebar();
  const align = openSidebar ? 'top-center' : 'right-top';
  const auth = {
    user: {
      name: "Edwin",
      email: "test@test.com"
    },
  }

  return (
    <Dropdown className='w-full'>
      <DropdownTrigger className='w-full'>
        <UserMenuTrigger user={auth.user}/>
      </DropdownTrigger>
      <DropdownContent align={align} className='mb-2 ml-2'>
          <UserMenu>
            <UserInfo user={auth.user} />
            <UserMenuContent>
              <UserMenuButton>
                <Settings className="w-4 h-4 text-gray-600 dark:text-white" />
                Configuración
              </UserMenuButton>
              <UserMenuButton>
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </UserMenuButton>
            </UserMenuContent>
          </UserMenu>
        </DropdownContent>
      </Dropdown>
  );
};


export { UserDropdown }