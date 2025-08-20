/**
 * @file Scene store for managing visualization editor state
 * Centralizes scene parameters and editor state using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSceneConfig } from './sceneRegistry';
import { SceneConfiguration } from '../types/scene';

interface SceneState {
  // Current scene selection
  currentSceneId: string;
  rotationSpeed: number;
  autoRotate: boolean;
  
  // Dynamic parameters for the current scene
  parameters: Record<string, number>;
  
  // UI state
  isCodePanelOpen: boolean;
  isControlPanelOpen: boolean;
  isDarkMode: boolean;
  
  // Camera controls
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraZoom: number;
  
  // Actions
  setCurrentScene: (sceneId: string) => void;
  setRotationSpeed: (speed: number) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setParameter: (key: string, value: number) => void;
  resetParameters: () => void;
  toggleCodePanel: () => void;
  toggleControlPanel: () => void;
  toggleDarkMode: () => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setCameraZoom: (zoom: number) => void;
  resetCamera: () => void;
}

export const useSceneStore = create<SceneState>(
  persist(
    (set, get) => {
      // Helper to get default parameters for a scene
      const getDefaultParameters = (sceneId: string): Record<string, number> => {
        const scene = getSceneConfig(sceneId);
        if (!scene || !scene.parameters) return {};
        
        return Object.entries(scene.parameters).reduce(
          (acc, [key, config]) => {
            acc[key] = config.default;
            return acc;
          },
          {} as Record<string, number>
        );
      };
      
      return {
        // Initial state with default scene
        currentSceneId: 'parametric-surface',
        rotationSpeed: 1,
        autoRotate: true,
        parameters: getDefaultParameters('parametric-surface'),
        isCodePanelOpen: false,
        isControlPanelOpen: true,
        isDarkMode: false,
        cameraPosition: [5, 5, 5],
        cameraTarget: [0, 0, 0],
        cameraZoom: 1,
        
        // Scene selection
        setCurrentScene: (sceneId: string) => {
          const defaultParams = getDefaultParameters(sceneId);
          set({ 
            currentSceneId: sceneId,
            parameters: defaultParams,
          });
        },
        
        // Parameter controls
        setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
        setAutoRotate: (autoRotate: boolean) => set({ autoRotate }),
        setParameter: (key: string, value: number) => set(state => ({
          parameters: { ...state.parameters, [key]: value }
        })),
        resetParameters: () => {
          const { currentSceneId } = get();
          set({ parameters: getDefaultParameters(currentSceneId) });
        },
        
        // UI controls
        toggleCodePanel: () => set(state => ({ 
          isCodePanelOpen: !state.isCodePanelOpen 
        })),
        toggleControlPanel: () => set(state => ({ 
          isControlPanelOpen: !state.isControlPanelOpen 
        })),
        toggleDarkMode: () => set(state => ({ 
          isDarkMode: !state.isDarkMode 
        })),
        
        // Camera controls
        setCameraPosition: (position: [number, number, number]) => 
          set({ cameraPosition: position }),
        setCameraTarget: (target: [number, number, number]) => 
          set({ cameraTarget: target }),
        setCameraZoom: (zoom: number) => set({ cameraZoom: zoom }),
        resetCamera: () => set({ 
          cameraPosition: [5, 5, 5],
          cameraTarget: [0, 0, 0],
          cameraZoom: 1,
        }),
      };
    },
    {
      name: 'corollary-scene-storage',
      partialize: (state) => ({
        currentSceneId: state.currentSceneId,
        rotationSpeed: state.rotationSpeed,
        autoRotate: state.autoRotate,
        parameters: state.parameters,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

// Helper to get the current scene configuration
export const useCurrentScene = (): SceneConfiguration | undefined => {
  const currentSceneId = useSceneStore(state => state.currentSceneId);
  return getSceneConfig(currentSceneId);
};

// Helper to generate a snapshot of the current scene state
export const getCurrentSceneSnapshot = () => {
  const state = useSceneStore.getState();
  const scene = getSceneConfig(state.currentSceneId);
  
  return {
    sceneId: state.currentSceneId,
    sceneName: scene?.name || 'Unknown Scene',
    rotationSpeed: state.rotationSpeed,
    autoRotate: state.autoRotate,
    parameters: { ...state.parameters },
    cameraPosition: [...state.cameraPosition],
    cameraTarget: [...state.cameraTarget],
    cameraZoom: state.cameraZoom,
    timestamp: new Date().toISOString(),
  };
};