import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Users, Plus } from 'lucide-react';

export const TenantSetup = () => {
  const [step, setStep] = useState<'select' | 'create'>('select');
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { availableTenants, switchTenant, createTenant } = useTenant();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectTenant = async (tenantId: string) => {
    await switchTenant(tenantId);
    navigate('/dashboard');
  };

  const handleCreateTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const newTenant = await createTenant(name.trim(), subdomain.trim() || undefined);
      await switchTenant(newTenant.id);
      toast({
        title: "Organization created",
        description: "Your new organization has been created successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'create') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Create Organization</CardTitle>
            <CardDescription>
              Set up your new organization to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTenant} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Organization"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain (Optional)</Label>
                <Input
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="my-org"
                />
                <p className="text-xs text-muted-foreground">
                  This will be used for your organization's URL
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('select')}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Choose Organization</CardTitle>
          <CardDescription>
            Select an organization to continue or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableTenants.length > 0 && (
            <div className="space-y-2">
              {availableTenants.map((tenant) => (
                <Button
                  key={tenant.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleSelectTenant(tenant.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{tenant.name}</div>
                      {tenant.subdomain && (
                        <div className="text-xs text-muted-foreground">
                          {tenant.subdomain}.yourapp.com
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          
          <Button
            variant="default"
            className="w-full"
            onClick={() => setStep('create')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Organization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};