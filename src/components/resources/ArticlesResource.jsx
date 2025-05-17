import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CalendarDays, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const articlesData = [
  {
    id: "art1",
    title: "5 Consejos Esenciales para la Seguridad Eléctrica en el Hogar",
    author: "Equipo de Electrician's Toolkit",
    date: "2025-05-10",
    excerpt: "La seguridad eléctrica es primordial. Descubre cinco consejos clave que todo propietario y electricista debe conocer para prevenir accidentes y garantizar instalaciones seguras.",
    imageName: "seguridad-electrica-hogar",
    category: "Seguridad"
  },
  {
    id: "art2",
    title: "Entendiendo la Puesta a Tierra: Importancia y Métodos",
    author: "Ing. Juan Pérez",
    date: "2025-04-25",
    excerpt: "Una guía completa sobre la puesta a tierra en sistemas eléctricos. Exploramos por qué es crucial y los diferentes métodos para implementarla correctamente.",
    imageName: "puesta-tierra-sistemas",
    category: "Técnico"
  },
  {
    id: "art3",
    title: "Cómo Elegir el Multímetro Adecuado para tus Necesidades",
    author: "Ana Gómez, Técnica Electricista",
    date: "2025-03-15",
    excerpt: "Los multímetros son herramientas indispensables. Te ayudamos a comprender las características clave para seleccionar el que mejor se adapte a tu trabajo.",
    imageName: "elegir-multimetro",
    category: "Herramientas"
  },
  {
    id: "art4",
    title: "Introducción a los Sistemas Fotovoltaicos Residenciales",
    author: "Soluciones Solares Pro",
    date: "2025-02-20",
    excerpt: "Una visión general de cómo funcionan los sistemas de energía solar para hogares, sus componentes principales y consideraciones para la instalación.",
    imageName: "sistemas-fotovoltaicos",
    category: "Energías Renovables"
  }
];

const ArticlesResource = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artículos Informativos</CardTitle>
        <CardDescription>Mantente actualizado con las últimas tendencias, consejos y conocimientos técnicos del sector eléctrico.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {articlesData.map((article) => (
          <Card key={article.id} className="overflow-hidden shadow-md">
            <div className="md:flex">
              <div className="md:w-1/3 bg-muted">
                <img 
                  alt={`Imagen para el artículo ${article.title}`}
                  className="h-56 w-full object-cover md:h-full"
                 src="https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c" />
              </div>
              <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium mb-2 inline-block">{article.category}</span>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center"><UserCircle className="mr-1 h-4 w-4" /> {article.author}</span>
                    <span className="flex items-center"><CalendarDays className="mr-1 h-4 w-4" /> {new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" /> Leer Artículo Completo
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ArticlesResource;