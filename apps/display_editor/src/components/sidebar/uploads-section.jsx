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
    <div>
      <div className="upload-area">
        <label className="upload-button ">
          <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
          <span>{uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}</span>
        </label>
      </div>

      <h2 className="section-title">Uploads</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data?.length === 0 ? (
          <p>No uploads found.</p>
        ) : (
          data?.map((image, index) => (
            <DraggableItem key={index} data={{ type: 'image', image_src: image }}>
              <div className="image-container">
                <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                <button
                  onClick={() => handleDeleteImage(image)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </DraggableItem>
          ))
        )}
      </div>
    </div>
  );
};

export default UploadSection;
