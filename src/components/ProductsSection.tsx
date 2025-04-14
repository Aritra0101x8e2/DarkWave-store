import React from 'react';
import ProductCard from './ProductCard';
import { Shield, MousePointer, Lock, AlertTriangle, Eye } from 'lucide-react';

interface ProductsSectionProps {
  onBuy: (productId: string) => void;
}

const products = [
  {
    id: 'sentinel-ai',
    title: 'Sentinel AI',
    description: 'AI-driven authentication system that adapts to evolving threats in real-time.',
    icon: Shield,
    features: [
      'Adaptive threat response',
      'Multi-factor authentication',
      'Behavioral analysis',
      'Suspicious activity detection',
      'Real-time protection'
    ],
    url: 'https://sentinel-ai-dark-wave.vercel.app/'  // Added URL
  },
  {
    id: 'ryvora',
    title: 'RYVORA',
    description: 'Biometric analyzer which analyzes user mouse movement and typing pattern for continuous verification.',
    icon: MousePointer,
    features: [
      'Continuous authentication',
      'Behavior pattern recognition',
      'Anomaly detection',
      'Low false positive rate',
      'Non-intrusive monitoring'
    ],
    url: 'https://ryvora-darkwave-aritra.vercel.app/'  // Added URL
  },
  {
    id: 'trustvault-id',
    title: 'TrustVaultID',
    description: 'Decentralized identity verification software based on blockchain for maximum security and transparency.',
    icon: Lock,
    features: [
      'Immutable identity records',
      'Self-sovereign identity',
      'Zero-knowledge proof validation',
      'Cross-platform verification',
      'Privacy-focused design'
    ],
    url: 'https://trust-vault-id-darkwave-aritra.vercel.app/'  // Added URL
  },
  {
    id: 'ivyra-ai',
    title: 'IvyraAI',
    description: 'AI-powered advanced phishing detection software that protects against sophisticated social engineering attacks.',
    icon: AlertTriangle,
    features: [
      'Real-time email scanning',
      'Link and attachment analysis',
      'Natural language processing',
      'Visual similarity detection',
      'Continuous learning system'
    ],
    url: 'https://ivyra-ai-darkwave-aritra.vercel.app/'  // Added URL
  },
  {
    id: 'spectra-ai',
    title: 'Spectra AI',
    description: 'Advanced biometric authentication using retina pattern recognition for high-security environments.',
    icon: Eye,
    features: [
      'Retina pattern mapping',
      'Anti-spoofing technology',
      'Military-grade encryption',
      'Near-zero error rate',
      'Fast recognition speed'
    ],
    url: 'https://spectra-ai-darkwave-aritra.vercel.app/'  // Added URL
  }
];

const ProductsSection: React.FC<ProductsSectionProps> = ({ onBuy }) => {
  return (
    <section id="products" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-darkwave-light mb-4">
            Our Security <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-darkwave-light/70 max-w-2xl mx-auto">
            Advanced cybersecurity products powered by artificial intelligence to protect your business from evolving digital threats.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              icon={product.icon}
              features={product.features}
              index={index}
              onBuy={() => onBuy(product.id)}
              url={product.url}  // Pass the URL to ProductCard
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
