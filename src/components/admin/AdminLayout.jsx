
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useSettings } from '@/contexts/SettingsContext.jsx';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { LayoutDashboard, Film, Tv, Users, Settings, LogOut, Menu, X, ExternalLink, Code2 } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";


const adminNavItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: "Películas", path: "/admin/movies", icon: <Film className="h-5 w-5" /> },
  { name: "Series", path: "/admin/series", icon: <Tv className="h-5 w-5" /> },
  { name: "Usuarios", path: "/admin/users", icon: <Users className="h-5 w-5" /> },
  { name: "Publicidad", path: "/admin/ads", icon: <Code2 className="h-5 w-5" /> },
  { name: "Configuración", path: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const navLinkClasses = ({ isActive }) =>
    cn(
      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
      isActive 
        ? "bg-primary text-primary-foreground shadow-md" 
        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
    );

  return (
    <motion.aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex-col border-r bg-card text-card-foreground shadow-lg transition-transform duration-300 ease-in-out md:flex md:translate-x-0",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      )}
      initial={{ x: "-100%" }}
      animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex h-20 items-center justify-between border-b px-6">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <img alt="Admin Logo" className="h-8 w-auto" src={settings.logoUrl || "https://images.unsplash.com/photo-1569587889770-9134d27b292e"} />
          <span className="text-xl font-bold text-primary">{settings.siteName || "AdminPanel"}</span>
        </Link>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid items-start gap-2 px-4">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={navLinkClasses}
              onClick={window.innerWidth < 768 && isOpen ? toggleSidebar : undefined}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
         <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </Button>
      </div>
    </motion.aside>
  );
};


const AdminHeader = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur px-4 md:px-6 md:pl-72">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-muted-foreground hidden md:block">Panel de Administración {settings.siteName}</h1>
      </div>
      <Button variant="outline" size="sm" asChild className="mr-2">
        <Link to="/" target="_blank" rel="noopener noreferrer">
          Ver Sitio <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/profile-placeholder.jpg" alt={user?.name || "Admin"} />
              <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name || "Administrador"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};


const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-64"> 
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
        <footer className="border-t bg-background px-6 py-4 text-center text-xs text-muted-foreground mt-auto md:pl-72">
          &copy; {new Date().getFullYear()} MovieStream Admin Panel.
        </footer>
      </div>
       {isSidebarOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
