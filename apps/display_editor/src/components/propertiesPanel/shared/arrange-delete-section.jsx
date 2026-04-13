import { useCanvasEditor } from '../../../context/CanvasEditorContext';

const ArrangeDeleteSection = ({ children }) => {
  const { bringSelectedToFront, bringSelectedToBack, deleteItem } = useCanvasEditor();
  return (
    <>
      <h2>Arrange</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={bringSelectedToFront}>Bring Front</button>
        <button onClick={bringSelectedToBack}>Send Back</button>
      </div>
      {children}
      <button onClick={() => deleteItem()} style={{ marginTop: 10 }}>
        Delete Item
      </button>
    </>
  );
};

export default ArrangeDeleteSection;
