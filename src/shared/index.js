import SvgIcon from './svg-icon/index';

const components = [
  SvgIcon,
];

/* istanbul ignore next */
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export default {
  install
};