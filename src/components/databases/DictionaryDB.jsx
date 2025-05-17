import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

const dictionaryData = [
  { term: "Amperio (A)", definition: "Unidad de medida de la intensidad de corriente eléctrica. Representa el flujo de un culombio de carga por segundo." },
  { term: "Voltio (V)", definition: "Unidad de medida del potencial eléctrico, fuerza electromotriz y tensión eléctrica. Un voltio es la diferencia de potencial a través de un conductor cuando una corriente de un amperio disipa un vatio de potencia." },
  { term: "Ohmio (Ω)", definition: "Unidad de medida de la resistencia eléctrica. Se define como la resistencia eléctrica que existe entre dos puntos de un conductor cuando una diferencia de potencial constante de 1 voltio aplicada entre estos dos puntos produce una corriente de 1 amperio." },
  { term: "Vatio (W)", definition: "Unidad de medida de la potencia eléctrica. Un vatio es la potencia producida por una diferencia de potencial de 1 voltio y una corriente eléctrica de 1 amperio." },
  { term: "Corriente Alterna (CA/AC)", definition: "Tipo de corriente eléctrica en la que la dirección del flujo de electrones va y viene a intervalos regulares o en ciclos. Es la forma en que la energía eléctrica llega a hogares y empresas." },
  { term: "Corriente Continua (CC/DC)", definition: "Tipo de corriente eléctrica en la que el flujo de carga eléctrica es siempre en la misma dirección. Es la corriente producida por baterías, paneles solares, etc." },
  { term: "Resistencia", definition: "Oposición al paso de la corriente eléctrica en un conductor o componente." },
  { term: "Conductancia", definition: "Facilidad con la que un material permite el flujo de corriente eléctrica. Es la inversa de la resistencia." },
  { term: "Impedancia (Z)", definition: "Medida de la oposición total que presenta un circuito al paso de una corriente alterna. Incluye tanto la resistencia como la reactancia." },
  { term: "Reactancia (X)", definition: "Oposición al paso de la corriente alterna debida a la inductancia (reactancia inductiva) o a la capacitancia (reactancia capacitiva) en un circuito." },
  { term: "Capacitancia (C)", definition: "Capacidad de un componente (condensador) o circuito para almacenar energía en forma de carga eléctrica." },
  { term: "Inductancia (L)", definition: "Propiedad de un conductor eléctrico por la cual un cambio en la corriente que fluye a través de él induce una fuerza electromotriz (voltaje) tanto en el propio conductor (autoinductancia) como en cualquier conductor cercano (inductancia mutua)." },
  { term: "Puesta a Tierra (Grounding)", definition: "Conexión eléctrica deliberada de un equipo o sistema a la tierra, generalmente para fines de seguridad y para proporcionar un punto de referencia de voltaje." },
  { term: "Circuito Derivado (Branch Circuit)", definition: "Conductores de un circuito entre el dispositivo final de protección contra sobrecorriente y la(s) salida(s)." },
  { term: "Disyuntor (Circuit Breaker)", definition: "Dispositivo de protección contra sobrecorriente que interrumpe automáticamente un circuito eléctrico para prevenir daños por sobrecarga o cortocircuito. Puede ser rearmado." },
  { term: "Fusible (Fuse)", definition: "Dispositivo de protección contra sobrecorriente con un conductor que se derrite e interrumpe el circuito cuando la corriente excede un valor determinado. Debe ser reemplazado después de operar." },
  { term: "Transformador", definition: "Dispositivo eléctrico que transfiere energía eléctrica de un circuito a otro a través de conductores acoplados inductivamente. Se utiliza comúnmente para aumentar (elevar) o disminuir (reducir) voltajes de CA." },
  { term: "Ley de Ohm", definition: "Establece que la corriente (I) a través de un conductor entre dos puntos es directamente proporcional al voltaje (V) a través de los dos puntos e inversamente proporcional a la resistencia (R) entre ellos. (V = I * R)" },
  { term: "Factor de Potencia", definition: "Relación entre la potencia activa (real) utilizada en un circuito y la potencia aparente (total) suministrada al circuito. Un factor de potencia de 1 (unidad) indica la máxima eficiencia." },
];

const DictionaryDB = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeItems, setActiveItems] = useState([]);

  const filteredData = dictionaryData.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diccionario de Términos Eléctricos</CardTitle>
        <CardDescription>Encuentra definiciones claras de términos comunes en el campo de la electricidad.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Buscar término..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        {filteredData.length > 0 ? (
          <Accordion type="multiple" value={activeItems} onValueChange={setActiveItems} className="w-full">
            <AnimatePresence initial={false}>
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <AccordionItem value={item.term}>
                    <AccordionTrigger>{item.term}</AccordionTrigger>
                    <AccordionContent>
                      {item.definition}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center">No se encontraron términos que coincidan con su búsqueda.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DictionaryDB;