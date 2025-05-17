
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Edit, Trash2, ShieldCheck, ShieldAlert, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
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
} from "@/components/ui/alert-dialog.jsx";

const UsersTable = ({ users, onEdit, onDelete }) => {

  const getRoleStyles = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-500/20 text-red-700';
      case 'Editor': return 'bg-yellow-500/20 text-yellow-700';
      default: return 'bg-green-500/20 text-green-700';
    }
  };

  if (!users || users.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No se encontraron usuarios.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Avatar</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Rol</TableHead>
            <TableHead className="hidden lg:table-cell">Fecha de Ingreso</TableHead>
            <TableHead className="hidden md:table-cell">Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              <TableCell>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar || '/profile-placeholder.jpg'} alt={user.name} />
                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-foreground">{user.name}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRoleStyles(user.role)}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">{user.joinDate}</TableCell>
              <TableCell className="hidden md:table-cell">
                <span className={`flex items-center text-xs ${user.status === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status === 'Activo' ? <ShieldCheck className="mr-1 h-4 w-4" /> : <ShieldAlert className="mr-1 h-4 w-4" />}
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(user)} disabled={user.email === 'jorge968122@gmail.com' && user.role === 'Admin'}>
                      <Edit className="mr-2 h-4 w-4" /> Editar Rol/Estado
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem 
                          onSelect={(e) => e.preventDefault()} 
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          disabled={user.email === 'jorge968122@gmail.com'}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar Usuario
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro de eliminar este usuario?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción es simulada y no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(user.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                            Sí, eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
