<template>
  <NavBar />
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import NavBar from "../src/components/NavBar.vue";
import { reactive } from "vue";
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const { locale } = reactive({
  locale: zhCn,
});

components: { NavBar };
</script>

<style></style>
