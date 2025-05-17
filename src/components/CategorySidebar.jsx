import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  const uniqueCategories = [...new Set(categories.map(cat => cat.trim()).filter(Boolean))].sort();

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  if (uniqueCategories.length === 0) {
    return (
      <motion.aside 
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-64 lg:w-72 p-4 bg-cuevana-medium-dark rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-cuevana-blue" />
          Categorías
        </h3>
        <p className="text-sm text-cuevana-light-gray">No hay categorías disponibles por el momento.</p>
      </motion.aside>
    );
  }


  return (
    <motion.aside 
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-64 lg:w-72 p-4 bg-cuevana-medium-dark rounded-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
        <Tag className="h-5 w-5 mr-2 text-cuevana-blue" />
        Categorías
      </h3>
      <motion.ul 
        className="space-y-1.5"
        variants={{ visible: { transition: { staggerChildren: 0.05 }}}}
      >
        <motion.li variants={itemVariants}>
          <Button
            variant={selectedCategory === null ? 'secondary' : 'ghost'}
            onClick={() => onSelectCategory(null)}
            className={`w-full justify-start text-sm ${selectedCategory === null ? 'bg-cuevana-green text-white hover:bg-cuevana-green/90' : 'text-cuevana-light-gray hover:bg-cuevana-dark hover:text-foreground'}`}
          >
            Todas las Categorías
          </Button>
        </motion.li>
        {uniqueCategories.map(category => (
          <motion.li key={category} variants={itemVariants}>
            <Button
              variant={selectedCategory === category ? 'secondary' : 'ghost'}
              onClick={() => onSelectCategory(category)}
              className={`w-full justify-start text-sm capitalize ${selectedCategory === category ? 'bg-cuevana-green text-white hover:bg-cuevana-green/90' : 'text-cuevana-light-gray hover:bg-cuevana-dark hover:text-foreground'}`}
            >
              {category}
            </Button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.aside>
  );
};

export default CategorySidebar;