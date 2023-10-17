<template>
    <el-button style="margin-left: 10px;" type="primary" size="default" @click="addTaskStateDialog = true">状态添加</el-button>
    <el-dialog v-model="addTaskStateDialog" width="30%" align-center destroy-on-close>
        <el-form :model="addTaskStateForm" ref="addTaskStateRef" :rules="addTaskStateRules" label-width="120px">
            <el-form-item label="任务状态" prop="taskState">
                <el-select v-model="addTaskStateForm.taskState" filterable allow-create default-first-option
                    :reserve-keyword="false">
                    <el-option v-for="state in stateList" :label="state.taskState" :value="state.taskState" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态积分" prop="taskScore">
                <el-input v-model.number="addTaskStateForm.taskScore" style="width: 215px;" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addTaskStateDialog = false">取消</el-button>
                <el-button type="primary" @click="onsubmitAddTaskState">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import axios from '../../../axios';
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            addTaskStateDialog: false,
            addTaskStateForm: {
                taskState: '',
                taskScore: null
            },
            stateList: [],
            addTaskStateRules: {
                taskState: [
                    { required: true, message: '请输入任务状态', trigger: 'change' }
                ],
                taskScore: [
                    { required: true, message: '请输入状态积分', trigger: 'blur' },
                    { type: 'number', message: '状态积分应为数字' }
                ]
            }
        };
    },
    methods: {
        async onsubmitAddTaskState() {
            const valid = await this.$refs.addTaskStateRef.validate();
            if (valid) {
                axios.post('/taskState/taskState', {
                    taskState: this.addTaskStateForm.taskState,
                    taskScore: this.addTaskStateForm.taskScore
                }).then(() => {

                }).catch(err => {
                    ElMessage({ message: "获取数据失败" + err, type: 'error' });
                });
            } else {
                ElMessage.error('格式错误.');
            }
        }
    }
};
</script>

<style></style>
