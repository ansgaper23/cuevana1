
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login. In a real app, you'd call an API.
    // For this demo, let's use hardcoded credentials.
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Bienvenido al panel de administración.",
        variant: "default",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Error de Autenticación",
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      });
      localStorage.removeItem('isAdminAuthenticated');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-cuevana-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md bg-cuevana-medium-dark border-cuevana-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-cuevana-green">Panel de Administración</CardTitle>
            <CardDescription className="text-cuevana-light-gray">
              Ingresa tus credenciales para acceder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground"
                />
              </div>
              <Button type="submit" className="w-full bg-cuevana-green hover:bg-opacity-80 text-white font-semibold">
                <LogIn className="mr-2 h-5 w-5" /> Ingresar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-xs text-cuevana-light-gray">
              Acceso restringido. Solo personal autorizado.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
  