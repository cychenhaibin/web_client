<script>
export default {
  name: 'InfoShow',
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<template>
<div class="infoShow">
  <el-row type="flex" justify="center" class="row-bg">
    <el-col :span="8">
      <div class="user">
        <img :src="user.avatar" class="avatar" />
      </div>
    </el-col>
    <el-col :span="16">
      <div class="userInfo">
        <div class="user-item">
          <i class="fa fa-user" style="margin-right: 15px"></i>
          <span>{{ user.name }}</span>
        </div>
        <div class="user-item">
          <i class="fa fa-cog" style="margin-right: 15px"></i>
          <span>{{ user.identity === 'manager' ? '管理员' : '员工' }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.infoShow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url(../assets/personal.png);
  background-size: 100% 100%;
}
.row-bg{
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userInfo {
  height: 100%;
  background: rgba(255, 255, 255, .2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: rgba(51,51,51,0.5);
}
</style>