
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";
import { useLocation, useNavigate } from 'react-router-dom';
import SeriesFormDialog from '@/components/admin/series/SeriesFormDialog.jsx';
import SeriesTable from '@/components/admin/series/SeriesTable.jsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

const placeholderSeries = Array(5).fill(null).map((_, i) => ({
  id: `series-${Date.now() + i}`,
  name: `Serie de Ejemplo ${i + 1}`,
  year: 2019 + (i % 5),
  genre: ['Drama', 'Comedia', 'Misterio'][i % 3],
  status: i % 2 === 0 ? 'En Emisión' : 'Finalizada',
  poster_path: `/placeholder${(i+1) % 3 + 1}.jpg`,
  overview: `Resumen de la serie de ejemplo ${i+1}.`,
  seasons: Array((i % 3) + 1).fill(null).map((__, sIdx) => ({
    id: `s-${Date.now() + i}-${sIdx}`,
    season_number: sIdx + 1,
    name: `Temporada ${sIdx + 1}`,
    episodes: Array(3 + (i%3)).fill(null).map((___, eIdx) => ({
      id: `e-${Date.now() + i}-${sIdx}-${eIdx}`,
      episode_number: eIdx+1,
      title: `Episodio ${eIdx+1}`,
      air_date: `202${i%3}-${String(sIdx+1).padStart(2,'0')}-${String(eIdx+1).padStart(2,'0')}`,
      overview: `Breve resumen del episodio ${eIdx+1} de la temporada ${sIdx+1}.`,
      video_links: [
        { name: 'Servidor Principal', url: `https://ejemplo.com/serie${i+1}/s${sIdx+1}e${eIdx+1}/main` },
      ]
    }))
  }))
}));

const initialNewSeriesData = {
  name: '',
  year: new Date().getFullYear(),
  genre: '',
  status: 'En Emisión',
  poster_path: '',
  overview: '',
  seasons: [{ 
    id: `s-${Date.now()}`, 
    season_number: 1, 
    name: 'Temporada 1', 
    episodes: [] 
  }]
};

const AdminSeriesPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [storedSeries, setStoredSeries] = useLocalStorage('adminSeries', placeholderSeries);
  const [series, setSeries] = useState(storedSeries);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddSeriesDialogOpen, setIsAddSeriesDialogOpen] = useState(false);
  const [isEditSeriesDialogOpen, setIsEditSeriesDialogOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null); 
  const [newSeriesData, setNewSeriesData] = useState(initialNewSeriesData);

  useEffect(() => {
    setSeries(storedSeries);
    setIsLoading(false);
  }, [storedSeries]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('action') === 'add') {
      handleOpenAddSeriesDialog();
      navigate('/admin/series', { replace: true }); 
    }
  }, [location.search, navigate]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredSeries = series.filter(s => 
    s.name.toLowerCase().includes(searchTerm) ||
    (s.genre && s.genre.toLowerCase().includes(searchTerm)) ||
    (s.year && s.year.toString().includes(searchTerm))
  );

  const handleOpenAddSeriesDialog = () => {
    setNewSeriesData({
      ...initialNewSeriesData,
      seasons: [{ id: `s-${Date.now()}`, season_number: 1, name: 'Temporada 1', episodes: [] }]
    });
    setIsAddSeriesDialogOpen(true);
  };
  
  const handleOpenEditSeriesDialog = (serie) => {
    setCurrentSeries(JSON.parse(JSON.stringify(serie))); 
    setIsEditSeriesDialogOpen(true);
  };

  const handleSaveNewSeries = (data) => {
    const updatedSeries = [{ ...data, id: `series-${Date.now()}` }, ...series];
    setSeries(updatedSeries);
    setStoredSeries(updatedSeries);
    toast({ title: "Serie Guardada (Simulado)", description: `${data.name} ha sido añadida.` });
    setIsAddSeriesDialogOpen(false);
  };
  
  const handleSaveEditedSeries = (data) => {
    const updatedSeries = series.map(s => s.id === data.id ? data : s);
    setSeries(updatedSeries);
    setStoredSeries(updatedSeries);
    toast({ title: "Serie Actualizada (Simulado)", description: `${data.name} ha sido actualizada.` });
    setIsEditSeriesDialogOpen(false);
    setCurrentSeries(null);
  };

  const handleDeleteSeries = (id) => {
    const updatedSeries = series.filter(s => s.id !== id);
    setSeries(updatedSeries);
    setStoredSeries(updatedSeries);
    toast({
      title: `Serie eliminada (simulado)`,
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
            <h1 className="text-3xl font-bold text-foreground">Gestionar Series</h1>
            <p className="text-muted-foreground">Añade, edita o elimina series y sus temporadas/episodios.</p>
          </div>
          <Button onClick={handleOpenAddSeriesDialog} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5" /> Añadir Nueva Serie
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Listado de Series</CardTitle>
            <CardDescription>
              Un total de {filteredSeries.length} series encontradas.
            </CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar series por nombre, género, año..."
                className="pl-10 w-full md:w-1/2 lg:w-1/3 bg-background"
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Cargando series...</p>
            ) : (
              <SeriesTable
                series={filteredSeries}
                onEdit={handleOpenEditSeriesDialog}
                onDelete={handleDeleteSeries}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {isAddSeriesDialogOpen && (
        <SeriesFormDialog
          open={isAddSeriesDialogOpen}
          onOpenChange={setIsAddSeriesDialogOpen}
          seriesData={newSeriesData}
          onSave={handleSaveNewSeries}
          title="Añadir Nueva Serie"
          description="Completa los detalles de la nueva serie y sus temporadas/episodios."
        />
      )}

      {isEditSeriesDialogOpen && currentSeries && (
        <SeriesFormDialog
          open={isEditSeriesDialogOpen}
          onOpenChange={setIsEditSeriesDialogOpen}
          seriesData={currentSeries}
          onSave={handleSaveEditedSeries}
          title={`Editando: ${currentSeries.name}`}
          description="Modifica los detalles de la serie y sus temporadas/episodios."
        />
      )}
    </AdminLayout>
  );
};

export default AdminSeriesPage;
