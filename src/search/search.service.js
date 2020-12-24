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

  getDivisionById(divisionLevel, divisionId = -1) {
    return http.get(`/retrieval/system/options/division/${divisionLevel}/${divisionId}`);
  },

  uploadShapefile(shapefile) {
    return http.post(`retrieval/system/search/file`, shapefile);
  },

  getDetailDownload(dataId, productType) {
    return http.post(`/retrieval/system/data/download/?dataId=${dataId}&productType=${productType}`, {},
      { responseType: 'blob' });
  },

  getMetadata(dataId, productType) {
    return http.post(`/retrieval/system/data/metadata/?dataId=${dataId}&productType=${productType}`);
  },

  getXmlDetail(path) {
    return http.post(`/retrieval/system/data/getBase64?filePath=${path}`);
  },
  getExportSelectedAsExcel(selectedDataList) {
    return http.post(`${prefix}/system/data/export/excel`, selectedDataList, { responseType: 'blob' })
  },
  getExportAllAsExcel(requestBody) {
    return http.post(`${prefix}/system/search/export/excel`, requestBody, { responseType: 'blob' })
  },
  getExportSelectedAsShapefile(selectedDataList) {
    return http.post(`${prefix}/system/data/export/shapefile`, selectedDataList, { responseType: 'blob' })
  },
  getExportAllAsShapefile(requestBody) {
    return http.post(`${prefix}/system/search/export/shapefile`, requestBody, { responseType: 'blob' })
  },

  //保存搜索模板
  //添加文件夹\
  createDirByParentId(requestBody) {
    return http.post(`${prefix}/navigator/newDir`, requestBody)
  },
  //创建文件  --用户保存搜索条件
  createFileByParentId(requestBody) {
    return http.post(`${prefix}/navigator/newFile`, requestBody)
  },
  //加载搜索条件模板树--更具当前节点的Id加载子节点
  getTemplateTreeNodeByParentId(parentId) {
    return http.post(`${prefix}/navigator/getChildren?id=${parentId}`)
  },
  //删除树节点---文件或者文件夹
  deleteTreeNodeById(id) {
    return http.post(`${prefix}/navigator/delete?id=${id}`)
  },
  //更新文件里面的内容
  updateCurrentFileContent(requestBody){
    return http.post(`${prefix}/navigator/updateFile`, requestBody)
  },
  //重命名文件或文件夹
  renameDirOrFileById(id,rename){
    return http.post(`${prefix}/navigator/rename?id=${id}&newName=${rename}`)
  },
  getFileContentById(id){
    return http.post(`${prefix}/navigator/getFile?id=${id}`)
  },

  //购物车
  addInShoppingTrolley(dataIdParams){
    return http.put(`${prefix}/data/cart`,dataIdParams);
  },
  checkShoppingTrolley(page, size){
    return http.get(`${prefix}/data/cart?page=${page}&size=${size}`)
  },
  deleteAllItemsShoppingTrolley(){
    return http.delete(`${prefix}/data/cart`)
  },
  deleteSelectedItemsShoppingTrolley(dataIds){
    return http.post(`${prefix}/data/cart/delete`,dataIds)
  },
  exportShoppingTrolley(path){
    return http.post(`${prefix}/data/cart/export`, path)
  },
};

export default SearchService;
