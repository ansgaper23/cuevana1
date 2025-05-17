import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Film, Tv, Users, Settings, PlusCircle, Edit3, Trash2, UploadCloud, ExternalLink, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, linkTo }) => (
  <motion.div whileHover={{ y: -5 }} className="h-full">
    <Card className={`shadow-lg border-${color}/30 hover:border-${color}/60 transition-all duration-200 h-full flex flex-col`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 text-${color}` })}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className={`text-3xl font-bold text-${color}`}>{value}</div>
      </CardContent>
      {linkTo && (
        <CardContent className="pt-0">
          <Button variant="link" asChild className={`p-0 text-xs text-${color}`}>
            <Link to={linkTo}>Ver más <ExternalLink className="ml-1 h-3 w-3"/></Link>
          </Button>
        </CardContent>
      )}
    </Card>
  </motion.div>
);

const ActionButton = ({ title, icon, onClick, variant = "outline", className = "" }) => (
 <motion.div whileHover={{scale: 1.05}} whileTap={{scale:0.95}}>
    <Button variant={variant} className={`w-full justify-start text-base py-6 shadow-sm hover:shadow-md transition-shadow ${className}`} onClick={onClick}>
      {React.cloneElement(icon, { className: "mr-3 h-5 w-5" })}
      {title}
    </Button>
  </motion.div>
);


const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action) => {
    alert(`Acción: ${action}. Esta funcionalidad requiere un backend.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-foreground">Bienvenido, <span className="text-primary">{user?.name || 'Admin'}</span>!</h1>
          <p className="text-lg text-muted-foreground">Gestiona tu plataforma de streaming desde aquí.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Películas" value="1,234" icon={<Film />} color="primary" linkTo="/admin/movies" />
          <StatCard title="Total Series" value="567" icon={<Tv />} color="primary" linkTo="/admin/series" />
          <StatCard title="Usuarios Registrados" value="8,910" icon={<Users />} color="primary" linkTo="/admin/users" />
          <StatCard title="Visitas Hoy" value="1,024" icon={<BarChart3 />} color="primary" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Acciones Rápidas</CardTitle>
            <CardDescription>Funciones principales para la gestión de contenido.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionButton title="Añadir Nueva Película" icon={<PlusCircle />} onClick={() => navigate("/admin/movies?action=add")} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground"/>
            <ActionButton title="Añadir Nueva Serie" icon={<PlusCircle />} onClick={() => navigate("/admin/series?action=add")} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground"/>
            <ActionButton title="Importar desde IMDb/TMDb" icon={<UploadCloud />} onClick={() => handleAction("Importar Metadatos")} />
            <ActionButton title="Gestionar Películas" icon={<Edit3 />} onClick={() => navigate("/admin/movies")} />
            <ActionButton title="Gestionar Series" icon={<Edit3 />} onClick={() => navigate("/admin/series")} />
            <ActionButton title="Configuración General" icon={<Settings />} onClick={() => navigate("/admin/settings")} />
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Avisos Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Recuerda que la funcionalidad de agregar/editar contenido y la gestión de videos requieren la implementación de un backend.</li>
              <li>La importación de metadatos desde IMDb/TMDb necesita configuración de API Keys en el backend.</li>
              <li>Este panel es una demostración visual. Las acciones de modificación de datos no persistirán.</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;