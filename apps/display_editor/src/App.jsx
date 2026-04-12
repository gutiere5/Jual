import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CanvasWorkspace from './components/canvas/CanvasWorkspace';
import PropertiesPanel from './components/propertiesPanel/PropertiesPanel';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useCanvasEditor } from './context/CanvasEditorContext';

function App() {
  const {
    canvasItems,
    selectedItem,
    updateItem,
    deleteItem,
    loadProject,
    pasteItem,
    copySelectedItem,
  } = useCanvasEditor();

  const handleProjectLoad = (loadedData) => {
    loadProject(loadedData);
  };

  useKeyboardShortcut([
    [['Delete', 'Backspace'], () => deleteItem()],
    [['c'], () => copySelectedItem()],
    [['v'], (e) => pasteItem(e)],
  ]);

  return (
    <div className="app-container">
      <Header itemState={{ items: canvasItems }} onLoadProject={handleProjectLoad} />
      <div className="app-main">
        <Sidebar />
        <CanvasWorkspace />
        <PropertiesPanel selectedItem={selectedItem} onUpdate={updateItem} onDelete={deleteItem} />
      </div>
    </div>
  );
}

export default App;
// 78 Lines
