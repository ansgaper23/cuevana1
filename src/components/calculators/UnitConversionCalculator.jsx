import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRightLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const unitCategories = {
  length: {
    name: "Longitud",
    units: {
      meter: { name: "Metro (m)", factor: 1 },
      kilometer: { name: "Kilómetro (km)", factor: 1000 },
      centimeter: { name: "Centímetro (cm)", factor: 0.01 },
      millimeter: { name: "Milímetro (mm)", factor: 0.001 },
      inch: { name: "Pulgada (in)", factor: 0.0254 },
      foot: { name: "Pie (ft)", factor: 0.3048 },
      yard: { name: "Yarda (yd)", factor: 0.9144 },
      mile: { name: "Milla (mi)", factor: 1609.34 },
    },
  },
  power: {
    name: "Potencia",
    units: {
      watt: { name: "Vatio (W)", factor: 1 },
      kilowatt: { name: "Kilovatio (kW)", factor: 1000 },
      megawatt: { name: "Megavatio (MW)", factor: 1000000 },
      hp: { name: "Caballo de Fuerza (hp)", factor: 745.7 },
      btu_hr: { name: "BTU/hora", factor: 0.293071 },
    },
  },
  energy: {
    name: "Energía",
    units: {
      joule: { name: "Julio (J)", factor: 1 },
      kilojoule: { name: "Kilojulio (kJ)", factor: 1000 },
      kwh: { name: "Kilovatio-hora (kWh)", factor: 3600000 },
      btu: { name: "BTU", factor: 1055.06 },
      calorie: { name: "Caloría (cal)", factor: 4.184 },
    },
  },
  voltage: {
    name: "Voltaje",
    units: {
        volt: { name: "Voltio (V)", factor: 1 },
        kilovolt: { name: "Kilovoltio (kV)", factor: 1000 },
        millivolt: { name: "Milivoltio (mV)", factor: 0.001 },
    }
  },
  current: {
    name: "Corriente",
    units: {
        ampere: { name: "Amperio (A)", factor: 1 },
        kiloampere: { name: "Kiloamperio (kA)", factor: 1000 },
        milliampere: { name: "Miliamperio (mA)", factor: 0.001 },
    }
  }
};

const UnitConversionCalculator = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState(Object.keys(unitCategories.length.units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(unitCategories.length.units)[1]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setFromUnit(Object.keys(unitCategories[category].units)[0]);
    setToUnit(Object.keys(unitCategories[category].units)[1]);
    setInputValue("");
    setResult(null);
  }, [category]);

  const handleConvert = () => {
    setError("");
    setResult(null);
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError("Por favor, introduce un valor numérico válido.");
      return;
    }

    const fromFactor = unitCategories[category].units[fromUnit].factor;
    const toFactor = unitCategories[category].units[toUnit].factor;
    
    const valueInBaseUnit = value * fromFactor;
    const convertedValue = valueInBaseUnit / toFactor;

    setResult(convertedValue.toPrecision(5));
  };
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const currentUnits = unitCategories[category].units;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversor de Unidades</CardTitle>
        <CardDescription>Convierte fácilmente entre diferentes unidades eléctricas y de medida.</CardDescription>
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
        <div className="calculator-input-group">
          <Label htmlFor="category">Categoría de Unidad</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category" className="calculator-select">
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(unitCategories).map(catKey => (
                <SelectItem key={catKey} value={catKey}>{unitCategories[catKey].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="calculator-input-group">
            <Label htmlFor="fromUnit">Desde</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnit" className="calculator-select">
                <SelectValue placeholder="Unidad origen" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(currentUnits).map(unitKey => (
                  <SelectItem key={unitKey} value={unitKey}>{currentUnits[unitKey].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-end h-full pt-6">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="calculator-input-group">
            <Label htmlFor="toUnit">Hasta</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnit" className="calculator-select">
                <SelectValue placeholder="Unidad destino" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(currentUnits).map(unitKey => (
                  <SelectItem key={unitKey} value={unitKey}>{currentUnits[unitKey].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="calculator-input-group">
          <Label htmlFor="inputValue">Valor a Convertir</Label>
          <Input id="inputValue" type="number" placeholder="Introduce valor" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="calculator-input" />
        </div>
        {result !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="calculator-result"
          >
            <p>Resultado: <span className="calculator-result-value">{result} {currentUnits[toUnit]?.name.split(" (")[0]}</span></p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConvert} className="w-full md:w-auto">Convertir</Button>
      </CardFooter>
    </Card>
  );
};

export default UnitConversionCalculator;