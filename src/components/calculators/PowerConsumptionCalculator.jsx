import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PowerConsumptionCalculator = () => {
  const [devices, setDevices] = useState([{ name: "", power: "", hours: "" }]);
  const [costPerKWh, setCostPerKWh] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleDeviceChange = (index, field, value) => {
    const newDevices = [...devices];
    newDevices[index][field] = value;
    setDevices(newDevices);
  };

  const addDevice = () => {
    setDevices([...devices, { name: "", power: "", hours: "" }]);
  };

  const removeDevice = (index) => {
    const newDevices = devices.filter((_, i) => i !== index);
    setDevices(newDevices);
  };

  const calculatePowerConsumption = () => {
    setError("");
    setResult(null);
    let totalKWh = 0;
    let validInputs = true;

    if (devices.some(d => d.name.trim() === "" || isNaN(parseFloat(d.power)) || parseFloat(d.power) <= 0 || isNaN(parseFloat(d.hours)) || parseFloat(d.hours) <= 0)) {
        setError("Por favor, introduce valores válidos para todos los aparatos (nombre, potencia > 0, horas > 0).");
        validInputs = false;
        return;
    }
    
    if (costPerKWh !== "" && (isNaN(parseFloat(costPerKWh)) || parseFloat(costPerKWh) < 0)) {
        setError("El costo por kWh debe ser un número válido y no negativo.");
        validInputs = false;
        return;
    }


    devices.forEach(device => {
      const powerWatts = parseFloat(device.power);
      const hoursPerDay = parseFloat(device.hours);
      if (!isNaN(powerWatts) && !isNaN(hoursPerDay) && powerWatts > 0 && hoursPerDay > 0) {
        totalKWh += (powerWatts / 1000) * hoursPerDay;
      } else {
        validInputs = false;
      }
    });

    if (!validInputs) {
      setError("Algunos valores de los aparatos no son válidos. Por favor, revisa la potencia y las horas.");
      return;
    }

    const cost = parseFloat(costPerKWh);
    const dailyCost = !isNaN(cost) && cost >= 0 ? totalKWh * cost : null;
    const monthlyKWh = totalKWh * 30;
    const monthlyCost = dailyCost !== null ? dailyCost * 30 : null;

    setResult({
      dailyKWh: totalKWh.toFixed(2),
      monthlyKWh: monthlyKWh.toFixed(2),
      dailyCost: dailyCost !== null ? dailyCost.toFixed(2) : "N/A",
      monthlyCost: monthlyCost !== null ? monthlyCost.toFixed(2) : "N/A",
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
        <CardTitle>Calculadora de Consumo de Energía</CardTitle>
        <CardDescription>Estima el consumo de energía diario y mensual de tus aparatos eléctricos y su costo.</CardDescription>
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
        {devices.map((device, index) => (
          <motion.div 
            key={index} 
            className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end p-3 border rounded-md"
            initial={{ opacity: 0, y:10 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="calculator-input-group md:col-span-2">
              <Label htmlFor={`device-name-${index}`}>Aparato {index + 1}</Label>
              <Input id={`device-name-${index}`} type="text" placeholder="Ej: Refrigerador" value={device.name} onChange={(e) => handleDeviceChange(index, "name", e.target.value)} />
            </div>
            <div className="calculator-input-group">
              <Label htmlFor={`device-power-${index}`}>Potencia (Watts)</Label>
              <Input id={`device-power-${index}`} type="number" placeholder="Ej: 150" value={device.power} onChange={(e) => handleDeviceChange(index, "power", e.target.value)} />
            </div>
            <div className="calculator-input-group">
              <Label htmlFor={`device-hours-${index}`}>Horas/Día</Label>
              <div className="flex items-center gap-2">
                <Input id={`device-hours-${index}`} type="number" placeholder="Ej: 8" value={device.hours} onChange={(e) => handleDeviceChange(index, "hours", e.target.value)} />
                {devices.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeDevice(index)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <Button variant="outline" onClick={addDevice} className="w-full md:w-auto">Añadir Aparato</Button>
        
        <div className="calculator-input-group pt-4">
          <Label htmlFor="cost-kwh">Costo por kWh (Opcional, ej: 0.15)</Label>
          <Input id="cost-kwh" type="number" placeholder="Ej: 0.15" value={costPerKWh} onChange={(e) => setCostPerKWh(e.target.value)} className="calculator-input" />
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="calculator-result"
          >
            <p>Consumo Diario Estimado: <span className="calculator-result-value">{result.dailyKWh} kWh</span></p>
            <p>Consumo Mensual Estimado: <span className="calculator-result-value">{result.monthlyKWh} kWh</span></p>
            {result.dailyCost !== "N/A" && <p>Costo Diario Estimado: <span className="calculator-result-value">${result.dailyCost}</span></p>}
            {result.monthlyCost !== "N/A" && <p>Costo Mensual Estimado: <span className="calculator-result-value">${result.monthlyCost}</span></p>}
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculatePowerConsumption} className="w-full md:w-auto">Calcular Consumo</Button>
      </CardFooter>
    </Card>
  );
};

export default PowerConsumptionCalculator;