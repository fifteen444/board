<template>
    <router-link class="backToHome" to="/targetTask">
    <el-icon>
      <Back />
    </el-icon>
    <div>返回</div>
  </router-link>
    <div class="login_container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="login_title">登录</div>
                </div>
            </template>
            <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" size="large">
                <el-form-item label="帐号" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-button style="width: 100%;" type="primary" @click="login(loginFormRef)">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import axios from '../../axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/user';
interface User {
    username: string,
    password: string
}
const loginFormRef = ref<FormInstance>();
const loginFormRules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9]+$/, message: '密码应为大小写字母或数字' },
        { min: 3, max: 18, message: '密码长度应为6-18位' }
    ],
})
const loginForm = reactive<User>({
    username: '',
    password: ''
})
const loginRouter = useRouter();
const userStore = useUserStore();
const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            axios.post('/user/login', {
                username: loginForm.username,
                password: loginForm.password
            }).then(res => {
                if (res.data.code === 200) {
                    localStorage.setItem('token', res.data.msg);
                    userStore.userName = loginForm.username;
                    ElMessage({
                        message: '用户登录成功.',
                        type: 'success',
                    });
                    loginRouter.push('/BackgroundManage');
                }
            }).catch(() => {
                ElMessage({
                        message: '账号或密码错误.',
                        type: 'error'
                    })
            });
        } else {
            ElMessage.error('账号或密码不符合格式.')
        }
    })
}
</script>

<style>
.backToHome {
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

.backToHome:hover {
  color: #0000FF;
  font-size: 17px;
}
.login_container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 16px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 500px;
    height: 270px;
    margin: 0 auto;
}

.login_title {
    font-size: 20px;
    font-family: Microsoft Yahei;
    margin: auto;
}
</style>