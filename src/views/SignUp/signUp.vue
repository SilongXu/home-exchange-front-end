<template>
  <div class="layout-header">
    <div class="background">
      <div class="signUp-content">
        <div class="title">
          <h3>Sign Up</h3>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="Name:" prop="inputName">
            <el-input
              v-model="form.inputName"
              placeholder="Enter the name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Address:" prop="inputAddress">
            <el-input
              v-model="form.inputAddress"
              placeholder="Enter the email-address"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Password:" prop="inputPassword">
            <el-input
              v-model="form.inputPassword"
              placeholder="Enter the password"
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password:" prop="inputPasswordConfirm">
            <el-input
              v-model="form.inputPasswordConfirm"
              placeholder="Confirm the password"
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="Phone number:" prop="inputPhone">
            <el-input
              v-model="form.inputPhone"
              placeholder="Enter the phone number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Residencial address:" prop="inputResidence">
            <el-input
              v-model="form.inputResidence"
              placeholder="Enter the residencial address"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="button" @click="signUp()">
          <h3>Sign Up</h3>
        </div>
      </div>
    </div>
    <layout-header></layout-header>
  </div>
</template>

<script>
import layoutHeader from "../../components/layout/layout-header.vue";
export default {
  components: { layoutHeader },
  name: "signUp",
  data() {
    return {
      form: {
        inputAddress: "",
        inputPassword: "",
        inputName: "",
        inputPhone: "",
        inputResidence: "",
        inputPasswordConfirm: "",
      },
      rules: {
        inputAddress :[{required: true, message: 'Required', trigger: 'blur'}],
        inputPassword :[{required: true, message: 'Required', trigger: 'blur'}],
        inputName:[{required: true, message: 'Required', trigger: 'blur'}],
        inputPhone :[{required: true, message: 'Required', trigger: 'blur'}],
        inputResidence:[{required: true, message: 'Required', trigger: 'blur'}],
        inputPasswordConfirm:[{required: true, message: 'Required', trigger: 'blur'}],
      }
    };
  },
  methods: {
    signUp() {
      if(this.form.inputAddress == "" || this.form.inputPassword ==""||this.form.inputName=="" || this.form.inputPhone==""||this.form.inputResidence==""||this.form.inputPasswordConfirm==""){
        this.$alert('Please fill all inputs', {
          confirmButtonText: 'ok',
          callback: action => {
          }
        });
      }else{
        if(this.form.inputPassword != this.form.inputPasswordConfirm){
          this.$alert('Passwords are different', {
          confirmButtonText: 'ok',
          callback: action => {
          }
        });
        }else{
          localStorage.setItem('userAddress', this.form.inputAddress);
          localStorage.setItem('userPassword', this.form.inputPassword);
          localStorage.setItem('userName', this.form.inputName);
          localStorage.setItem('userPhone', this.form.inputPhone);
          localStorage.setItem('userResidence', this.form.inputResidence);
          this.$router.push('/signIn');
        }
      }
    },
    verify(){

    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/util.scss";

.background {
  overflow: auto;
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
  .signUp-content {
    @include flex-align(center, center);
    width: 600px;
    height: 700px;
    position: relative;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: 300px;
    background: white;
    border-radius: 10px;
    .title {
      position: absolute;
      top: 10px;
      border-bottom: 0.5px solid;
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
    .button:hover {
      background: white;
      cursor: pointer;
      transition: all 0.1s linear;
    }
  }
}

/deep/ .el-input__inner {
  width: 300px;
  height: 30px;
  color: black;
}




</style>