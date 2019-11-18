<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row>
          <el-col :span="20">
            <div class="grid-content bg-purple" style="text-align: left">
              <el-input v-model="form.username" style="width: 15%;" placeholder="用户名" />
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple-light">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px" />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>新增</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="username"
            label="姓名"
          />
          <el-table-column
            prop="sex"
            label="性别"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.sex == 1 ? '男' : (scope.row.sex == 0 ? '女' : '') }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editItem(scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 30, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  data() {
    return {
      form: {},
      tableData: null,
      currentPage: 1,
      pageSize: 5,
      total: 0
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.initTable()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.initTable()
    },
    search() {
      this.currentPage = 1
      this.initTable()
    },
    initTable() {
      this.form.currentPage = this.currentPage
      this.form.pageSize = this.pageSize
      this.$http.get('/service/api/users/list', {
        params: this.form
      }, {
        emulateJSON: true,
        headers: { Authorization: 'Bearer ' + getToken() }
      }).then(function(res) {
        // 响应成功回调
        const data = res.body
        if (data.code == 0) {
          const item = data.data
          console.log('item:', item)
          this.tableData = item.records
          this.total = item.total
          this.pageSize = item.size
        } else {

        }
        this.loading = false
        // 数据在res.body里面
      }, function(res) {
      })
    },
    editItem(id) {
      this.$router.push(`/system/user/edit/${id}`)
    },
    deleteItem(id) {
      console.log(id)
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

