const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svgs", false, /.svg$/);
requireAll(req);

import SvgIcon from './svg-icon';

/* istanbul ignore next */
SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon);
};

export default SvgIcon;