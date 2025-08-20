/**
 * @file User store for managing authentication and user profile state
 * Centralizes user-related state management using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../utils/supabaseClient';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  account_tier: 'free' | 'premium' | 'educational';
  storage_used: number;
  storage_limit: number;
  project_count: number;
  project_limit: number;
}

interface UserState {
  // Authentication state
  isAuthenticated: boolean;
  isLoading: boolean;
  session: any | null;
  user: any | null;
  
  // User profile data
  profile: UserProfile | null;
  
  // Actions
  initializeAuthState: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  loginWithGoogle: () => Promise<{ error: any | null }>;
  signup: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any | null }>;
}

export const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: true,
      session: null,
      user: null,
      profile: null,

      // Authentication actions
      initializeAuthState: async () => {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          set({ 
            isAuthenticated: true,
            isLoading: false,
            session: data.session,
            user: data.session.user,
          });
          
          // Fetch user profile
          get().fetchProfile();
        } else {
          set({ isLoading: false });
        }
        
        // Set up auth state change listener
        supabase.auth.onAuthStateChange((event, session) => {
          set({ 
            isAuthenticated: !!session,
            session,
            user: session?.user || null,
          });
          
          if (session) {
            get().fetchProfile();
          }
        });
      },

      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          set({ 
            isAuthenticated: true, 
            session: data.session,
            user: data.user,
          });
          
          // Fetch user profile after successful login
          get().fetchProfile();
          
          return { error: null };
        } catch (error) {
          return { error };
        }
      },

      loginWithGoogle: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });
          
          if (error) throw error;
          return { error: null };
        } catch (error) {
          return { error };
        }
      },

      signup: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (error) throw error;
          
          // Note: User won't be fully authenticated until email confirmation
          set({ 
            user: data.user,
          });
          
          return { error: null };
        } catch (error) {
          return { error };
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ 
          isAuthenticated: false, 
          session: null,
          user: null,
          profile: null,
        });
      },

      // Profile management
      fetchProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          // Fetch user profile from profiles table
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          // If profile exists, update state
          if (data) {
            set({ profile: data as UserProfile });
          } else {
            // Create default profile if none exists
            const defaultProfile: Partial<UserProfile> = {
              id: user.id,
              email: user.email,
              created_at: new Date().toISOString(),
              account_tier: 'free',
              storage_used: 0,
              storage_limit: 1024 * 1024 * 1024, // 1GB
              project_count: 0,
              project_limit: 5,
            };

            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([defaultProfile])
              .select()
              .single();

            if (createError) throw createError;
            set({ profile: newProfile as UserProfile });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      },

      updateProfile: async (updates: Partial<UserProfile>) => {
        const { user } = get();
        if (!user) return { error: new Error('User not authenticated') };

        try {
          const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          // Update local state
          set({ profile: data as UserProfile });
          return { error: null };
        } catch (error) {
          return { error };
        }
      },
    }),
    {
      name: 'corollary-user-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        session: state.session,
        user: state.user,
        profile: state.profile,
      }),
    }
  )
);

// Initialize auth state from Supabase on app load
export const initAuth = async () => {
  await useUserStore.getState().initializeAuthState();
};