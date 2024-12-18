<script>
export default {
  name: "Dialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    dialog: Object,
    formData: Object,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      internalModelValue: this.modelValue,
      format_type_list: [
        '提现',
        '提现手续费',
        '充值',
        '优惠券',
        '充值礼券',
        '转账'
      ],
      form_rules:{
        describe: [
          { required:true, message: '收支描述不能为空', trigger: 'blur' }
        ],
        income: [
          { required:true, message: '收入不能为空', trigger: 'blur' }
        ],
        expend: [
          { required:true, message: '支出不能为空', trigger: 'blur' }
        ],
        cash: [
          { required:true, message: '账户现金不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  watch: {
    modelValue(newVal) {
      this.internalModelValue = newVal;
    },
    internalModelValue(newVal) {
      if (!newVal) {
        this.$emit('update:modelValue', newVal);
      }
    }
  },
  methods: {
    closeDialog() {
      this.internalModelValue = false;
    },
    onSubmit(form) {
      const url = this.dialog.option === 'add' ? 'add' : `edit/${this.formData.id}`;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post(`api/profiles/${url}`,this.formData).then((res) => {
            if(url === 'add'){
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            }else {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }
            this.internalModelValue = false;
            this.reset();
            this.$emit('update')
          })
        }
      })
    },
    reset(){
      this.formData.type = "";
      this.formData.describe = "";
      this.formData.income = "";
      this.formData.expend = "";
      this.formData.remark = "";
      this.formData.cash = "";
      this.formData.id = ""
    }
  }
}
</script>

<template>
<div class="dialog">
  <el-dialog
      v-model="internalModelValue"
      :show-close="false"
  >
    <template #header>
      <span>{{ dialog.title }}</span>
    </template>
    <div class="form">
      <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px;width: auto"
      >
        <el-form-item label="收支类型:">
          <el-select v-model="formData.type" placeholder="收支类型">
            <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="describe">
          <el-input type="text" v-model="formData.describe"></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="income">
          <el-input type="text" v-model="formData.income"></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expend">
          <el-input type="text" v-model="formData.expend"></el-input>
        </el-form-item>
        <el-form-item label="账户现金:" prop="cash">
          <el-input type="text" v-model="formData.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="internalModelValue = false">取消</el-button>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </el-dialog>
</div>
</template>

<style scoped>

</style>