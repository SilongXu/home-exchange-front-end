import http from '../shared/services/http'

const searchService = {

  getMenuRootNode() {
    return http.get('/retrieval/system/directory');
  },

  getMenuNodeByParentId(parentId) {
    return http.get(`/retrieval/system/directory/${parentId}`);
  },

  getTagList() {
    return http.get(`/retrieval/system/tag`);
  },

  getSearchFilters(menuId) {
    return http.get(`/retrieval/system/search/filters/${menuId}`);
  },

  getSearchResults(page, size, requestBody) {
    return http.post(`/retrieval/system/search?page=${page}&size=${size}`, requestBody); 
  },

  batchAddTag(filters, tags) {
    return http.post(`/retrieval/system/tag/batch`, { filters, tags }); 
  },

  addTag(id, tags) {
    return http.post(`/retrieval/system/tag/${id}`, tags);
  },

  getTagByFileId(id) {
    return http.get(`/retrieval/system/tag/${id}`);
  },

  getDivisionById(divisionId = -1) {
    return http.get(`/retrieval/system/options/division/${divisionId}`);
  },

  uploadShapefile(shapefile) {
    return http.post(`retrieval/system/search/file`, shapefile);
  },
};

export default searchService;
