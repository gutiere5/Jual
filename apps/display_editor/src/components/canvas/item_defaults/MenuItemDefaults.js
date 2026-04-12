import { IMAGE_ITEM_DEFAULTS } from './image-item-defaults';
import { TYPOGRAPHY_ITEM_DEFAULTS } from './TypographyDefaults';

export const MENU_ITEM_DEFAULTS = {
  type: 'menu',
  showTitle: true,
  showImage: true,
  showDescription: true,
  showPrice: true,
  titleStyle: {
    ...TYPOGRAPHY_ITEM_DEFAULTS,
    fontSize: 18,
    fontStyle: 'bold',
    x: 120,
    y: 10,
  },
  descriptionStyle: {
    ...TYPOGRAPHY_ITEM_DEFAULTS,
    fontSize: 14,
    x: 120,
    y: 40,
  },
  priceStyle: {
    ...TYPOGRAPHY_ITEM_DEFAULTS,
    fontStyle: 'bold',
    x: 120,
    y: 70,
  },
  imageStyle: {
    ...IMAGE_ITEM_DEFAULTS,
  },
};
