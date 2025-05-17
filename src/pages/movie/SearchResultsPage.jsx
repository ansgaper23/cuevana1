
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "@/components/movie/MovieList";
import { motion } from "framer-motion";

// Placeholder data
const placeholderSearch = (query, count = 10) => {
  const movies = Array(count).fill(null).map((_, i) => ({
    id: `search-movie-${query}-${i + 1}`,
    title: `Resultado Película ${query} ${i + 1}`,
    poster_path: `/placeholder-search-m${i % 3 + 1}.jpg`,
    release_date: `202${i % 5}-01-01`,
    vote_average: 7 + (i % 3),
    overview: `Descripción de la película resultado de búsqueda para "${query}".`
  }));
  const series = Array(count).fill(null).map((_, i) => ({
    id: `search-series-${query}-${i + 1}`,
    name: `Resultado Serie ${query} ${i + 1}`,
    poster_path: `/placeholder-search-s${i % 3 + 1}.jpg`,
    first_air_date: `202${i % 4}-03-15`,
    vote_average: 7.5 + (i % 2.5),
    overview: `Resumen de la serie resultado de búsqueda para "${query}".`
  }));
  return { movies, series };
};


const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [resultsMovies, setResultsMovies] = useState([]);
  const [resultsSeries, setResultsSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [visibleSeries, setVisibleSeries] = useState(6);
  const itemsPerLoad = 6;


  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const { movies, series } = placeholderSearch(query, 15);
        setResultsMovies(movies);
        setResultsSeries(series);
        setVisibleMovies(itemsPerLoad);
        setVisibleSeries(itemsPerLoad);
        setIsLoading(false);
      }, 600);
    } else {
      setResultsMovies([]);
      setResultsSeries([]);
    }
  }, [query]);

  const loadMore = (type) => {
    if (type === 'movies') {
      setVisibleMovies(prev => prev + itemsPerLoad);
    } else if (type === 'series') {
      setVisibleSeries(prev => prev + itemsPerLoad);
    }
  };

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Buscando resultados para "{query}"...</div>;
  }

  const noResults = resultsMovies.length === 0 && resultsSeries.length === 0;

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 section-title-underline">
        Resultados de búsqueda para: <span className="text-primary">{query}</span>
      </h1>

      {noResults && !isLoading && (
        <p className="text-center text-xl text-muted-foreground py-10">
          No se encontraron resultados para "{query}". Intenta con otra búsqueda.
        </p>
      )}

      {resultsMovies.length > 0 && (
        <MovieList
          title="Películas Encontradas"
          movies={resultsMovies.slice(0, visibleMovies)}
          onShowMore={() => loadMore('movies')}
          hasMore={visibleMovies < resultsMovies.length}
          itemsPerLoad={itemsPerLoad}
        />
      )}

      {resultsSeries.length > 0 && (
        <div className={resultsMovies.length > 0 ? "mt-12" : ""}>
           <MovieList
            title="Series Encontradas"
            movies={resultsSeries.slice(0, visibleSeries)}
            isSeries={true}
            onShowMore={() => loadMore('series')}
            hasMore={visibleSeries < resultsSeries.length}
            itemsPerLoad={itemsPerLoad}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SearchResultsPage;
