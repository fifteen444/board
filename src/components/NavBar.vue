<template>
    <div class="nav">
        <div class="title">
            <div>技术部看板</div>
            <router-link v-if="userStore.backgroundIsShow" class="background" to="/BackgroundManage">
                <el-icon>
                    <Setting />
                </el-icon>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user';

const userStore = useUserStore();
</script>

<style scoped>
.nav {
    width: 100%;
    height: 30px;
    display: flex;
    z-index: 101;
    position: fixed;
    background-color: #F8F8F8;
    top: 0px;
    left: 0px;
}

.title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #909399;
    font-family: Microsoft Yahei;
    display: flex;
    position: relative;
    text-align: center;
    box-shadow: 1px 1px 0px 0px grey;
}

.title>div:first-child {
    margin: 0 auto;
    font-size: 20px;
}

.background {
    width: 30px;
    height: 30px;
    color: black !important;
    font-size: 20px;
    display: flex;
    position: absolute;
    top: 0;
    right: 10px;
    align-items: center;
    text-align: center;
    line-height: 30px;
    background-color: #F8F8F8 !important;
}

.background:hover {
    color: #0000FF;
    font-size: 22px;
}</style>