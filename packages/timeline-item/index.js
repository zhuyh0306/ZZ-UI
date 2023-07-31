import ZzTimelineItem from '../timeline/src/item';

/* istanbul ignore next */
ZzTimelineItem.install = function (Vue) {
  Vue.component(ZzTimelineItem.name, ZzTimelineItem);
};

export default ZzTimelineItem;
