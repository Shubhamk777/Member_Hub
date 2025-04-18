
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Award, 
  FileText, 
  BarChart3, 
  Bell, 
  FolderClosed,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { icon: Layers, name: "Dashboard", path: "/" },
  { icon: Users, name: "Members", path: "/members" },
  { icon: Award, name: "Certificates", path: "/certificates" },
  { icon: Bell, name: "Reminders", path: "/reminders" },
  { icon: FolderClosed, name: "Documents", path: "/documents" },
  { icon: BarChart3, name: "Reports", path: "/reports" },
  { icon: Settings, name: "Settings", path: "/settings" },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-screen transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border relative",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="bg-primary rounded-md p-1 flex items-center justify-center">
          <Users size={isOpen ? 24 : 20} className="text-white" />
        </div>
        {isOpen && <span className="font-bold text-lg">MemberHub</span>}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav>
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent group",
                    location.pathname === item.path && "bg-sidebar-accent font-medium"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "min-w-[20px]",
                    location.pathname === item.path ? "text-primary" : "text-sidebar-foreground"
                  )} />
                  {isOpen && <span>{item.name}</span>}
                  {!isOpen && (
                    <div className="absolute left-14 px-2 py-1 bg-popover rounded-md invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-md z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 bg-background text-foreground border border-border rounded-full p-1 shadow-md"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </aside>
  );
};

export default Sidebar;
