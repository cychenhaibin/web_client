<script>
import HeadNav from "../components/HeadNav.vue";
import LeftMenu from "../components/LeftMenu.vue";
export default{
  name: "index",
  components: { HeadNav, LeftMenu },
}
</script>

<template>
<div class="index">
  <HeadNav></HeadNav>
  <LeftMenu></LeftMenu>
  <div class="rightContainer">
    <router-view></router-view>
  </div>
</div>
</template>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer{
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>