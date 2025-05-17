import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    id: "faq1",
    question: "¿Cuál es la diferencia entre corriente alterna (CA) y corriente continua (CC)?",
    answer: "La corriente alterna (CA) cambia de dirección periódicamente, mientras que la corriente continua (CC) fluye en una sola dirección. La CA es la que se suministra a los hogares, mientras que la CC es típica de baterías y dispositivos electrónicos."
  },
  {
    id: "faq2",
    question: "¿Qué debo hacer si un disyuntor (breaker) se dispara constantemente?",
    answer: "Un disyuntor que se dispara repetidamente puede indicar una sobrecarga en el circuito (demasiados aparatos conectados) o un cortocircuito (un problema más serio en el cableado o un aparato defectuoso). Desconecta algunos aparatos. Si el problema persiste, es crucial llamar a un electricista cualificado para diagnosticar y reparar la falla."
  },
  {
    id: "faq3",
    question: "¿Con qué frecuencia debo revisar mi instalación eléctrica?",
    answer: "Se recomienda una inspección profesional cada 5-10 años para viviendas, y con mayor frecuencia para propiedades más antiguas o comerciales. También es aconsejable una revisión después de cualquier trabajo de remodelación importante o si notas problemas como luces parpadeantes o chispas."
  },
  {
    id: "faq4",
    question: "¿Qué es la puesta a tierra y por qué es importante?",
    answer: "La puesta a tierra es una conexión de seguridad que dirige la corriente eléctrica no deseada (por fallas o sobretensiones) de manera segura hacia la tierra. Protege a las personas de descargas eléctricas y a los equipos de daños."
  },
  {
    id: "faq5",
    question: "¿Puedo realizar yo mismo trabajos eléctricos menores en casa?",
    answer: "Algunos trabajos menores, como cambiar un interruptor o un tomacorriente, pueden ser realizados por personas con conocimientos básicos y siguiendo estrictas precauciones de seguridad (¡siempre cortar la energía!). Sin embargo, para trabajos más complejos o si no te sientes seguro, siempre es mejor contratar a un electricista certificado."
  }
];

const FaqResource = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntas Frecuentes (FAQ)</CardTitle>
        <CardDescription>Encuentra respuestas a las dudas más comunes sobre electricidad y trabajos eléctricos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="faq-item">
              <AccordionTrigger className="faq-trigger text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="faq-content">
                <p className="pt-2 pb-4">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FaqResource;