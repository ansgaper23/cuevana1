import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Search, PlusCircle } from "lucide-react";

const forumCategories = [
  { id: "general", name: "Discusión General", description: "Temas generales sobre electricidad." },
  { id: "troubleshooting", name: "Resolución de Problemas", description: "Ayuda con diagnósticos y reparaciones." },
  { id: "codes", name: "Códigos y Normativas", description: "Consultas sobre NEC, IEC y locales." },
  { id: "tools", name: "Herramientas y Equipos", description: "Opiniones y recomendaciones." },
  { id: "projects", name: "Proyectos y Casos de Estudio", description: "Comparte tus trabajos y aprende de otros." },
];

const recentPosts = [
  { id: 1, title: "¿Mejor manera de pasar cable por conducto lleno?", category: "Resolución de Problemas", author: "ElecPro77", replies: 12, likes: 5, avatarFallback: "EP" },
  { id: 2, title: "Duda sobre última actualización de la NEC Artículo 210.8(A)", category: "Códigos y Normativas", author: "NormativoSeguro", replies: 5, likes: 8, avatarFallback: "NS" },
  { id: 3, title: "Opiniones sobre el multímetro Fluke 87V", category: "Herramientas y Equipos", author: "TechSpark", replies: 25, likes: 15, avatarFallback: "TS" },
];

const CommunityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Comunidad de Electricistas</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Conecta, comparte y aprende con otros profesionales del sector eléctrico.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenido Principal del Foro */}
        <motion.div 
          className="lg:w-3/4 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Categorías del Foro</CardTitle>
              <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Nuevo Tema</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forumCategories.map(category => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-xs">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 h-auto text-sm">Explorar Categoría</Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temas Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://avatar.vercel.sh/${post.author}.png`} />
                    <AvatarFallback>{post.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm hover:text-primary cursor-pointer">{post.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      En <span className="text-primary">{post.category}</span> por {post.author}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-3">
                    <span className="flex items-center"><MessageSquare className="h-3 w-3 mr-1" /> {post.replies}</span>
                    <span className="flex items-center"><ThumbsUp className="h-3 w-3 mr-1" /> {post.likes}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar del Foro */}
        <motion.aside 
          className="lg:w-1/4 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Buscar en el Foro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input placeholder="Buscar temas..." />
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>Temas Totales: <span className="font-semibold">1,234</span></p>
              <p>Mensajes Totales: <span className="font-semibold">15,678</span></p>
              <p>Miembros Activos: <span className="font-semibold">890</span></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reglas del Foro</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>1. Ser respetuoso con todos los miembros.</p>
              <p>2. No spam ni publicidad no solicitada.</p>
              <p>3. Mantener los temas relevantes a la categoría.</p>
              <p>4. Compartir conocimiento de forma constructiva.</p>
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
};

export default CommunityPage;