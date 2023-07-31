import ZzCarouselItem from '../carousel/src/item';

/* istanbul ignore next */
ZzCarouselItem.install = function (Vue) {
  Vue.component(ZzCarouselItem.name, ZzCarouselItem);
};

export default ZzCarouselItem;
