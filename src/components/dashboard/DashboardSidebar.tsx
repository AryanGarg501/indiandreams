import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Trophy,
  Sparkles,
  User,
  LogOut,
  Flame,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Guides", icon: BookOpen, href: "/dashboard" },
  { label: "Challenges", icon: Trophy, href: "/dashboard" },
  { label: "AI Tools", icon: Sparkles, href: "/dashboard" },
];

interface DashboardSidebarProps {
  userName: string;
  onLogout: () => void;
}

export function DashboardSidebar({ userName, onLogout }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
          ID
        </div>
        {!collapsed && (
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            Indian Dreams
          </span>
        )}
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href && item.label === "Home";
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link to={item.href} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile" className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{userName}</span>
                  <span className="text-xs text-muted-foreground">Profile</span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
