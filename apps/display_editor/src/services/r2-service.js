import axiosClient from '../api/axios-client';

const PUBLIC_IMAGES_PREFIX = 'https://jualinbox.com/';

const toPublicImageUrl = (key) => {
  return `${PUBLIC_IMAGES_PREFIX}${key}`;
};

export const r2Service = {
  uploadObject: async ({ fileName, fileContent }) => {
    try {
      const type = fileContent.type;
      const { data } = await axiosClient.post('r2', {
        fileName,
        type,
      });
      const { url } = data;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': type,
        },
        body: fileContent,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }
    } catch (error) {
      throw new Error('Error uploading file:', {
        status: error.response?.status,
        error: error.response?.data,
      });
    }
  },

  deleteObject: async ({ imageUrl }) => {
    try {
      const key = imageUrl.replace(PUBLIC_IMAGES_PREFIX, '');
      const { data } = await axiosClient.delete('r2', { data: { key } });
      const { url } = data;

      const reponse = await fetch(url, {
        method: 'DELETE',
      });

      if (!reponse.ok) {
        throw new Error(`Delete failed with status ${reponse.status}`);
      }
    } catch (error) {
      throw new Error('Error deleting object:', error);
    }
  },

  downloadFile: async ({ fileName }) => {
    try {
      const response = await axiosClient.get(`r2/${fileName}`);
      const content = await response.Body.transformToString();
      return content;
    } catch (error) {
      throw new Error('Error downloading file:', error);
    }
  },

  listObjects: async () => {
    try {
      const { data } = await axiosClient.get('r2');
      const url = data.url;

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`List objects failed with status ${response.status}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Extract keys
      const keys = Array.from(xmlDoc.querySelectorAll('Contents'))
        .map((item) => item.querySelector('Key').textContent)
        .filter(Boolean)
        .map(toPublicImageUrl);

      return keys;
    } catch (error) {
      throw new Error('Error listing objects:', error);
    }
  },
};
