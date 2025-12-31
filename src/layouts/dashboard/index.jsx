import { SidebarProvider, MobileOverlay } from "@/components/ui/Sidebar";
import { MainContent } from "@/components/MainContent";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./Sidebar";
import { Outlet } from "react-router";
import { Admin } from "@/pages";
import { AppContent } from "@/components/AppContent";
import { MainScrollArea } from "@/components/MainScrollArea";

const AppLayoutTemplate = ({ headerTitle }) => {
  return (
    <div className="flex h-dvh overflow-hidden">
      <SidebarProvider>
        <DashboardSidebar />
        <MobileOverlay />

        <AppContent>
          <DashboardHeader title={headerTitle} />
          <MainScrollArea>
            <Outlet />
          </MainScrollArea>
        </AppContent>
      </SidebarProvider>
    </div>
  );
}

export { AppLayoutTemplate };
