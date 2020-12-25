import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';
const dataFlow = 'dataflow';

const importService = {
  getUpdateDataType(){
    return http.get(`/${prefix}/system/options/updateDataType`);
  },

  getImportPath(){
    return http.get(`/${prefix}/system/options/path`);
  },
  importIntData(formData){
    return http.post(`${prefix}/system/data/upload/dir`, formData);
  },

  //数据导入三个接口
  getUploadDataTypeNormal(){
    return http.get(`${prefix}/system/options/getAllProductType`);
  },
  /*getImportPathNormal(){
    return http.get(`${prefix}/system/options/getManualPath`);
  },*/
  importData(formData){
    return http.post(`${prefix}/system/data/manual/upload`, formData);
  },
  //批量导入接口
  getImportBatchNodeList(){
    return http.get(`/${prefix}/system/options/nodeInfo`);
  },
  getImportBatchInfoList(nodeCode){
    return http.get(`${prefix}/system/options/importInfo/${nodeCode}`);
  },
  importDataBatch(importPath, productLevel, satellite, sensor){
    return http.post(`/${prefix}/system/data/manual/upload/batch`,
    {
      "importPath": importPath,
      "productLevel": productLevel,
      "satellite": satellite,
      "sensor": sensor
    }
    )
  },
  getImportListContentTables(page,size,requestBody){
    return http.post(`${prefix}/system/log/importLog/detail?page=${page}&size=${size}`,requestBody)
  },

  //导出模块
  getExportTableData(page, size, requestBody){
    return http.post(`${dataFlow}/taskLog/detail?page=${page}&size=${size}`, requestBody);
  },
  getExportProductTypeAndDataId(requestBody){
    return http.post(`${dataFlow}/exportLog/detail?page=1&size=100`, requestBody);
  }
};

export default importService;