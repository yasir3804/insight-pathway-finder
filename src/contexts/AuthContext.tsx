import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType extends AuthState {
  profile: { role: string; full_name: string; tenant_id?: string; is_tenant_admin?: boolean } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string, tenantId?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  needsTenantSetup: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; user: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { 
        user: action.user, 
        isAuthenticated: true, 
        isLoading: false 
      };
    case 'LOGIN_FAILURE':
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: action.user 
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [needsTenantSetup, setNeedsTenantSetup] = React.useState(false);

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          // Try to get user profile
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error || !profile) {
            // User needs to set up tenant/profile
            setNeedsTenantSetup(true);
            dispatch({ type: 'LOGIN_FAILURE' });
            return;
          }

          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile.full_name,
            role: profile.role as any,
            createdAt: new Date(profile.created_at),
            lastLogin: new Date(),
          };

          dispatch({ type: 'LOGIN_SUCCESS', user });
          setNeedsTenantSetup(false);
        } catch (error) {
          console.error('Error loading user profile:', error);
          // Fall back to mock data for development
          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.email?.split('@')[0] || 'User',
            role: 'student',
            createdAt: new Date(),
            lastLogin: new Date(),
          };
          dispatch({ type: 'LOGIN_SUCCESS', user });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
        setNeedsTenantSetup(false);
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      // User state will be updated via onAuthStateChange
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: string, tenantId?: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: name,
            role: role,
            tenant_id: tenantId
          }
        }
      });

      if (error) throw error;
      
      // If user is immediately confirmed, create profile
      if (data.user && !data.user.email_confirmed_at) {
        // For now, just set needsTenantSetup to true
        setNeedsTenantSetup(true);
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return;
    
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_USER', user: updatedUser });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      profile: state.user ? { role: state.user.role, full_name: state.user.name } : null,
      login,
      register,
      logout,
      updateProfile,
      needsTenantSetup,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};