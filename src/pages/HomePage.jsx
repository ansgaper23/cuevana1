import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const SectionTitle = ({ title, viewMoreLink }) => (
  <div className="flex justify-between items-center mb-4 sm:mb-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
    {viewMoreLink && (
      <Button variant="link" asChild className="text-cuevana-green hover:text-cuevana-green/80 px-0 sm:px-2">
        <Link to={viewMoreLink}>
          Ver más <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
        </Link>
      </Button>
    )}
  </div>
);

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    const activeMovies = storedContent.filter(item => item.contentType === 'movie').slice(0, 6); // Show latest 6
    const activeSeries = storedContent.filter(item => item.contentType === 'series').slice(0, 6); // Show latest 6
    setMovies(activeMovies);
    setSeries(activeSeries);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.07 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };
  
  const heroImageSlug = "cine-moderno-con-luces-neon";

  return (
    <div className="space-y-10 sm:space-y-16">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-lg overflow-hidden shadow-2xl min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center p-6 bg-cuevana-medium-dark"
      >
        <img  
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt="Hero background image of a modern cinema with neon lights"
         src="https://images.unsplash.com/photo-1579210327027-8a15a0286598" />
        <div className="absolute inset-0 bg-gradient-to-b from-cuevana-dark/50 via-cuevana-dark/80 to-cuevana-dark"></div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Tu Universo de <span className="text-cuevana-green">Películas y Series</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cuevana-light-gray mb-6 sm:mb-8">
            Descubre los últimos estrenos, clásicos inolvidables y las series más populares. Todo en un solo lugar.
          </p>
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca tu película o serie favorita..."
              className="w-full py-3 px-5 pr-12 rounded-full bg-cuevana-dark/70 border-2 border-cuevana-border text-white placeholder-cuevana-light-gray focus:ring-2 focus:ring-cuevana-green focus:border-cuevana-green outline-none transition-all"
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-cuevana-green hover:text-cuevana-green/80">
              <Search className="h-6 w-6" />
            </Button>
          </form>
        </motion.div>
      </motion.section>

      {movies.length > 0 && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle title="Películas Destacadas" viewMoreLink="/movies" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {movies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MovieCard movie={movie} type="movie" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {series.length > 0 && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle title="Series Populares" viewMoreLink="/series" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {series.map((item) => (
               <motion.div key={item.id} variants={itemVariants}>
                <MovieCard movie={item} type="series" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {(movies.length === 0 && series.length === 0) && (
         <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center py-10"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">Aún no hay contenido disponible</h2>
          <p className="text-cuevana-light-gray">El administrador está trabajando para agregar películas y series. ¡Vuelve pronto!</p>
        </motion.section>
      )}


      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-cuevana-blue/80 via-cuevana-green/80 to-cuevana-blue/80 p-6 sm:p-8 rounded-lg shadow-xl text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">¿Listo para la próxima maratón?</h2>
        <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-xl mx-auto">
          Explora nuestro catálogo completo y encuentra tu próxima obsesión. Nuevos títulos agregados regularmente.
        </p>
        <Button size="lg" asChild className="bg-white hover:bg-gray-200 text-cuevana-dark font-semibold shadow-md transition-transform hover:scale-105">
          <Link to="/movies">Explorar Catálogo Completo</Link>
        </Button>
      </motion.section>
    </div>
  );
};

export default HomePage;