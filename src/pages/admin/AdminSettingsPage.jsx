
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Save, Image as ImageIcon, Film, Key, Palette, Bell, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";
import { useSettings } from '@/contexts/SettingsContext.jsx';

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useSettings();

  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [faviconUrl, setFaviconUrl] = useState(settings.faviconUrl);
  const [tmdbApiKey, setTmdbApiKey] = useState(settings.tmdbApiKey);
  const [moviesPerPage, setMoviesPerPage] = useState(settings.moviesPerPage);
  const [previewLogo, setPreviewLogo] = useState(settings.logoUrl);
  const [previewFavicon, setPreviewFavicon] = useState(settings.faviconUrl);

  useEffect(() => {
    setSiteName(settings.siteName);
    setSiteDescription(settings.siteDescription);
    setLogoUrl(settings.logoUrl);
    setFaviconUrl(settings.faviconUrl);
    setPreviewLogo(settings.logoUrl);
    setPreviewFavicon(settings.faviconUrl);
    setTmdbApiKey(settings.tmdbApiKey);
    setMoviesPerPage(settings.moviesPerPage);
  }, [settings]);

  const handleImageChange = (e, setImagePreview, setImageUrl) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveGeneralSettings = () => {
    updateSettings({ siteName, siteDescription, logoUrl, faviconUrl });
    toast({
      title: `Configuración General Guardada (Simulado)`,
      description: "Los cambios se han guardado localmente.",
    });
  };
  
  const handleSaveApiSettings = () => {
    updateSettings({ tmdbApiKey });
     toast({
      title: `Configuración de APIs Guardada (Simulado)`,
      description: "Los cambios se han guardado localmente.",
    });
  };

  const handleSaveContentSettings = () => {
    updateSettings({ moviesPerPage });
    toast({
      title: `Configuración de Contenido Guardada (Simulado)`,
      description: "Los cambios se han guardado localmente.",
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración General</h1>
          <p className="text-muted-foreground">Ajusta la configuración de tu plataforma de streaming.</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-6">
            <TabsTrigger value="general"><Palette className="mr-2 h-4 w-4" />General</TabsTrigger>
            <TabsTrigger value="apis"><Key className="mr-2 h-4 w-4" />APIs</TabsTrigger>
            <TabsTrigger value="content"><Film className="mr-2 h-4 w-4" />Contenido</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Configuración General del Sitio</CardTitle>
                <CardDescription>Nombre del sitio, descripción, logos y otros ajustes básicos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="max-w-md bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción Corta del Sitio</Label>
                  <Textarea id="siteDescription" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className="max-w-md bg-background" placeholder="Una breve descripción de tu sitio de streaming."/>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteLogo">Logo del Sitio (URL o Subir)</Label>
                    <div className="flex items-center gap-4">
                      {previewLogo && <img alt="Vista previa del logo" className="h-12 w-auto border p-1 rounded bg-muted" src={previewLogo} />}
                       <Input 
                        id="siteLogoUrl" 
                        type="text" 
                        placeholder="URL del logo"
                        value={logoUrl.startsWith('data:') ? '' : logoUrl}
                        onChange={(e) => { setLogoUrl(e.target.value); setPreviewLogo(e.target.value);}}
                        className="max-w-xs bg-background"
                      />
                    </div>
                     <Input 
                        id="uploadSiteLogo" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setPreviewLogo, setLogoUrl)} 
                        className="max-w-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      />
                     <p className="text-xs text-muted-foreground">Sube o ingresa URL. Recomendado: PNG transparente, 200x50px.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteFavicon">Favicon del Sitio (URL o Subir)</Label>
                     <div className="flex items-center gap-4">
                      {previewFavicon && <img alt="Vista previa del favicon" className="h-8 w-8 border p-1 rounded bg-muted" src={previewFavicon} />}
                       <Input 
                        id="siteFaviconUrl" 
                        type="text" 
                        placeholder="URL del favicon"
                        value={faviconUrl.startsWith('data:') ? '' : faviconUrl}
                        onChange={(e) => { setFaviconUrl(e.target.value); setPreviewFavicon(e.target.value);}}
                        className="max-w-xs bg-background"
                      />
                    </div>
                    <Input 
                      id="uploadSiteFavicon" 
                      type="file" 
                      accept="image/x-icon, image/png, image/svg+xml"
                      onChange={(e) => handleImageChange(e, setPreviewFavicon, setFaviconUrl)}
                      className="max-w-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">Sube o ingresa URL. Recomendado: ICO, PNG o SVG, 32x32px.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="mr-2 h-4 w-4" /> Guardar Cambios Generales
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="apis">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Configuración de APIs Externas</CardTitle>
                <CardDescription>Gestiona las claves de API para servicios como TMDb.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tmdbApiKey">Clave API de The Movie Database (TMDb)</Label>
                  <Input 
                    id="tmdbApiKey" 
                    type="password" 
                    value={tmdbApiKey} 
                    onChange={(e) => setTmdbApiKey(e.target.value)} 
                    placeholder="Ingresa tu clave API de TMDb"
                    className="max-w-md bg-background" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Necesaria para importar metadatos de películas y series (funcionalidad de backend). Consigue una clave en <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TMDb</a>.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveApiSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="mr-2 h-4 w-4" /> Guardar Configuración de APIs
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Configuración de Contenido</CardTitle>
                <CardDescription>Ajustes relacionados con la visualización y gestión de películas y series.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="moviesPerPage">Elementos por Página (Listados)</Label>
                  <Input 
                    id="moviesPerPage" 
                    type="number"
                    value={moviesPerPage} 
                    onChange={(e) => setMoviesPerPage(parseInt(e.target.value, 10) || 12)} 
                    min="1"
                    max="50"
                    className="max-w-xs bg-background" 
                  />
                   <p className="text-xs text-muted-foreground">Número de películas/series a mostrar por página en los listados principales.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveContentSettings} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Save className="mr-2 h-4 w-4" /> Guardar Configuración de Contenido
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
