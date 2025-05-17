import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { SearchX, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (query) {
      const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
      const filteredResults = storedContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase()) ||
        item.year.toString().includes(query) ||
        (item.directorCreator && item.directorCreator.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
    setLoading(false);
  }, [query]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <Film className="mx-auto h-12 w-12 text-cuevana-green animate-spin mb-4" />
        <p className="text-xl text-foreground">Buscando...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Resultados de búsqueda para: <span className="text-cuevana-green">{query}</span>
      </h1>
      <p className="text-cuevana-light-gray mb-8">{results.length} resultado(s) encontrado(s).</p>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {results.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <MovieCard movie={item} type={item.contentType} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          variants={itemVariants} 
          className="text-center py-16 bg-cuevana-medium-dark rounded-lg shadow-xl"
        >
          <SearchX className="mx-auto h-20 w-20 text-cuevana-blue mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">No se encontraron resultados</h2>
          <p className="text-cuevana-light-gray mb-6 max-w-md mx-auto">
            Intenta con diferentes palabras clave o revisa la ortografía.
          </p>
          <Button asChild className="bg-cuevana-green hover:bg-cuevana-green/80 text-white">
            <Link to="/">Volver al Inicio</Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchPage;