
import React, { useState, useEffect } from "react";
import MovieList from "@/components/movie/MovieList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Placeholder data
const placeholderSeries = (count = 12) => Array(count).fill(null).map((_, i) => ({
  id: `series-${i + 1}`,
  name: `Serie de Ejemplo ${i + 1}`,
  poster_path: `/placeholder${(i+2) % 3 + 1}.jpg`, // different placeholders
  first_air_date: `202${i % 4}-03-15`,
  vote_average: 7.5 + (i % 2.5),
  overview: `Resumen de la serie de ejemplo número ${i + 1}. Una trama envolvente te espera.`,
}));


const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'trending', 'latest'

  const itemsPerLoad = 12;

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredSeries = placeholderSeries(30);
       if (activeFilter === "trending") {
        filteredSeries = filteredSeries.sort((a, b) => b.vote_average - a.vote_average);
      } else if (activeFilter === "latest") {
        filteredSeries = filteredSeries.sort((a,b) => new Date(b.first_air_date) - new Date(a.first_air_date));
      }
      setSeries(filteredSeries);
      setVisibleSeries(itemsPerLoad);
      setIsLoading(false);
    }, 500);
  }, [activeFilter]);

  const loadMoreSeries = () => {
    setVisibleSeries(prev => prev + itemsPerLoad);
  };

  return (
    <motion.div 
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0 section-title-underline">
          Todas las Series
        </h1>
        <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="all" className={activeFilter === "all" ? "filter-tab-active" : ""}>Todas</TabsTrigger>
            <TabsTrigger value="trending" className={activeFilter === "trending" ? "filter-tab-active" : ""}>Tendencia</TabsTrigger>
            <TabsTrigger value="latest" className={activeFilter === "latest" ? "filter-tab-active" : ""}>Nuevas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading && series.length === 0 ? (
         <p className="text-center text-muted-foreground py-10">Cargando series...</p>
      ) : (
        <MovieList
          movies={series.slice(0, visibleSeries)}
          isSeries={true}
          onShowMore={loadMoreSeries}
          hasMore={visibleSeries < series.length}
          isLoadingMore={isLoading && series.length > 0}
          itemsPerLoad={itemsPerLoad}
        />
      )}
    </motion.div>
  );
};

export default SeriesPage;
