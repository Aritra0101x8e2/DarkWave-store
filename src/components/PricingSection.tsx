
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onBuy: (productId: string, plan: string) => void;
}

interface Plan {
  id: string;
  name: string;
  monthly: number;
  quarterly: number;
  yearly: number;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Protection',
    monthly: 99,
    quarterly: 269,
    yearly: 949,
    features: [
      'Single product license',
      'Up to 50 users',
      'Basic support',
      'Standard updates',
      'Community forum access',
    ]
  },
  {
    id: 'pro',
    name: 'Business Suite',
    monthly: 199,
    quarterly: 549,
    yearly: 1899,
    features: [
      'Three product license bundle',
      'Up to 250 users',
      'Priority support',
      'Early access to updates',
      'Security incident response',
      'Implementation assistance',
      'API access'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Shield',
    monthly: 399,
    quarterly: 1099,
    yearly: 3799,
    features: [
      'All products license',
      'Unlimited users',
      '24/7 dedicated support',
      'Custom implementation',
      'Security consultations',
      'Onsite training',
      'Advanced API integration',
      'Custom features'
    ]
  }
];

const PricingSection: React.FC<PricingSectionProps> = ({ onBuy }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-20 px-6 bg-darkwave-navy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-darkwave-light mb-4">
            Flexible <span className="text-gradient">Pricing Plans</span>
          </h2>
          <p className="text-darkwave-light/70 max-w-2xl mx-auto">
            Choose the perfect plan to secure your digital assets with our cutting-edge cybersecurity solutions.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 rounded-full bg-darkwave-dark border border-darkwave-blue/30">
              {(['monthly', 'quarterly', 'yearly'] as const).map((cycle) => (
                <button
                  key={cycle}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === cycle
                      ? 'bg-darkwave-blue text-white'
                      : 'text-darkwave-light/70 hover:text-darkwave-light'
                  }`}
                  onClick={() => setBillingCycle(cycle)}
                >
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {billingCycle === 'yearly' && (
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-darkwave-accent/20 rounded-full">
              <span className="text-xs font-medium text-darkwave-cyan">Save up to 20% with yearly billing</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = plan[billingCycle];
            const savings = billingCycle === 'yearly' 
              ? Math.round((1 - price / (plan.monthly * 12)) * 100) 
              : billingCycle === 'quarterly'
                ? Math.round((1 - price / (plan.monthly * 3)) * 100)
                : 0;
                
            return (
              <div 
                key={plan.id}
                className={`relative rounded-xl overflow-hidden ${
                  plan.recommended 
                    ? 'border-2 border-darkwave-accent bg-gradient-to-b from-darkwave-dark to-darkwave-dark/80' 
                    : 'border border-darkwave-blue/30 bg-darkwave-dark/50'
                } card-glow`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-0 w-full bg-darkwave-accent text-xs font-bold text-white text-center py-1">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`p-6 ${plan.recommended ? 'pt-8' : ''}`}>
                  <h3 className="text-xl font-bold text-darkwave-light mb-2">{plan.name}</h3>
                  
                  <div className="mt-4 mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-darkwave-light">${price}</span>
                      <span className="text-darkwave-light/70 ml-2">/{billingCycle.slice(0, -2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="text-xs text-darkwave-cyan mt-1">Save {savings}%</div>
                    )}
                  </div>
                  
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-darkwave-cyan shrink-0 mr-2" />
                        <span className="text-sm text-darkwave-light/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => onBuy(plan.id, billingCycle)}
                    className={`w-full ${
                      plan.recommended 
                        ? 'bg-darkwave-accent hover:bg-darkwave-blue' 
                        : 'bg-darkwave-blue hover:bg-darkwave-accent'
                    } text-white transition-all duration-300`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
