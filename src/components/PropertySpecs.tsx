'use client';

import { Bed, Bath, Car, Maximize, Home } from 'lucide-react';
import type { Property } from '@/data/properties';

interface PropertySpecsProps {
  property: Property;
}

export function PropertySpecs({ property }: PropertySpecsProps) {
  const specs = [
    { label: 'Área', value: `${property.specs.areaM2} m²`, icon: Maximize },
    { label: 'Suítes', value: property.specs.suites, icon: Bed },
    { label: 'Quartos', value: property.specs.bedrooms, icon: Home },
    { label: 'Banheiros', value: property.specs.bathrooms, icon: Bath },
    { label: 'Vagas', value: property.specs.garageSpots, icon: Car },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col items-center text-center p-4 bg-off-white border border-grafite/10"
        >
          <spec.icon className="w-6 h-6 text-grafite/40 mb-2" aria-hidden="true" />
          <span className="text-display-sm font-display text-grafite">{spec.value}</span>
          <span className="text-caption text-grafite/50">{spec.label}</span>
        </div>
      ))}
    </div>
  );
}
