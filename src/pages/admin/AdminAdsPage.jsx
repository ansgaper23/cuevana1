
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Save, Code2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";
import { useSettings } from '@/contexts/SettingsContext.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog.jsx";

const AdminAdsPage = () => {
  const { toast } = useToast();
  const { settings, updateSettings } = useSettings();

  const [detailsPageTopAd, setDetailsPageTopAd] = useState(settings.adsContent?.detailsPageTop || '');
  const [detailsPageBottomAd, setDetailsPageBottomAd] = useState(settings.adsContent?.detailsPageBottom || '');
  const [previewContent, setPreviewContent] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  useEffect(() => {
    setDetailsPageTopAd(settings.adsContent?.detailsPageTop || '');
    setDetailsPageBottomAd(settings.adsContent?.detailsPageBottom || '');
  }, [settings.adsContent]);

  const handleSaveAds = () => {
    updateSettings({ 
      adsContent: {
        detailsPageTop: detailsPageTopAd,
        detailsPageBottom: detailsPageBottomAd,
      }
    });
    toast({
      title: `Configuración de Publicidad Guardada (Simulado)`,
      description: "Los códigos de publicidad se han guardado localmente.",
    });
  };

  const openPreview = (htmlContent) => {
    setPreviewContent(htmlContent);
    setIsPreviewOpen(true);
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
          <h1 className="text-3xl font-bold text-foreground">Gestionar Publicidad</h1>
          <p className="text-muted-foreground">Incrusta códigos HTML/JavaScript para mostrar publicidad en tu sitio.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Publicidad en Página de Detalles</CardTitle>
            <CardDescription>Añade códigos para mostrar anuncios en la parte superior e inferior de las páginas de detalles de películas/series.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="detailsPageTopAd" className="flex items-center">
                <Code2 className="mr-2 h-4 w-4 text-primary" /> Código para la parte SUPERIOR de la página de detalles
              </Label>
              <Textarea 
                id="detailsPageTopAd" 
                value={detailsPageTopAd} 
                onChange={(e) => setDetailsPageTopAd(e.target.value)} 
                placeholder="Pega tu código HTML/JS aquí..."
                className="min-h-[150px] bg-background font-mono text-sm"
              />
              <Button variant="outline" size="sm" onClick={() => openPreview(detailsPageTopAd)} disabled={!detailsPageTopAd}>
                <Eye className="mr-2 h-4 w-4" /> Vista Previa
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailsPageBottomAd" className="flex items-center">
                <Code2 className="mr-2 h-4 w-4 text-primary" /> Código para la parte INFERIOR de la página de detalles
              </Label>
              <Textarea 
                id="detailsPageBottomAd" 
                value={detailsPageBottomAd} 
                onChange={(e) => setDetailsPageBottomAd(e.target.value)} 
                placeholder="Pega tu código HTML/JS aquí..."
                className="min-h-[150px] bg-background font-mono text-sm"
              />
               <Button variant="outline" size="sm" onClick={() => openPreview(detailsPageBottomAd)} disabled={!detailsPageBottomAd}>
                <Eye className="mr-2 h-4 w-4" /> Vista Previa
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAds} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="mr-2 h-4 w-4" /> Guardar Configuración de Publicidad
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-lg border-dashed border-amber-500/50 bg-amber-500/5">
            <CardHeader>
                <CardTitle className="text-amber-700">Nota Importante sobre Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-amber-600 space-y-1">
                <p><strong>Precaución:</strong> Incrustar código HTML/JavaScript de fuentes no confiables puede ser un riesgo de seguridad (XSS - Cross-Site Scripting).</p>
                <p>Asegúrate de que los códigos que incrustas provienen de redes publicitarias o fuentes de confianza.</p>
                <p>Esta funcionalidad es poderosa pero debe usarse con cuidado.</p>
            </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Vista Previa del Código Incrustado</DialogTitle>
            <DialogDescription>
              Así es como se vería el código HTML/JS. El contenido dinámico o scripts complejos podrían no funcionar igual que en el sitio real.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 border rounded-md bg-muted min-h-[200px] overflow-auto">
            {previewContent ? (
              <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            ) : (
              <p className="text-muted-foreground text-center">No hay contenido para previsualizar.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </AdminLayout>
  );
};

export default AdminAdsPage;
