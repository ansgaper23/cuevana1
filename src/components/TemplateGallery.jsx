import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    category: "presentaciones",
    title: "Presentación Corporativa",
    thumbnail: "presentacion-corporativa"
  },
  {
    id: 2,
    category: "presentaciones",
    title: "Pitch de Startup",
    thumbnail: "pitch-startup"
  },
  {
    id: 3,
    category: "presentaciones",
    title: "Informe Anual",
    thumbnail: "informe-anual"
  },
  {
    id: 4,
    category: "redes",
    title: "Post Instagram",
    thumbnail: "post-instagram"
  },
  {
    id: 5,
    category: "redes",
    title: "Historia Instagram",
    thumbnail: "historia-instagram"
  },
  {
    id: 6,
    category: "redes",
    title: "Portada Facebook",
    thumbnail: "portada-facebook"
  },
  {
    id: 7,
    category: "documentos",
    title: "Currículum Moderno",
    thumbnail: "curriculum"
  },
  {
    id: 8,
    category: "documentos",
    title: "Propuesta Comercial",
    thumbnail: "propuesta-comercial"
  },
  {
    id: 9,
    category: "documentos",
    title: "Informe de Proyecto",
    thumbnail: "informe-proyecto"
  },
  {
    id: 10,
    category: "marketing",
    title: "Flyer Promocional",
    thumbnail: "flyer-promocional"
  },
  {
    id: 11,
    category: "marketing",
    title: "Tarjeta de Visita",
    thumbnail: "tarjeta-visita"
  },
  {
    id: 12,
    category: "marketing",
    title: "Banner Publicitario",
    thumbnail: "banner-publicitario"
  }
];

const TemplateCard = ({ template, index }) => {
  return (
    <motion.div
      className="template-card group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <img  
          alt={template.title} 
          className="h-full w-full object-cover transition-all group-hover:scale-105"
         src="https://images.unsplash.com/photo-1695634365294-7e50d731722b" />
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm">{template.title}</h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/50">
        <Button variant="default" size="sm" className="bg-white text-black hover:bg-white/90">
          Usar plantilla
        </Button>
      </div>
    </motion.div>
  );
};

const TemplateGallery = () => {
  return (
    <section className="py-12 px-4 md:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <motion.h2 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Plantillas para cada ocasión
          </motion.h2>
          <motion.p 
            className="mt-2 text-muted-foreground max-w-[700px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explora miles de plantillas profesionales y personalizables para cualquier proyecto
          </motion.p>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="presentaciones">Presentaciones</TabsTrigger>
              <TabsTrigger value="redes">Redes Sociales</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="todos" className="mt-0">
            <ScrollArea className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {templates.map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="presentaciones" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {templates
                .filter(t => t.category === "presentaciones")
                .map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="redes" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {templates
                .filter(t => t.category === "redes")
                .map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documentos" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {templates
                .filter(t => t.category === "documentos")
                .map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="marketing" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {templates
                .filter(t => t.category === "marketing")
                .map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Ver más plantillas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;