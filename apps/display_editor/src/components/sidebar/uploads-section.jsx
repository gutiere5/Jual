import './uploads-section.css';
import { DraggableItem } from './DraggableItem';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  deleteFileMutationOptions,
  listImageQueryOptions,
  uploadFileQueryOptions,
} from '../../api/query-client';

const UploadSection = () => {
  const { data } = useSuspenseQuery(listImageQueryOptions());
  const uploadMutation = useMutation(uploadFileQueryOptions());
  const deleteMutation = useMutation(deleteFileMutationOptions());

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `images/${Date.now()}-${file.name}`;
    await uploadMutation.mutateAsync({ fileName, fileContent: file });
  };

  const handleDeleteImage = async (imageUrl) => {
    await deleteMutation.mutateAsync({ imageUrl });
  };

  return (
    <div className="sidebar-section">
      <div className="upload-area">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="file-input"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="upload-button ">
          <span>{uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}</span>
        </label>
      </div>

      <h3 className="section-title">Uploads</h3>
      {data?.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        data?.map((image, index) => (
          <DraggableItem key={index} data={{ type: 'image', image_src: image }}>
            <div className="image-container">
              <button
                className="delete-button"
                onClick={() => handleDeleteImage(image)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </div>
            <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
          </DraggableItem>
        ))
      )}
    </div>
  );
};

export default UploadSection;
