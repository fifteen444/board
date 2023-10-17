<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div class="login_title">注册</div>
            </div>
        </template>
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" size="large" label-width="80px">
            <el-form-item label="帐号" prop="username" spellcheck="false">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="userRoles">
                <el-checkbox-group v-model="registerForm.userRoles">
                    <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">{{ role.roleName }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password_repeat">
                <el-input v-model="registerForm.password_repeat" type="password"></el-input>
            </el-form-item>
            <el-button style="width: 100%;" type="primary" @click="register(registerFormRef)">注册</el-button>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import axios from '../../axios';


interface RegisterForm {
    username: string,
    userRoles: [],
    password: string,
    password_repeat: string
}
interface Role {
    id: number, 
    roleName: string
}


const registerFormRef = ref<FormInstance>();
const registerFormRules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    userRoles: [
        { required: true, message: '请选择职务', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9]+$/, message: '密码应为大小写字母或数字' },
        { min: 3, max: 18, message: '密码长度应为6-18位' }
    ],
    password_repeat: [
        { required: true, message: '请再次输入密码', trigger: 'blur' }
    ]
}
const registerForm = reactive<RegisterForm>({
    username: '',
    userRoles: [],
    password: '',
    password_repeat: ''
})
const roles = ref<Role[]>([]);

onMounted(() => {
    getRoles();
})

async function getRoles() {
    const res = await axios.get('/role/roles');
    roles.value = res.data.data.map(function (role: Role) {
        return { id: role.id, roleName: role.roleName };
    })
}

const register = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            if(registerForm.password !== registerForm.password_repeat) {
                ElMessage({ message: '两次输入的密码不一致.', type: 'warning' });
            } else {
                axios.post('/user/register', {
                    username: registerForm.username,
                    roleIds: registerForm.userRoles,
                    password: registerForm.password
                }).then(res => {
                    if (res.data.code === 200) {
                        ElMessage({ message: '用户注册成功.', type: 'success' });
                    } else if (res.data.msg === '用户名已存在') {
                        ElMessage({ message: res.data.msg, type: 'warning' });
                    } else {
                        ElMessage({ message: res.data.msg, type: 'error' });
                    }
                }).catch(err => {
                    ElMessage({
                        message: "获取数据失败" + err,
                        type: 'error'
                    });
                });
            }
        } else {
            ElMessage.error('用户名或密码格式错误.');
        }
    })
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {
    width: 500px;
    height: 390px;
    margin: 190px auto;
}

.login_title {
    font-size: 20px;
    font-family: Microsoft Yahei;
    margin: auto;
}
</style>