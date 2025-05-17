
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlayCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = ({ movie }) => {
  if (!movie) {
    return (
      <div className="relative h-[60vh] md:h-[75vh] lg:h-[85vh] flex items-center justify-center bg-card text-foreground">
        <p>Cargando destacados...</p>
      </div>
    );
  }

  const { title, overview, backdrop_path, id, release_date, vote_average, original_language } = movie;
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? `${vote_average.toFixed(1)}/10` : 'N/A';

  return (
    <motion.section 
      className="relative h-[60vh] md:h-[75vh] lg:h-[85vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0">
        <img  
          alt={`Fondo de la película ${title}`} 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1694429936848-eeb39d0591ed" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent md:w-3/4 lg:w-2/3"></div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col justify-end h-full pb-12 md:pb-20 px-4">
        <motion.div 
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight break-words">
            {title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <span>{rating}</span>
            <span>{year}</span>
            {original_language && <span className="uppercase ">{original_language}</span>}
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-sm text-xs font-medium">Película</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
            {overview}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg text-base px-6 py-3">
              <Link to={`/movie/${id}`}>
                <PlayCircle className="mr-2 h-5 w-5" /> Ver Ahora
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-foreground/50 text-foreground hover:bg-foreground/10 bg-foreground/5 backdrop-blur-sm text-base px-6 py-3">
              <Link to={`/movie/${id}?tab=details`}>
                <Info className="mr-2 h-5 w-5" /> Más Información
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
