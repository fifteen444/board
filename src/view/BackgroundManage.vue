<template>
  <router-link class="backHome" to="/targetTask">
    <el-icon>
      <Back />
    </el-icon>
    <div>返回</div>
  </router-link>
  <div class="user">
    <el-dropdown trigger="click">
      <div class="el-dropdown-link">
        <el-icon>
          <User />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu style="width: 120px;">
          <div class="username">用户名：{{ userStore.userName }}</div>
          <el-dropdown-item @click="exit" style="justify-content: center;">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
  <div class="container">
    <AsideBar />
    <router-view></router-view>
  </div>
</template>
  
<script lang="ts">
import AsideBar from "../components/AsideBar.vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
export default {
  setup() {
    const userStore = useUserStore();
    const exitRouter = useRouter();
    function exit() {
      localStorage.removeItem('token');
      localStorage.removeItem('kanban');
      exitRouter.push('/');
    }
    return {
      userStore,
      exit
    }
  },
  components: { AsideBar }
}
</script>
  
<style>
.backHome {
  height: 30px;
  line-height: 30px;
  position: fixed;
  top: 0px;
  left: 20px;
  z-index: 102;
  display: flex;
  align-items: center;
  color: black;
  font-family: Arial;
  text-decoration: none;
}

.backHome:hover {
  color: #0000FF;
  font-size: 17px;
}

.container {
  width: 100vw;
  height: 96vh;
  position: relative;
  top: 37px;
  left: 0px;
  display: flex;
}

.user {
  width: 30px;
  height: 30px;
  line-height: 30px;
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 102;
  display: flex;
  align-items: center;
  font-family: Arial;
}

.el-dropdown-link {
  font-family: Arial;
  color: black !important;
  font-size: 20px;
}

.el-dropdown-link:hover {
  color: #0000FF;
  font-size: 22px;
}

.username {
  text-align: center;
  font-size: 14px;
  color: #606266;
}
</style>
  