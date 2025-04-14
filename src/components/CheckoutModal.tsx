
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Mail, Calendar, LockKeyhole } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    billingCycle: string;
  } | null;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formatted = value;
    
    if (name === 'cardNumber') {
      formatted = value.replace(/\s/g, '').substring(0, 16);
      formatted = formatted.replace(/(.{4})/g, '$1 ').trim();
    }
    
    if (name === 'expiryDate') {
      formatted = value.replace(/\//g, '').substring(0, 4);
      if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
      }
    }
    
    if (name === 'cvv') {
      formatted = value.substring(0, 4);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: formatted
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.email || !formData.email.includes('@')) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else {
      
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.cardName) {
        toast({
          title: "Invalid name",
          description: "Please enter the cardholder's name",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.expiryDate || formData.expiryDate.length !== 5) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.cvv || formData.cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid security code",
          variant: "destructive"
        });
        return;
      }
      
      setIsProcessing(true);
      
   
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Purchase Successful!",
          description: `Thank you for purchasing ${product?.name}. You will receive an email with further instructions.`,
          className: "bg-darkwave-blue text-white border-darkwave-cyan"
        });
        handleReset();
        onClose();
      }, 2000);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      email: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      handleReset();
      onClose();
    }}>
      <DialogContent className="sm:max-w-[500px] bg-darkwave-navy border border-darkwave-blue/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-darkwave-light">
            {step === 1 ? "Checkout" : "Payment Information"}
          </DialogTitle>
          <DialogDescription className="text-darkwave-light/70">
            {step === 1 
              ? `You are purchasing ${product?.name} (${product?.billingCycle} plan)`
              : `Complete your purchase of ${product?.name} for $${product?.price}`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-darkwave-dark/80 border border-darkwave-blue/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-darkwave-light">{product?.name}</h3>
                  <span className="font-bold text-darkwave-cyan">${product?.price}</span>
                </div>
                <p className="text-sm text-darkwave-light/70">{product?.billingCycle} subscription</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-darkwave-light">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-darkwave-light/40" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-darkwave-dark/80 border-darkwave-blue/30 text-darkwave-light focus-visible:ring-darkwave-cyan"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-darkwave-light">Card number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-darkwave-light/40" />
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="pl-10 bg-darkwave-dark/80 border-darkwave-blue/30 text-darkwave-light focus-visible:ring-darkwave-cyan"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardName" className="text-darkwave-light">Cardholder name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="Ari XYZ"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="bg-darkwave-dark/80 border-darkwave-blue/30 text-darkwave-light focus-visible:ring-darkwave-cyan"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-darkwave-light">Expiry date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-darkwave-light/40" />
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="pl-10 bg-darkwave-dark/80 border-darkwave-blue/30 text-darkwave-light focus-visible:ring-darkwave-cyan"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-darkwave-light">CVV</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-darkwave-light/40" />
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="pl-10 bg-darkwave-dark/80 border-darkwave-blue/30 text-darkwave-light focus-visible:ring-darkwave-cyan"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 flex justify-between space-x-4">
            {step === 2 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-darkwave-blue text-darkwave-light hover:bg-darkwave-blue/20"
              >
                Back
              </Button>
            )}
            
            <Button 
              type="submit" 
              className="bg-darkwave-accent hover:bg-darkwave-blue transition-colors w-full text-white"
              disabled={isProcessing}
            >
              {isProcessing 
                ? "Processing..." 
                : step === 1 
                  ? "Continue" 
                  : "Buy Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
