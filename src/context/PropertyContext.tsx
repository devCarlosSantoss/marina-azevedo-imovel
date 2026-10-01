import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Property } from '@/types';
import { properties as initialProperties } from '@/data/properties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (newProperty: Omit<Property, 'id' | 'slug'>) => Property;
  updateProperty: (id: string, updated: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetProperties: () => void;
  getPropertyBySlug: (slug: string) => Property | undefined;
}

const STORAGE_KEY = 'marina_azevedo_properties_v1';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      console.warn('Não foi possível ler os imóveis do localStorage, usando valores padrão.');
    }
    return initialProperties;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (e) {
      console.error('Falha ao sincronizar com localStorage:', e);
    }
  }, [properties]);

  const addProperty = (data: Omit<Property, 'id' | 'slug'>): Property => {
    const baseSlug = slugify(data.title);
    const uniqueSuffix = Date.now().toString(36).slice(-4);
    const slug = `${baseSlug}-${uniqueSuffix}`;
    const id = `prop-${Date.now()}`;

    const newProp: Property = {
      ...data,
      id,
      slug,
    };

    setProperties((prev) => [newProp, ...prev]);
    return newProp;
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  const resetProperties = () => {
    setProperties(initialProperties);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProperties));
    } catch {}
  };

  const getPropertyBySlug = (slug: string) => {
    return properties.find((p) => p.slug === slug);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        resetProperties,
        getPropertyBySlug,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties deve ser usado dentro de um PropertyProvider');
  }
  return context;
}

