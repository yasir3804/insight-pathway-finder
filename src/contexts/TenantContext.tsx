import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Tenant {
  id: string;
  name: string;
  subdomain?: string;
  domain?: string;
  logo_url?: string;
  settings?: any;
  plan: string;
  status: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  isLoading: boolean;
  switchTenant: (tenantId: string) => Promise<void>;
  createTenant: (name: string, subdomain?: string) => Promise<Tenant>;
  inviteUser: (email: string, role: string) => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserTenants();
  }, []);

  const loadUserTenants = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Create a mock tenant since database tables aren't ready yet
      const mockTenant: Tenant = {
        id: 'default',
        name: 'Default Organization',
        plan: 'basic',
        status: 'active'
      };
      setCurrentTenant(mockTenant);
      setAvailableTenants([mockTenant]);
    } catch (error) {
      console.error('Error in loadUserTenants:', error);
      // Fallback to mock data
      const mockTenant: Tenant = {
        id: 'default',
        name: 'Default Organization',
        plan: 'basic',
        status: 'active'
      };
      setCurrentTenant(mockTenant);
      setAvailableTenants([mockTenant]);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTenant = async (tenantId: string) => {
    const tenant = availableTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
      localStorage.setItem('current_tenant_id', tenantId);
    }
  };

  const createTenant = async (name: string, subdomain?: string): Promise<Tenant> => {
    // Mock implementation until database is ready
    const newTenant: Tenant = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      subdomain,
      plan: 'basic',
      status: 'active'
    };
    
    setAvailableTenants(prev => [...prev, newTenant]);
    return newTenant;
  };

  const inviteUser = async (email: string, role: string) => {
    if (!currentTenant) return;
    
    // Mock implementation until database is ready
    console.log(`Mock: Inviting ${email} as ${role} to tenant ${currentTenant.name}`);
  };

  return (
    <TenantContext.Provider value={{
      currentTenant,
      availableTenants,
      isLoading,
      switchTenant,
      createTenant,
      inviteUser,
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};