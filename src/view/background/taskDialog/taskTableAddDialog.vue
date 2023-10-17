<template>
    <el-button type="primary" size="default" @click="addTaskDialogVisible = true">添加</el-button>
    <el-dialog v-model="addTaskDialogVisible" width="30%" align-center destroy-on-close>
        <el-form :model="addTaskForm" ref="addTaskRef" :rules="addTaskRules">
            <el-form-item label="姓名" prop="staffName">
                <el-select filterable v-model="addTaskForm.staffName" style="width: 100">
                    <el-option v-for="name in staffList" @click="getName(name)" :label="name.name" :key="name.id"
                        :value="name.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="date">
                <el-col :span="11">
                    <el-date-picker v-model="addTaskForm.date" value-format="YYYY-MM-DD" type="date" />
                </el-col>
            </el-form-item>
            <el-form-item label="任务" prop="taskContent">
                <el-input v-model="addTaskForm.taskContent" type="textarea" spellcheck="false" />
            </el-form-item>
            <el-form-item label="状态" prop="taskState">
                <el-select v-model="addTaskForm.taskState">
                    <el-option v-for="state in stateList" @click="getState(state)" :label="state.taskState" :key="state.id"
                        :value="state.taskState" />
                </el-select>
            </el-form-item>
            <el-form-item label="工时" prop="workingHour">
                <el-input-number v-model="addTaskForm.workingHour" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addTaskDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onsubmitAdd">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            addTaskDialogVisible: false,
            addTaskForm: {
                staffName: '',
                taskState: '',
                date: '',
                taskContent: '',
                workingHour: 0
            },
            stateList: [],
            staffList: [],
            stateListInSelect: {
                id: null,
                taskScore: null,
                taskState: ''
            },
            staffListInSelect: {
                department: '',
                id: null,
                name: '',
                memId: null
            },
            addTaskRules: {
                staffName: [
                    { required: true, message: '请选择姓名', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                taskContent: [
                    { required: true, message: '请输入任务内容', trigger: 'blur' }
                ],
                taskState: [
                    { required: true, message: '请选择任务状态', trigger: 'change' }
                ],
                workingHour: [
                    { required: true, message: '请选择工时', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        getState(state) {
            this.stateListInSelect.id = state.id;
            this.stateListInSelect.taskScore = state.taskScore;
        },
        getName(name) {
            this.staffListInSelect.department = name.department;
            this.staffListInSelect.id = name.id;
        },
        onsubmitAdd() {
            this.$refs.addTaskRef.validate((valid) => {
                if (valid) {
                    // Your axios post request here
                } else {
                    this.$message.error('格式错误.');
                }
            });
        }
    },
    mounted() {
        // Fetch data for stateList and staffList using axios
        // Example:
        // axios.get('/stateList').then(response => {
        //     this.stateList = response.data;
        // }).catch(error => {
        //     console.error('Error fetching stateList:', error);
        // });

        // axios.get('/staffList').then(response => {
        //     this.staffList = response.data;
        // }).catch(error => {
        //     console.error('Error fetching staffList:', error);
        // });
    }
};
</script>

<style></style>
