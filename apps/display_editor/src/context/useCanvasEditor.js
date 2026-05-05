import { useContext } from 'react';
import { CanvasEditorContext } from './CanvasEditorContext';

export const useCanvasEditor = () => {
  const context = useContext(CanvasEditorContext);
  if (!context) {
    throw new Error('useCanvasEditor must be used within a CanvasEditorProvider');
  }
  return context;
};
