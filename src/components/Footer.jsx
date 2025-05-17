
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-cuevana-medium-dark py-8 text-center text-cuevana-light-gray"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Cuevana. Todos los derechos reservados (simulado).
        </p>
        <p className="text-xs mt-2">
          Este sitio es un proyecto de demostración con fines educativos.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
  