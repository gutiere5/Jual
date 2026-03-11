import { canvasDataService } from '../services/canvasDataService';

const MainMenuLoader = async () => {
  try {
    const canvasData = await canvasDataService.getAllCanvasData();
    console.log('Canvas data', canvasData);
    return canvasData;
  } catch (error) {
    console.log('Error loading canvas data', error);
    // throw new Error(`Failed to load canvas data from display loader: ${error}`);
  }
};

export default MainMenuLoader;
