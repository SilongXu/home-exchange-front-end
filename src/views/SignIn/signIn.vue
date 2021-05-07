<template>
  <div class="layout-header">
    <div class="background">
      <div class="signIn-content">
        <div class="title">
          <h2>Sign In</h2>
        </div>
        <div class="input-address">
          <div class="input-address-title">Email-Address:</div>
          <el-input
            v-model="inputAddress"
            placeholder="Enter the email"
            clearable
          ></el-input>
        </div>
        <div class="input-password">
          <div class="input-password-title">Password:</div>
          <el-input
            v-model="inputPassword"
            placeholder="Enter the password"
            clearable
            type="password"
          ></el-input>
        </div>
        <p class="forgetPassword" @click="openForgetDialog()">Forget password?</p>

        <div class="button" @click="signIn()">
          <h3>Sign In</h3>
        </div>
      </div>
    </div>
    <layout-header></layout-header>
    <dialog-forget-psw @toggleForgetDialogVisible="closeForgetDialog"  :visibleForgetDialog="forgetDialogVisible"> 

    </dialog-forget-psw>
  </div>
</template>

<script>
import DialogForgetPsw from '../../components/dialogForgetPassword/dialogForgetPsw.vue';
import LayoutHeader from "../../components/layout/layout-header";
export default {
  name: "welcome",
  components: {
    "layout-header": LayoutHeader,
    DialogForgetPsw,
  },
  data() {
    return {
      forgetDialogVisible: false,
      inputAddress: "",
      inputPassword: "",
    };
  },
  methods: {
    openForgetDialog() {
      this.forgetDialogVisible = true;
    },
    closeForgetDialog() {
      this.forgetDialogVisible = false;
    },
    signIn(){
      if(this.inputAddress =="" || this.inputPassword==""){
        this.$alert('Please enter the email-address and password', {
          confirmButtonText: 'ok',
          callback: action => {
          }
        });
      }else{
        if(this.inputAddress != localStorage.getItem('userAddress')){
          this.$alert("This email address doesn't exist", {
          confirmButtonText: 'ok',
          callback: action => {
          }
        });
        }else{
          if(this.inputPassword != localStorage.getItem('userPassword')){
            this.$alert('Wrong password', {
          confirmButtonText: 'ok',
          callback: action => {
          }
        });
          }else{
            localStorage.setItem('isLogin', '1');
          }
        }
      }

      if(localStorage.getItem('isLogin') != null && localStorage.getItem('isLogin') == '1'){
        this.$router.push('/');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(../../assets/worktable.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 0;
}
.signIn-content {
  @include flex-align(center, center);
  width: 600px;
  height: 480px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: white;
  border-radius: 10px;
  .title {
    position: absolute;
    top: 10px;
    border-bottom: 0.5px solid;
  }
  .input-address {
    position: absolute;
    top: 150px;
    left: 150px;
    &-title {
      display: flex;
    }
  }
  .input-password {
    position: absolute;
    top: 230px;
    left: 150px;
    &-title {
      display: flex;
    }
  }
  .button {
    position: absolute;
    background: orangered;
    border-radius: 20px;
    width: 90px;
    height: 50px;
    bottom: 50px;
    line-height: 1;
    border: 1px solid;
    transition: all 0.1s linear;
  }
  .button:hover{
    background: white;
    cursor: pointer;
    transition: all 0.1s linear;
  }

  .forgetPassword {
    position: absolute;
    left: 150px;
    top: 275px;
    color: red;
  }
  .forgetPassword:hover {
    cursor: pointer;
  }
}

/deep/ .el-input__inner {
  width: 300px;
  height: 30px;
  color: black;
}
</style>