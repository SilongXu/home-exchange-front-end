import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';

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
  }
};

export default importService;