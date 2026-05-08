import { useRef, useState } from 'react';
import { useCanvasEditor } from '../../context/useCanvasEditor';
import { useMutation } from '@tanstack/react-query';
import { createCanvasDataQueryOptions } from '../../api/query-client';

const SaveProjectModal = ({ onClose }) => {
  const { canvasItems, canvasSettings } = useCanvasEditor();
  const [projectName, setProjectName] = useState('');
  const { mutate, isSuccess } = useMutation(createCanvasDataQueryOptions());

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();

    const name = projectName.trim();
    if (!name) return;

    const content = { items: canvasItems, canvasSettings };
    mutate({ name, content });
  };

  return (
    <div ref={modalRef} onClick={closeModal} className="background-blur">
      <div className="load-modal-container">
        <h2 style={{ textAlign: 'center' }}>Save Project</h2>
        {isSuccess && <p>Project Saved Successfully</p>}
        <form onSubmit={handleSaveProject}>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default SaveProjectModal;
