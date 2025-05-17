import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";

const initialTemplates = [
  {
    id: "T001",
    name: "Informe de Inspección Eléctrica Residencial",
    category: "Inspección",
    description: "Plantilla detallada para documentar inspecciones eléctricas en viviendas.",
    downloads: 1250,
    fileType: "PDF",
    tags: ["residencial", "inspección", "seguridad"],
    previewImage: "inspeccion_residencial_template_preview.jpg" 
  },
  {
    id: "T002",
    name: "Presupuesto de Instalación de Iluminación LED",
    category: "Presupuesto",
    description: "Formato estándar para cotizar proyectos de instalación de iluminación LED.",
    downloads: 980,
    fileType: "DOCX",
    tags: ["presupuesto", "iluminación", "led", "comercial"],
    previewImage: "presupuesto_led_template_preview.jpg"
  },
  {
    id: "T003",
    name: "Checklist de Mantenimiento Preventivo de Tableros",
    category: "Mantenimiento",
    description: "Lista de verificación para el mantenimiento preventivo de tableros eléctricos industriales.",
    downloads: 750,
    fileType: "XLSX",
    tags: ["mantenimiento", "industrial", "tableros", "checklist"],
    previewImage: "mantenimiento_tableros_template_preview.jpg"
  },
  {
    id: "T004",
    name: "Plan de Seguridad Eléctrica para Obras",
    category: "Seguridad",
    description: "Documento base para establecer protocolos de seguridad eléctrica en sitios de construcción.",
    downloads: 620,
    fileType: "PDF",
    tags: ["seguridad", "obra", "construcción", "protocolo"],
    previewImage: "plan_seguridad_obra_template_preview.jpg"
  },
];

const TemplatesResource = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTemplates = initialTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(initialTemplates.map(t => t.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center"><FileText className="mr-3 h-8 w-8 text-primary" />Plantillas Descargables</CardTitle>
          <CardDescription>Optimiza tus flujos de trabajo con estas plantillas listas para usar. Descarga informes, presupuestos, checklists y más.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar plantillas..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "Todas las Categorías" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"}}
                  className="h-full flex flex-col"
                >
                  <Card className="flex flex-col flex-grow overflow-hidden h-full border-border hover:border-primary/50 transition-colors duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{template.category}</span>
                      </div>
                       <img  
                        src={`/placeholder-images/${template.previewImage}`} 
                        alt={`Vista previa de ${template.name}`} 
                        className="w-full h-40 object-cover rounded-md mb-3"
                         src="https://images.unsplash.com/photo-1704030459018-88ad4a4c7446" />
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-sm mb-3 h-20 overflow-y-auto">{template.description}</CardDescription>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map(tag => (
                          <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-3 border-t mt-auto">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Download className="mr-1 h-4 w-4" /> {template.downloads} descargas
                      </span>
                      <Button size="sm" variant="gradient">
                        Descargar ({template.fileType})
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-xl font-semibold">No se encontraron plantillas</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta ajustar tu búsqueda o filtros.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TemplatesResource;