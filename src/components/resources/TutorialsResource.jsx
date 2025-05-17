import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const tutorialsData = [
  {
    id: "tut1",
    title: "Cómo Realizar una Prueba de Continuidad",
    description: "Aprende los pasos básicos para verificar la continuidad en un circuito utilizando un multímetro.",
    duration: "5 min",
    difficulty: "Básico",
    imageName: "prueba-continuidad",
    steps: [
      "Asegúrate de que el circuito esté desenergizado.",
      "Configura tu multímetro en el modo de continuidad (generalmente indicado con un símbolo de diodo o sonido).",
      "Coloca las puntas de prueba en los dos puntos del circuito que deseas probar.",
      "Si hay continuidad, el multímetro emitirá un pitido o mostrará una lectura baja de resistencia."
    ]
  },
  {
    id: "tut2",
    title: "Instalación Segura de un Tomacorriente",
    description: "Guía paso a paso para reemplazar o instalar un nuevo tomacorriente de forma segura.",
    duration: "15 min",
    difficulty: "Intermedio",
    imageName: "instalacion-tomacorriente",
    steps: [
      "Corta la energía del circuito correspondiente desde el panel de disyuntores.",
      "Verifica que no haya voltaje en el tomacorriente existente con un probador de voltaje.",
      "Retira la placa y el tomacorriente viejo, tomando nota de las conexiones de los cables.",
      "Conecta los cables al nuevo tomacorriente (neutro al tornillo plateado, fase al dorado, tierra al verde).",
      "Asegura el nuevo tomacorriente en la caja y vuelve a colocar la placa.",
      "Restaura la energía y prueba el nuevo tomacorriente."
    ]
  },
  {
    id: "tut3",
    title: "Diagnóstico de un Disyuntor Disparado",
    description: "Entiende por qué se dispara un disyuntor y cómo identificar la causa potencial.",
    duration: "10 min",
    difficulty: "Básico",
    imageName: "disyuntor-disparado",
    steps: [
      "Identifica el disyuntor disparado en el panel (generalmente en una posición intermedia o \"OFF\").",
      "Antes de rearmar, desconecta algunos aparatos del circuito afectado para reducir la carga.",
      "Mueve el disyuntor completamente a \"OFF\" y luego a \"ON\".",
      "Si se dispara de nuevo inmediatamente, podría haber un cortocircuito. Si tarda, podría ser una sobrecarga.",
      "Considera llamar a un profesional si el problema persiste."
    ]
  }
];

const TutorialsResource = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutoriales Interactivos</CardTitle>
        <CardDescription>Aprende nuevas habilidades y repasa conceptos clave con nuestras guías prácticas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tutorialsData.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-muted">
                <img 
                  alt={`Ilustración para el tutorial ${tutorial.title}`}
                  className="h-48 w-full object-cover md:h-full"
                 src="https://images.unsplash.com/photo-1581726690015-c9861fa5057f" />
              </div>
              <div className="md:w-2/3 p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                  <span>Duración: {tutorial.duration}</span>
                  <span>Dificultad: {tutorial.difficulty}</span>
                </div>
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-primary hover:underline">Ver pasos del tutorial</summary>
                  <ul className="mt-2 space-y-1 pl-4">
                    {tutorial.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </details>
                <Button variant="outline" size="sm" className="mt-4">
                  <PlayCircle className="mr-2 h-4 w-4" /> Iniciar Tutorial (Simulado)
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default TutorialsResource;