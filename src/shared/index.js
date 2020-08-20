import SvgIcon from './components/svg-icon/index';
import http from './services/http';

const components = [
  SvgIcon,
];

const services = {
  http,
}

/* istanbul ignore next */
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Object.keys(services).forEach(serviceName => {
    Vue[serviceName] = services[serviceName];
    Vue.prototype[`$${serviceName}`] = services[serviceName];
  });
};

export default {
  install
};