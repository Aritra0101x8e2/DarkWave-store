import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  index: number;
  onBuy: () => void;
  url: string;  // Added url prop for redirecting on card click
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  index,
  onBuy,
  url
}) => {
  // Handler for clicking anywhere on the card except the Buy Now button
  const handleCardClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div 
      className="relative group rounded-xl bg-gradient-to-b from-darkwave-navy to-darkwave-dark border border-darkwave-blue/30 p-6 card-glow animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}  // Open URL when clicking anywhere on the card
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-darkwave-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col h-full">
        <div className="mb-6 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-darkwave-blue/20 flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-darkwave-cyan" />
          </div>
          <h3 className="text-xl font-bold text-darkwave-light">{title}</h3>
        </div>
        
        <p className="text-darkwave-light/70 mb-6">{description}</p>
        
        <ul className="mb-8 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start mb-3">
              <svg className="w-5 h-5 text-darkwave-cyan mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-darkwave-light/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={(e) => {
            e.stopPropagation();  // Prevent click event from bubbling up to the card
            onBuy();  // Trigger the onBuy callback
          }}
          className="w-full bg-darkwave-blue hover:bg-darkwave-accent text-white transition-all duration-300"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
