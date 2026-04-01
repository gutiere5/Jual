import useImage from 'use-image';
import { useItemHandlers } from '../../../hooks/useItemHandlers';
import { Image } from 'react-konva';

const ImageItem = ({ item, onChange }) => {
  const [image] = useImage(item.image_src);

  const { getItemHandlers } = useItemHandlers({
    item,
    onChange,
  });

  return <Image id={item.instanceId} {...getItemHandlers()} {...item} image={image} />;
};

export default ImageItem;
