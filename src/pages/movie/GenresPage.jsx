
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clapperboard, Drama, Heart, Ghost, Rocket, Laugh, Users, Compass, History, Music2, ShieldQuestion, Sword, Atom, Globe } from "lucide-react";

const genres = [
  { name: "Acción", icon: <Clapperboard className="h-8 w-8 mb-2" />, slug: "accion" },
  { name: "Aventura", icon: <Compass className="h-8 w-8 mb-2" />, slug: "aventura" },
  { name: "Animación", icon: <Atom className="h-8 w-8 mb-2" />, slug: "animacion" },
  { name: "Comedia", icon: <Laugh className="h-8 w-8 mb-2" />, slug: "comedia" },
  { name: "Crimen", icon: <ShieldQuestion className="h-8 w-8 mb-2" />, slug: "crimen" },
  { name: "Documental", icon: <Globe className="h-8 w-8 mb-2" />, slug: "documental" },
  { name: "Drama", icon: <Drama className="h-8 w-8 mb-2" />, slug: "drama" },
  { name: "Familia", icon: <Users className="h-8 w-8 mb-2" />, slug: "familia" },
  { name: "Fantasía", icon: <Sword className="h-8 w-8 mb-2" />, slug: "fantasia" },
  { name: "Historia", icon: <History className="h-8 w-8 mb-2" />, slug: "historia" },
  { name: "Terror", icon: <Ghost className="h-8 w-8 mb-2" />, slug: "terror" },
  { name: "Música", icon: <Music2 className="h-8 w-8 mb-2" />, slug: "musica" },
  { name: "Misterio", icon: <ShieldQuestion className="h-8 w-8 mb-2" />, slug: "misterio" },
  { name: "Romance", icon: <Heart className="h-8 w-8 mb-2" />, slug: "romance" },
  { name: "Ciencia Ficción", icon: <Rocket className="h-8 w-8 mb-2" />, slug: "ciencia-ficcion" },
  { name: "Película de TV", icon: <Clapperboard className="h-8 w-8 mb-2" />, slug: "pelicula-de-tv" },
  { name: "Suspense", icon: <Drama className="h-8 w-8 mb-2" />, slug: "suspense" },
  { name: "Bélica", icon: <Sword className="h-8 w-8 mb-2" />, slug: "belica" },
  { name: "Western", icon: <Compass className="h-8 w-8 mb-2" />, slug: "western" },
];

const GenresPage = () => {
  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 section-title-underline">
        Explora por Género
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Button 
              variant="outline" 
              className="w-full h-32 md:h-36 flex flex-col items-center justify-center text-lg border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md" 
              asChild
            >
              <Link to={`/genres/${genre.slug}`}>
                {genre.icon}
                {genre.name}
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GenresPage;
