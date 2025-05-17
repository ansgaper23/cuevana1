import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const codesData = [
  {
    id: "nec_general",
    title: "Principios Generales de la NEC (National Electrical Code)",
    summary: "La NEC establece los estándares mínimos para instalaciones eléctricas seguras en Estados Unidos. Cubre cableado, protección contra sobrecorriente, puesta a tierra y más.",
    details: [
      "Artículo 110: Requisitos para instalaciones eléctricas.",
      "Artículo 210: Circuitos derivados.",
      "Artículo 240: Protección contra sobrecorriente.",
      "Artículo 250: Puesta a tierra y enlace.",
      "Artículo 310: Conductores para cableado general.",
    ],
    link: "https://www.nfpa.org/NEC"
  },
  {
    id: "iec_60364",
    title: "IEC 60364 - Instalaciones eléctricas en edificios",
    summary: "Estándar internacional de la Comisión Electrotécnica Internacional para instalaciones eléctricas de baja tensión. Ampliamente adoptado o referenciado en muchos países.",
    details: [
      "Parte 1: Principios fundamentales, evaluación de características generales, definiciones.",
      "Parte 4: Protección para la seguridad.",
      "Parte 5: Selección e instalación de equipos eléctricos.",
      "Parte 6: Verificación.",
    ],
    link: "https://webstore.iec.ch/publication/2080"
  },
  {
    id: "nom_001_sede",
    title: "NOM-001-SEDE (México) - Instalaciones Eléctricas (utilización)",
    summary: "Norma Oficial Mexicana que establece las especificaciones y lineamientos de carácter técnico que deben satisfacer las instalaciones destinadas a la utilización de la energía eléctrica.",
    details: [
      "Capítulo 1: Disposiciones generales.",
      "Capítulo 2: Alambrado y protección.",
      "Capítulo 3: Métodos de alambrado y materiales.",
      "Capítulo 4: Equipo de uso general.",
      "Capítulo 5: Ambientes especiales.",
    ],
    link: "https://www.gob.mx/sener/documentos/norma-oficial-mexicana-nom-001-sede-2012-instalaciones-electricas-utilizacion"
  }
];

const ElectricalCodesDB = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Códigos y Normativas Eléctricas</CardTitle>
        <CardDescription>Resumen de algunos códigos eléctricos importantes. Siempre consulta la versión más reciente y las regulaciones locales.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {codesData.map((code) => (
            <AccordionItem value={code.id} key={code.id}>
              <AccordionTrigger>{code.title}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">{code.summary}</p>
                <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
                  {code.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                {code.link && (
                  <a href={code.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Más información (enlace externo)
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-muted-foreground mt-6">
          <strong>Descargo de responsabilidad:</strong> Esta información es solo para fines de referencia general y no sustituye la consulta de los documentos oficiales de los códigos y normativas, ni el asesoramiento de un profesional cualificado. Las regulaciones pueden cambiar y variar según la jurisdicción.
        </p>
      </CardContent>
    </Card>
  );
};

export default ElectricalCodesDB;