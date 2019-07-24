<template>
  <div>
    <el-button type="info" @click="main()">主页</el-button>
    <el-main>
      <el-form class="main">
        <el-input size="medium" v-model="username" placeholder="请输入用户名"></el-input>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="loginSubmit()">提交</el-button>
      </el-form>
      <el-button>认证</el-button>
    </el-main>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      loginSubmit() {
        let Base64 = require('js-base64').Base64;
        let token = "Basic " + Base64.encode("hankai:123456");
        console.log(token)
        let formData = new FormData();
        formData.append("username", this.username)
        formData.append("password", this.password)
        formData.append("grant_type", "password")
        this.$http.post("http://localhost:8089/oauth/token", formData, {
          emulateJSON: true,
          headers: {'Authorization': token},
        }).then(function(data){
          console.log(data)
        }).catch(function(){
          this.$notify.error({
            title: '错误',
            position: 'top-right',
            message: '服务器错误'
          });
        });
      },
      main() {
        this.$http.get("/api/api/main",{
          emulateJSON:true
        }).then(function (data) {
          console.log(data)
        }).catch(function() {
          this.$notify.error({
            title: '错误',
            position: 'top-right',
            message: '服务器错误'
          });
        });
      }
    },
    mounted() {
    }
  }
</script>
<style>
  .main {
    width: 30%;
    margin: auto;
  }
</style>
