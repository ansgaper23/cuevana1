import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star, CalendarDays, User, Tag, Info, Film, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedServer, setSelectedServer] = React.useState(null);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    const currentMovie = storedContent.find(item => item.id === id && item.contentType === 'movie');
    setMovie(currentMovie);
    if (currentMovie && currentMovie.videoServers && currentMovie.videoServers.length > 0) {
      setSelectedServer(currentMovie.videoServers[0]);
    }
    window.scrollTo(0, 0);
  }, [id]);


  if (!movie) {
    return (
      <div className="text-center py-20">
        <Film className="mx-auto h-16 w-16 text-cuevana-green mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Película no encontrada</h1>
        <p className="text-cuevana-light-gray mb-6">Lo sentimos, no pudimos encontrar los detalles de esta película o el ID no corresponde a una película.</p>
        <Button asChild className="bg-cuevana-green hover:bg-opacity-80 text-white">
          <Link to="/"><ChevronLeft className="mr-2 h-5 w-5" /> Volver al Inicio</Link>
        </Button>
      </div>
    );
  }
  
  const posterSrc = movie.posterUrl || "https://images.unsplash.com/photo-1691814994093-bdba60cba4cc"; // Default placeholder

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <Button variant="outline" asChild className="border-cuevana-border text-cuevana-light-gray hover:bg-cuevana-medium-dark hover:text-foreground">
          <Link to="/movies">
            <ChevronLeft className="mr-2 h-5 w-5" /> Volver a Películas
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:w-1/3 lg:w-1/4"
        >
          <img    
            className="w-full h-auto object-cover rounded-lg shadow-xl border-2 border-cuevana-border" 
            alt={`Póster de ${movie.title}`}
           src={posterSrc} src="https://images.unsplash.com/photo-1548912803-8355e980322d" />
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-2/3 lg:w-3/4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cuevana-green mb-3">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-cuevana-light-gray mb-6 text-sm sm:text-base">
            {movie.rating && <span className="flex items-center"><Star className="h-5 w-5 mr-1.5 text-yellow-400 fill-current" /> {parseFloat(movie.rating).toFixed(1)}/10</span>}
            {movie.releaseDate && <span className="flex items-center"><CalendarDays className="h-5 w-5 mr-1.5" /> {new Date(movie.releaseDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
            {movie.genre && <span className="flex items-center"><Tag className="h-5 w-5 mr-1.5" /> {movie.genre}</span>}
          </div>
          
          {movie.synopsis && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 flex items-center"><Info className="h-6 w-6 mr-2 text-cuevana-blue" />Sinopsis</h2>
              <p className="text-cuevana-light-gray leading-relaxed text-sm sm:text-base">{movie.synopsis}</p>
            </div>
          )}

          {movie.directorCreator && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 flex items-center"><User className="h-5 w-5 mr-2 text-cuevana-blue" />Director</h2>
              <p className="text-cuevana-light-gray text-sm sm:text-base">{movie.directorCreator}</p>
            </div>
          )}
          
          {selectedServer && selectedServer.url && (
            <motion.div 
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">Reproductor</h2>
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl border border-cuevana-border">
                <iframe
                  src={selectedServer.url}
                  title={`Reproductor de ${movie.title} - ${selectedServer.name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          {movie.videoServers && movie.videoServers.filter(s => s.name && s.url).length > 0 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Opciones de Video</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {movie.videoServers.filter(s => s.name && s.url).map((server, index) => (
                  <Button
                    key={index}
                    variant={selectedServer && selectedServer.name === server.name ? "default" : "outline"}
                    onClick={() => setSelectedServer(server)}
                    className={`
                      ${selectedServer && selectedServer.name === server.name 
                        ? 'bg-cuevana-green text-white border-cuevana-green' 
                        : 'border-cuevana-border text-cuevana-light-gray hover:bg-cuevana-medium-dark hover:text-foreground hover:border-cuevana-green'}
                      transition-all duration-200 ease-in-out transform hover:scale-105
                    `}
                  >
                    <PlayCircle className="mr-2 h-5 w-5" /> {server.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetailPage;