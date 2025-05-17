import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, BookCopy, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const resourceLinks = [
  { name: "Tutoriales Interactivos", path: "tutorials", icon: <Wrench className="mr-2 h-5 w-5" /> },
  { name: "Artículos Informativos", path: "articles", icon: <BookCopy className="mr-2 h-5 w-5" /> },
  { name: "Preguntas Frecuentes (FAQ)", path: "faq", icon: <HelpCircle className="mr-2 h-5 w-5" /> },
  { name: "Plantillas Descargables", path: "templates", icon: <FileText className="mr-2 h-5 w-5" /> },
];

const ResourcesPage = () => {
  const location = useLocation();
  const isResourceHome = location.pathname === "/resources" || location.pathname === "/resources/";

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Recursos Educativos</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Amplía tus conocimientos y optimiza tu trabajo con nuestros recursos seleccionados.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.aside 
          className="md:w-1/4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Recursos</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname.includes(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.aside>

        <main className="md:w-3/4">
          {isResourceHome ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {resourceLinks.map((link) => (
                <Link key={link.path} to={link.path} className="tool-card p-0">
                  <Card className="h-full hover:shadow-none hover:border-transparent transition-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{link.name}</CardTitle>
                      {React.cloneElement(link.icon, { className: "h-6 w-6 text-muted-foreground" })}
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Accede a nuestros {link.name.toLowerCase()}.
                      </p>
                      <div className="flex items-center pt-2 text-sm text-primary">
                        Explorar recursos <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResourcesPage;