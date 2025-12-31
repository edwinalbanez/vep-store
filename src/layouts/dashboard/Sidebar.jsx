import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarFooter,
  CollapsibleText,
} from "@/components/ui/Sidebar";
import { navGroups } from "@/utils/nav-groups";
import { UserDropdown } from "./UserDropdown";
import AppLogo from "@/components/AppLogo";

function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
        <CollapsibleText className="font-bold text-sm text-gray-800 uppercase italic">
          Vep store
        </CollapsibleText>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNav navGroups={navGroups} />
      </SidebarContent>

      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}

export { DashboardSidebar };
