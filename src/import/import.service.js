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
  }
};

export default importService;