<template>
  <div class="layout-header">
    <div class="layout-header-logo">
      <img src="../../assets/HouseExchangeFilter.png" style="height: 60px" />
    </div>
    <div class="layout-header-nav">
      <div
        :class="
          navItem.path == currentNavItem.path ? 'nav-item active' : 'nav-item'
        "
        v-for="navItem in navItems"
        :key="navItem.name"
        @click="navPath(navItem.path)"
      >
        {{ navItem.name }}
      </div>
    </div>
    <div class="layout-header-register">
      <div
        :class="
          navItem.path == currentNavItem.path ? 'nav-item active' : 'nav-item'
        "
        v-for="navItem in registerItems"
        :key="navItem.name"
        @click="navPath(navItem.path)"
      >
        {{ navItem.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout-header",
  data: () => {
    return {
      navItems: [
        {
          icon: "welcome",
          name: "Home",
          path: "/",
        },
        {
          icon: "search",
          name: "Search",
          path: "/search",
        },
        {
          icon: "message",
          name: "Message",
          path: "/message",
        },
      ],
      registerItems: [
        {
          icon: "signIn",
          name: "Sign In",
          path: "/signIn",
        },
        {
          icon: "signUp",
          name: "Sign Up",
          path: "/signUp",
        },
      ],
      profileItems: [
        {
          icon: "profile",
          name: "Profile",
          path: "/profile",
        },
        {
          icon: "logOut",
          name: "Log Out",
          path: "/logOut",
        },
      ],
    };
  },
  methods: {
    navPath(path) {
      if (path) {
        if (path == "/logOut") {
          this.$confirm("Are you sure to log out?", {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: 'warning',
          })
            .then(() => {
              this.$router.push(path);
            })
            .catch(() => {
              console.log(1);
            });
        }else{
          this.$router.push(path);
        }
      }
        
    },
    verifyLogInForRegister() {
      if (
        localStorage.getItem("isLogin") != null &&
        localStorage.getItem("isLogin") == "1"
      ) {
        this.registerItems = this.profileItems;
      } else {
        this.registerItems = [
          {
            icon: "signIn",
            name: "Sign In",
            path: "/signIn",
          },
          {
            icon: "signUp",
            name: "Sign Up",
            path: "/signUp",
          },
        ];
      }
    },
  },
  computed: {
    currentNavItem() {
      const path = this.$route.path;
      const navItem = [...this.navItems, ...this.registerItems].find(
        (_navItem) => {
          return _navItem.path && path == _navItem.path; //path.indexOf(_navItem.path) > -1;
        }
      );
      return navItem;
    },
  },
  mounted() {
    this.verifyLogInForRegister();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.nav-item {
  @include flex-align(center, flex-start);
  font-size: $font-lg;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &.active {
    color: $brand-primary;
  }

  &:not(:last-of-type) {
    margin-right: 32px;
  }

  .svg-icon {
    margin-right: 4px;
  }

  &:hover .svg-icon,
  &.active .svg-icon {
    fill: $brand-primary;
  }
}

.layout-header:hover {
  background-color: white;
  transition: all 0.3s linear;
  color: black;
}
.layout-header {
  @include flex-align(center, space-between);
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.3s linear;
  border-bottom: 1px solid $border-dark;
  z-index: 20;
  color: white;
  &-logo {
    @include flex-align(center, center);
    flex: 1;
    max-width: calc(50% - 200px);
  }
  &-nav {
    @include flex-align(center, center);
    flex: 1;
    max-width: calc(50% - 200px);
  }
  &-register {
    @include flex-align(center, center);
    flex: 1;
    max-width: calc(50% - 200px);
  }
  .nav-item {
    padding-left: 5%;
    border-left: 1px solid gray;
  }
}
</style>