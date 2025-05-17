import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    id: "free",
    name: "Gratis",
    price: "0",
    description: "Para uso personal básico",
    features: [
      "Acceso a plantillas básicas",
      "Elementos gratuitos limitados",
      "5GB de almacenamiento",
      "Exportación en calidad estándar",
      "Uso personal"
    ],
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "12,99",
    description: "Para creadores y profesionales",
    features: [
      "Acceso a todas las plantillas",
      "Elementos premium ilimitados",
      "100GB de almacenamiento",
      "Exportación en alta calidad",
      "Eliminación de fondos",
      "Programación de contenido",
      "Soporte prioritario"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Empresa",
    price: "29,99",
    description: "Para equipos y organizaciones",
    features: [
      "Todo lo incluido en Pro",
      "Almacenamiento ilimitado",
      "Control de marca",
      "Colaboración en tiempo real",
      "Gestión de usuarios",
      "Integraciones avanzadas",
      "Soporte dedicado 24/7"
    ],
    popular: false
  }
];

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div 
      className={`relative rounded-xl border bg-background p-6 shadow-sm ${plan.popular ? 'border-primary shadow-md' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Más popular
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
      </div>
      
      <div className="mb-5">
        <span className="text-4xl font-bold">{plan.price}€</span>
        <span className="text-muted-foreground ml-1">/mes</span>
      </div>
      
      <ul className="mb-6 space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={plan.popular ? "default" : "outline"} 
        className="w-full"
      >
        {plan.id === "free" ? "Comenzar gratis" : "Probar gratis por 14 días"}
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tight mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Planes para cada necesidad
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-[700px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elige el plan que mejor se adapte a tus necesidades de diseño
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>¿Necesitas un plan personalizado para tu organización?</p>
          <Button variant="link" className="mt-1">Contacta con ventas</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;