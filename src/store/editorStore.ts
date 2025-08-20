import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SceneConfiguration } from '../types/scene';
import { getSceneConfig } from './sceneRegistry';

// Define the editor state interface
interface EditorState {
  // Scene selection and configuration
  currentSceneId: string | null;
  sceneConfig: SceneConfiguration | null;
  isRotating: boolean;
  rotationSpeed: number;
  
  // Dynamic parameters for the current scene
  parameters: Record<string, any>;
  
  // UI state
  isPanelOpen: boolean;
  activePanel: 'parameters' | 'code' | 'info' | null;
  isFullscreen: boolean;
  showGrid: boolean;
  showAxes: boolean;
  
  // Camera controls
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  cameraZoom: number;
  
  // Code generation
  generatedCode: string;
  codeTheme: 'dark' | 'light';
  
  // Actions
  setCurrentScene: (sceneId: string) => void;
  setRotating: (isRotating: boolean) => void;
  setRotationSpeed: (speed: number) => void;
  setParameter: (name: string, value: any) => void;
  resetParameters: () => void;
  togglePanel: (panel?: 'parameters' | 'code' | 'info') => void;
  setFullscreen: (isFullscreen: boolean) => void;
  toggleGrid: () => void;
  toggleAxes: () => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setCameraZoom: (zoom: number) => void;
  resetCamera: () => void;
  setGeneratedCode: (code: string) => void;
  toggleCodeTheme: () => void;
}

// Create the editor store with persistence
export const useEditorStore = create<EditorState>(
  persist(
    (set, get) => ({
      // Initial state
      currentSceneId: null,
      sceneConfig: null,
      isRotating: true,
      rotationSpeed: 0.5,
      parameters: {},
      isPanelOpen: true,
      activePanel: 'parameters',
      isFullscreen: false,
      showGrid: true,
      showAxes: true,
      cameraPosition: [5, 5, 5],
      cameraTarget: [0, 0, 0],
      cameraZoom: 1,
      generatedCode: '',
      codeTheme: 'dark',
      
      // Actions
      setCurrentScene: (sceneId: string) => {
        const sceneConfig = getSceneConfig(sceneId);
        if (sceneConfig) {
          // Initialize default parameters from scene configuration
          const defaultParams: Record<string, any> = {};
          sceneConfig.parameters.forEach(param => {
            defaultParams[param.name] = param.defaultValue;
          });
          
          set({
            currentSceneId: sceneId,
            sceneConfig,
            parameters: defaultParams,
          });
        }
      },
      
      setRotating: (isRotating: boolean) => set({ isRotating }),
      
      setRotationSpeed: (speed: number) => set({ rotationSpeed: speed }),
      
      setParameter: (name: string, value: any) => {
        const { parameters } = get();
        set({
          parameters: {
            ...parameters,
            [name]: value,
          },
        });
      },
      
      resetParameters: () => {
        const { sceneConfig } = get();
        if (sceneConfig) {
          const defaultParams: Record<string, any> = {};
          sceneConfig.parameters.forEach(param => {
            defaultParams[param.name] = param.defaultValue;
          });
          set({ parameters: defaultParams });
        }
      },
      
      togglePanel: (panel?: 'parameters' | 'code' | 'info') => {
        const { isPanelOpen, activePanel } = get();
        
        if (panel && panel === activePanel) {
          // Toggle panel visibility if clicking the active panel button
          set({ isPanelOpen: !isPanelOpen });
        } else if (panel) {
          // Switch to a different panel and ensure it's open
          set({ activePanel: panel, isPanelOpen: true });
        } else {
          // Simple toggle if no panel specified
          set({ isPanelOpen: !isPanelOpen });
        }
      },
      
      setFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
      
      toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),
      
      toggleAxes: () => set(state => ({ showAxes: !state.showAxes })),
      
      setCameraPosition: (position: [number, number, number]) => set({ cameraPosition: position }),
      
      setCameraTarget: (target: [number, number, number]) => set({ cameraTarget: target }),
      
      setCameraZoom: (zoom: number) => set({ cameraZoom: zoom }),
      
      resetCamera: () => set({
        cameraPosition: [5, 5, 5],
        cameraTarget: [0, 0, 0],
        cameraZoom: 1,
      }),
      
      setGeneratedCode: (code: string) => set({ generatedCode: code }),
      
      toggleCodeTheme: () => set(state => ({
        codeTheme: state.codeTheme === 'dark' ? 'light' : 'dark',
      })),
    }),
    {
      name: 'corollary-editor-storage',
      // Only persist these specific state properties
      partialize: (state) => ({
        currentSceneId: state.currentSceneId,
        rotationSpeed: state.rotationSpeed,
        showGrid: state.showGrid,
        showAxes: state.showAxes,
        codeTheme: state.codeTheme,
      }),
    }
  )
);

export default useEditorStore;