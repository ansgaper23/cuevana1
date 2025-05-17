
import React, { useState, useEffect } from "react";
import HeroSection from "@/components/movie/HeroSection";
import MovieList from "@/components/movie/MovieList";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Zap, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Placeholder data - replace with actual API calls
const placeholderMovies = (count = 6, type = 'movie') => Array(count).fill(null).map((_, i) => ({
  id: `${type}-${i + 1}`,
  title: type === 'movie' ? `Película de Ejemplo ${i + 1}` : `Serie de Ejemplo ${i + 1}`,
  name: type === 'series' ? `Serie de Ejemplo ${i + 1}` : undefined,
  poster_path: `/placeholder${i % 3 + 1}.jpg`,
  backdrop_path: `/backdrop-placeholder${i % 2 + 1}.jpg`,
  release_date: `202${i % 5}-01-01`,
  first_air_date: type === 'series' ? `202${i % 5}-01-01` : undefined,
  vote_average: 7 + (i % 3),
  overview: `Esta es una breve descripción de la ${type === 'movie' ? 'película' : 'serie'} de ejemplo número ${i + 1}. Disfruta del contenido emocionante.`,
  original_language: 'es'
}));


const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  
  const [visibleTrendingMovies, setVisibleTrendingMovies] = useState(6);
  const [visibleLatestMovies, setVisibleLatestMovies] = useState(6);
  const [visibleTrendingSeries, setVisibleTrendingSeries] = useState(6);

  const itemsPerLoad = 6;

  useEffect(() => {
    // Simulate API calls
    setFeaturedMovie(placeholderMovies(1)[0]);
    setTrendingMovies(placeholderMovies(18, 'movie'));
    setLatestMovies(placeholderMovies(12, 'movie').sort((a,b) => new Date(b.release_date) - new Date(a.release_date)));
    setTrendingSeries(placeholderMovies(12, 'series'));
  }, []);

  const loadMore = (setter, currentVisible) => {
    setter(currentVisible + itemsPerLoad);
  };

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <HeroSection movie={featuredMovie} />
      
      <MovieList
        title="Películas en Tendencia"
        movies={trendingMovies.slice(0, visibleTrendingMovies)}
        onShowMore={() => loadMore(setVisibleTrendingMovies, visibleTrendingMovies)}
        hasMore={visibleTrendingMovies < trendingMovies.length}
        itemsPerLoad={itemsPerLoad}
      />

      <MovieList
        title="Últimos Estrenos de Películas"
        movies={latestMovies.slice(0, visibleLatestMovies)}
        onShowMore={() => loadMore(setVisibleLatestMovies, visibleLatestMovies)}
        hasMore={visibleLatestMovies < latestMovies.length}
        itemsPerLoad={itemsPerLoad}
      />
      
      <MovieList
        title="Series Populares"
        movies={trendingSeries.slice(0, visibleTrendingSeries)}
        isSeries={true}
        onShowMore={() => loadMore(setVisibleTrendingSeries, visibleTrendingSeries)}
        hasMore={visibleTrendingSeries < trendingSeries.length}
        itemsPerLoad={itemsPerLoad}
      />
      
      {/* Example of an additional section */}
      <section className="py-8 md:py-12">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 section-title-underline"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Explora por Género
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {['Acción', 'Comedia', 'Drama', 'Ciencia Ficción', 'Terror'].map((genre, index) => (
            <motion.div
              key={genre}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button variant="outline" className="w-full h-20 text-lg border-primary/40 hover:bg-primary/10 hover:text-primary" asChild>
                <a href={`/genres/${genre.toLowerCase().replace(' ', '-')}`}>{genre}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
