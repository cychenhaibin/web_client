<script>
import { Timer, Edit, Delete, Plus, Search } from '@element-plus/icons-vue'
import Dialog from "@/components/Dialog.vue";
export default {
  name: 'FundList',
  components: {Timer, Edit, Delete, Plus, Dialog, Search},
  data() {
    return {
      search_data: {
        startTime: '',
        endTime: ''
      },
      filterTableData: [],
      paginations:{
        page_index: 1,
        total: 0,
        page_size: 10,
        page_sizes: [5,10,15,20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      allTableData: [],
      tableData: [],
      dialogVisible: false,
      dialog: {
        title: '',
        option: 'edit'
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios.get('/api/profiles').then((response) => {
        this.allTableData = response.data;
        this.filterTableData = response.data;

        this.setPaginations();
      })
    },
    setPaginations(){
      this.paginations.total = this.allTableData.length;
      this.paginations.page_size = 10;
      this.paginations.page_index = 1;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      })
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialog = {
        title: '修改资金信息',
        option: 'edit'
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id

      }
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then((response) => {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.getProfile();
      })
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialog = {
        title: '添加资金信息',
        option: 'add'
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }
    },
    updateDialogModelValue(value) {
      this.dialogVisible = value;
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      })
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let nums = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if(this.allTableData[i]){
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables
      }

    },
    handleSearch(){
      if(!this.search_data.startTime || !this.search_data.endTime){
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        });
        this.getProfile();
        return
      }

      const sTime = this.search_data.startTime;
      const eTime = this.search_data.endTime;
      this.allTableData = this.filterTableData.filter((item, index) => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      this.setPaginations();
    }
  }
}
</script>

<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按时间筛选:">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >

          </el-date-picker>
          --
          <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="选择结束时间"
          >

          </el-date-picker>
          <el-button style="margin: 0 20px" type="primary" size="default" @click="handleSearch()">
            <el-icon style="margin-right: 10px"><Search /></el-icon>
            筛选
          </el-button>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button type="primary" size="default" @click="handleAdd()" v-if="user.identity === 'manager'">
            <el-icon style="margin-right: 10px"><Plus /></el-icon>
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-if="tableData.length > 0" :data="tableData" max-height="450" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="150"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template #default="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template #default="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template #default="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column prop="operation" label="操作" align="center" width="180" fixed="right" v-if="user.identity === 'manager'">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
              <el-icon style="margin-right: 10px"><Edit /></el-icon>
              编辑
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >
              <el-icon style="margin-right: 10px"><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              :total="paginations.total"
              >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <Dialog v-model="dialogVisible" :dialog="dialog" :formData="formData" @update:modelValue="updateDialogModelValue" @update="getProfile"></Dialog>
  </div>
</template>

<style scoped>
.fillContainer{
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight{
  float: right;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin-top: 10px;
}
</style>