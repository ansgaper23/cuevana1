
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, Star, CalendarDays, Clock, Tv, Film as FilmIcon, ChevronLeft, Download, ServerOff as ServerIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx";
import { useLocalStorage } from '@/hooks/useLocalStorage.js';
import { useSettings } from '@/contexts/SettingsContext.jsx';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";

const MovieDetailsPage = ({ isSeries = false }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);
  const [storedMovies] = useLocalStorage('adminMovies', []);
  const [storedSeries] = useLocalStorage('adminSeries', []);
  const { settings } = useSettings();
  const { toast } = useToast();


  useEffect(() => {
    setIsLoading(true);
    const dataSource = isSeries ? storedSeries : storedMovies;
    const foundItem = dataSource.find(m => m.id === id);
    
    if (foundItem) {
      setItem(foundItem);
      if (isSeries && foundItem.seasons?.[0]?.episodes?.[0]?.video_links?.[0]) {
        setSelectedServer(foundItem.seasons[0].episodes[0].video_links[0]);
      } else if (!isSeries && foundItem.video_links?.[0]) {
        setSelectedServer(foundItem.video_links[0]);
      } else {
        setSelectedServer(null);
      }
    } else {
      // Fallback for items not in localStorage (e.g. initial placeholders from MovieList)
      // This part would ideally fetch from an API
      const placeholderItem = {
        id,
        title: isSeries ? `Serie de Ejemplo ${id}` : `Película de Ejemplo ${id}`,
        name: isSeries ? `Serie de Ejemplo ${id}` : `Película de Ejemplo ${id}`,
        overview: "Descripción no disponible en el almacenamiento local. Esta es una descripción de ejemplo para un elemento no encontrado.",
        poster_path: '/placeholder-detail.jpg',
        backdrop_path: '/backdrop-placeholder-detail.jpg',
        vote_average: 7.5,
        release_date: '2023-01-01',
        first_air_date: '2023-01-01',
        runtime: 120,
        genres: [{ name: 'Acción' }, { name: 'Aventura' }],
        credits: { cast: [{ name: 'Actor 1' }, { name: 'Actor 2' }] },
        recommendations: { results: [] },
        video_links: [{name: "Default Server", url: "https://via.placeholder.com/640x360.png?text=Video+No+Disponible"}],
        seasons: isSeries ? [{
          season_number: 1, name: "Temporada 1", episodes: [{
            episode_number: 1, title: "Episodio 1", overview: "Resumen del Episodio 1", air_date: "2023-01-01",
            video_links: [{name: "Default Server", url: "https://via.placeholder.com/640x360.png?text=Video+No+Disponible"}]
          }]
        }] : undefined
      };
      setItem(placeholderItem);
      if (isSeries && placeholderItem.seasons?.[0]?.episodes?.[0]?.video_links?.[0]) {
        setSelectedServer(placeholderItem.seasons[0].episodes[0].video_links[0]);
      } else if (!isSeries && placeholderItem.video_links?.[0]) {
        setSelectedServer(placeholderItem.video_links[0]);
      }
    }
    setIsLoading(false);
  }, [id, isSeries, storedMovies, storedSeries]);

  const handleServerSelection = (server) => {
    setSelectedServer(server);
  };
  
  const handleEpisodeServerSelection = (episode) => {
    if (episode.video_links && episode.video_links.length > 0) {
      setSelectedServer(episode.video_links[0]); // Select the first server of the episode
    }
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div></div>;
  }

  if (!item) {
    return <div className="text-center py-10">Contenido no encontrado.</div>;
  }

  const displayTitle = item.title || item.name;
  const year = item.release_date ? new Date(item.release_date).getFullYear() : (item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A');
  const genresText = Array.isArray(item.genres) ? item.genres.map(g => g.name).join(', ') : (item.genre || 'N/A');
  const runtimeText = isSeries ? `${item.seasons?.length || 0} Temporada(s)` : `${item.runtime || 0} min`;

  return (
    <div className="min-h-screen text-foreground">
      <div 
        className="relative h-[60vh] md:h-[75vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(to top, rgba(18,18,22,1) 0%, rgba(18,18,22,0.6) 60%, rgba(18,18,22,0.2) 100%), url(${item.backdrop_path || '/backdrop-placeholder-detail.jpg'})` }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center space-x-2 mb-2">
              {isSeries ? <Tv className="h-6 w-6 text-primary" /> : <FilmIcon className="h-6 w-6 text-primary" />}
              <span className="text-sm uppercase tracking-wider text-primary font-semibold">{isSeries ? "Serie" : "Película"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white shadow-lg mb-3">{displayTitle}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
              {item.vote_average > 0 && <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" /> {item.vote_average.toFixed(1)}/10</span>}
              <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> {year}</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {runtimeText}</span>
            </div>
            <p className="max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">{item.overview}</p>
            <div className="flex space-x-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg">
                <PlayCircle className="mr-2 h-6 w-6" /> Ver Ahora
              </Button>
              <Button variant="outline" size="lg" className="text-foreground border-border hover:bg-border/10 hover:text-foreground text-lg px-8 py-6 rounded-full shadow-lg">
                <Download className="mr-2 h-6 w-6" /> Descargar (Simulado)
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link to={isSeries ? "/series" : "/movies"} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Volver a {isSeries ? "Series" : "Películas"}
        </Link>

        {settings.adsContent?.detailsPageTop && (
          <Card className="mb-6 bg-muted/30 border-dashed border-primary/30">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Publicidad</p>
              <div dangerouslySetInnerHTML={{ __html: settings.adsContent.detailsPageTop }} />
            </CardContent>
          </Card>
        )}

        <Card className="bg-card shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted/50 p-4 md:p-6 border-b border-border">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">Opciones de Visualización</h2>
              {isSeries ? (
                <p className="text-sm text-muted-foreground">Selecciona una temporada y episodio para ver las opciones de video.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {item.video_links && item.video_links.length > 0 ? (
                    item.video_links.map((link, index) => (
                      <Button 
                        key={index} 
                        variant={selectedServer?.url === link.url ? "default" : "outline"}
                        onClick={() => handleServerSelection(link)}
                        className="text-sm"
                      >
                        <ServerIcon className="mr-2 h-4 w-4" /> {link.name || `Servidor ${index + 1}`}
                      </Button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay servidores de video disponibles para esta película.</p>
                  )}
                </div>
              )}
            </div>
            
            {selectedServer && (
              <div className="aspect-video bg-black">
                <iframe
                  src={selectedServer.url.includes("placeholder.com") ? selectedServer.url : `https://www.youtube.com/embed/dQw4w9WgXcQ`} // Placeholder or actual (simulated)
                  title={selectedServer.name || "Video Player"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
             {!selectedServer && isSeries && (
                <div className="p-6 text-center text-muted-foreground">
                    Por favor, selecciona un episodio para ver el reproductor.
                </div>
            )}
            {!selectedServer && !isSeries && item.video_links && item.video_links.length > 0 && (
                 <div className="p-6 text-center text-muted-foreground">
                    Por favor, selecciona un servidor para ver el reproductor.
                </div>
            )}


            {isSeries && item.seasons && item.seasons.length > 0 && (
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-3">Temporadas y Episodios</h3>
                <Accordion type="single" collapsible className="w-full" defaultValue={`season-${item.seasons[0].season_number}`}>
                  {item.seasons.map((season) => (
                    <AccordionItem value={`season-${season.season_number}`} key={season.id || season.season_number}>
                      <AccordionTrigger className="text-base hover:no-underline">
                        {season.name || `Temporada ${season.season_number}`} ({season.episodes?.length || 0} episodios)
                      </AccordionTrigger>
                      <AccordionContent className="bg-muted/20 p-0">
                        <ul className="divide-y divide-border">
                          {season.episodes?.map((episode) => (
                            <li key={episode.id || episode.episode_number} className="p-3 hover:bg-muted/40 transition-colors">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-sm text-foreground">E{episode.episode_number}: {episode.title}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">{episode.air_date ? new Date(episode.air_date).toLocaleDateString() : ''}</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant={selectedServer?.episodeId === episode.id ? "default" : "outline"} // Check if this episode's server is selected
                                  onClick={() => {
                                    if (episode.video_links && episode.video_links.length > 0) {
                                      handleServerSelection({...episode.video_links[0], episodeId: episode.id}); // Pass episodeId for tracking
                                    } else {
                                      toast({ title: "Sin video", description: "Este episodio no tiene enlaces de video disponibles.", variant: "destructive"});
                                    }
                                  }}
                                >
                                  <PlayCircle className="h-4 w-4 mr-1.5" /> Ver
                                </Button>
                              </div>
                               {episode.video_links && episode.video_links.length > 1 && selectedServer?.episodeId === episode.id && (
                                <div className="mt-2 pl-2 border-l-2 border-primary/50">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Otros servidores para E{episode.episode_number}:</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {episode.video_links.map((link, idx) => (
                                      <Button 
                                        key={idx} 
                                        size="xs" 
                                        variant={selectedServer?.url === link.url ? "default" : "outline"}
                                        onClick={() => handleServerSelection({...link, episodeId: episode.id})}
                                      >
                                        {link.name || `Servidor ${idx + 1}`}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </CardContent>
        </Card>

        {settings.adsContent?.detailsPageBottom && (
          <Card className="mt-6 bg-muted/30 border-dashed border-primary/30">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Publicidad</p>
              <div dangerouslySetInnerHTML={{ __html: settings.adsContent.detailsPageBottom }} />
            </CardContent>
          </Card>
        )}

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Información Adicional</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <Card className="bg-card">
              <CardContent className="p-4 space-y-2">
                <p><strong className="text-muted-foreground">Título Original:</strong> {item.original_title || displayTitle}</p>
                <p><strong className="text-muted-foreground">Géneros:</strong> {genresText}</p>
                <p><strong className="text-muted-foreground">Fecha de Lanzamiento:</strong> {item.release_date || item.first_air_date || 'N/A'}</p>
                <p><strong className="text-muted-foreground">Idioma Original:</strong> {item.original_language || 'N/A'}</p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 text-foreground">Sinopsis Completa</h4>
                <p className="text-muted-foreground leading-relaxed">{item.overview || "Sinopsis no disponible."}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Placeholder for Recommendations */}
        {/* ... */}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
