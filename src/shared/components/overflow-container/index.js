import OverflowContainer from './overflow-container';

/* istanbul ignore next */
OverflowContainer.install = function(Vue) {
  Vue.component(OverflowContainer.name, OverflowContainer);
};

export default OverflowContainer;