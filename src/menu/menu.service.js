import http from '../shared/services/http'

const prefix = 'catalog';

const MenuService = {

  getMenuNodeByParentId(parentId) {
    return http.get(`/${prefix}/system/directory/${parentId}`);
  },

};

export default MenuService;
