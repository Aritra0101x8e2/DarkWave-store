
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import CheckoutModal from '../components/CheckoutModal';

const products = {
  'sentinel-ai': { name: 'Sentinel AI', description: 'AI-driven authentication system' },
  'ryvora': { name: 'RYVORA', description: 'Biometric analyzer for mouse and typing patterns' },
  'trustvault-id': { name: 'TrustVaultID', description: 'Decentralized identity verification' },
  'ivyra-ai': { name: 'IvyraAI', description: 'AI-powered phishing detection' },
  'spectra-ai': { name: 'Spectra AI', description: 'Retina pattern recognition' }
};

const plans = {
  'basic': { name: 'Basic Protection' },
  'pro': { name: 'Business Suite' },
  'enterprise': { name: 'Enterprise Shield' }
};

const prices = {
  'monthly': {
    'basic': 99,
    'pro': 199,
    'enterprise': 399
  },
  'quarterly': {
    'basic': 269,
    'pro': 549,
    'enterprise': 1099
  },
  'yearly': {
    'basic': 949,
    'pro': 1899,
    'enterprise': 3799
  }
};

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleBuyProduct = (productId: string) => {
    if (products[productId as keyof typeof products]) {
      setSelectedProduct({
        id: productId,
        name: products[productId as keyof typeof products].name,
        price: prices.monthly.basic,
        billingCycle: 'Monthly'
      });
      setIsCheckoutOpen(true);
    }
  };

  const handleBuyPlan = (planId: string, billingCycle: string) => {
    const formattedBillingCycle = billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1);
    
    setSelectedProduct({
      id: planId,
      name: plans[planId as keyof typeof plans].name,
      price: prices[billingCycle as keyof typeof prices][planId as keyof (typeof prices)['monthly']],
      billingCycle: formattedBillingCycle
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ProductsSection onBuy={handleBuyProduct} />
        <PricingSection onBuy={handleBuyPlan} />
      </main>
      
      <Footer />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;
