import { useEffect } from 'react';

export const ExternalAppLink = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return <p>Redirecting...</p>;
};
