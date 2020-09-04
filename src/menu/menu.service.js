import http from '../shared/services/http'

const prefix = 'catalog';

const MenuService = {

  getMenuNodeByParentId(parentId) {
    return http.get(`/${prefix}/system/directory/${parentId}`);
  },

  createMenuNode(catalogId, metaEnumFieldDTO) {
    return http.put(`/${prefix}/system/directory`, { catalogId, metaEnumFieldDTO });
  },

  deleteMenuNode(ids) {
    return http.post(`/${prefix}/system/directory/delete`, ids);
  },

  getMetaField(id) {
    return http.get(`/${prefix}/system/directory/metafield/${id}`);
  },

  enumfield(fieldCode) {
    return http.get(`/${prefix}/system/directory/enumfield/${fieldCode}`);
  },
};

export default MenuService;
