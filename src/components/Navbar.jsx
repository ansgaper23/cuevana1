import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Lightbulb as Bolt, Calculator, BookOpen, Wrench, Users, FileText, MessageSquare, Search, Settings, LogOut } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
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
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    cn(
      navigationMenuTriggerStyle(),
      "text-sm",
      isActive ? "nav-link-active" : ""
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mr-4 flex items-center"
        >
          <Link to="/" className="flex items-center space-x-2">
            <Bolt className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg">Electrician's Toolkit</span>
          </Link>
        </motion.div>

        <NavigationMenu className="hidden lg:flex mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/" className={navLinkClasses}>
                Inicio
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <Calculator className="mr-2 h-4 w-4" /> Herramientas de Cálculo
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/calculators/voltage-drop" title="Caída de Tensión">
                    Calcula la caída de tensión en un circuito eléctrico.
                  </ListItem>
                  <ListItem href="/calculators/wire-gauge" title="Calibre de Cable">
                    Determina el calibre de cable adecuado para tu instalación.
                  </ListItem>
                  <ListItem href="/calculators/power-consumption" title="Consumo de Energía">
                    Estima el consumo energético de tus aparatos.
                  </ListItem>
                  <ListItem href="/calculators/unit-conversion" title="Conversión de Unidades">
                    Convierte entre diferentes unidades eléctricas.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <BookOpen className="mr-2 h-4 w-4" /> Bases de Datos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/databases/wire-gauges" title="Calibres de Cable">
                    Información detallada sobre diferentes calibres de cable.
                  </ListItem>
                  <ListItem href="/databases/electrical-codes" title="Códigos Eléctricos">
                    Consulta los códigos y normativas eléctricas vigentes.
                  </ListItem>
                  <ListItem href="/databases/symbols" title="Símbolos Eléctricos">
                    Glosario visual de símbolos eléctricos comunes.
                  </ListItem>
                  <ListItem href="/databases/dictionary" title="Diccionario Eléctrico">
                    Definiciones de términos técnicos del sector.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                <Wrench className="mr-2 h-4 w-4" /> Recursos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/resources/tutorials" title="Tutoriales Interactivos">
                    Aprende paso a paso con nuestros tutoriales.
                  </ListItem>
                  <ListItem href="/resources/articles" title="Artículos Informativos">
                    Mantente al día con artículos de expertos.
                  </ListItem>
                  <ListItem href="/resources/faq" title="Preguntas Frecuentes">
                    Encuentra respuestas a las dudas más comunes.
                  </ListItem>
                  <ListItem href="/resources/templates" title="Plantillas Descargables">
                    Optimiza tu trabajo con nuestras plantillas.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/community" className={navLinkClasses}>
                <Users className="mr-2 h-4 w-4" /> Comunidad
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <FileText className="mr-2 h-4 w-4" /> Generar Presupuesto
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;