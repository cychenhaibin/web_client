<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from "element-plus";
export default {
  name: "register",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption
  },
  data() {
    return {
      registerUser:{
        name:'',
        email:'',
        password:'',
        password2:'',
        identity:''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.registerUser.password) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post("api/users/register",this.registerUser).then((res) => {
              this.$message({
                message: '账号注册成功！',
                type: 'success'
              })
            })
          }
        })
        this.$router.push('/login')
      });
    }
  }
}
</script>

<template>
<div class="register">
  <section class="form_container">
    <div class="manage_tip">
      <el-form
          ref="registerForm"
          style="max-width: 600px"
          :model="registerUser"
          status-icon
          :rules="rules"
          label-width="auto"
          class="registerForm"
      >
        <span class="title el-form-item">欢迎使用在线后台管理系统</span>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" autocomplete="off" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" type="password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" type="password" autocomplete="off" placeholder="请确认密码" />
        </el-form-item>

        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</div>
</template>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.png);
  background-size: 100% 100%;
}
.form_container {
  height: 100% ;
  margin-right: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 22px;
  color: #000000;
}
.registerForm {
  background-color: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.register .registerForm .title {
  margin-bottom: 20px;
}
.submit_btn{
  width: 100%;
}
</style>