import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2, FileText, DollarSign, Percent, Check, Edit3, Save, X, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";


const initialItem = { id: Date.now(), description: "", quantity: 1, unitPrice: 0, total: 0 };

const QuoteGenerator = () => {
  const { toast } = useToast();
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("quoteItems");
    return savedItems ? JSON.parse(savedItems) : [initialItem];
  });
  const [clientInfo, setClientInfo] = useState(() => {
    const savedClientInfo = localStorage.getItem("quoteClientInfo");
    return savedClientInfo ? JSON.parse(savedClientInfo) : { name: "", address: "", email: "", phone: "" };
  });
  const [quoteDetails, setQuoteDetails] = useState(() => {
    const savedQuoteDetails = localStorage.getItem("quoteDetails");
    return savedQuoteDetails ? JSON.parse(savedQuoteDetails) : { quoteNumber: `Q-${new Date().getFullYear()}-001`, date: new Date().toISOString().split('T')[0], validUntil: ""};
  });
  const [taxRate, setTaxRate] = useState(() => {
    const savedTaxRate = localStorage.getItem("quoteTaxRate");
    return savedTaxRate ? parseFloat(savedTaxRate) : 10; 
  });
  const [discount, setDiscount] = useState(() => {
    const savedDiscount = localStorage.getItem("quoteDiscount");
    return savedDiscount ? parseFloat(savedDiscount) : 0;
  });
  const [discountType, setDiscountType] = useState(() => {
    const savedDiscountType = localStorage.getItem("quoteDiscountType");
    return savedDiscountType ? savedDiscountType : "percentage";
  }); // 'percentage' or 'fixed'
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("quoteNotes");
    return savedNotes ? savedNotes : "Gracias por su confianza. Este presupuesto es válido por 30 días.";
  });
  const [companyInfo, setCompanyInfo] = useState(() => {
    const savedCompanyInfo = localStorage.getItem("quoteCompanyInfo");
    return savedCompanyInfo ? JSON.parse(savedCompanyInfo) : { name: "Mi Empresa Eléctrica S.L.", address: "Calle Falsa 123, Ciudad", cif: "B12345678", email: "contacto@miempresa.com", phone: "900 123 123" };
  });
  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);


  useEffect(() => {
    localStorage.setItem("quoteItems", JSON.stringify(items));
    localStorage.setItem("quoteClientInfo", JSON.stringify(clientInfo));
    localStorage.setItem("quoteDetails", JSON.stringify(quoteDetails));
    localStorage.setItem("quoteTaxRate", taxRate.toString());
    localStorage.setItem("quoteDiscount", discount.toString());
    localStorage.setItem("quoteDiscountType", discountType);
    localStorage.setItem("quoteNotes", notes);
    localStorage.setItem("quoteCompanyInfo", JSON.stringify(companyInfo));
  }, [items, clientInfo, quoteDetails, taxRate, discount, discountType, notes, companyInfo]);

  const handleItemChange = (id, field, value) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            newItem.quantity = Math.max(0, parseFloat(newItem.quantity) || 0);
            newItem.unitPrice = Math.max(0, parseFloat(newItem.unitPrice) || 0);
            newItem.total = newItem.quantity * newItem.unitPrice;
          }
          return newItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    setItems([...items, { ...initialItem, id: Date.now() }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast({
        title: "Acción no permitida",
        description: "Debe haber al menos un ítem en el presupuesto.",
        variant: "destructive",
      });
    }
  };
  
  const handleClientInfoChange = (field, value) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteDetailsChange = (field, value) => {
    setQuoteDetails(prev => ({ ...prev, [field]: value }));
  };
  
  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  
  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = (subtotal * discount) / 100;
  } else {
    discountAmount = Math.min(discount, subtotal); // Discount cannot be more than subtotal
  }

  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * taxRate) / 100;
  const total = subtotalAfterDiscount + taxAmount;

  const generatePDF = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La generación de PDF estará disponible próximamente.",
    });
  };

  const resetQuote = () => {
    setItems([initialItem]);
    setClientInfo({ name: "", address: "", email: "", phone: "" });
    setQuoteDetails({ quoteNumber: `Q-${new Date().getFullYear()}-001`, date: new Date().toISOString().split('T')[0], validUntil: ""});
    setTaxRate(10);
    setDiscount(0);
    setDiscountType("percentage");
    setNotes("Gracias por su confianza. Este presupuesto es válido por 30 días.");
    toast({
      title: "Presupuesto Reiniciado",
      description: "Todos los campos han sido restaurados a sus valores por defecto.",
    });
  };

  const saveCompanyInfo = () => {
    setIsEditingCompanyInfo(false);
    toast({
      title: "Información Guardada",
      description: "Los datos de tu empresa han sido actualizados.",
      action: <Check className="h-5 w-5 text-green-500" />,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center"><FileText className="mr-3 h-8 w-8 text-primary" />Generador de Presupuestos</CardTitle>
              <CardDescription>Crea presupuestos profesionales para tus clientes de forma rápida y sencilla.</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={() => setIsEditingCompanyInfo(true)} title="Configurar datos de la empresa">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <AnimatePresence>
        {isEditingCompanyInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Información de tu Empresa</CardTitle>
                <CardDescription>Estos datos aparecerán en tus presupuestos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Nombre de la Empresa</Label>
                    <Input id="companyName" value={companyInfo.name} onChange={(e) => handleCompanyInfoChange("name", e.target.value)} placeholder="Ej: Electricidad Acme S.L."/>
                  </div>
                  <div>
                    <Label htmlFor="companyCif">CIF/NIF</Label>
                    <Input id="companyCif" value={companyInfo.cif} onChange={(e) => handleCompanyInfoChange("cif", e.target.value)} placeholder="Ej: B12345678"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyAddress">Dirección</Label>
                  <Input id="companyAddress" value={companyInfo.address} onChange={(e) => handleCompanyInfoChange("address", e.target.value)} placeholder="Ej: Calle Falsa 123, 08001 Barcelona"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyEmail">Email de Contacto</Label>
                    <Input type="email" id="companyEmail" value={companyInfo.email} onChange={(e) => handleCompanyInfoChange("email", e.target.value)} placeholder="Ej: contacto@empresa.com"/>
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Teléfono</Label>
                    <Input type="tel" id="companyPhone" value={companyInfo.phone} onChange={(e) => handleCompanyInfoChange("phone", e.target.value)} placeholder="Ej: +34 900 123 456"/>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditingCompanyInfo(false)}><X className="mr-2 h-4 w-4" />Cancelar</Button>
                <Button onClick={saveCompanyInfo} variant="gradient"><Save className="mr-2 h-4 w-4" />Guardar Empresa</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Detalles del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nombre del Cliente</Label>
                  <Input id="clientName" value={clientInfo.name} onChange={(e) => handleClientInfoChange("name", e.target.value)} placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input type="email" id="clientEmail" value={clientInfo.email} onChange={(e) => handleClientInfoChange("email", e.target.value)} placeholder="Ej: juan.perez@cliente.com"/>
                </div>
              </div>
              <div>
                <Label htmlFor="clientAddress">Dirección</Label>
                <Input id="clientAddress" value={clientInfo.address} onChange={(e) => handleClientInfoChange("address", e.target.value)} placeholder="Ej: Av. Principal 456, Ciudad" />
              </div>
              <div>
                <Label htmlFor="clientPhone">Teléfono</Label>
                <Input type="tel" id="clientPhone" value={clientInfo.phone} onChange={(e) => handleClientInfoChange("phone", e.target.value)} placeholder="Ej: +34 600 123 123" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ítems del Presupuesto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="p-4 border rounded-lg space-y-3 bg-muted/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Ítem #{index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive-hover">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`description-${item.id}`}>Descripción</Label>
                    <Input 
                      id={`description-${item.id}`} 
                      value={item.description} 
                      onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                      placeholder="Ej: Instalación de punto de luz"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`quantity-${item.id}`}>Cantidad</Label>
                      <Input 
                        id={`quantity-${item.id}`} 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unitPrice-${item.id}`}>Precio Unit.</Label>
                      <Input 
                        id={`unitPrice-${item.id}`} 
                        type="number" 
                        value={item.unitPrice} 
                        onChange={(e) => handleItemChange(item.id, "unitPrice", e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label>Total Ítem</Label>
                      <Input type="text" value={item.total.toFixed(2) + " €"} disabled className="font-semibold"/>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Button onClick={addItem} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Añadir Ítem
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Detalles del Presupuesto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="quoteNumber">Nº Presupuesto</Label>
                <Input id="quoteNumber" value={quoteDetails.quoteNumber} onChange={(e) => handleQuoteDetailsChange("quoteNumber", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="quoteDate">Fecha</Label>
                <Input type="date" id="quoteDate" value={quoteDetails.date} onChange={(e) => handleQuoteDetailsChange("date", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="quoteValidUntil">Válido Hasta</Label>
                <Input type="date" id="quoteValidUntil" value={quoteDetails.validUntil} onChange={(e) => handleQuoteDetailsChange("validUntil", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Resumen y Totales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">{subtotal.toFixed(2)} €</span>
              </div>
              
              <div className="space-y-2">
                <Label>Descuento</Label>
                <div className="flex gap-2">
                    <Input 
                      type="number" 
                      value={discount} 
                      onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="flex-grow"
                      min="0"
                    />
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">€</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {discountAmount > 0 && (
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">Descuento Aplicado:</span>
                     <span className="font-semibold text-green-600">- {discountAmount.toFixed(2)} €</span>
                   </div>
                )}
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal (con desc.):</span>
                <span className="font-semibold">{subtotalAfterDiscount.toFixed(2)} €</span>
              </div>
              
              <div>
                <Label htmlFor="taxRate">IVA (%)</Label>
                <Input 
                    id="taxRate" 
                    type="number" 
                    value={taxRate} 
                    onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    min="0"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA ({taxRate}%):</span>
                <span className="font-semibold">{taxAmount.toFixed(2)} €</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-primary">
                <span>TOTAL:</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Notas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="4"
                className="w-full p-2 border rounded-md text-sm bg-background focus:ring-primary focus:border-primary"
                placeholder="Ej: Condiciones de pago, garantía, etc."
              ></textarea>
            </CardContent>
          </Card>
          
          <div className="space-y-3 pt-4">
            <Button onClick={generatePDF} size="lg" className="w-full" variant="gradient">
              <DollarSign className="mr-2 h-5 w-5" /> Generar PDF del Presupuesto
            </Button>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="w-full">
                  <Trash2 className="mr-2 h-5 w-5" /> Reiniciar Presupuesto
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-destructive"/>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción borrará todos los datos del presupuesto actual (ítems, cliente, etc.) y los restaurará a los valores por defecto. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={resetQuote} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    Sí, Reiniciar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteGenerator;