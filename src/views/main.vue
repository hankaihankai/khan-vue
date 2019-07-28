<template>
    <div>
      <el-main v-html="id">

      </el-main>
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
