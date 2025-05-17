import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, Star, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";

const MovieCard = ({ movie, isSeries = false, index = 0 }) => {
  if (!movie) return null;

  const { id, title, name, poster_path, release_date, first_air_date, vote_average, overview, runtime = 120 } = movie;
  const displayTitle = title || name;
  const date = release_date || first_air_date;
  const year = date ? new Date(date).getFullYear() : "N/A";
  const itemType = isSeries ? "tv" : "movie";
  const shortOverview = overview ? (overview.length > 100 ? overview.substring(0, 97) + "..." : overview) : "Sinopsis no disponible.";
  const displayRuntime = isSeries ? (movie.number_of_seasons ? `${movie.number_of_seasons} Temp.` : 'N/A') : (runtime ? `${runtime} min` : 'N/A');


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.05, duration: 0.3 }
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }}
            className="group relative rounded-lg overflow-hidden shadow-lg bg-card border border-border/50 transition-all duration-300 ease-in-out transform hover:shadow-primary/30 hover:border-primary/50"
          >
            <Link to={`/${itemType}/${id}`} className="block">
              <div className="aspect-[2/3] relative">
                {poster_path ? (
                  <img 
                    alt={`Póster de ${displayTitle}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                   src="https://images.unsplash.com/photo-1534136302631-89abb23adf45" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Sin imagen</span>
                  </div>
                )}
                <div className="movie-card-play-icon">
                  <PlayCircle className="h-16 w-16 text-white/80" />
                </div>
                <div className="absolute top-0 left-0 bg-gradient-to-b from-black/60 to-transparent p-2 w-full">
                   {vote_average > 0 && (
                    <div className="flex items-center text-xs text-yellow-400 font-semibold">
                      <Star className="h-3 w-3 mr-1 fill-current" /> {vote_average.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="movie-card-year-badge">
                   {isSeries ? "Serie" : "Película"} {year !== "N/A" && `• ${year}`}
                </div>
              </div>
              <div className="p-3 bg-card">
                <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {displayTitle}
                </h3>
              </div>
            </Link>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="start" className="bg-card border-primary/50 shadow-xl p-4 max-w-xs z-20">
          <div className="space-y-2">
            <h4 className="font-bold text-base text-foreground">{displayTitle}</h4>
            <div className="flex items-center text-xs text-muted-foreground space-x-3">
              {vote_average > 0 && (
                <span className="flex items-center">
                  <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-yellow-400" /> {vote_average.toFixed(1)}/10
                </span>
              )}
              <span className="flex items-center">
                <CalendarDays className="h-3.5 w-3.5 mr-1" /> {year}
              </span>
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" /> {displayRuntime}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {shortOverview}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MovieCard;