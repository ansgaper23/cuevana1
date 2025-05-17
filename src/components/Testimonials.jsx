import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Diseñadora Freelance",
    avatar: "maria-garcia",
    content: "Esta plataforma ha revolucionado mi flujo de trabajo. Puedo crear diseños profesionales en minutos que antes me tomaban horas.",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Emprendedor",
    avatar: "carlos-rodriguez",
    content: "Increíble herramienta para mi negocio. He podido crear todo el material de marketing sin necesidad de contratar a un diseñador.",
    rating: 5
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Profesora",
    avatar: "laura-martinez",
    content: "Mis presentaciones para clase nunca habían sido tan atractivas. Mis alumnos están más atentos y comprometidos gracias a estos diseños.",
    rating: 4
  },
  {
    id: 4,
    name: "Javier López",
    role: "Marketing Digital",
    avatar: "javier-lopez",
    content: "La cantidad de plantillas y la facilidad de uso hacen que sea mi herramienta favorita para crear contenido para redes sociales.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div 
      className="bg-background rounded-xl p-6 shadow-md border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src="" alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-muted-foreground">{testimonial.content}</p>
    </motion.div>
  );
};

const Testimonials = () => {
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
            Lo que dicen nuestros usuarios
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-[700px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Miles de personas confían en nuestra plataforma para sus necesidades de diseño
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;