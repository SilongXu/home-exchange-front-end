import http from '../shared/services/http'

const prefix = 'retrieval';
const catalogPrefix = 'catalog';
const metaPrefix = 'meta';
const apiPrefix = 'api';
const meta = 'meta';
const dataFlow = "dataflow";

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
  getArchiveTrendeCharts(countType, satellites, sensors, productLevels, startTime, endTime){
    return http.post(`/${prefix}/system/log/importTrend/detail`,
    {
      "countType": countType,
      "satellites": satellites,
      "sensors": sensors,
      "productLevels": productLevels,
      "endTime": endTime,
      "startTime": startTime
    }
    )
  },
  downloadArchiveExcel(countType, satellites, sensors, productLevels, startTime, endTime){
    return http.post(`/${prefix}/system/log/importTrend/excel`,
    {
      "countType": countType,
      "satellites": satellites,
      "sensors": sensors,
      "productLevels": productLevels,
      "endTime": endTime,
      "startTime": startTime
    },{responseType: 'blob'})
  },
  getArchiveBottomOptions(nodeCode){
    return http.get(`${prefix}/system/options/importInfo/${nodeCode}`);
  },
};

export default MonitorService;
