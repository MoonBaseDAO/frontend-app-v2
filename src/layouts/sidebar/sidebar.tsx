import { SidebarProps } from "@/interface/sidebar";
import { DesktopSidebar } from "./desktop";
import { MobileSidebar } from "./mobile";

export const Sidebar = (props: SidebarProps) => {
  return (
    <div>
      <MobileSidebar {...props} />
      <DesktopSidebar />
    </div>
  );
}