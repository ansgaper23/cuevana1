
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = ({ siteName = "MovieStream" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-background via-background to-background/90 text-muted-foreground border-t border-border/20 shadow-inner">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div>
            <Link to="/" className="inline-block mb-4">
               <img  alt={`${siteName} Logo`} className="h-10 w-auto filter brightness-0 invert" src="https://images.unsplash.com/photo-1569587889770-9134d27b292e" />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Tu destino definitivo para películas y series. Explora un vasto catálogo de entretenimiento sin límites.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4">Navegación</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/movies" className="hover:text-primary transition-colors">Películas</Link></li>
              <li><Link to="/series" className="hover:text-primary transition-colors">Series</Link></li>
              <li><Link to="/genres" className="hover:text-primary transition-colors">Géneros</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">DMCA</a></li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-4">Newsletter</p>
            <p className="text-sm mb-3">Suscríbete para recibir las últimas noticias y ofertas especiales.</p>
            <form className="flex">
              <Input type="email" placeholder="Tu email" className="rounded-r-none bg-muted/50 focus:bg-background border-border/50" />
              <Button type="submit" variant="default" className="rounded-l-none px-3 bg-primary hover:bg-primary/90">
                <Send size={18} />
              </Button>
            </form>
          </div>

        </div>
        <div className="mt-12 border-t border-border/20 pt-8 text-center text-sm">
          <p>&copy; {currentYear} {siteName}. Todos los derechos reservados. Sitio de demostración.</p>
          <p className="mt-1">Este sitio es un proyecto de demostración y no ofrece contenido real para streaming.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
