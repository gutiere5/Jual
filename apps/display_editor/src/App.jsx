import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CanvasWorkspace from './components/canvas/CanvasWorkspace';
import PropertiesPanel from './components/propertiesPanel/PropertiesPanel';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useCanvasEditor } from './context/useCanvasEditor';

function App() {
  const { pasteItem, copySelectedItem, deleteItem } = useCanvasEditor();

  useKeyboardShortcut([
    [['Delete', 'Backspace'], () => deleteItem()],
    [['c'], () => copySelectedItem()],
    [['v'], (e) => pasteItem(e)],
  ]);

  return (
    <div className="app-container">
      <Header />
      <div className="app-main">
        <Sidebar />
        <CanvasWorkspace />
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
// 78 Lines
