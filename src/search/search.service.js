import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';

const SearchService = {

  getMenuNodeByParentId(parentId) {
    return http.get(`/${catalogPrefix}/system/directory/${parentId}`);
  },

  getSearchFilters(menuId) {
    return http.get(`/${prefix}/system/search/filters/${menuId}`);
  },

  getSearchResults(page, size, requestBody) {
    return http.post(`/${prefix}/system/search?page=${page}&size=${size}`, requestBody); 
  },

  getTagList() {
    return http.get(`/${catalogPrefix}/system/tag`);
  },

  batchAddTag(filters, tags) {
    return http.post(`/${catalogPrefix}/system/tag/batch`, { filters, tags }); 
  },

  addTag(id, tags) {
    return http.post(`/${catalogPrefix}/system/tag/${id}`, tags);
  },

  getTagByFileId(id) {
    return http.get(`/${catalogPrefix}/system/tag/${id}`);
  },

  getDivisionById(divisionLevel,divisionId = -1) {
    return http.get(`/retrieval/system/options/division/${divisionLevel}/${divisionId}`);
  },

  uploadShapefile(shapefile) {
    return http.post(`retrieval/system/search/file`, shapefile);
  },

  getDetailDownload(dataId, productType){
    return http.post(`/retrieval/system/data/download/?dataId=${dataId}&productType=${productType}`, {},
    {responseType: 'blob'});
  },
  
  getMetadata(dataId, productType){
    return http.post(`/retrieval/system/data/metadata/?dataId=${dataId}&productType=${productType}`);
  },

  getXmlDetail(path) {
    return http.post(`/retrieval/system/data/getBase64?filePath=${path}`);
  }
};

export default SearchService;
