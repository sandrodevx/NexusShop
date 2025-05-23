import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    newsletter: boolean;
  };
  createdAt: string;
  lastLogin: string;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGitHub: () => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  
  // Password management
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Mock user data
const createMockUser = (email: string, name: string): User => ({
  id: `user_${Date.now()}`,
  email,
  name,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
  role: 'user',
  preferences: {
    theme: 'light',
    notifications: true,
    newsletter: true,
  },
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
});

// Mock authentication
const mockAuthenticate = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo credentials that always work
  if (email === 'demo@nexusshop.com' && password === 'demo123') {
    const user = createMockUser(email, 'Demo User');
    const token = `mock_token_${Date.now()}`;
    return { user, token };
  }
  
  // Any @example.com email works for demo
  if (email.endsWith('@example.com') && password.length >= 6) {
    const user = createMockUser(email, email.split('@')[0]);
    const token = `mock_token_${Date.now()}`;
    return { user, token };
  }
  
  return null;
};

// Zustand store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const result = await mockAuthenticate(email, password);
          
          if (result) {
            set({
              user: result.user,
              token: result.token,
              refreshToken: result.token, // In demo, same as token
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        
        try {
          // Simulate OAuth success
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const user = createMockUser('google.user@gmail.com', 'Google User');
          const token = `google_token_${Date.now()}`;
          
          set({
            user,
            token,
            refreshToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Google login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      loginWithGitHub: async () => {
        set({ isLoading: true });
        
        try {
          // Simulate OAuth success
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const user = createMockUser('github.user@github.com', 'GitHub User');
          const token = `github_token_${Date.now()}`;
          
          set({
            user,
            token,
            refreshToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('GitHub login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        
        try {
          // Simulate registration
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (userData.password !== userData.confirmPassword) {
            set({ isLoading: false });
            return false;
          }
          
          const user = createMockUser(userData.email, userData.name);
          const token = `new_user_token_${Date.now()}`;
          
          set({
            user,
            token,
            refreshToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        
        // Clear cart and other user data
        localStorage.removeItem('nexusshop-cart');
      },

      refreshAuth: async () => {
        const { token } = get();
        
        if (!token) return false;
        
        // In demo, tokens don't expire
        return true;
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get();
        
        if (!user) return false;
        
        try {
          // Simulate API update
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            user: { ...state.user!, ...data },
          }));
          return true;
        } catch (error) {
          console.error('Profile update error:', error);
          return false;
        }
      },

      forgotPassword: async (_email: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, would call API
        console.log('Password reset email sent');
        return true;
      },

      resetPassword: async (_token: string, _password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, would validate token and update password
        console.log('Password reset successfully');
        return true;
      },

      changePassword: async (_currentPassword: string, _newPassword: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, would validate current password and update
        console.log('Password changed successfully');
        return true;
      },
    }),
    {
      name: 'nexusshop-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Auto-refresh token on app startup
export const initializeAuth = async () => {
  const store = useAuthStore.getState();
  if (store.token) {
    await store.refreshAuth();
  }
}; 