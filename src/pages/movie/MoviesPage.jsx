
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieList from "@/components/movie/MovieList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Placeholder data
const placeholderMovies = (count = 12, genreFilter = null) => Array(count).fill(null).map((_, i) => ({
  id: `movie-${genreFilter ? genreFilter.substring(0,3) : 'all'}-${i + 1}`,
  title: `Película ${genreFilter ? genreFilter + ' ' : ''}${i + 1}`,
  poster_path: `/placeholder${i % 3 + 1}.jpg`,
  release_date: `202${i % 5}-01-01`,
  vote_average: 7 + (i % 3),
  overview: `Descripción de la película ${i + 1}.`,
  genre_ids: genreFilter ? [1,2,3] : [i%5+1, (i+1)%5+1] // simplified genre logic
}));

const MoviesPage = () => {
  const { genreName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("filter") || "all";

  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(initialTab); // 'all', 'trending', 'latest'

  const itemsPerLoad = 12;

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call based on genreName and activeFilter
    setTimeout(() => {
      let filteredMovies = placeholderMovies(30, genreName);
      if (activeFilter === "trending") {
        filteredMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
      } else if (activeFilter === "latest") {
        filteredMovies = filteredMovies.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
      }
      setMovies(filteredMovies);
      setVisibleMovies(itemsPerLoad);
      setIsLoading(false);
    }, 500);
  }, [genreName, activeFilter]);

  const loadMoreMovies = () => {
    setVisibleMovies(prev => prev + itemsPerLoad);
  };

  const pageTitle = genreName 
    ? `Películas de ${genreName.charAt(0).toUpperCase() + genreName.slice(1).replace('-', ' ')}` 
    : "Todas las Películas";

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0 section-title-underline">
          {pageTitle}
        </h1>
        <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="all" className={activeFilter === "all" ? "filter-tab-active" : ""}>Todas</TabsTrigger>
            <TabsTrigger value="trending" className={activeFilter === "trending" ? "filter-tab-active" : ""}>Tendencia</TabsTrigger>
            <TabsTrigger value="latest" className={activeFilter === "latest" ? "filter-tab-active" : ""}>Estrenos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading && movies.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">Cargando películas...</p>
      ) : (
        <MovieList
          movies={movies.slice(0, visibleMovies)}
          onShowMore={loadMoreMovies}
          hasMore={visibleMovies < movies.length}
          isLoadingMore={isLoading && movies.length > 0}
          itemsPerLoad={itemsPerLoad}
        />
      )}
    </motion.div>
  );
};

export default MoviesPage;
