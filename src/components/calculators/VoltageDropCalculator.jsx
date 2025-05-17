import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const VoltageDropCalculator = () => {
  const [material, setMaterial] = useState("copper");
  const [wireSize, setWireSize] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [distance, setDistance] = useState("");
  const [numPhases, setNumPhases] = useState("1");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const wireResistivity = { 
    copper: 0.0171, 
    aluminum: 0.0282 
  }; 
  
  const wireSizesAWG = {
    "14": 2.08, "12": 3.31, "10": 5.26, "8": 8.37, "6": 13.3, "4": 21.15, "2": 33.62, "1/0": 53.48, "2/0": 67.43, "3/0": 85.01, "4/0": 107.2
  };

  const calculateVoltageDrop = () => {
    setError("");
    setResult(null);

    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const area = wireSizesAWG[wireSize];
    const rho = wireResistivity[material];
    const phases = parseInt(numPhases);

    if (isNaN(V) || isNaN(I) || isNaN(L) || !area || !rho || isNaN(phases)) {
      setError("Por favor, introduce valores válidos en todos los campos.");
      return;
    }
    if (V <= 0 || I <= 0 || L <= 0) {
      setError("Voltaje, corriente y distancia deben ser mayores que cero.");
      return;
    }

    let voltageDrop;
    if (phases === 1) {
      voltageDrop = (2 * rho * L * I) / area;
    } else if (phases === 3) {
      voltageDrop = (Math.sqrt(3) * rho * L * I) / area;
    } else {
      setError("Número de fases no válido.");
      return;
    }
    
    const percentageDrop = (voltageDrop / V) * 100;

    setResult({
      voltageDrop: voltageDrop.toFixed(2),
      percentageDrop: percentageDrop.toFixed(2),
      finalVoltage: (V - voltageDrop).toFixed(2)
    });
  };
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Caída de Tensión</CardTitle>
        <CardDescription>Calcula la caída de tensión en un circuito eléctrico según la NEC.</CardDescription>
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
            <Label htmlFor="material">Material del Conductor</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger id="material" className="calculator-select">
                <SelectValue placeholder="Selecciona material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copper">Cobre</SelectItem>
                <SelectItem value="aluminum">Aluminio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="wireSize">Calibre del Cable (AWG)</Label>
            <Select value={wireSize} onValueChange={setWireSize}>
              <SelectTrigger id="wireSize" className="calculator-select">
                <SelectValue placeholder="Selecciona calibre" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(wireSizesAWG).map(size => (
                  <SelectItem key={size} value={size}>{size} AWG</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="voltage">Voltaje (V)</Label>
            <Input id="voltage" type="number" placeholder="Ej: 120" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="current">Corriente (A)</Label>
            <Input id="current" type="number" placeholder="Ej: 15" value={current} onChange={(e) => setCurrent(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="distance">Distancia (metros)</Label>
            <Input id="distance" type="number" placeholder="Ej: 30" value={distance} onChange={(e) => setDistance(e.target.value)} className="calculator-input" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="numPhases">Número de Fases</Label>
            <Select value={numPhases} onValueChange={setNumPhases}>
              <SelectTrigger id="numPhases" className="calculator-select">
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
            <p>Caída de Tensión: <span className="calculator-result-value">{result.voltageDrop} V</span></p>
            <p>Porcentaje de Caída: <span className="calculator-result-value">{result.percentageDrop} %</span></p>
            <p>Voltaje Final Estimado: <span className="calculator-result-value">{result.finalVoltage} V</span></p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateVoltageDrop} className="w-full md:w-auto">Calcular</Button>
      </CardFooter>
    </Card>
  );
};

export default VoltageDropCalculator;