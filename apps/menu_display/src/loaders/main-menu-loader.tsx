import { canvasDataService } from '../services/canvasDataService';

const MainMenuLoader = async () => {
  try {
    const canvasData = await canvasDataService.getAllCanvasData();
    return canvasData;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    throw new Error(`Failed to load canvas data from display loader: ${errorMessage}`);
  }
};

export default MainMenuLoader;
