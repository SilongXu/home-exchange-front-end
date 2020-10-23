<template>
  <div class="search-filter">
    <div
      class="search-filter-entry"
      :class="filter.queryType === 54 ? 'large' : ''"
      v-for="(filter, index) in filterList"
      :key="index"
    >
      <div class="label" :class="{ bottom: filter.queryType === 53 }">
        {{ filter.fieldName }}
      </div>
      <el-select
        v-if="filter.queryType === 11"
        v-model="filter.value"
        placeholder="请选择"
        size="small"
        clearable
        multiple
      >
        <el-option
          v-for="item in filter.options"
          :key="item.enumName"
          :label="item.enumName"
          :value="item.enumCode"
        >
        </el-option>
      </el-select>
      <el-input
        v-if="filter.queryType === 12"
        v-model="filter.value"
        placeholder="请输入"
        size="small"
      ></el-input>
      <el-input-number
        v-if="filter.queryType === 21"
        v-model="filter.value"
        :min="0"
        placeholder="请输入数字"
        size="small"
      ></el-input-number>
      <div class="input-group" v-if="filter.queryType === 22">
        <el-input-number
          v-model="filter.fromValue"
          @change="onFilterFromToChange(filter)"
          :min="0"
          placeholder="请输入数字"
          size="small"
        ></el-input-number>
        至
        <el-input-number
          v-model="filter.toValue"
          @change="onFilterFromToChange(filter)"
          :min="0"
          placeholder="请输入数字"
          size="small"
        ></el-input-number>
      </div>
      <el-input
        v-if="filter.queryType === 31"
        v-model="filter.value"
        type="number"
        :min="0"
        placeholder="请输入数字"
        size="small"
      ></el-input>
      <div class="input-group" v-if="filter.queryType === 32">
        <el-input
          v-model="filter.fromValue"
          @change="onFilterFromToChange(filter)"
          type="number"
          :min="0"
          placeholder="请输入数字"
          size="small"
        ></el-input>
        至
        <el-input
          v-model="filter.toValue"
          @change="onFilterFromToChange(filter)"
          type="number"
          :min="0"
          placeholder="请输入数字"
          size="small"
        ></el-input>
      </div>
      <el-date-picker
        v-if="filter.queryType === 41"
        v-model="filter.value"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        size="small"
        placeholder="选择日期"
      >
      </el-date-picker>
      <div v-if="filter.queryType === 42">
        <el-date-picker
          v-model="filter.fromValue"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="开始日期"
          size="small"
          @change="onFilterFromToChange(filter)"
        >
        </el-date-picker>
        <span class="data-separator">至</span>
        <el-date-picker
          v-model="filter.toValue"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="结束日期"
          size="small"
          @change="onFilterFromToChange(filter)"
        >
        </el-date-picker>
      </div>
      <div class="input-group" v-if="filter.queryType === 51">
        <el-input
          v-model="filter.lonValue"
          type="number"
          :min="0"
          placeholder="请输入经度"
          size="small"
        ></el-input>
        <el-input
          v-model="filter.latValue"
          type="number"
          :min="0"
          placeholder="请输入纬度"
          size="small"
        ></el-input>
      </div>
      <div class="input-group" v-if="filter.queryType === 52">
        <el-input
          v-model="filter.centralLon"
          type="number"
          :min="0"
          placeholder="请输入圆心经度"
          size="small"
        ></el-input>
        <el-input
          v-model="filter.centralLat"
          type="number"
          :min="0"
          placeholder="请输入圆心纬度"
          size="small"
        ></el-input>
        <el-input
          v-model="filter.radius"
          type="number"
          :min="0"
          placeholder="请输入半径"
          size="small"
        ></el-input>
      </div>
      <div class="input-group" v-if="filter.queryType === 54">
        <el-input
          v-model="filter.lons"
          :min="0"
          placeholder="请输入经度, 以逗号分割"
          size="small"
        ></el-input>
        <el-input
          v-model="filter.lats"
          :min="0"
          placeholder="请输入经度, 以逗号分割"
          size="small"
        ></el-input>
      </div>
      <div class="input-group-container" v-if="filter.queryType === 53">
        <div class="input-group bottom">
          <el-input
            v-model="filter.northEastLon"
            type="number"
            :min="0"
            placeholder="请输入右上角经度"
            size="small"
          ></el-input>
          <el-input
            v-model="filter.northEastLat"
            type="number"
            :min="0"
            placeholder="请输入右上角纬度"
            size="small"
          ></el-input>
        </div>
        <div class="input-group bottom">
          <el-input
            v-model="filter.northWestLon"
            type="number"
            :min="0"
            placeholder="请输入左上角经度"
            size="small"
          ></el-input>
          <el-input
            v-model="filter.northWestLat"
            type="number"
            :min="0"
            placeholder="请输入左上角纬度"
            size="small"
          ></el-input>
        </div>
        <div class="input-group bottom">
          <el-input
            v-model="filter.southEastLon"
            type="number"
            :min="0"
            placeholder="请输入右下角经度"
            size="small"
          ></el-input>
          <el-input
            v-model="filter.southEastLat"
            type="number"
            :min="0"
            placeholder="请输入右下角纬度"
            size="small"
          ></el-input>
        </div>
        <div class="input-group">
          <el-input
            v-model="filter.southWestLon"
            type="number"
            :min="0"
            placeholder="请输入左下角经度"
            size="small"
          ></el-input>
          <el-input
            v-model="filter.southWestLat"
            type="number"
            :min="0"
            placeholder="请输入左下角纬度"
            size="small"
          ></el-input>
        </div>
      </div>
      <div class="input-group" v-if="filter.queryType === 55">
        <el-upload
          class="upload"
          action="customize"
          accept=".zip"
          :on-remove="handleRemove"
          :http-request="uploadFile"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div class="input-group" v-if="filter.queryType === 56">
        <el-select
          v-model="filter.country.id"
          placeholder="请选择国家或地区"
          filterable
          size="small"
          clearable
          :loading="loadingCountry"
          @visible-change="onCountryVisibleChange"
          @change="onSelectCountry(filter.country.id)"
          @clear="onClearCountry"
        >
          <el-option
            v-for="country in countries"
            :key="country.id"
            :label="country.name"
            :value="country.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="filter.province.id"
          placeholder="请选择省份/州"
          filterable
          :disabled="provincesDisable"
          size="small"
          clearable
          :loading="loadingProvince"
          @visible-change="onProvinceVisibleChange"
          @change="onSelectProvince"
          @clear="onClearProvince"
        >
          <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.name"
            :value="province.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="filter.city.id"
          placeholder="请选择城市"
          filterable
          clearable
          :disabled="citiesDisable"
          size="small"
          :loading="loadingCity"
          @visible-change="onCityVisibleChange"
          @change="onSelectCity"
          @clear="onClearCity"
        >
          <el-option
            v-for="city in cities"
            :key="city.id"
            :label="city.name"
            :value="city.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="filter.county.id"
          placeholder="请选择区县"
          clearable
          filterable
          :disabled="countiesDisable"
          size="small"
          :loading="loadingDistrict"
          @visible-change="onDistrictVisibleChange"
          @change="onSelectDistrict(filter.county.id)"
        >
          <el-option
            v-for="county in counties"
            :key="county.id"
            :label="county.name"
            :value="county.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group" v-if="filter.queryType === 61">
        <el-select
          v-model="filter.tag"
          filterable
          clearable
          :loading="loadingTags"
          placeholder="请选择标签"
          size="small"
          value-key="id"
          @visible-change="onTagsVisibleChange"
        >
          <el-option
            v-for="tag in tagOptions"
            :key="tag.id"
            :label="tag.name"
            :value="tag"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from "./search.service";

export default {
  name: "SearchFilter",
  data() {
    return {
      divisionLevel: ["COUNTRY", "PROVINCE", "CITY", "COUNTY"],
      filterList: [],
      tagOptions: [],
      loadingTags: false,
      loadingCountry: false, //是否开启自动加载远程数据
      loadingProvince: false, //是否开启自动加载远程数据
      loadingCity: false, //是否开启自动加载远程数据
      loadingDistrict: false, //是否开启自动加载远程数据
      countries: [], //国家列表
      provinces: [], //省/州列表
      cities: [], //城市列表
      counties: [], //区/县列表
      fileList: [],
      countriesCache: [], //国家列表缓存
      provincesCache: [], //省列表缓存
      cities: [], //城市列表缓存
      countiesCache: [], //县列表缓存
      countriesDisable: true, //下拉列表是否可用
      provincesDisable: true,
      citiesDisable: true,
      countiesDisable:true,
    };
  },
  methods: {
    onFilterChange() {
      this.$emit("filterChange", this.filterList);
    },
    onTagsVisibleChange(visible) {
      if (visible && !this.tagOptions.length) {
        this.loadingTags = true;
        apiService
          .getTagList()
          .then((tags) => {
            this.tagOptions = tags.data;
            this.loadingTags = false;
          })
          .catch(() => {
            this.loadingTags = false;
          });
      }
    },
    onCountryVisibleChange(visible) {
      if (visible) {
        this.loadingCountry = true; //开启远程加载国家列表
        if (this.countriesCache.length > 0) {
          //当中间变量已经存在时,直接关闭远程加载
          this.loadingCountry = false;
        } else {
          //异步http请求,请求国家的列表
          this.fetchDivisionById(this.divisionLevel[0], -1)
            .then((options) => {
              //对从后端获取的数据options进行过滤,用中间变量存储请求结果,避免每次都重复请求
              this.countriesCache = options.data;
              this.countries = this.countriesCache;
              this.loadingCountry = false; //关闭远程加载
            })
            .catch(() => {
              this.countries = [];
              this.loadingCountry = false;
            });
        }
      }
    },
    onSelectCountry(countryId) {
      this.citiesDisable = true; //城市列表禁用
      this.countiesDisable = true; //县区列表禁用
      this.loadingProvince = true;  //开启远程加载省列表
      //当国家选定时,根据ID向后端请求省列表的数据
      this.fetchDivisionById(this.divisionLevel[1], countryId)
        .then((options) => { 
          //将省列表数据存进中间变量
          this.provincesCache = options.data;
          //当省列表数据存在不为空的时候,省列表可用可选
          if (this.provincesCache.length > 0) {
            this.provincesDisable = false;
          }
          this.filterList.map(function (item, index, arr) {
            if (item.queryType == 56) {
              //切换国家时,后面的字段全部设置为空
              item.province.id = "";
              item.province.name = "";
              item.city.id = "";
              item.city.name = "";
              item.county.id = "";
              item.county.name = "";
            }
          });
          this.loadingProvince = false;
        })
        .catch(() => {
          this.cities = [];
          this.loadingProvince = false;
        });
        //将缓存发送给父组件
      this.$emit("sendCountriesCache", this.countriesCache);
    },
    onClearCountry() {
      //清空国家列表时,省列表禁用
      this.provincesDisable = true;
    },
    onProvinceVisibleChange() {
      //当选中省列表框时,将缓存的省列表信息给provinces
      this.provinces = this.provincesCache;
    },
    onSelectProvince(provinceId) {
      //设置县区列表禁用
      this.countiesDisable = true;
      this.loadingCity = true;  //开启远程加载城市
      this.fetchDivisionById(this.divisionLevel[2], provinceId)
        .then((options) => {
          //将城市列表数据放入缓存
          this.citiesCache = options.data;
          //城市列表数据不为空,开启列表可用
          if (this.citiesCache.length > 0) {
            this.citiesDisable = false;
          }
          //在选定省时,城市和县区列表数据清空
          this.filterList.map(function (item, index, arr) {
            if (item.queryType == 56) {
              item.city.id = "";
              item.city.name = "";
              item.county.id = "";
              item.county.name = "";
            }
          });
          this.loadingCity = false; //关闭远程加载
        })
        .catch(() => {
          this.cities = [];
          this.loadingCity = false;
        });
        //将城市列表数据发送给父组件
      this.$emit("sendProvincesCache", this.provincesCache);
    },
    onClearProvince() {
      //清空省列表时,设置城市和县区列表禁用并清空他们的数据
      this.citiesDisable = true;
      this.countiesDisable = true;
      this.filterList.map(function (item, index, arr) {
        if (item.queryType == 56) {
          item.city.id = "";
          item.city.name = "";
          item.county.id = "";
          item.county.name = "";
        }
      });
    },
    onCityVisibleChange() {
      //当选中城市列表的时候,将缓存放入cities
      this.cities = this.citiesCache;
    },
    onSelectCity(cityId) {
      this.loadingDistrict = true;
      this.fetchDivisionById(this.divisionLevel[3], cityId)
        .then((options) => {
          this.countiesCache = options.data;
          if (this.countiesCache.length > 0) {
            this.countiesDisable = false;
          }
          this.filterList.map(function (item, index, arr) {
            if (item.queryType == 56) {
              item.county.id = "";
              item.county.name = "";
            }
          });
          this.loadingDistrict = false;
        })
        .catch(() => {
          this.cities = [];
          this.loadingDistrict = false;
        });
      this.$emit("sendCitesCache", this.citiesCache);
    },
    onClearCity() {
      this.countiesDisable = true;
      this.filterList.map(function (item, index, arr) {
        if (item.queryType == 56) {
          item.county.id = "";
          item.county.name = "";
        }
      });
    },
    onDistrictVisibleChange() {
      this.counties = this.countiesCache;
    },
    onSelectDistrict(countyId) {
      this.$emit("sendCountiesCache", this.countiesCache);
    },
    uploadFile(file) {
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      const _file = file.file;
      const shapefile = new FormData();
      shapefile.append("shapefile", _file);
      apiService.uploadShapefile(shapefile).then(() => {});
    },
    handleRemove() {},
    fetchDivisionById(divisionLevel, divisionId) {
      return apiService.getDivisionById(divisionLevel, divisionId);
    },
    fetchFilterList(node) {
      // 获取过滤条件列表
      if (!node.nodeCode) {
        node.nodeCode = "ALL";
      }
      apiService
        .getSearchFilters(node.nodeCode)
        .then((filters) => {
          this.filterList = filters.data;
        })
        .catch(() => {});
    },
    onFilterFromToChange(filter) {
      if (filter.fromValue && filter.toValue) {
        if (filter.fromValue > filter.toValue) {
          const tmp = filter.toValue;
          filter.toValue = filter.fromValue;
          filter.fromValue = tmp;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";

.search-filter {
  @include flex-align(flex-start, flex-start);
  flex-wrap: wrap;
  padding: 20px 20px 4px 20px;

  &-entry {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-bottom: 16px;
    font-size: $font-md;

    &:not(:last-of-type) {
      margin-right: 32px;
    }

    .label {
      margin-right: 12px;
      white-space: nowrap;
    }
  }

  .data-separator {
    margin: 0 15px;
  }

  .input-group {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: 10px;

    .el-input-number:not(:last-of-type) {
      margin-right: 10px;
    }
    .el-input-number:not(:first-of-type) {
      margin-left: 10px;
    }

    .el-select {
      width: 250px;
    }

    .el-input {
      width: 180px;
      margin: 0 10px;
    }
    .el-select:not(:last-child),
    .el-input:not(:last-child) {
      margin-right: 8px;
    }
  }

  .input-group-container {
    @include flex-align(flex-start, flex-start);
    flex-wrap: wrap;
  }

  .bottom {
    margin-bottom: 16px;
  }
}

.el-cascader {
  width: 360px;
}
</style>