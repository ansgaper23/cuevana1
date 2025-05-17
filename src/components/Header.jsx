import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Tv, Film, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); 
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-cuevana-medium-dark shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-cuevana-green mb-4 sm:mb-0">
          Cuevana
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-0">
          <Button variant="ghost" asChild className="text-foreground hover:text-cuevana-green transition-colors">
            <Link to="/"><Home className="mr-2 h-5 w-5" />Inicio</Link>
          </Button>
          <Button variant="ghost" asChild className="text-foreground hover:text-cuevana-green transition-colors">
            <Link to="/movies"><Film className="mr-2 h-5 w-5" />Películas</Link>
          </Button>
          <Button variant="ghost" asChild className="text-foreground hover:text-cuevana-green transition-colors">
            <Link to="/series"><Tv className="mr-2 h-5 w-5" />Series</Link>
          </Button>
        </nav>
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto max-w-xs">
          <Input
            type="search"
            placeholder="Buscar películas, series..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-cuevana-dark border-cuevana-border placeholder-cuevana-light-gray text-foreground pl-10"
          />
          <button type="submit" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cuevana-light-gray focus:outline-none">
            <Search className="h-full w-full" />
          </button>
        </form>
      </div>
    </motion.header>
  );
};

export default Header;