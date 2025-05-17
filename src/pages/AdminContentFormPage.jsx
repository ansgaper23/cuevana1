import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Save, ChevronLeft, PlusCircle, Trash2, UploadCloud } from 'lucide-react';

const AdminContentFormPage = () => {
  const navigate = useNavigate();
  const { id: contentId } = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(contentId);

  const [formData, setFormData] = useState({
    title: '',
    contentType: 'movie',
    year: '',
    genre: '',
    synopsis: '',
    posterUrl: '',
    directorCreator: '',
    rating: '',
    releaseDate: '',
    videoServers: [{ name: '', url: '' }],
  });

  useEffect(() => {
    if (isEditing) {
      const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
      const itemToEdit = storedContent.find(item => item.id === contentId);
      if (itemToEdit) {
        setFormData(itemToEdit);
      } else {
        toast({ title: "Error", description: "Contenido no encontrado para editar.", variant: "destructive" });
        navigate('/admin/dashboard');
      }
    }
  }, [isEditing, contentId, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServerChange = (index, field, value) => {
    const newServers = [...formData.videoServers];
    newServers[index][field] = value;
    setFormData(prev => ({ ...prev, videoServers: newServers }));
  };

  const addServerField = () => {
    setFormData(prev => ({
      ...prev,
      videoServers: [...prev.videoServers, { name: '', url: '' }]
    }));
  };

  const removeServerField = (index) => {
    const newServers = formData.videoServers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, videoServers: newServers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    let updatedContent;

    if (isEditing) {
      updatedContent = storedContent.map(item => item.id === contentId ? { ...formData, id: contentId } : item);
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      updatedContent = [...storedContent, newItem];
    }
    
    localStorage.setItem('cuevanaAdminContent', JSON.stringify(updatedContent));
    toast({
      title: `Contenido ${isEditing ? 'Actualizado' : 'Agregado'}`,
      description: `"${formData.title}" ha sido ${isEditing ? 'actualizado' : 'agregado'} exitosamente.`,
    });
    navigate('/admin/dashboard');
  };

  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { delay: 0.1 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-xl">
        <CardHeader>
          <div className="flex justify-start mb-4">
            <Button variant="outline" size="sm" asChild className="border-cuevana-border text-cuevana-light-gray hover:bg-cuevana-dark hover:text-foreground">
              <Link to="/admin/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" /> Volver al Dashboard
              </Link>
            </Button>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-cuevana-green">
            {isEditing ? 'Editar Contenido' : 'Agregar Nuevo Contenido'}
          </CardTitle>
          <CardDescription className="text-cuevana-light-gray">
            {isEditing ? `Modifica los detalles de "${formData.title}".` : 'Completa el formulario para agregar una nueva película o serie.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Título</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentType" className="text-foreground">Tipo de Contenido</Label>
                <Select name="contentType" value={formData.contentType} onValueChange={(value) => handleSelectChange('contentType', value)}>
                  <SelectTrigger className="bg-cuevana-dark border-cuevana-border text-foreground">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-cuevana-medium-dark border-cuevana-border text-foreground">
                    <SelectItem value="movie" className="hover:bg-cuevana-dark">Película</SelectItem>
                    <SelectItem value="series" className="hover:bg-cuevana-dark">Serie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-foreground">Año</Label>
                <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Ej: 2023" className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-foreground">Género(s)</Label>
                <Input id="genre" name="genre" value={formData.genre} onChange={handleChange} placeholder="Ej: Acción, Comedia, Drama" className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="rating" className="text-foreground">Valoración (IMDb/TMDb)</Label>
                <Input id="rating" name="rating" type="text" value={formData.rating} onChange={handleChange} placeholder="Ej: 8.5" className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="synopsis" className="text-foreground">Sinopsis</Label>
              <Textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleChange} rows={4} className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="directorCreator" className="text-foreground">Director / Creador(es)</Label>
                <Input id="directorCreator" name="directorCreator" value={formData.directorCreator} onChange={handleChange} className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate" className="text-foreground">Fecha de Estreno</Label>
                <Input id="releaseDate" name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="posterUrl" className="text-foreground">URL del Póster (IMDb)</Label>
              <Input id="posterUrl" name="posterUrl" value={formData.posterUrl} onChange={handleChange} placeholder="https://..." className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground" />
              <Button type="button" variant="outline" className="mt-2 text-sm border-cuevana-blue text-cuevana-blue hover:bg-cuevana-blue/10">
                <UploadCloud className="mr-2 h-4 w-4" /> Importar desde IMDb (Simulado)
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Label className="text-foreground">Servidores de Video</Label>
              {formData.videoServers.map((server, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 items-end p-4 border border-cuevana-border rounded-md bg-cuevana-dark/50">
                  <div className="flex-grow space-y-2">
                    <Label htmlFor={`serverName-${index}`} className="text-xs text-cuevana-light-gray">Nombre del Servidor (Ej: HD Opción 1)</Label>
                    <Input 
                      id={`serverName-${index}`} 
                      value={server.name} 
                      onChange={(e) => handleServerChange(index, 'name', e.target.value)} 
                      placeholder="Nombre del servidor"
                      className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground text-sm" 
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                     <Label htmlFor={`serverUrl-${index}`} className="text-xs text-cuevana-light-gray">URL del Embed (Ej: iframe src)</Label>
                    <Input 
                      id={`serverUrl-${index}`}
                      value={server.url} 
                      onChange={(e) => handleServerChange(index, 'url', e.target.value)} 
                      placeholder="URL del video embed"
                      className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground text-sm" 
                    />
                  </div>
                  {formData.videoServers.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeServerField(index)} className="w-full sm:w-auto">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addServerField} className="text-sm border-cuevana-green text-cuevana-green hover:bg-cuevana-green/10">
                <PlusCircle className="mr-2 h-4 w-4" /> Agregar Servidor
              </Button>
            </motion.div>
            
            <CardFooter className="pt-6 px-0">
              <Button type="submit" className="w-full sm:w-auto bg-cuevana-green hover:bg-opacity-80 text-white font-semibold shadow-md transition-transform hover:scale-105">
                <Save className="mr-2 h-5 w-5" /> {isEditing ? 'Guardar Cambios' : 'Agregar Contenido'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminContentFormPage;