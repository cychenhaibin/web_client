<script>
export default {
  name: "left-menu",
  data() {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '资金管理',
          path: 'fund',
          children: [{ path: 'fundlist', name: '资金流水' }]
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [{ path: 'infoShow', name: '个人信息' }]
        },
      ]
    }
  }
}
</script>

<template>
  <el-row class="menu-page">
    <el-col :span="12">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#F4F7FC"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span class="title">首页</span>
          </el-menu-item>
        </router-link>
          <template v-for="item in items">
            <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
              <template #title>
                <i :class="'fa fa-margin '+item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                <el-menu-item :index="citem.path" :key="cindex">
                  <span slot="title">{{ citem.name }}</span>
                </el-menu-item>
              </router-link>
            </el-sub-menu>
          </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.menu-page{
  position: fixed;
  top: 63px;
  left: 0;
  min-height: 100vh;
  z-index:99;
}
.el-menu {
  border: none !important;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100vh;
}
.el-menu-vertical-demo{
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown, .hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>