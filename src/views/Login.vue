<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from "element-plus";
import { jwtDecode } from 'jwt-decode'
export default {
  name: "login",
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
      loginUser:{
        email:'',
        password:'',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("api/users/login",this.loginUser).then((res) => {
            this.$message({
              message: '登陆成功！',
              type: 'success'
            })
            const { token } = res.data;
            localStorage.setItem('eleToken', token);
            const decoded = jwtDecode(token);
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);
            this.$router.push('/index')
          })
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined || value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
      )
    },
  }
}
</script>

<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <el-form
            ref="loginForm"
            style="max-width: 600px"
            :model="loginUser"
            status-icon
            :rules="rules"
            label-width="auto"
            class="loginForm"
        >
          <span class="title el-form-item">欢迎使用在线后台管理系统</span>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" autocomplete="off" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" autocomplete="off" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">
              登陆
            </el-button>
          </el-form-item>
            <div class="tiparea">
              <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
            </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bgLogin.png);
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
.loginForm {
  background-color: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.login .loginForm .title {
  margin-bottom: 20px;
}
.submit_btn{
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a{
  color: #409eff;
}
</style>