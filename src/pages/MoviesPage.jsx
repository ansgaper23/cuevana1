import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import CategorySidebar from '@/components/CategorySidebar';
import { motion } from 'framer-motion';
import { Film, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    const movies = storedContent.filter(item => item.contentType === 'movie');
    setAllMovies(movies);
    setFilteredMovies(movies);

    const uniqueGenres = [...new Set(movies.flatMap(movie => movie.genre.split(',').map(g => g.trim().toLowerCase())))].filter(Boolean);
    setCategories(uniqueGenres);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(
        allMovies.filter(movie => 
          movie.genre.toLowerCase().split(',').map(g => g.trim()).includes(selectedCategory.toLowerCase())
        )
      );
    }
  }, [selectedCategory, allMovies]);

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
        <p className="text-xl text-foreground">Cargando películas...</p>
      </div>
    );
  }
  
  const SidebarContent = () => (
    <CategorySidebar 
      categories={categories} 
      selectedCategory={selectedCategory} 
      onSelectCategory={setSelectedCategory} 
    />
  );

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block">
          <SidebarContent />
        </div>
        
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Películas {selectedCategory ? `- ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : ''}
            </h1>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-cuevana-border text-cuevana-light-gray hover:bg-cuevana-dark">
                    <ListFilter className="h-5 w-5 mr-2" /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-cuevana-dark border-cuevana-border text-foreground p-0">
                  <SheetHeader className="p-4 border-b border-cuevana-border">
                    <SheetTitle className="text-cuevana-green">Categorías</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredMovies.map(movie => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MovieCard movie={movie} type="movie" />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={itemVariants} 
              className="text-center py-16 bg-cuevana-medium-dark rounded-lg shadow-xl"
            >
              <Film className="mx-auto h-20 w-20 text-cuevana-blue mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-3">No hay películas disponibles</h2>
              <p className="text-cuevana-light-gray mb-6 max-w-md mx-auto">
                {selectedCategory 
                  ? `No se encontraron películas en la categoría "${selectedCategory}". Prueba con otra categoría o revisa más tarde.`
                  : "Parece que aún no se han agregado películas. ¡Vuelve pronto!"}
              </p>
              {selectedCategory && (
                <Button onClick={() => setSelectedCategory(null)} className="bg-cuevana-green hover:bg-cuevana-green/80 text-white">
                  Mostrar Todas las Películas
                </Button>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default MoviesPage;