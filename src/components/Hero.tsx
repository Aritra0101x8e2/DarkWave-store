
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, Database, RefreshCw } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-40 left-1/2 w-96 h-96 -translate-x-1/2 bg-darkwave-blue opacity-30 rounded-full blur-[100px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-darkwave-blue/20 border border-darkwave-blue/30 backdrop-blur-sm mb-4">
            <span className="text-darkwave-cyan text-sm font-medium">Next-Gen Cybersecurity Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Secure Your Digital World With <span className="text-gradient">Advanced AI</span>
          </h1>
          
          <p className="text-lg text-darkwave-light/80 max-w-2xl">
            Darkwave provides cutting-edge cybersecurity solutions powered by artificial intelligence to protect your business from evolving digital threats.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button
  onClick={() => window.open('https://darkwave-softwares-aritra.vercel.app/', '_blank')}
  className="bg-darkwave-accent hover:bg-darkwave-blue text-white px-8 py-6 text-lg transition-all duration-300"
>
  Explore Products
</Button>

          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { icon: Shield, label: "Advanced Protection" },
            { icon: Lock, label: "Secure Access" },
            { icon: Eye, label: "Threat Detection" },
            { icon: Database, label: "Data Security" },
            { icon: RefreshCw, label: "Real-time Updates" }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 rounded-lg bg-darkwave-navy/50 border border-darkwave-blue/20 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-darkwave-blue/20 mb-3">
                <item.icon className="w-6 h-6 text-darkwave-cyan" />
              </div>
              <span className="text-darkwave-light font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
