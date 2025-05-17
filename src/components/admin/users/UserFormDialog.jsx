
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";

const UserFormDialog = ({ open, onOpenChange, userData: initialUserData, onSave, title, description, isEditing = false }) => {
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(userData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 py-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" name="name" value={userData?.name || ''} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" name="email" type="email" value={userData?.email || ''} onChange={handleInputChange} disabled={isEditing && userData?.email === 'jorge968122@gmail.com'} />
          </div>
          {!isEditing && (
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" value={userData?.password || ''} onChange={handleInputChange} placeholder="Dejar en blanco para no cambiar (si edita)"/>
            </div>
          )}
           {isEditing && userData?.email !== 'jorge968122@gmail.com' && (
             <div>
              <Label htmlFor="password">Nueva Contraseña (Opcional)</Label>
              <Input id="password" name="password" type="password" value={userData?.password || ''} onChange={handleInputChange} placeholder="Dejar en blanco para no cambiar"/>
            </div>
           )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select 
                name="role" 
                value={userData?.role || 'Usuario'} 
                onValueChange={(value) => handleSelectChange('role', value)}
                disabled={isEditing && userData?.email === 'jorge968122@gmail.com'}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Usuario">Usuario</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select 
                name="status" 
                value={userData?.status || 'Activo'} 
                onValueChange={(value) => handleSelectChange('status', value)}
                disabled={isEditing && userData?.email === 'jorge968122@gmail.com'}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">Guardar Usuario</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
