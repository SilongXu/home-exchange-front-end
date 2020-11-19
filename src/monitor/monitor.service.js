import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';
const metaPrefix = 'meta';
const apiPrefix = 'api';

const MonitorService = {
  getMenuTabs() {
    return http.get(`/${prefix}/system/stat/nodeCodes`);
  },

  getHistoryTrend(nodeCode, period) {
    return http.get(`/${prefix}/system/stat/resource/trend/${nodeCode}?period=${period}`);
  },

  getResourceCount() {
    return http.get(`/${prefix}/system/stat/resource`);
  },

  getImportTrend() {
    return http.get(`/${prefix}/system/stat/import/trend`);
  },

  getSearchTrend() {
    return http.get(`/${prefix}/system/stat/search/trend`);
  },

  getErrorLog() {
    return http.get(`/${prefix}/system/log/importLog`);
  },
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
  }
};

export default MonitorService;
