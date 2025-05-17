
import React from "react";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MovieList = ({ title, movies, isSeries = false, onShowMore, hasMore, isLoadingMore, itemsPerLoad = 6 }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No se encontraron {isSeries ? "series" : "películas"} {title ? `para "${title.toLowerCase()}"` : ""}.</p>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12" id={title ? title.toLowerCase().replace(/\s+/g, '-') : ''}>
      {title && (
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 section-title-underline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} isSeries={isSeries} index={index} />
        ))}
      </div>
      {hasMore && onShowMore && (
        <div className="mt-8 text-center">
          <Button onClick={onShowMore} disabled={isLoadingMore} size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            {isLoadingMore ? "Cargando..." : `Cargar más ${isSeries ? "series" : "películas"}`}
          </Button>
        </div>
      )}
    </section>
  );
};

export default MovieList;
