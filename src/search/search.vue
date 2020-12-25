<template>
  <div class="search">
    <search-input @inputChange="onInputChange" ref="input"></search-input>
    <div class="search-empty-box"></div>
    <div class="search-content">
      <div
        class="search-content-left"
        :style="{ height: clientHeight - 240 + 'px' }"
      >
        <search-menu @menuChange="onMenuChange" ref="menu"></search-menu>
      </div>
      <div
        class="search-content-right"
        :style="{ height: clientHeight - 240 + 'px' }"
      >
        <search-filter
          ref="filter"
          @filterChange="onFilterChange"
          @sendCountriesCache="acceptCountriesCache"
          @sendProvincesCache="acceptProvincesCache"
          @sendCitesCache="accpetCitiesCache"
          @sendCountiesCache="accepCountiesCache"
        >
        </search-filter>
        <search-result
          ref="result"
          :filters="getFilterForResult()"
          @clearItems="onClearItems"
        ></search-result>
      </div>
    </div>
    <span class="drawerIcon" @click="checkShoppingTrolley()">
      <svg-icon icon="angle-left" size="16px"></svg-icon>
    </span>
    <drawer ref="drawer"></drawer>
  </div>
</template>
<script>
import SearchFilter from "./search-filter";
import SearchInput from "./search-input";
import SearchMenu from "./search-menu";
import SearchResult from "./search-result";
import drawer from "./modal/drawer";
import apiService from "./search.service";

export default {
  name: "Search",
  components: {
    SearchFilter,
    SearchInput,
    SearchMenu,
    SearchResult,
    drawer
  },
  data: () => {
    return {
      clientHeight: document.body.clientHeight,
      inputFilter: "",
      menuFilter: null,
      needFilter: false,
      countriesCache: [], //接收国家列表的数据
      provincesCache: [], //接收省列表的数据
      citiesCache: [], //接收城市列表的数据
      countiesCache: [] //接收县区列表的数据
    };
  },
  mounted() {
    this.fetchResult();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        that.clientHeight = window.screenHeight;
      })();
    };
  },
  watch: {
    clientHeight(val) {
      if (!this.timer) {
        this.clientHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(() => {
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    checkShoppingTrolley(){
      this.$refs.drawer.drawerVisible = true;
      apiService.checkShoppingTrolley(this.$refs.drawer.pagination.page, this.$refs.drawer.pagination.size)
      .then((data) => {
        this.$refs.drawer.pagination = data.data.pagination
        this.$refs.drawer.drawerTableData = data.data.data;
      })
    },
    //通过监听接收子节点传送来的数据
    acceptCountriesCache(countriesCache) {
      this.countriesCache = countriesCache ? countriesCache : [];
    },
    acceptProvincesCache(provincesCache) {
      this.provincesCache = provincesCache ? provincesCache : [];
    },
    accpetCitiesCache(citiesCache) {
      this.citiesCache = citiesCache ? citiesCache : [];
    },
    accepCountiesCache(countiesCache) {
      this.countiesCache = countiesCache ? countiesCache : [];
    },
    fetchResult() {
      //搜索的时候默认回到第一页
      if (this.$refs.result.pagination.page != 0) {
        this.$refs.result.pagination.page = 0;
      }
      // 这里执行搜索
      this.$refs.result.fetchResult(this.getFilterForResult());
    },
    getFilterList() {
      return {
        catalogId: this.menuFilter?.id,
        input: this.inputFilter,
        filters: this.$refs.filter
          ? JSON.stringify(this.$refs.filter.filterList)
          : "[]"
      };
    },
    getFilterForResult() {
      const fList = this.checkFilterValue();
      return {
        catalogId: this.menuFilter?.id ? this.menuFilter.id : -1,
        nodeCode: this.menuFilter?.nodeCode ? this.menuFilter.nodeCode : "ALL",
        filters: fList
          ? JSON.stringify(
              fList.concat({
                fieldCode: null,
                fieldName: null,
                queryType: 0,
                dataType: null,
                value: this.inputFilter
              })
            )
          : "[]"
      };
    },
    onInputChange(filter) {
      this.inputFilter = filter;
      this.fetchResult();
    },
    onMenuChange(node) {
      if (!this.menuFilter) {
        this.menuFilter = node;
        this.$refs.filter.fetchFilterList(this.menuFilter);
      } else {
        if (this.menuFilter.nodeCode != node.nodeCode) {
          this.menuFilter = node;
          this.$refs.filter.fetchFilterList(this.menuFilter);
        } else {
          this.menuFilter = node;
        }
      }
      this.$refs.input.search();
    },
    onFilterChange() {
      this.fetchResult();
    },
    onClearItems() {
      this.$refs.filter.clearFilterItems();
    },
    checkFilterValue() {
      let fList;
      if (!this.$refs.filter) {
        return null;
      }
      fList = this.$refs.filter.filterList.filter(filter => {
        switch (filter.queryType) {
          case 11: {
            if (filter.value != null && filter.value.length != 0) {
              return filter;
            }
            break;
          }
          case 12:
          case 21:
          case 31:
          case 41: {
            if (filter.value) {
              return filter;
            }
            break;
          }
          case 22:
          case 32: {
            if (filter.fromValue || filter.toValue) {
              return filter;
            }
            break;
          }
          case 42: {
            if (filter.fromValue || filter.toValue) {
              return filter;
            }
            break;
          }
          case 51: {
            if (filter.lonValue && filter.latValue) {
              return filter;
            }
            break;
          }
          case 52: {
            if (filter.centralLon && filter.centralLat) {
              return filter;
            }
            break;
          }
          case 54: {
            if (filter.lons && filter.lats) {
              filter.lons = filter.lons.split(",");
              filter.lats = filter.lats.split(",");
              return filter;
            }
            break;
          }
          case 53: {
            if (
              filter.northEastLon &&
              filter.northEastLat &&
              filter.northWestLon &&
              filter.northWestLat &&
              filter.southEastLon &&
              filter.southEastLat &&
              filter.southWestLat &&
              filter.southWestLon
            ) {
              return filter;
            }
            break;
          }
          // case 55: {

          // }
          case 56: {
            if (
              filter.country &&
              filter.province &&
              filter.city &&
              filter.county
            ) {
              if (filter.country.id) {
                const newCountry = this.countriesCache.filter(function(target) {
                  return target.id == filter.country.id;
                })[0];
                filter.country.id = newCountry.id;
                filter.country.name = newCountry.name;
              }

              if (filter.province.id) {
                const newProvince = this.provincesCache.filter(function(
                  target
                ) {
                  return target.id == filter.province.id;
                })[0];
                filter.province.id = newProvince.id;
                filter.province.name = newProvince.name;
              }

              if (filter.city.id) {
                const newCity = this.citiesCache.filter(function(target) {
                  return target.id == filter.city.id;
                })[0];
                filter.city.id = newCity.id;
                filter.city.name = newCity.name;
              }

              if (filter.county.id) {
                const newCounty = this.countiesCache.filter(function(target) {
                  return target.id == filter.county.id;
                })[0];
                filter.county.id = newCounty.id;
                filter.county.name = newCounty.name;
              }
            }

            if (filter.country.id) {
              return filter;
            }
            break;
          }
          case 61: {
            if (filter.tag) {
              return filter;
            }
            break;
          }
          default:
            return filter;
        }
      });

      //解析数字地球坐标传给后端
      this.$refs.filter.filterDigitalEarth.shape = this.$refs.filter.digitalEarthContent;
      if (this.$refs.filter.filterDigitalEarth.shape != "") {
        fList.push(this.$refs.filter.filterDigitalEarth);
      }
      return fList;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.search {
  flex: 1;
  .search {
    &-input {
      right: 8px;
    }
  }

  &-empty-box {
    width: 100%;
    height: 88px;
  }

  &-content {
    display: flex;
    align-items: stretch;
    border-top: 1px solid $border-dark;
    background: $bg-light;

    &-left {
      flex-shrink: 0;
      width: 400px;
      border-right: 1px solid $border-dark;
      overflow: auto;
    }

    &-right {
      flex: 1;
      min-width: 0;
      overflow: auto;
    }
  }

  &-filter {
    border-bottom: 1px solid $border-dark;
  }
}
.drawerIcon {
  position: fixed;
  right: 0px;
  bottom: 50%;
  .svg-icon:hover {
    fill: $brand-primary;
    cursor: pointer;
  }
}
</style>