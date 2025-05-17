import React from "react";
import { 
  Layout, 
  Image, 
  Type, 
  PenTool, 
  Share2, 
  Download, 
  Users 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Layout className="h-10 w-10" />,
    title: "Plantillas profesionales",
    description: "Miles de plantillas diseñadas por profesionales para cualquier ocasión"
  },
  {
    icon: <Image className="h-10 w-10" />,
    title: "Banco de imágenes",
    description: "Accede a millones de fotos, ilustraciones y gráficos de alta calidad"
  },
  {
    icon: <Type className="h-10 w-10" />,
    title: "Tipografías exclusivas",
    description: "Cientos de fuentes para dar personalidad a tus diseños"
  },
  {
    icon: <PenTool className="h-10 w-10" />,
    title: "Editor intuitivo",
    description: "Interfaz fácil de usar con herramientas de edición potentes"
  },
  {
    icon: <Share2 className="h-10 w-10" />,
    title: "Colaboración en tiempo real",
    description: "Trabaja con tu equipo simultáneamente en el mismo diseño"
  },
  {
    icon: <Download className="h-10 w-10" />,
    title: "Exportación flexible",
    description: "Descarga tus diseños en múltiples formatos de alta calidad"
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div 
      className="feature-card relative group p-6 rounded-xl border bg-background shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      
      <div className="mb-4 text-primary">{feature.icon}</div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Todo lo que necesitas para crear diseños increíbles
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-[800px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Herramientas potentes y fáciles de usar para dar vida a tus ideas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Users className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">¿Trabajas en equipo?</h3>
                <p className="text-muted-foreground">Descubre nuestro plan para empresas con funciones avanzadas</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Conocer plan empresas
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;