
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast.js";
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

const MoviesTable = ({ movies, onEdit, onDelete }) => {
  const { toast } = useToast();

  if (!movies || movies.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No se encontraron películas.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Póster</TableHead>
            <TableHead>Título</TableHead>
            <TableHead className="hidden md:table-cell">Año</TableHead>
            <TableHead className="hidden lg:table-cell">Género</TableHead>
            <TableHead className="hidden md:table-cell">Rating</TableHead>
            <TableHead className="hidden sm:table-cell">Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id} className="hover:bg-muted/50">
              <TableCell>
                <img 
                  src={movie.poster_path || '/placeholder1.jpg'} 
                  alt={movie.title} 
                  className="h-16 w-auto object-cover rounded" 
                  onError={(e) => e.target.src = '/placeholder1.jpg'}
                />
              </TableCell>
              <TableCell className="font-medium text-foreground">{movie.title}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{movie.year}</TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">{movie.genre}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{movie.rating}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className={`px-2 py-1 text-xs rounded-full ${movie.status === 'Publicado' ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}`}>
                  {movie.status}
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
                    <DropdownMenuItem onClick={() => onEdit(movie)}>
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({title: "Ver detalles no implementado", description: "Esta función se habilitará pronto."})}>
                      <Eye className="mr-2 h-4 w-4" /> Ver Detalles
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                      <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente la película (simulado).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(movie.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
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

export default MoviesTable;
