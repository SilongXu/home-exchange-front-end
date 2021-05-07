<template>
  <div class="search">
    <layout-header></layout-header>

    <div class="background-part">
      <img src="" alt="" />
    </div>

    <div class="search-input">
      <div class="search-input-group">
        <el-input
          placeholder="Search"
          v-model="inputFilter"
          @keyup.enter.native="search"
          suffix-icon="el-icon-search"
        >
        </el-input>
      </div>
    </div>
    <div class="search-content">
      <div class="search-content-left"></div>
      <div class="search-content-right">
        <div class="search-content-right-details">
          <div class="entry" v-for="entry in searchItems" :key="entry.id">
            <div class="entry-left">
              <el-carousel trigger="click" height="270px">
                <el-carousel-item v-for="item in entry.photos" :key="item.id">
                  <viewer>
                    <img :src="item.src" class="entry-left-img" />
                  </viewer>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="entry-right">
              <div class="entryRightBlock">
                <b>Address:</b> {{ entry.address }}
              </div>
              <div class="entryRightBlock">
                <div class="entryRightBlock-title">
                  <b>Service include:</b>
                </div>
                <div
                  class="entryRightBlock-service"
                  v-for="service in entry.services"
                  :key="service.id"
                >
                  <b>·</b>{{ service.desc }}
                </div>
              </div>
              <div class="entryRightBlock">
                <div class="entryRightBlock-title">
                  <b>Constraint:</b>
                </div>
                <div
                  class="entryRightBlock-constraint"
                  v-for="constraint in entry.constraints"
                  :key="constraint.id"
                >
                  <b>·</b>{{ constraint.desc }}
                </div>
              </div>
            </div>
            <div class="entry-dialog" @click="openDetailDialog()">
              More detals and book
            </div>
            
            <detail-dialog @toggleDetailDialogVisible="closeDetailDialog" :visibleDialog="detailDialogVisible"></detail-dialog>
          </div>
        </div>

        <div class="search-content-right-pagination">
          <el-pagination
            @size-change="onSizeChange"
            @current-change="onCurrentPage"
            :current-page="pagination.page"
            :page-sizes="[5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="layoutFoot">
      <layout-foot></layout-foot>
    </div>
  </div>
</template>
<script>
import LayoutFoot from "../../components/layout/layout-foot.vue";
import layoutHeader from "../../components/layout/layout-header.vue";
import throttle from "lodash-es/throttle";
import detailDialog from "./detailDialog.vue"

export default {
  components: { layoutHeader, LayoutFoot, detailDialog},
  name: "search",

  data() {
    return {
      inputFilter: "",
      detailDialogVisible: false,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      },
      searchItems: [
        {
          id: 1,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
            {
              id: 3,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
            {
              id: 4,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
            {
              id: 5,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
            {
              id: 6,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
            {
              id: 7,
              desc: "Allow couplesdddddddddddddddddddddddddd",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/carouselPicture2.png"),
            },
          ],
        },
        {
          id: 2,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 3,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 4,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 5,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 6,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 7,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 8,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 9,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 10,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 11,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
        {
          id: 12,
          prioritaire: "Timber Texas",
          address: "4 Rue Jacques Lousembour, Paris",
          phoneNumber: "0698521452",
          descriptionDetail:
            "Wonderful house for exchanging, swimming pool, garden, 4 bedrooms.No more waiting!",
          services: [
            {
              id: 1,
              desc: "Allow couples",
            },
            {
              id: 2,
              desc: "Cleaner",
            },
          ],
          constraints: [
            {
              id: 1,
              desc: "No smoking.",
            },
            {
              id: 2,
              desc: "No pets",
            },
          ],
          photos: [
            {
              id: 1,
              src: require("../../assets/carouselPicture1.png"),
            },
            {
              id: 2,
              src: require("../../assets/carouselPicture2.png"),
            },
            {
              id: 3,
              src: require("../../assets/worktable.png"),
            },
          ],
        },
      ],
    };
  },
  methods: {
    search: throttle(function () {
      // this.$emit("inputChange", this.inputFilter);
      console.log("SearchFunction");
    }, 1000),
    onSizeChange(size) {
      this.pagination.size = size;
    },
    onCurrentPage(page) {
      this.pagination.page = page;
    },
    closeDetailDialog() {
      this.detailDialogVisible = false;
    },
    openDetailDialog() {
      this.detailDialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/util.scss";
body {
  overflow: hidden;
}

.search {
  .background-part {
    width: 100%;
    height: 88px;
  }
  .search-input {
    position: absolute;
    top: 100px;
    z-index: 10;
    padding: 20px 0;
    width: 100%;
    background-color: pink;
    &-group {
      position: relative;
      width: 600px;
      left: 50%;
      transform: translateX(-50%);
      .svg {
        position: absolute;
        top: 14px;
        right: 16px;
        cursor: pointer;
      }
    }
  }

  &-content {
    overflow-x: hidden;
    display: flex;
    position: relative;
    top: 100px;
    height: 100%;
    // overflow: auto;
    &-left {
      width: 20%;
      background: red;
    }
    &-right {
      height: 100%;
      width: 80%;

      &-details {
        height: 90%;
        width: 100%;
        position: relative;

        .entry {
          @include flex-align(flex-start, flex-start);
          border-bottom: 1px solid;
          height: 300px;
          position: relative;
          background: green;
          // overflow: auto;
          &-left {
            position: relative;
            width: 25%;
            min-width: 25%;
            padding-top: 25px;
            padding-left: 10px;
            &-img {
              width: 100%;
              height: 100%;
            }
          }
          &-right {
            display: contents;
            position: relative;
            top: 10px;
            left: 50px;

            .entryRightBlock {
              padding: 20px;
              display: grid;
              &-title {
                display: flex;
              }
              &-service {
                position: relative;
                display: flex;
              }
              &-constraint {
                @include flex-align(flex-start, flex-start);
                display: list-item;
                display: flex;
              }
            }
          }
          &-dialog {
            position: absolute;
            right: 20px;
            bottom: 15px;
          }
          &-dialog:hover {
            cursor: pointer;
            background-color: blue;
          }
        }
      }
      &-pagination {
        @include flex-align(center, flex-end);
        height: 10%;
        width: 100%;
        background: yellowgreen;
      }
    }
  }
}
.el-input {
  height: 48px;
  width: 100%;
}
.el-input ::v-deep .el-input__inner {
  padding-left: 10px;
  height: 40px;
  padding-right: 40px;
  border-radius: 24px;
  font-size: 1rem;
  color: black;
  width: 100%;
  outline: none;
}
.layoutFoot {
  position: relative;
  top: 100px;
}
/deep/.el-dialog{
  height: 80%;
}
</style>