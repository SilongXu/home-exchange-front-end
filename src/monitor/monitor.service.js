import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';

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
  }
};

export default MonitorService;
