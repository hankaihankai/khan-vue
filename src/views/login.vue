<template>
  <div>
    <el-main>
      <el-form class="main">
        <el-input size="medium" v-model="username" placeholder="请输入用户名"></el-input>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="loginSubmit()">提交</el-button>
      </el-form>
    </el-main>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      loginSubmit() {
        let Base64 = require('js-base64').Base64;
        let token = "Basic " + Base64.encode("hankai:123456");
        let formData = new FormData();
        formData.append("username", this.username)
        formData.append("password", this.password)
        formData.append("grant_type", "password")
        this.$http.post("/oauth2/oauth/token", formData, {
          emulateJSON: true,
          headers: {'Authorization': token}
        }).then(data => {
          if (data.ok) {
            localStorage.setItem("token", JSON.stringify(data.body))
            this.$router.push("/main")
          }
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
