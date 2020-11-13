import http from '../shared/services/http';

const catalogPrefix = 'catalog';
const prefix = 'retrieval';

const TransferSerivce = {
  getMenuNodeByParentId(parentId) {
    return http.get(`/${catalogPrefix}/system/directory/${parentId}`);//menu栏
  },
  getLeafNodeList(catalogId, page, size){
    return http.get(`/${catalogPrefix}/system/directory/getLeaves?catalogId=${catalogId}&page=${page}&size=${size}`);//result渲染
  },

  getLastMenuConfigInfo(catalogId){
    return http.get(`/${catalogPrefix}/system/sync/${catalogId}/info`);//单个配置按钮得到上一次的配置信息
  },
  getTransferLogsEachInfo(id){
    return http.get(`/${catalogPrefix}/system/sync/item/${id}/log`);//二级页面的查看详情
  },
  syncLogMenuManual(logId){
    return http.get(`/${catalogPrefix}/system/sync/item/manual?logId=${logId}`);
  },
  getTransferLogsInfos(catalogId, page, size){
    return http.get(`/${catalogPrefix}/system/sync/items?catalogId=${catalogId}&page=${page}&size=${size}`);//进入一级目录的每一行的log详情
  },
  syncCatalogMenuManual(catalogId){
    return http.get(`/${catalogPrefix}/system/sync/manual?catalogId=${catalogId}`);//一级页面的圈圈
  },
  getTransgerConfigSelectOptions(){
    return http.get(`${catalogPrefix}/system/sync/options`);//获取config的两个下拉框的options内容
  },
  updateTransferConfigSettingSingle(catalogId, syncPeriod, syncPoint, syncType){
    return http.post(`/${catalogPrefix}/system/sync/update`,
    {
      "catalogId": catalogId,
      "syncPeriod": syncPeriod,
      "syncPoint": syncPoint,
      "syncType": syncType
    }
    );//单行配置的弹窗的确定按钮调用
  },
  updateTransferConfigSettingBatch(catalogId, searchText, syncPeriod, syncPoint, syncType){
    return http.post(`/${catalogPrefix}/system/sync/updateBatch`,
    {
      "catalogId": catalogId,
      "searchText": searchText,
      "syncPeriod": syncPeriod,
      "syncPoint": syncPoint,
      "syncType": syncType
    }
    );//批量设置的弹窗的确定按钮调用
  }
}

export default TransferSerivce;
