import ZzTable from './src/table';

/* istanbul ignore next */
ZzTable.install = function (Vue) {
  Vue.component(ZzTable.name, ZzTable);
};

export default ZzTable;
