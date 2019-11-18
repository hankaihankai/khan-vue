<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    onSubmit() {
      this.$http.post('/service/api/users/save', this.form, {
        emulateJSON: true,
        headers: { Authorization: 'Bearer ' + getToken() }
      }).then(function(res) {
        // 响应成功回调
        const data = res.body

        this.$router.push('/system/user/index')
        this.loading = false
      }, function(res) {
        this.loading = false
      })
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

