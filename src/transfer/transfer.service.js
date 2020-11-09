import http from '../shared/services/http';

const catalogPrefix = 'catalog';
const prefix = 'retrieval';

const TransferSerivce = {
  getMenuNodeByParentId(parentId) {
    return http.get(`/${catalogPrefix}/system/directory/${parentId}`);
  },
  getLeafNodeList(catalogId, page, size){
    return http.get(`/${catalogPrefix}/system/directory/getLeaves?catalogId=${catalogId}&page=${page}&size=${size}`);
  },
}

export default TransferSerivce;
