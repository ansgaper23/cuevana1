import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WireGaugeCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [distance, setDistance] = useState("");
  const [material, setMaterial] = useState("copper");
  const [voltageDropPercentage, setVoltageDropPercentage] = useState("3"); 
  const [numPhases, setNumPhases] = useState("1");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const wireResistivity = { copper: 0.0171, aluminum: 0.0282 };
  const standardAWGSizes = [
    { awg: "14", area: 2.08, ampacityCopper75C: 15, ampacityAluminum75C: null },
    { awg: "12", area: 3.31, ampacityCopper75C: 20, ampacityAluminum75C: 15 },
    { awg: "10", area: 5.26, ampacityCopper75C: 30, ampacityAluminum75C: 25 },
    { awg: "8", area: 8.37, ampacityCopper75C: 50, ampacityAluminum75C: 40 },
    { awg: "6", area: 13.3, ampacityCopper75C: 65, ampacityAluminum75C: 50 },
    { awg: "4", area: 21.15, ampacityCopper75C: 85, ampacityAluminum75C: 65 },
    { awg: "3", area: 26.67, ampacityCopper75C: 100, ampacityAluminum75C: 75 },
    { awg: "2", area: 33.62, ampacityCopper75C: 115, ampacityAluminum75C: 90 },
    { awg: "1", area: 42.41, ampacityCopper75C: 130, ampacityAluminum75C: 100 },
    { awg: "1/0", area: 53.48, ampacityCopper75C: 150, ampacityAluminum75C: 120 },
    { awg: "2/0", area: 67.43, ampacityCopper75C: 175, ampacityAluminum75C: 135 },
    { awg: "3/0", area: 85.01, ampacityCopper75C: 200, ampacityAluminum75C: 155 },
    { awg: "4/0", area: 107.2, ampacityCopper75C: 230, ampacityAluminum75C: 180 },
  ];

  const calculateWireGauge = () => {
    setError("");
    setResult(null);

    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const maxVDPercentage = parseFloat(voltageDropPercentage) / 100;
    const rho = wireResistivity[material];
    const phases = parseInt(numPhases);

    if (isNaN(V) || isNaN(I) || isNaN(L) || isNaN(maxVDPercentage) || !rho || isNaN(phases)) {
      setError("Por favor, introduce valores válidos en todos los campos.");
      return;
    }
    if (V <= 0 || I <= 0 || L <= 0 || maxVDPercentage <=0) {
      setError("Voltaje, corriente, distancia y % de caída de tensión deben ser mayores que cero.");
      return;
    }

    const maxVD = V * maxVDPercentage;
    
    let requiredArea;
    if (phases === 1) {
      requiredArea = (2 * rho * L * I) / maxVD;
    } else if (phases === 3) {
      requiredArea = (Math.sqrt(3) * rho * L * I) / maxVD;
    } else {
      setError("Número de fases no válido.");
      return;
    }

    let suitableWire = null;
    for (const wire of standardAWGSizes.sort((a,b) => a.area - b.area)) {
      const ampacity = material === "copper" ? wire.ampacityCopper75C : wire.ampacityAluminum75C;
      if (wire.area >= requiredArea && ampacity && I <= ampacity) {
        suitableWire = wire;
        break;
      }
    }

    if (suitableWire) {
      setResult({
        awg: suitableWire.awg,
        area: suitableWire.area.toFixed(2),
        requiredArea: requiredArea.toFixed(2),
        ampacity: material === "copper" ? suitableWire.ampacityCopper75C : suitableWire.ampacityAluminum75C
      });
    } else {
      setError("No se encontró un calibre de cable estándar adecuado para los parámetros dados o la corriente excede la ampacidad. Considera aumentar el % de caída de tensión o dividir la carga.");
    }
  };
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Calibre de Cable</CardTitle>
        <CardDescription>Determina el calibre de cable AWG mínimo según la caída de tensión y ampacidad.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="calculator-input-group">
            <Label htmlFor="voltage-wg">Voltaje (V)</Label>
            <Input id="voltage-wg" type="number" placeholder="Ej: 240" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="current-wg">Corriente (A)</Label>
            <Input id="current-wg" type="number" placeholder="Ej: 20" value={current} onChange={(e) => setCurrent(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="distance-wg">Distancia (metros)</Label>
            <Input id="distance-wg" type="number" placeholder="Ej: 50" value={distance} onChange={(e) => setDistance(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="material-wg">Material del Conductor</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger id="material-wg" className="calculator-select">
                <SelectValue placeholder="Selecciona material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copper">Cobre</SelectItem>
                <SelectItem value="aluminum">Aluminio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="voltageDropPercentage-wg">Caída de Tensión Máxima (%)</Label>
            <Select value={voltageDropPercentage} onValueChange={setVoltageDropPercentage}>
              <SelectTrigger id="voltageDropPercentage-wg" className="calculator-select">
                <SelectValue placeholder="Selecciona %" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2%</SelectItem>
                <SelectItem value="3">3% (Recomendado)</SelectItem>
                <SelectItem value="4">4%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="numPhases-wg">Número de Fases</Label>
            <Select value={numPhases} onValueChange={setNumPhases}>
              <SelectTrigger id="numPhases-wg" className="calculator-select">
                <SelectValue placeholder="Selecciona fases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Monofásico</SelectItem>
                <SelectItem value="3">Trifásico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="calculator-result"
          >
            <p>Calibre de Cable Recomendado (AWG): <span className="calculator-result-value">{result.awg}</span></p>
            <p>Área del conductor: <span className="calculator-result-value">{result.area} mm²</span></p>
            <p>Área mínima requerida por caída de tensión: <span className="calculator-result-value">{result.requiredArea} mm²</span></p>
            <p>Ampacidad del cable seleccionado (75°C): <span className="calculator-result-value">{result.ampacity} A</span></p>
            <Alert className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Nota Importante</AlertTitle>
              <AlertDescription>
                Este cálculo es una estimación. Siempre consulta los códigos eléctricos locales y considera factores adicionales como temperatura ambiente, agrupamiento de cables y tipo de instalación.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateWireGauge} className="w-full md:w-auto">Calcular Calibre</Button>
      </CardFooter>
    </Card>
  );
};

export default WireGaugeCalculator;