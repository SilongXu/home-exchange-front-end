<template>
  <div class="search-filter" >
    <div class="search-filter-entry" :class="filter.queryType === 54 ? 'large' : ''" v-for="(filter, index) in filterList" :key="index">
      <div class="label" :class="{bottom: filter.queryType === 53}">{{filter.fieldName}}</div>
      <el-select v-if="filter.queryType === 11" v-model="filter.value" placeholder="请选择" size="small">
        <el-option
          v-for="item in filter.options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input v-if="filter.queryType === 12" v-model="filter.value" placeholder="请输入" size="small"></el-input>
      <el-input-number v-if="filter.queryType === 21" v-model="filter.value" :min="0" placeholder="请输入数字" size="small"></el-input-number>
      <div class="input-group" v-if="filter.queryType === 22">
        <el-input-number v-model="filter.fromValue" :min="0" placeholder="请输入数字" size="small"></el-input-number>
        至
        <el-input-number v-model="filter.toValue" :min="0" placeholder="请输入数字" size="small"></el-input-number>
      </div>
      <el-input v-if="filter.queryType === 31" v-model="filter.value" type="number" :min="0" placeholder="请输入数字" size="small"></el-input>
      <div class="input-group" v-if="filter.queryType === 32">
        <el-input v-model="filter.fromValue" type="number" :min="0" placeholder="请输入数字" size="small"></el-input>
        至
        <el-input v-model="filter.toValue" type="number" :min="0" placeholder="请输入数字" size="small"></el-input>
      </div>
      <el-date-picker
        v-if="filter.queryType === 41"
        v-model="filter.value"
        type="date"
        size="small"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-date-picker
        v-if="filter.queryType === 42"
        v-model="filter.value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
        @change="changeDataRange(filter)"
      >
      </el-date-picker>
      <div class="input-group" v-if="filter.queryType === 51">
        <el-input v-model="filter.lonValue" type="number" :min="0" placeholder="请输入经度" size="small"></el-input>
        <el-input v-model="filter.latValue" type="number" :min="0" placeholder="请输入纬度" size="small"></el-input>
      </div>
      <div class="input-group" v-if="filter.queryType === 52">
        <el-input v-model="filter.centralLon" type="number" :min="0" placeholder="请输入圆心经度" size="small"></el-input>
        <el-input v-model="filter.centralLat" type="number" :min="0" placeholder="请输入圆心纬度" size="small"></el-input>
        <el-input v-model="filter.radius" type="number" :min="0" placeholder="请输入半径" size="small"></el-input>
      </div>
      <div class="input-group" v-if="filter.queryType === 54">
        <el-input v-model="filter.lon" type="number" :min="0" placeholder="请输入经度" size="small"></el-input>
        <el-input v-model="filter.lat" type="number" :min="0" placeholder="请输入纬度" size="small"></el-input>
      </div>
      <div class="input-group-container" v-if="filter.queryType === 53">
        <div class="input-group bottom">
          <el-input v-model="filter.northEastLon" type="number" :min="0" placeholder="请输入右上角经度" size="small"></el-input>
          <el-input v-model="filter.northEastLat" type="number" :min="0" placeholder="请输入右上角纬度" size="small"></el-input>
        </div>
        <div class="input-group bottom">
          <el-input v-model="filter.northWestLon" type="number" :min="0" placeholder="请输入左上角经度" size="small"></el-input>
          <el-input v-model="filter.northWestLat" type="number" :min="0" placeholder="请输入左上角纬度" size="small"></el-input>
        </div>
        <div class="input-group bottom">
          <el-input v-model="filter.southEastLon" type="number" :min="0" placeholder="请输入右下角经度" size="small"></el-input>
          <el-input v-model="filter.southEastLat" type="number" :min="0" placeholder="请输入右下角纬度" size="small"></el-input>
        </div>
        <div class="input-group">
          <el-input v-model="filter.southWestLon" type="number" :min="0" placeholder="请输入左下角经度" size="small"></el-input>
          <el-input v-model="filter.southWestLat" type="number" :min="0" placeholder="请输入左下角纬度" size="small"></el-input>
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
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div class="input-group" v-if="filter.queryType === 56">
        <el-select
          v-model="filter.country"
          placeholder="请选择国家或地区"
          size="small"
          :loading="loadingCountry"
          @visible-change="onCountryVisibleChange"
          @change="onSelectCountry(filter.country)">
          <el-option
            v-for="country in countries"
            :key="country.id"
            :label="country.name"
            :value="country.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter.province" placeholder="请选择省份/州" size="small" :loading="loadingProvince" @change="onSelectProvince">
          <el-option
            v-for="province in provinces"
            :key="province.id"
            :label="province.name"
            :value="province.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter.city" placeholder="请选择城市" size="small" :loading="loadingCity" @change="onSelectCity">
          <el-option
            v-for="city in cities"
            :key="city.id"
            :label="city.name"
            :value="city.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="filter.district" placeholder="请选择区县" size="small" :loading="loadingDistrict">
          <el-option
            v-for="district in districts"
            :key="district.id"
            :label="district.name"
            :value="district.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-group" v-if="filter.queryType === 61">
        <el-select
          v-model="filter.tags"
          filterable
          :loading="loadingTags"
          placeholder="请选择标签"
          size="small"
          @visible-change="onTagsVisibleChange"
        >
          <el-option
            v-for="tag in tagOptions"
            :key="tag.id"
            :label="tag.name"
            :value="tag.id">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import apiService from './search.service';

export default {
  name: 'SearchFilter',
  data() {
    return {
      filterList: [],
      tagOptions: [],
      loadingTags: false,
      loadingCountry: false,
      loadingProvince: false,
      loadingCity: false,
      loadingDistrict: false,
      countries: [],
      provinces: [],
      cities: [],
      districts: [],
      fileList: [],
    };
  },
  methods: {
    onFilterChange() {
      this.$emit('filterChange', this.filterList);
    },
    onTagsVisibleChange(visible) {
      if (visible) {
        this.loadingTags = true;
        apiService.getTagList()
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
        this.loadingCountry = true;
        this.fetchDivisionById(-1).then((options) => {
          this.countries = options.data;
          this.loadingCountry = false;
        })
        .catch(() => {
          this.countries = [];
          this.loadingCountry = false;
        });
      }
    },
    onSelectCountry(country) {
      this.loadingProvince = true;
      this.fetchDivisionById(country).then((options) => {
        this.provinces = options.data;
        this.loadingProvince = false;
      })
      .catch(() => {
        this.cities = [];
        this.loadingProvince = false;
      });
    },
    onSelectProvince(province) {
      this.loadingCity = true;
      this.fetchDivisionById(province).then((options) => {
        this.cities = options.data;
        this.loadingCity = false;
      })
      .catch(() => {
        this.cities = [];
        this.loadingCity = false;
      });
    },
    onSelectCity(city) {
      this.loadingDistrict = true;
      this.fetchDivisionById(city).then((options) => {
        this.districts = options.data;
        this.loadingDistrict = false;
      })
      .catch(() => {
        this.cities = [];
        this.loadingDistrict = false;
      });
    },
    uploadFile(file) {
      // const isLt2M = _file.size / 1024 / 1024 < 2;
      const _file = file.file;
      const shapefile = new FormData();
      shapefile.append('shapefile', _file);
      apiService.uploadShapefile(shapefile)
      .then(() => {});
    },
    handleRemove() {
      
    },
    fetchDivisionById(divisionId) {
      return apiService.getDivisionById(divisionId);
    },
    fetchFilterList(menuId) {
      // 获取过滤条件列表
      apiService.getSearchFilters(menuId)
      .then((filters) => {
        this.filterList = filters.data;
      })
      .catch(() => {});
    },
    changeDataRange(filter) {
      if (filter && filter.value) {
        filter.fromValue = filter.value[0];
        filter.toValue = filter.value[1];
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/util.scss';

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
      margin: 0 10px
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