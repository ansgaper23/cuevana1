import React from "react";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, BookOpen, Wrench, Users, FileText, Lightbulb, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  { title: "Caída de Tensión", icon: <Calculator className="tool-card-icon" />, description: "Calcula la caída de tensión en circuitos.", path: "/calculators/voltage-drop" },
  { title: "Calibre de Cable", icon: <Zap className="tool-card-icon" />, description: "Determina el calibre de cable adecuado.", path: "/calculators/wire-gauge" },
  { title: "Consumo Energético", icon: <Lightbulb className="tool-card-icon" />, description: "Estima el consumo de energía.", path: "/calculators/power-consumption" },
  { title: "Códigos Eléctricos", icon: <BookOpen className="tool-card-icon" />, description: "Consulta normativas y códigos vigentes.", path: "/databases/electrical-codes" },
  { title: "Tutoriales", icon: <Wrench className="tool-card-icon" />, description: "Aprende con guías interactivas.", path: "/resources/tutorials" },
  { title: "Generador de Presupuestos", icon: <FileText className="tool-card-icon" />, description: "Crea presupuestos profesionales.", path: "/tools/quote-generator" },
];

const HomePage = () => {
  return (
    <div className="flex-1">
      <Hero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Herramientas Destacadas</h2>
          <p className="section-subtitle">
            Accede rápidamente a nuestras herramientas más populares y optimiza tu trabajo diario.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="tool-card"
              >
                {tool.icon}
                <h3 className="tool-card-title">{tool.title}</h3>
                <p className="tool-card-description">{tool.description}</p>
                <Button variant="link" asChild className="mt-4 p-0 text-primary">
                  <Link to={tool.path}>
                    Ir a la herramienta <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Únete a Nuestra Comunidad de Electricistas
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Comparte conocimientos, resuelve dudas y conecta con otros profesionales del sector en nuestro foro activo y colaborativo.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/community">
                  Visitar Foro <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-muted rounded-xl shadow-lg p-2 border border-border">
                <img 
                  alt="Grupo de electricistas colaborando y discutiendo en un foro en línea"
                  className="w-full h-full object-cover rounded-lg"
                 src="https://images.unsplash.com/photo-1654692623770-7b4f39a94783" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Todo lo que Necesitas, en un Solo Lugar</h2>
          <p className="section-subtitle">
            Desde cálculos complejos hasta la gestión de proyectos, Electrician's Toolkit Pro está diseñado para ser tu compañero indispensable.
          </p>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
            <Link to="/features">
              Descubre Todas las Funcionalidades
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;