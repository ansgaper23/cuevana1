import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit3, Trash2, LogOut, Film, Tv, ListChecks } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState([]);
  const [stats, setStats] = useState({ movies: 0, series: 0, total: 0 });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
      toast({
        title: "Acceso Denegado",
        description: "Debes iniciar sesión para acceder al dashboard.",
        variant: "destructive",
      });
    } else {
      loadContent();
    }
  }, [navigate, toast]);

  const loadContent = () => {
    const storedContent = JSON.parse(localStorage.getItem('cuevanaAdminContent') || '[]');
    setContent(storedContent);
    updateStats(storedContent);
  };

  const updateStats = (currentContent) => {
    const moviesCount = currentContent.filter(c => c.contentType === 'movie').length;
    const seriesCount = currentContent.filter(c => c.contentType === 'series').length;
    setStats({ movies: moviesCount, series: seriesCount, total: currentContent.length });
  };

  const handleDelete = (idToDelete) => {
    const updatedContent = content.filter(item => item.id !== idToDelete);
    localStorage.setItem('cuevanaAdminContent', JSON.stringify(updatedContent));
    setContent(updatedContent);
    updateStats(updatedContent);
    toast({
      title: "Contenido Eliminado",
      description: "El elemento ha sido eliminado exitosamente.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión del panel de administración.",
    });
    navigate('/admin/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-cuevana-green">Dashboard de Administración</h1>
        <div className="flex gap-2">
          <Button onClick={handleLogout} variant="destructive" size="sm" className="shadow-md">
            <LogOut className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Cerrar Sesión
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cuevana-light-gray">Total Contenido</CardTitle>
            <ListChecks className="h-5 w-5 text-cuevana-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Elementos totales gestionados</p>
          </CardContent>
        </Card>
        <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cuevana-light-gray">Total Películas</CardTitle>
            <Film className="h-5 w-5 text-cuevana-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.movies}</div>
             <p className="text-xs text-muted-foreground">Películas en el catálogo</p>
          </CardContent>
        </Card>
        <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cuevana-light-gray">Total Series</CardTitle>
            <Tv className="h-5 w-5 text-cuevana-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.series}</div>
            <p className="text-xs text-muted-foreground">Series en el catálogo</p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button asChild size="lg" className="w-full sm:w-auto bg-cuevana-green hover:bg-cuevana-green/80 text-white shadow-md transition-transform hover:scale-105">
          <Link to="/admin/content/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Agregar Nuevo Contenido
          </Link>
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Gestión de Contenido</h2>
        {content.length === 0 ? (
          <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-center text-foreground">No hay contenido aún</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-cuevana-light-gray">
                Empieza agregando nuevas películas o series para administrarlas aquí.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-cuevana-medium-dark border-cuevana-border shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-cuevana-dark/50">
                    <tr>
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-cuevana-light-gray">Título</th>
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-cuevana-light-gray">Tipo</th>
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-cuevana-light-gray">Año</th>
                      <th className="p-3 sm:p-4 text-left text-xs sm:text-sm font-semibold text-cuevana-light-gray">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item, index) => (
                      <motion.tr 
                        key={item.id} 
                        variants={itemVariants}
                        className={`border-b border-cuevana-border ${index % 2 === 0 ? 'bg-cuevana-medium-dark' : 'bg-cuevana-dark/30'} hover:bg-cuevana-dark/60 transition-colors`}
                      >
                        <td className="p-3 sm:p-4 text-sm text-foreground font-medium">{item.title}</td>
                        <td className="p-3 sm:p-4 text-sm text-cuevana-light-gray capitalize">{item.contentType === 'movie' ? 'Película' : 'Serie'}</td>
                        <td className="p-3 sm:p-4 text-sm text-cuevana-light-gray">{item.year}</td>
                        <td className="p-3 sm:p-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild className="border-cuevana-blue text-cuevana-blue hover:bg-cuevana-blue/10 hover:text-cuevana-blue">
                              <Link to={`/admin/content/edit/${item.id}`}>
                                <Edit3 className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-cuevana-medium-dark border-cuevana-border text-foreground">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-cuevana-light-gray">
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el contenido <strong className="text-foreground">{item.title}</strong>.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-cuevana-border hover:bg-cuevana-dark text-foreground">Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700 text-white">Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;