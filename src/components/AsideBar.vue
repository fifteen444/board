<template>
    <div class="aside_bar">
        <router-link to="/BackgroundManage/TaskTable">任务目标</router-link>
        <router-link to="/BackgroundManage/ProjectTable">项目进度</router-link>
        <router-link v-if="userStore.registerIsShow" to="/BackgroundManage/UserRegister">添加员工</router-link>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
onMounted(() => {
    if(userStore.userName == "admin"){
        userStore.registerIsShow = true;
    }else{
        userStore.registerIsShow = false;
    }
})
</script>

<style>
.aside_bar {
    width: 100px;
    height: 100%;
    position: fixed;
    top:30px;
    /* background-color: aqua; */
    border-right: 1px solid #ebeef5;
    box-sizing: border-box;
}
.aside_bar>a {
    width: 99px;
    height: 30px;
    display: block;
    text-decoration: none;
    color: #606266;
    text-align: center;
    margin-top: 20px;
    line-height: 30px;
}
.linkActive {
  color: white !important;
  background-color: #409EFF;
}
</style>