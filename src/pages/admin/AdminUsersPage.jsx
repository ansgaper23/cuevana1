
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast.js";
import UserFormDialog from '@/components/admin/users/UserFormDialog.jsx';
import UsersTable from '@/components/admin/users/UsersTable.jsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

const placeholderUsers = Array(3).fill(null).map((_, i) => ({
  id: `user-${Date.now() + i}`,
  name: i === 0 ? 'Jorge Admin' : `Usuario Ejemplo ${i}`,
  email: i === 0 ? 'jorge968122@gmail.com' : `usuario${i+1}@example.com`,
  role: i === 0 ? 'Admin' : (i % 2 === 0 ? 'Editor' : 'Usuario'),
  joinDate: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString(),
  status: 'Activo',
  avatar: `/profile-placeholder.jpg` 
}));

const initialNewUserData = {
  name: '',
  email: '',
  role: 'Usuario',
  status: 'Activo',
  password: '' 
};

const AdminUsersPage = () => {
  const { toast } = useToast();
  const [storedUsers, setStoredUsers] = useLocalStorage('adminUsers', placeholderUsers);
  const [users, setUsers] = useState(storedUsers);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUserData, setNewUserData] = useState(initialNewUserData);

  useEffect(() => {
    setUsers(storedUsers);
    setIsLoading(false);
  }, [storedUsers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm)
  );

  const handleOpenAddUserDialog = () => {
    setNewUserData(initialNewUserData);
    setIsAddUserDialogOpen(true);
  };

  const handleOpenEditUserDialog = (user) => {
    setCurrentUser({ ...user, password: '' }); // Don't prefill password for edit
    setIsEditUserDialogOpen(true);
  };
  
  const handleSaveNewUser = (data) => {
    const updatedUsers = [{ ...data, id: `user-${Date.now()}`, joinDate: new Date().toLocaleDateString() }, ...users];
    setUsers(updatedUsers);
    setStoredUsers(updatedUsers);
    toast({ title: "Usuario Añadido (Simulado)", description: `${data.name} ha sido añadido.` });
    setIsAddUserDialogOpen(false);
  };

  const handleSaveEditedUser = (data) => {
    const updatedUsers = users.map(u => u.id === data.id ? { ...u, ...data } : u);
    setUsers(updatedUsers);
    setStoredUsers(updatedUsers);
    toast({ title: "Usuario Actualizado (Simulado)", description: `${data.name} ha sido actualizado.` });
    setIsEditUserDialogOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    if (users.find(u => u.id === id)?.email === 'jorge968122@gmail.com') {
      toast({ title: "Acción no permitida", description: "No se puede eliminar al administrador principal.", variant: "destructive" });
      return;
    }
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    setStoredUsers(updatedUsers);
    toast({
      title: `Usuario eliminado (simulado)`,
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
            <h1 className="text-3xl font-bold text-foreground">Gestionar Usuarios</h1>
            <p className="text-muted-foreground">Administra los usuarios y sus roles en la plataforma.</p>
          </div>
          <Button onClick={handleOpenAddUserDialog} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5" /> Añadir Nuevo Usuario
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Listado de Usuarios</CardTitle>
            <CardDescription>
              Un total de {filteredUsers.length} usuarios encontrados.
            </CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuarios por nombre, email, rol..."
                className="pl-10 w-full md:w-1/2 lg:w-1/3 bg-background"
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">Cargando usuarios...</p>
            ) : (
              <UsersTable 
                users={filteredUsers}
                onEdit={handleOpenEditUserDialog}
                onDelete={handleDeleteUser}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {isAddUserDialogOpen && (
        <UserFormDialog
          open={isAddUserDialogOpen}
          onOpenChange={setIsAddUserDialogOpen}
          userData={newUserData}
          onSave={handleSaveNewUser}
          title="Añadir Nuevo Usuario"
          description="Completa los detalles del nuevo usuario."
        />
      )}

      {isEditUserDialogOpen && currentUser && (
        <UserFormDialog
          open={isEditUserDialogOpen}
          onOpenChange={setIsEditUserDialogOpen}
          userData={currentUser}
          onSave={handleSaveEditedUser}
          title={`Editando Usuario: ${currentUser.name}`}
          description="Modifica los detalles y el rol del usuario."
          isEditing={true}
        />
      )}

    </AdminLayout>
  );
};

export default AdminUsersPage;
