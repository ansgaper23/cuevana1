import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star, CalendarDays, User, Tag, Tv, Info, ChevronLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedEpisodeServer, setSelectedEpisodeServer] = React.useState(null);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    const currentSeries = storedContent.find(item => item.id === id && item.contentType === 'series');
    setSeries(currentSeries);
    
    if (currentSeries && currentSeries.videoServers && currentSeries.videoServers.length > 0 && currentSeries.videoServers[0].url) {
      // For series, we might not have distinct "seasons" and "episodes" in the simple localStorage model.
      // We'll use the first valid videoServer as the default player.
      // A more complex structure would be needed for seasons/episodes.
      setSelectedEpisodeServer(currentSeries.videoServers[0]);
    }
    window.scrollTo(0, 0);
  }, [id]);


  if (!series) {
     return (
      <div className="text-center py-20">
        <Tv className="mx-auto h-16 w-16 text-cuevana-green mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Serie no encontrada</h1>
        <p className="text-cuevana-light-gray mb-6">Lo sentimos, no pudimos encontrar los detalles de esta serie o el ID no corresponde a una serie.</p>
        <Button asChild className="bg-cuevana-green hover:bg-opacity-80 text-white">
          <Link to="/"><ChevronLeft className="mr-2 h-5 w-5" /> Volver al Inicio</Link>
        </Button>
      </div>
    );
  }
  
  const posterSrc = series.posterUrl || "https://images.unsplash.com/photo-1675023112817-52b789fd2ef0"; // Default placeholder

  const handleEpisodeSelect = (server) => {
    setSelectedEpisodeServer(server);
    const playerSection = document.getElementById('video-player-section');
    if (playerSection) {
      window.scrollTo({ top: playerSection.offsetTop - 80, behavior: 'smooth' });
    }
  };

  // Simplified episode/server display for series from localStorage
  const availableServers = series.videoServers?.filter(s => s.name && s.url) || [];


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <Button variant="outline" asChild className="border-cuevana-border text-cuevana-light-gray hover:bg-cuevana-medium-dark hover:text-foreground">
          <Link to="/series">
            <ChevronLeft className="mr-2 h-5 w-5" /> Volver a Series
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
            alt={`Póster de ${series.title}`}
           src={posterSrc} src="https://images.unsplash.com/photo-1687580712178-0a0d6097e6e3" />
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-2/3 lg:w-3/4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cuevana-green mb-3">{series.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-cuevana-light-gray mb-6 text-sm sm:text-base">
            {series.rating && <span className="flex items-center"><Star className="h-5 w-5 mr-1.5 text-yellow-400 fill-current" /> {parseFloat(series.rating).toFixed(1)}/10</span>}
            {series.releaseDate && <span className="flex items-center"><CalendarDays className="h-5 w-5 mr-1.5" /> {new Date(series.releaseDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} ({series.year})</span>}
            {series.genre && <span className="flex items-center"><Tag className="h-5 w-5 mr-1.5" /> {series.genre}</span>}
          </div>
          
          {series.synopsis && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 flex items-center"><Info className="h-6 w-6 mr-2 text-cuevana-blue" />Sinopsis</h2>
              <p className="text-cuevana-light-gray leading-relaxed text-sm sm:text-base">{series.synopsis}</p>
            </div>
          )}

          {series.directorCreator && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 flex items-center"><User className="h-5 w-5 mr-2 text-cuevana-blue" />Creador(es)</h2>
              <p className="text-cuevana-light-gray text-sm sm:text-base">{series.directorCreator}</p>
            </div>
          )}
        </motion.div>
      </div>

      {selectedEpisodeServer && selectedEpisodeServer.url && (
        <motion.div 
          id="video-player-section"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="my-8 sm:my-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">Reproductor</h2>
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl border border-cuevana-border">
            <iframe
              src={selectedEpisodeServer.url}
              title={`Reproductor de ${series.title} - ${selectedEpisodeServer.name}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      )}

      {availableServers.length > 0 && (
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-8 sm:my-10"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 flex items-center"><Tv className="h-6 w-6 mr-2 text-cuevana-blue" />Opciones de Video / Episodios</h2>
          {/* Simplified server list for series. For full season/episode structure, Tabs component would be more complex */}
          <div className="bg-cuevana-medium-dark p-4 sm:p-6 rounded-lg border border-cuevana-border shadow-md">
            <ul className="space-y-3">
              {availableServers.map((server, index) => (
                <li 
                  key={index} 
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-md transition-all duration-200 ease-in-out cursor-pointer
                              ${selectedEpisodeServer && selectedEpisodeServer.name === server.name 
                                ? 'bg-cuevana-green/20 border-l-4 border-cuevana-green' 
                                : 'hover:bg-cuevana-dark/70'}`}
                  onClick={() => handleEpisodeSelect(server)}
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className={`font-medium ${selectedEpisodeServer && selectedEpisodeServer.name === server.name ? 'text-cuevana-green' : 'text-foreground'}`}>{server.name || `Opción ${index + 1}`}</h3>
                  </div>
                  <Button 
                    variant={selectedEpisodeServer && selectedEpisodeServer.name === server.name ? "default" : "outline"}
                    size="sm" 
                    className={`
                      ${selectedEpisodeServer && selectedEpisodeServer.name === server.name 
                        ? 'bg-cuevana-green text-white' 
                        : 'border-cuevana-green text-cuevana-green hover:bg-cuevana-green/10'}
                      transition-colors duration-200 w-full sm:w-auto
                    `}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" /> Ver Ahora
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SeriesDetailPage;