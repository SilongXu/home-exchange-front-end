import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';
const metaPrefix = 'meta';
const apiPrefix = 'api';
const meta = 'meta';
const dataFlow = "dataflow";

const interfaceService = {
 
  getInterfaceType() {
    return http.post(`/${metaPrefix}/metaField/enum/list`, {
      "fieldCodes": ["messageType"],
      "nodeCode": "CHDL"
    })
  },
  getAccepterList() {
    return http.post(`/${metaPrefix}/metaField/enum/list`, {
      "fieldCodes": ["systemCode"],
      "nodeCode": "CHDL"
    })
  },
  getSenderList(){
    return http.post(`/${metaPrefix}/metaField/enum/list`, {
      "fieldCodes": ["systemCode"],
      "nodeCode": "CHDL"
    })
  },
  getSearchContent(page,size,responseBody){
    return http.post(`/${apiPrefix}/interfaceExcutionLog/list?page=${page}&size=${size}`,responseBody)
  },
};

export default interfaceService;
