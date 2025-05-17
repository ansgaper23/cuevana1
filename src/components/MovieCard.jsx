import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type = 'movie' }) => {
  const itemLink = `/${type}/${movie.id}`;
  const posterSrc = movie.posterUrl || "https://images.unsplash.com/photo-1548912803-8355e980322d"; // Default placeholder

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(30, 30, 30, 0.4)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="bg-cuevana-medium-dark border-cuevana-border overflow-hidden h-full flex flex-col group">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img    
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" 
            alt={movie.title}
           src={posterSrc} src="https://images.unsplash.com/photo-1529680713471-db81b5138164" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          {movie.rating && (
            <div className="absolute top-2 right-2 bg-cuevana-green text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md">
              <Star className="h-3 w-3 mr-1 fill-current" /> {parseFloat(movie.rating).toFixed(1)}
            </div>
          )}
           <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Button variant="default" className="w-full bg-cuevana-green hover:bg-cuevana-green/80 text-white text-xs sm:text-sm" asChild>
                <Link to={itemLink}>
                  <PlayCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ver ahora
                </Link>
              </Button>
           </div>
        </div>
        <CardContent className="p-3 sm:p-4 flex-grow">
          <CardTitle className="text-sm sm:text-base font-semibold text-foreground hover:text-cuevana-green transition-colors truncate">
            <Link to={itemLink}>{movie.title}</Link>
          </CardTitle>
          <p className="text-xs text-cuevana-light-gray mt-1">{movie.year} &bull; {movie.genre}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard;