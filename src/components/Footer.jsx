import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb as Bolt, Facebook, Twitter, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Bolt className="h-7 w-7 text-primary" />
              <span className="font-bold text-lg text-foreground">Electrician's Toolkit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu aliado profesional para cálculos, recursos y gestión en el sector eléctrico.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Navegación</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/calculators" className="text-muted-foreground hover:text-primary">Calculadoras</Link></li>
              <li><Link to="/databases" className="text-muted-foreground hover:text-primary">Bases de Datos</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary">Recursos</Link></li>
              <li><Link to="/community" className="text-muted-foreground hover:text-primary">Comunidad</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary">Herramientas</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary">Descargo de Responsabilidad</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-3">Síguenos</p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <Separator />
        <div className="text-center text-sm text-muted-foreground pt-8">
          <p>&copy; {currentYear} Electrician's Toolkit Pro. Todos los derechos reservados.</p>
          <p className="mt-1">Diseñado para profesionales por profesionales.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;