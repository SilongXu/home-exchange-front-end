import http from '../shared/services/http'

const searchService = {

  getMenuRootNode() {
    return http.get('retrieval/system/directory');
  },

  getMenuNodeByParentId(parentId) {
    return http.get(`retrieval/system/directory/${parentId}`);
  },

  getTagList() {
    return http.get(`/retrieval/system/tag`);
  },

  getSearchFilters(menuId) {
    return http.get(`/retrieval/system/search/filters/${menuId}`);
  },

  getSearchResults(page, size, catalogId, filters, input) {
    return http.post(`retrieval/system/search?page=${page}&size=${size}`, { catalogId, filters, input }); 
  },
};

export default searchService;
