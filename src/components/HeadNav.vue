<script>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
export default {
  name: "head-nav",
  components: {
    ElMessage,
    ArrowDown,
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo (cmdItem) {
      switch (cmdItem) {
        case 'logout':
          this.logout();
          break;
        case 'info':
          this.showInfoList();
          break;
      }
    },
    showInfoList () {
      this.$router.push('/infoShow');
    },
    logout () {
      localStorage.removeItem('eleToken')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    },
  }
}
</script>

<template>
<header class="head-nav">
  <div class="head-nav-div">
    <div class="logo-container">
      <span class="title">在线后台管理系统</span>
    </div>
    <div class="user">
      <div class="userInfo">
        <img :src="user.avatar" class="avatar" />
      </div>
      <div class="welcome">
        <p class="name comename">欢迎</p>
        <p class="name avatarname">{{ user.name }}</p>
      </div>
      <span class="username">
        <el-dropdown trigger="click" @command="setDialogInfo">
          <span class="el-dropdown-link">
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
</header>
</template>

<style scoped>
.head-nav {
  width: 100%;
  height: 100%;
  max-height: 52px;
  padding: 5px;
  background-color: #F4F7FC;
  color: #000000;
  border-bottom: 1px solid #F4F7FC;
}
.head-nav-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container {
  margin: 0 20px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.comename{
  margin: 5px 0 10px 10px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.avatarname {
  margin: 10px 0 5px 10px;
  color: #409eff;
}
.el-dropdown{
  color: #409eff;
}
.username{
  cursor: pointer;
}
</style>