<template>
  <nav class="navbar">
    <router-link tag="span" to="/TargetTask">目标任务</router-link>
    <router-link tag="span" to="/ProjectSchedule">项目进度</router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const currentRoute = ref('');
const router = useRouter();
// 定义定时器
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    // 获取当前的路由路径
    currentRoute.value = router.currentRoute.value.path;

    // 切换路由
    if (currentRoute.value === '/targetTask') {
      router.push('/projectSchedule');
    } else {
      router.push('/targetTask');
    }
  }, 20000);
});

// 在组件卸载时清除定时器
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 30px;
  left: 0px;
}

.navbar>a {
  flex-grow: 1;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  text-decoration: none;
  display: block;
}

.linkActive {
  color: white;
  background-color: #409EFF;
}
</style>