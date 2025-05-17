
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog.jsx";
import { PlusCircle, Trash2, Server } from 'lucide-react';

const MovieFormDialog = ({ open, onOpenChange, movieData: initialMovieData, onSave, title, description }) => {
  const [movieData, setMovieData] = useState(initialMovieData);

  useEffect(() => {
    setMovieData(initialMovieData);
  }, [initialMovieData, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoLinkChange = (index, field, value) => {
    const updatedLinks = [...(movieData.video_links || [])];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setMovieData(prev => ({ ...prev, video_links: updatedLinks }));
  };

  const addVideoLink = () => {
    const newLink = { name: `Servidor ${ (movieData.video_links?.length || 0) + 1}`, url: '' };
    setMovieData(prev => ({ ...prev, video_links: [...(prev.video_links || []), newLink] }));
  };

  const removeVideoLink = (index) => {
    setMovieData(prev => ({ ...prev, video_links: prev.video_links.filter((_, i) => i !== index) }));
  };

  const handleSubmit = () => {
    onSave(movieData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 py-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" value={movieData?.title || ''} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Año</Label>
              <Input id="year" name="year" type="number" value={movieData?.year || ''} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="genre">Género(s) <span className="text-xs text-muted-foreground">(separados por coma)</span></Label>
              <Input id="genre" name="genre" value={movieData?.genre || ''} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating (ej: 8.5)</Label>
              <Input id="rating" name="rating" type="text" value={movieData?.rating || ''} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <select id="status" name="status" value={movieData?.status || 'Borrador'} onChange={handleInputChange} className="w-full p-2 border rounded bg-background">
                <option value="Borrador">Borrador</option>
                <option value="Publicado">Publicado</option>
                <option value="Archivado">Archivado</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="poster_path">URL del Póster</Label>
            <Input id="poster_path" name="poster_path" value={movieData?.poster_path || ''} onChange={handleInputChange} placeholder="https://ruta.al/poster.jpg" />
          </div>
          <div>
            <Label htmlFor="overview">Sinopsis</Label>
            <Textarea id="overview" name="overview" value={movieData?.overview || ''} onChange={handleInputChange} className="min-h-[100px]" />
          </div>
          
          <div className="space-y-3 pt-2">
            <Label className="text-base font-medium">Servidores de Video</Label>
            {(movieData?.video_links || []).map((link, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                <Server className="h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Nombre del Servidor (ej: Latino HD)" 
                  value={link.name} 
                  onChange={(e) => handleVideoLinkChange(index, 'name', e.target.value)}
                  className="flex-1 bg-background"
                />
                <Input 
                  type="url" 
                  placeholder="URL del Video" 
                  value={link.url} 
                  onChange={(e) => handleVideoLinkChange(index, 'url', e.target.value)}
                  className="flex-1 bg-background"
                />
                <Button variant="ghost" size="icon" onClick={() => removeVideoLink(index)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addVideoLink} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Servidor de Video
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">Guardar Película</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MovieFormDialog;
