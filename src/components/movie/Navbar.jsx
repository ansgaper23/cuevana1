
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film, Tv, ListVideo, UserCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet.jsx";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext.jsx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";


const genres = [
  { title: "Acción", href: "/genres/accion", description: "Películas llenas de adrenalina y emoción." },
  { title: "Comedia", href: "/genres/comedia", description: "Para reír sin parar con las mejores ocurrencias." },
  { title: "Drama", href: "/genres/drama", description: "Historias intensas que te conmoverán." },
  { title: "Ciencia Ficción", href: "/genres/ciencia-ficcion", description: "Viajes a otros mundos y futuros imaginarios." },
  { title: "Terror", href: "/genres/terror", description: "Prepárate para gritar con escalofriantes relatos." },
  { title: "Romance", href: "/genres/romance", description: "Amores apasionados y encuentros inolvidables." },
  { title: "Animación", href: "/genres/animacion", description: "Aventuras coloridas para todas las edades." },
  { title: "Documental", href: "/genres/documental", description: "Explora la realidad y descubre nuevas perspectivas." },
];

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = ({ siteName = "MovieStream", logoUrl = "https://images.unsplash.com/photo-1569587889770-9134d27b292e" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    cn(
      navigationMenuTriggerStyle(),
      "bg-transparent hover:bg-primary/10 focus:bg-primary/20",
      isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
    );
  
  const mobileNavLinkClasses = ({ isActive }) =>
    cn(
      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
      isActive ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-primary/10 hover:text-foreground"
    );


  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
            <img className="h-10 w-auto filter brightness-0 invert" src={logoUrl} alt={`${siteName} Logo`} />
            <span className="text-2xl font-bold text-primary hidden sm:inline">{siteName}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink to="/" className={navLinkClasses}>Inicio</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/movies" className={navLinkClasses}>Películas</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary/10 focus:bg-primary/20 text-foreground/80 hover:text-foreground")}>Géneros</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {genres.map((genre) => (
                        <ListItem key={genre.title} title={genre.title} href={genre.href}>
                          {genre.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/series" className={navLinkClasses}>Series</NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <Input 
                type="search" 
                placeholder="Buscar..." 
                className="bg-muted/50 focus:bg-background border-border/50 rounded-full pl-10 pr-4 py-2 text-sm w-40 md:w-56 transition-all duration-300 focus:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>

            {isAuthenticated && user?.email === 'jorge968122@gmail.com' && (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                       <AvatarImage src="/profile-placeholder.jpg" alt={user.name || "Admin"} />
                       <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name || "Administrador"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Panel de Admin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                  <div className="flex items-center justify-between mb-6">
                     <Link to="/" className="flex-shrink-0 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <img className="h-8 w-auto filter brightness-0 invert" src={logoUrl} alt={`${siteName} Logo`} />
                        <span className="text-xl font-bold text-primary">{siteName}</span>
                      </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
                    </SheetClose>
                  </div>
                  
                  <form onSubmit={handleSearchSubmit} className="mb-6">
                    <div className="relative">
                      <Input 
                        type="search" 
                        placeholder="Buscar..." 
                        className="w-full bg-muted/50 focus:bg-background border-border/50 rounded-md pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </form>

                  <nav className="flex flex-col space-y-2">
                    <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink>
                    <NavLink to="/movies" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Películas</NavLink>
                    <NavLink to="/series" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Series</NavLink>
                    <NavLink to="/genres" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Géneros</NavLink>
                    {/* TODO: Add mobile genres dropdown or separate page */}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
