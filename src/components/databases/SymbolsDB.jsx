import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ToggleLeft, Zap, AlertTriangle, ShieldCheck, RadioTower, BatteryCharging, Thermometer, Wind } from "lucide-react";

const symbolsData = [
  { name: "Resistencia", symbol: "R", description: "Componente que se opone al paso de la corriente eléctrica.", icon: <div className="w-8 h-2 border-2 border-foreground inline-block align-middle box-content p-1"><svg viewBox="0 0 80 20" className="stroke-foreground stroke-2 fill-none"><polyline points="0,10 10,10 15,0 25,20 35,0 45,20 50,10 60,10 "/></svg></div> },
  { name: "Condensador", symbol: "C", description: "Componente que almacena energía en un campo eléctrico.", icon: <div className="w-8 h-6 border-0 border-foreground inline-block align-middle"><svg viewBox="0 0 30 30" className="stroke-foreground stroke-2 fill-none"><path d="M5 15 L12 15 M18 15 L25 15 M12 5 L12 25 M18 5 L18 25"/></svg></div> },
  { name: "Bobina / Inductor", symbol: "L", description: "Componente que almacena energía en un campo magnético.", icon: <div className="w-8 h-4 border-0 border-foreground inline-block align-middle"><svg viewBox="0 0 80 20" className="stroke-foreground stroke-2 fill-none"><path d="M5 10 Q 15 0, 25 10 T 45 10 T 65 10 L75 10"/></svg></div> },
  { name: "Fuente de Voltaje DC", symbol: "V", description: "Proporciona un voltaje de corriente continua constante.", icon: <div className="w-8 h-8 border-2 border-foreground rounded-full inline-flex items-center justify-center text-lg font-bold">V</div> },
  { name: "Fuente de Corriente AC", symbol: "I", description: "Proporciona una corriente alterna.", icon: <div className="w-8 h-8 border-2 border-foreground rounded-full inline-flex items-center justify-center"><svg viewBox="0 0 20 20" className="stroke-foreground stroke-1 fill-none w-4 h-4"><path d="M2 10 Q5 2, 10 10 T18 10"/></svg></div> },
  { name: "Interruptor (Abierto)", symbol: "SW", description: "Dispositivo para abrir o cerrar un circuito.", icon: <ToggleLeft className="h-8 w-8 text-foreground" /> },
  { name: "Lámpara / Bombilla", symbol: "", description: "Dispositivo que produce luz.", icon: <Lightbulb className="h-8 w-8 text-foreground" /> },
  { name: "Motor", symbol: "M", description: "Convierte energía eléctrica en mecánica.", icon: <Zap className="h-8 w-8 text-foreground" /> },
  { name: "Toma de Tierra", symbol: "GND", description: "Conexión a tierra para seguridad.", icon: <div className="w-8 h-6 border-0 border-foreground inline-block align-middle"><svg viewBox="0 0 30 30" className="stroke-foreground stroke-2 fill-none"><path d="M15 5 L15 15 M5 15 L25 15 M8 19 L22 19 M11 23 L19 23"/></svg></div> },
  { name: "Diodo", symbol: "D", description: "Permite el paso de corriente en una dirección.", icon: <div className="w-8 h-6 border-0 border-foreground inline-block align-middle"><svg viewBox="0 0 40 30" className="stroke-foreground stroke-2 fill-none"><path d="M5 15 L15 15 L25 5 L25 25 Z M25 15 L35 15"/></svg></div> },
  { name: "Transistor NPN", symbol: "Q", description: "Dispositivo semiconductor para amplificar o conmutar señales.", icon: <ShieldCheck className="h-8 w-8 text-foreground" /> },
  { name: "Antena", symbol: "", description: "Dispositivo para transmitir o recibir ondas electromagnéticas.", icon: <RadioTower className="h-8 w-8 text-foreground" /> },
  { name: "Batería", symbol: "", description: "Fuente de energía eléctrica DC.", icon: <BatteryCharging className="h-8 w-8 text-foreground" /> },
  { name: "Termistor", symbol: "", description: "Resistencia que varía con la temperatura.", icon: <Thermometer className="h-8 w-8 text-foreground" /> },
  { name: "Fusible", symbol: "F", description: "Dispositivo de protección contra sobrecorriente.", icon: <AlertTriangle className="h-8 w-8 text-foreground" /> },
];

const SymbolsDB = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Símbolos Eléctricos Comunes</CardTitle>
        <CardDescription>Glosario visual de símbolos utilizados en diagramas eléctricos y electrónicos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {symbolsData.map((symbolItem) => (
            <Card key={symbolItem.name} className="flex flex-col items-center justify-center p-4 text-center">
              <div className="h-12 w-12 flex items-center justify-center mb-3">
                {symbolItem.icon}
              </div>
              <p className="font-semibold text-sm">{symbolItem.name}</p>
              {symbolItem.symbol && <p className="text-xs text-muted-foreground">Símbolo: {symbolItem.symbol}</p>}
              <p className="text-xs text-muted-foreground mt-1">{symbolItem.description}</p>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolsDB;