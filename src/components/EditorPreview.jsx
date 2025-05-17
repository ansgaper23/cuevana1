import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Image, 
  Type, 
  Square, 
  Upload, 
  Grid, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditorPreview = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Editor potente y fácil de usar
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-[700px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Crea diseños profesionales con nuestra intuitiva interfaz de arrastrar y soltar
          </motion.p>
        </div>

        <motion.div 
          className="relative rounded-xl overflow-hidden border shadow-xl max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-background border-b p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm font-medium">Mi diseño - Canva Clone</div>
            <Button variant="outline" size="sm">Compartir</Button>
          </div>

          <div className="flex h-[500px]">
            {/* Sidebar izquierdo */}
            <div className="w-16 bg-background border-r flex flex-col items-center py-4 space-y-6">
              <div className="sidebar-item active p-2 rounded-md">
                <Layers className="h-5 w-5" />
              </div>
              <div className="sidebar-item p-2 rounded-md">
                <Image className="h-5 w-5" />
              </div>
              <div className="sidebar-item p-2 rounded-md">
                <Type className="h-5 w-5" />
              </div>
              <div className="sidebar-item p-2 rounded-md">
                <Square className="h-5 w-5" />
              </div>
              <div className="sidebar-item p-2 rounded-md">
                <Upload className="h-5 w-5" />
              </div>
              <div className="sidebar-item p-2 rounded-md">
                <Grid className="h-5 w-5" />
              </div>
            </div>

            {/* Panel de elementos */}
            <div className="w-64 bg-background border-r">
              <div className="p-3 border-b">
                <h3 className="font-medium">Elementos</h3>
              </div>
              <ScrollArea className="h-[452px]">
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center justify-between">
                      Fotos <ChevronRight className="h-4 w-4" />
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square rounded-md bg-muted overflow-hidden">
                        <img  alt="Foto de naturaleza" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1696959973936-90397e540f6f" />
                      </div>
                      <div className="aspect-square rounded-md bg-muted overflow-hidden">
                        <img  alt="Foto de ciudad" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1649478157438-5ed75e657572" />
                      </div>
                      <div className="aspect-square rounded-md bg-muted overflow-hidden">
                        <img  alt="Foto de personas" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552581234-26160f608093" />
                      </div>
                      <div className="aspect-square rounded-md bg-muted overflow-hidden">
                        <img  alt="Foto abstracta" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1610792716147-3a2e3b1e5052" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center justify-between">
                      Formas <ChevronRight className="h-4 w-4" />
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="aspect-square rounded-md bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary/60"></div>
                      </div>
                      <div className="aspect-square rounded-md bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/60"></div>
                      </div>
                      <div className="aspect-square rounded-md bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/60 rotate-45"></div>
                      </div>
                      <div className="aspect-square rounded-md bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/60 clip-path-triangle"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center justify-between">
                      Texto <ChevronRight className="h-4 w-4" />
                    </h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded-md bg-muted/50 text-lg font-bold">Título</div>
                      <div className="p-2 rounded-md bg-muted/50">Subtítulo</div>
                      <div className="p-2 rounded-md bg-muted/50 text-sm">Texto normal</div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Área de diseño */}
            <div className="flex-1 canvas-area flex items-center justify-center p-8">
              <div className="w-full max-w-md aspect-[3/4] bg-white rounded-md shadow-lg relative">
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="editor-element selected text-3xl font-bold mb-4">Diseño Impresionante</div>
                  <div className="editor-element text-lg mb-6">Crea contenido visual increíble</div>
                  <div className="editor-element mb-6 w-full h-40 bg-muted rounded-lg overflow-hidden">
                    <img  alt="Imagen de diseño" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1576071836504-488c97836e3a" />
                  </div>
                  <div className="editor-element mt-auto p-3 bg-primary text-white rounded-md text-center">
                    Botón de acción
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorPreview;