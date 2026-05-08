import { useQuery } from '@tanstack/react-query';
import { listCanvasDataQueryOptions } from '../../api/query-client';
import { useRef } from 'react';
import { useCanvasEditor } from '../../context/useCanvasEditor';

const LoadProjectModal = ({ onClose }) => {
  const { data: Canvas, isPending } = useQuery(listCanvasDataQueryOptions());
  const { loadProject } = useCanvasEditor();
  const modalRef = useRef();

  const handleLoadProject = (CanvasItem) => {
    loadProject(CanvasItem);
    onClose();
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div ref={modalRef} onClick={closeModal} className="background-blur">
      <div className="load-modal-container">
        <h2 style={{ textAlign: 'center' }}>Load Project</h2>

        {isPending ? (
          <p>Loading...</p>
        ) : (
          <div className="canvas-list">
            {Canvas?.canvasData.map((canvasItem) => (
              <button
                key={canvasItem.id}
                onClick={() => {
                  handleLoadProject(canvasItem.content);
                }}
              >
                {canvasItem.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default LoadProjectModal;
