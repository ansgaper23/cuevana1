
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog.jsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx";
import { PlusCircle, Trash2, Server, ListPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SeriesFormDialog = ({ open, onOpenChange, seriesData: initialSeriesData, onSave, title, description }) => {
  const [seriesData, setSeriesData] = useState(initialSeriesData);

  useEffect(() => {
     // Ensure seasons and episodes have unique IDs if they don't already
    const ensureIds = (data) => {
      const newData = JSON.parse(JSON.stringify(data)); // Deep copy
      if (newData.seasons) {
        newData.seasons = newData.seasons.map(season => ({
          ...season,
          id: season.id || `s-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          episodes: season.episodes ? season.episodes.map(episode => ({
            ...episode,
            id: episode.id || `e-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            video_links: episode.video_links || [{ name: 'Servidor 1', url: '' }]
          })) : []
        }));
      } else {
        newData.seasons = [{ id: `s-${Date.now()}`, season_number: 1, name: 'Temporada 1', episodes: [] }];
      }
      return newData;
    };
    setSeriesData(ensureIds(initialSeriesData));
  }, [initialSeriesData, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeriesData(prev => ({ ...prev, [name]: value }));
  };

  const handleSeasonChange = (seasonId, field, value) => {
    setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => s.id === seasonId ? { ...s, [field]: value } : s)
    }));
  };
  
  const addSeason = () => {
    const newSeasonNumber = (seriesData.seasons?.length || 0) + 1;
    const newSeason = { 
      id: `s-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      season_number: newSeasonNumber, 
      name: `Temporada ${newSeasonNumber}`, 
      episodes: [] 
    };
    setSeriesData(prev => ({ ...prev, seasons: [...(prev.seasons || []), newSeason] }));
  };

  const removeSeason = (seasonId) => {
    setSeriesData(prev => ({ ...prev, seasons: prev.seasons.filter(s => s.id !== seasonId) }));
  };

  const handleEpisodeChange = (seasonId, episodeId, field, value) => {
    setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => 
        s.id === seasonId ? { 
          ...s, 
          episodes: s.episodes.map(ep => ep.id === episodeId ? { ...ep, [field]: value } : ep) 
        } : s
      )
    }));
  };

  const addEpisode = (seasonId) => {
    setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => {
        if (s.id === seasonId) {
          const newEpisodeNumber = (s.episodes?.length || 0) + 1;
          const newEpisode = { 
            id: `e-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
            episode_number: newEpisodeNumber, 
            title: `Nuevo Episodio ${newEpisodeNumber}`, 
            air_date: '', 
            overview: '',
            video_links: [{ name: 'Servidor 1', url: '' }]
          };
          return { ...s, episodes: [...(s.episodes || []), newEpisode] };
        }
        return s;
      })
    }));
  };
  
  const removeEpisode = (seasonId, episodeId) => {
     setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => 
        s.id === seasonId ? { 
          ...s, 
          episodes: s.episodes.filter(ep => ep.id !== episodeId)
        } : s
      )
    }));
  };

  const handleEpisodeVideoLinkChange = (seasonId, episodeId, linkIndex, field, value) => {
    setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => 
        s.id === seasonId ? { 
          ...s, 
          episodes: s.episodes.map(ep => 
            ep.id === episodeId ? {
              ...ep,
              video_links: ep.video_links.map((vl, idx) => idx === linkIndex ? { ...vl, [field]: value } : vl)
            } : ep
          ) 
        } : s
      )
    }));
  };

  const addEpisodeVideoLink = (seasonId, episodeId) => {
     setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => 
        s.id === seasonId ? { 
          ...s, 
          episodes: s.episodes.map(ep => 
            ep.id === episodeId ? {
              ...ep,
              video_links: [...ep.video_links, { name: `Servidor ${ep.video_links.length + 1}`, url: '' }]
            } : ep
          ) 
        } : s
      )
    }));
  };

  const removeEpisodeVideoLink = (seasonId, episodeId, linkIndex) => {
    setSeriesData(prev => ({
      ...prev,
      seasons: prev.seasons.map(s => 
        s.id === seasonId ? { 
          ...s, 
          episodes: s.episodes.map(ep => 
            ep.id === episodeId ? {
              ...ep,
              video_links: ep.video_links.filter((_, idx) => idx !== linkIndex)
            } : ep
          ) 
        } : s
      )
    }));
  };


  const handleSubmit = () => {
    onSave(seriesData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 py-4">
          <div>
            <Label htmlFor="name">Nombre de la Serie</Label>
            <Input id="name" name="name" value={seriesData?.name || ''} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Año de Estreno</Label>
              <Input id="year" name="year" type="number" value={seriesData?.year || ''} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="genre">Género(s) <span className="text-xs text-muted-foreground">(separados por coma)</span></Label>
              <Input id="genre" name="genre" value={seriesData?.genre || ''} onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <select id="status" name="status" value={seriesData?.status || 'En Emisión'} onChange={handleInputChange} className="w-full p-2 border rounded bg-background">
              <option value="En Emisión">En Emisión</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Próximamente">Próximamente</option>
            </select>
          </div>
          <div>
            <Label htmlFor="poster_path">URL del Póster</Label>
            <Input id="poster_path" name="poster_path" value={seriesData?.poster_path || ''} onChange={handleInputChange} placeholder="https://ruta.al/poster.jpg" />
          </div>
          <div>
            <Label htmlFor="overview">Resumen de la Serie</Label>
            <Textarea id="overview" name="overview" value={seriesData?.overview || ''} onChange={handleInputChange} className="min-h-[100px]" />
          </div>

          <div className="pt-3">
            <Label className="text-base font-medium">Temporadas y Episodios</Label>
            <Accordion type="multiple" className="w-full mt-2">
              {(seriesData?.seasons || []).map((season) => (
                <AccordionItem value={season.id} key={season.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-2">
                      <Input 
                        type="text" 
                        placeholder={`Nombre Temporada ${season.season_number}`} 
                        value={season.name}
                        onChange={(e) => handleSeasonChange(season.id, 'name', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-grow bg-muted/50 mr-2"
                      />
                       <span className="text-sm text-muted-foreground mr-2">({season.episodes?.length || 0} episodios)</span>
                       <Button variant="ghost" size="icon" onClick={(e) => {e.stopPropagation(); removeSeason(season.id);}} className="text-destructive hover:bg-destructive/10 h-7 w-7">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-muted/30 p-4 rounded-b-md space-y-3">
                    {(season.episodes || []).map((episode) => (
                      <Card key={episode.id} className="bg-background shadow-sm">
                        <CardHeader className="p-3 flex flex-row justify-between items-center">
                          <CardTitle className="text-sm">
                            <Input type="text" placeholder={`Episodio ${episode.episode_number}`} value={episode.title} onChange={(e) => handleEpisodeChange(season.id, episode.id, 'title', e.target.value)} className="text-sm font-medium" />
                          </CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => removeEpisode(season.id, episode.id)} className="text-destructive hover:bg-destructive/10 h-7 w-7">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="p-3 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input type="number" placeholder="Nº Episodio" value={episode.episode_number} onChange={(e) => handleEpisodeChange(season.id, episode.id, 'episode_number', parseInt(e.target.value) || 1)} />
                            <Input type="date" placeholder="Fecha de Emisión" value={episode.air_date} onChange={(e) => handleEpisodeChange(season.id, episode.id, 'air_date', e.target.value)} />
                          </div>
                          <Textarea placeholder="Resumen del Episodio" value={episode.overview} onChange={(e) => handleEpisodeChange(season.id, episode.id, 'overview', e.target.value)} className="min-h-[60px] text-sm" />
                          
                          <div className="space-y-2 pt-1">
                            <Label className="text-xs font-medium">Servidores del Episodio</Label>
                            {(episode.video_links || []).map((link, linkIdx) => (
                              <div key={linkIdx} className="flex items-center gap-1.5 p-2 border rounded-md bg-muted/30">
                                <Server className="h-4 w-4 text-muted-foreground" />
                                <Input type="text" placeholder="Nombre Servidor" value={link.name} onChange={(e) => handleEpisodeVideoLinkChange(season.id, episode.id, linkIdx, 'name', e.target.value)} className="flex-1 bg-background text-xs h-8" />
                                <Input type="url" placeholder="URL Video" value={link.url} onChange={(e) => handleEpisodeVideoLinkChange(season.id, episode.id, linkIdx, 'url', e.target.value)} className="flex-1 bg-background text-xs h-8" />
                                <Button variant="ghost" size="icon" onClick={() => removeEpisodeVideoLink(season.id, episode.id, linkIdx)} className="text-destructive hover:bg-destructive/10 h-7 w-7">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            <Button type="button" variant="outline" size="xs" onClick={() => addEpisodeVideoLink(season.id, episode.id)} className="w-full text-xs">
                              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Añadir Servidor al Episodio
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addEpisode(season.id)} className="mt-2 w-full">
                      <ListPlus className="mr-2 h-4 w-4" /> Añadir Episodio a {season.name || `Temporada ${season.season_number}`}
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button variant="outline" onClick={addSeason} className="mt-4 w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Nueva Temporada
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">Guardar Serie</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeriesFormDialog;
