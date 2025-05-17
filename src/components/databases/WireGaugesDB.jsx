import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const wireData = [
  { awg: "14", diameter_mm: 1.63, area_mm2: 2.08, resistance_ohm_km_copper: 8.28, resistance_ohm_km_aluminum: 13.6, ampacity_copper_75C: 15, ampacity_aluminum_75C: null },
  { awg: "12", diameter_mm: 2.05, area_mm2: 3.31, resistance_ohm_km_copper: 5.21, resistance_ohm_km_aluminum: 8.56, ampacity_copper_75C: 20, ampacity_aluminum_75C: 15 },
  { awg: "10", diameter_mm: 2.59, area_mm2: 5.26, resistance_ohm_km_copper: 3.28, resistance_ohm_km_aluminum: 5.38, ampacity_copper_75C: 30, ampacity_aluminum_75C: 25 },
  { awg: "8", diameter_mm: 3.26, area_mm2: 8.37, resistance_ohm_km_copper: 2.06, resistance_ohm_km_aluminum: 3.38, ampacity_copper_75C: 50, ampacity_aluminum_75C: 40 },
  { awg: "6", diameter_mm: 4.12, area_mm2: 13.3, resistance_ohm_km_copper: 1.30, resistance_ohm_km_aluminum: 2.13, ampacity_copper_75C: 65, ampacity_aluminum_75C: 50 },
  { awg: "4", diameter_mm: 5.19, area_mm2: 21.15, resistance_ohm_km_copper: 0.815, resistance_ohm_km_aluminum: 1.34, ampacity_copper_75C: 85, ampacity_aluminum_75C: 65 },
  { awg: "2", diameter_mm: 6.54, area_mm2: 33.62, resistance_ohm_km_copper: 0.513, resistance_ohm_km_aluminum: 0.842, ampacity_copper_75C: 115, ampacity_aluminum_75C: 90 },
  { awg: "1/0", diameter_mm: 8.25, area_mm2: 53.48, resistance_ohm_km_copper: 0.322, resistance_ohm_km_aluminum: 0.529, ampacity_copper_75C: 150, ampacity_aluminum_75C: 120 },
  { awg: "2/0", diameter_mm: 9.27, area_mm2: 67.43, resistance_ohm_km_copper: 0.255, resistance_ohm_km_aluminum: 0.419, ampacity_copper_75C: 175, ampacity_aluminum_75C: 135 },
  { awg: "3/0", diameter_mm: 10.4, area_mm2: 85.01, resistance_ohm_km_copper: 0.202, resistance_ohm_km_aluminum: 0.332, ampacity_copper_75C: 200, ampacity_aluminum_75C: 155 },
  { awg: "4/0", diameter_mm: 11.7, area_mm2: 107.2, resistance_ohm_km_copper: 0.160, resistance_ohm_km_aluminum: 0.263, ampacity_copper_75C: 230, ampacity_aluminum_75C: 180 },
];

const WireGaugesDB = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabla de Calibres de Cable (AWG)</CardTitle>
        <CardDescription>Información detallada sobre calibres de cable comunes, incluyendo diámetro, área, resistencia y ampacidad.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>AWG</TableHead>
              <TableHead>Diámetro (mm)</TableHead>
              <TableHead>Área (mm²)</TableHead>
              <TableHead>Resistencia Cu (Ω/km)</TableHead>
              <TableHead>Resistencia Al (Ω/km)</TableHead>
              <TableHead>Ampacidad Cu 75°C (A)</TableHead>
              <TableHead>Ampacidad Al 75°C (A)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wireData.map((wire) => (
              <TableRow key={wire.awg}>
                <TableCell className="font-medium">{wire.awg}</TableCell>
                <TableCell>{wire.diameter_mm}</TableCell>
                <TableCell>{wire.area_mm2}</TableCell>
                <TableCell>{wire.resistance_ohm_km_copper}</TableCell>
                <TableCell>{wire.resistance_ohm_km_aluminum}</TableCell>
                <TableCell>{wire.ampacity_copper_75C}</TableCell>
                <TableCell>{wire.ampacity_aluminum_75C || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground mt-4">
          Nota: Los valores de ampacidad son aproximados y pueden variar según las condiciones de instalación y normativas locales. Siempre consulte la NEC y los códigos locales.
        </p>
      </CardContent>
    </Card>
  );
};

export default WireGaugesDB;