import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-secondary/30 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="heroGrid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--primary)" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#heroGrid)" /></svg>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Tu Aliado Profesional en Electricidad
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Herramientas y Recursos Esenciales para <span className="text-primary">Electricistas</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Accede a calculadoras precisas, bases de datos completas, recursos educativos y herramientas de gestión para optimizar tu trabajo diario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link to="/calculators">
                  Explorar Herramientas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary transform hover:scale-105 transition-transform duration-300">
                <Link to="/resources">
                  Ver Recursos
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />Cálculos Precisos</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />Recursos Actualizados</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />Fácil de Usar</span>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="aspect-video bg-muted rounded-xl shadow-2xl p-2 border border-border">
              <img 
                alt="Electricista trabajando con herramientas profesionales en un panel eléctrico"
                className="w-full h-full object-cover rounded-lg"
               src="https://images.unsplash.com/photo-1654692623770-7b4f39a94783" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-secondary/30 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;