
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-darkwave-navy bg-opacity-90 backdrop-blur-sm border-b border-darkwave-blue/30">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-darkwave-cyan animate-pulse-glow" />
          <h1 className="text-2xl font-bold tracking-tight text-darkwave-glow">DARKWAVE</h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#products" className="text-darkwave-light hover:text-darkwave-glow transition-colors">Products</a>
          <a href="#pricing" className="text-darkwave-light hover:text-darkwave-glow transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-4">
        <Button
  onClick={() => window.open('https://wa.me/qr/7DGKFLHEAXGOB1', '_blank')}
  className="bg-darkwave-accent hover:bg-darkwave-blue text-white transition-all duration-300"
>
  Contact Us
</Button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
