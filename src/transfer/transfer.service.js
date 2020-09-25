import http from '../shared/services/http';

const catalogPrefix = 'catalog';

const TransferSerivce = {
  getMenuNodeByParentId(parentId) {
    return http.get(`/${catalogPrefix}/system/directory/${parentId}`);
  },
}

export default TransferSerivce;
