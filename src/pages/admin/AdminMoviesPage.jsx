
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { PlusCircle, Search, Edit, Trash2, Eye, MoreHorizontal, Server, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";
import { useLocation, useNavigate } from 'react-router-dom';
import MovieFormDialog from '@/components/admin/movies/MovieFormDialog.jsx'; 
import MoviesTable from '@/components/admin/movies/MoviesTable.jsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

const placeholderMovies = Array(5).fill(null).map((_, i) => ({
  id: `movie-${Date.now() + i}`,
  title: `Película de Ejemplo ${i + 1}`,
  year: 2020 + (i % 4),
  genre: ['Acción', 'Aventura', 'Sci-Fi'][i % 3],
  rating: (7 + (i % 30) / 10).toFixed(1),
  status: i % 3 === 0 ? 'Publicado' : 'Borrador',
  poster_path: `/placeholder${i % 3 + 1}.jpg`,
  overview: `Esta es una película de ejemplo número ${i+1}. Con una trama emocionante.`,
  video_links: [
    { name: 'Servidor Principal', url: `https://ejemplo.com/video${i+1}/main` },
    { name: 'Servidor Secundario', url: `https://ejemplo.com/video${i+1}/backup` }
  ]
}));

const initialNewMovieData = {
  title: '',
  year: new Date().getFullYear(),
  genre: '',
  rating: '',
  status: 'Borrador',
  poster_path: '',
  overview: '',
  video_links: [{ name: 'Servidor 1', url: '' }]
};

const AdminMoviesPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [storedMovies, setStoredMovies] = useLocalStorage('adminMovies', placeholderMovies);
  const [movies, setMovies] = useState(storedMovies);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);
  const [isEditMovieDialogOpen, setIsEditMovieDialogOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [newMovieData, setNewMovieData] = useState(initialNewMovieData);

  useEffect(() => {
    setMovies(storedMovies);
    setIsLoading(false);
  }, [storedMovies]);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('action') === 'add') {
      handleOpenAddMovieDialog();
      navigate('/admin/movies', { replace: true }); 
    }
  }, [location.search, navigate]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    (movie.genre && movie.genre.toLowerCase().includes(searchTerm)) ||
    (movie.year && movie.year.toString().includes(searchTerm))
  );

  const handleOpenAddMovieDialog = () => {
    setNewMovieData(initialNewMovieData);
    setIsAddMovieDialogOpen(true);
  };

  const handleOpenEditMovieDialog = (movie) => {
    setCurrentMovie(JSON.parse(JSON.stringify(movie)));
    setIsEditMovieDialogOpen(true);
  };
  
  const handleSaveNewMovie = (data) => {
    const updatedMovies = [{ ...data, id: `movie-${Date.now()}` }, ...movies];
    setMovies(updatedMovies);
    setStoredMovies(updatedMovies);
    toast({ title: "Película Guardada (Simulado)", description: `${data.title} ha sido añadida.` });
    setIsAddMovieDialogOpen(false);
  };

  const handleSaveEditedMovie = (data) => {
    const updatedMovies = movies.map(m => m.id === data.id ? data : m);
    setMovies(updatedMovies);
    setStoredMovies(updatedMovies);
    toast({ title: "Película Actualizada (Simulado)", description: `${data.title} ha sido actualizada.` });
    setIsEditMovieDialogOpen(false);
    setCurrentMovie(null);
  };

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter(m => m.id !== id);
    setMovies(updatedMovies);
    setStoredMovies(updatedMovies);
    toast({
      title: `Película eliminada (simulado)`,
      description: "Esta acción es simulada y no persistirá fuera del almacenamiento local.",
    });
  };

  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestionar Películas</h1>
            <p className="text-muted-foreground">Añade, edita o elimina películas de tu catálogo.</p>
          </div>
          <Button onClick={handleOpenAddMovieDialog} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5" /> Añadir Nueva Película
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Listado de Películas</CardTitle>
            <CardDescription>
              Un total de {filteredMovies.length} películas encontradas.
            </CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar películas por título, género, año..."
                className="pl-10 w-full md:w-1/2 lg:w-1/3 bg-background"
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Cargando películas...</p>
            ) : (
              <MoviesTable 
                movies={filteredMovies}
                onEdit={handleOpenEditMovieDialog}
                onDelete={handleDeleteMovie}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {isAddMovieDialogOpen && (
        <MovieFormDialog
          open={isAddMovieDialogOpen}
          onOpenChange={setIsAddMovieDialogOpen}
          movieData={newMovieData}
          onSave={handleSaveNewMovie}
          title="Añadir Nueva Película"
          description="Completa los detalles de la nueva película y sus servidores de video."
        />
      )}

      {isEditMovieDialogOpen && currentMovie && (
        <MovieFormDialog
          open={isEditMovieDialogOpen}
          onOpenChange={setIsEditMovieDialogOpen}
          movieData={currentMovie}
          onSave={handleSaveEditedMovie}
          title={`Editando: ${currentMovie.title}`}
          description="Modifica los detalles de la película y sus servidores de video."
        />
      )}
    </AdminLayout>
  );
};

export default AdminMoviesPage;
