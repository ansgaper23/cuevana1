import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-purple-600 p-10 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Comienza a crear diseños increíbles hoy mismo
            </h2>
            <p className="text-white/80 max-w-[700px] mb-8">
              Únete a millones de personas que ya están creando diseños impresionantes con nuestra plataforma intuitiva. No se requieren habilidades de diseño.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Comenzar gratis
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ver planes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;