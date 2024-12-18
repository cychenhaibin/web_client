<template>
  <router-view/>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from "element-plus";
import { jwtDecode } from 'jwt-decode'
export default {
  name: "app",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption
  },
  created() {
    if (localStorage.getItem("eleToken")) {
      const decoded = jwtDecode(localStorage.getItem("eleToken"));
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
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