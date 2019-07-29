<template>
  <div>
    <el-main v-html="id">

    </el-main>
    <el-button type="primary" @click="refreshToken()">刷新token</el-button>
  </div>
</template>

<script>
  export default {
    name: "main.vue",
    data() {
      return {
        id: ''
      }
    },
    methods: {
      init() {
        this.$http.get("/api/api/product/123", {
          emulateJSON: true,
          headers: {'Authorization': this.getToken()}
        }).then(data => {
          this.id = data.bodyText
        });
      },
      refreshToken() {
        let item = localStorage.getItem("token")
        let parse = JSON.parse(item);
        let formData = new FormData();
        formData.append("client_id", "hankai")
        formData.append("client_secret", "123456")
        formData.append("grant_type", "refresh_token")
        formData.append("refresh_token", parse.refresh_token)
        formData.append("scope", "user")
        this.$http.post("/oauth2/oauth/token", formData, {
          emulateJSON: true
        }).then(data => {
          if (data.ok) {
            localStorage.setItem("token", JSON.stringify(data.body))
          }
        });
      }
    },
    mounted() {
      this.init();
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
