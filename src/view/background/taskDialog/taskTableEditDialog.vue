<template>
    <el-button type="primary" size="small" @click="handleEdit(props.scope.row)">编辑</el-button>
    <el-dialog v-model="editDialog" width="30%" align-center destroy-on-close>
        <el-form :model="editForm">
            <el-form-item label="姓名">
                <el-select filterable v-model="editForm.staffName" style="width: 100">
                    <el-option v-for="name in staffList" @click="getName(name)" :label="name.name" :key="name.id"
                        :value="name.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-col :span="11">
                    <el-date-picker v-model="editForm.date" value-format="yyyy-MM-dd" type="date" />
                </el-col>
            </el-form-item>
            <el-form-item label="任务">
                <el-input v-model="editForm.taskContent" type="textarea" :spellcheck="false" />
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="editForm.taskState">
                    <el-option v-for="state in stateList" @click="getState(state)" :label="state.taskState" :key="state.id"
                        :value="state.taskState" />
                </el-select>
            </el-form-item>
            <el-form-item label="工时">
                <el-input v-model="editForm.workingHour" style="width: 100" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="onsubmitEdit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from '../../../axios';

export default {
    props: ['staffList', 'stateList', 'scope', 'taskList'],
    data() {
        return {
            editDialog: false,
            editForm: {
                staffName: '',
                date: '',
                taskContent: '',
                taskState: '',
                workingHour: ''
            }
        };
    },
    methods: {
        getState(state) {
            rowData.taskStateId = state.id;
            rowData.taskScore = state.taskScore;
        },
        getName(name) {
            rowData.staffId = name.id;
            rowData.staffDepartment = name.department;
        },
        handleEdit(row) {
            this.editDialog = true;
            this.editForm.staffName = row.staffName;
            this.editForm.date = row.date;
            this.editForm.taskContent = row.taskContent;
            this.editForm.taskState = row.taskState;
            this.editForm.workingHour = row.workingHour;
        },
        onsubmitEdit() {
            const taskStateIdValue = this.stateList.find(t => t.taskState == this.editForm.taskState);
            axios.put('/staff/task', {
                id: this.scope.row.id,
                staffId: rowData.staffId,
                staffDepartment: rowData.staffDepartment,
                staffName: this.editForm.staffName,
                date: this.editForm.date,
                taskContent: this.editForm.taskContent,
                taskState: this.editForm.taskState,
                workingHour: this.editForm.workingHour,
                taskStateId: taskStateIdValue.id,
                taskScore: rowData.taskScore
            }).then(() => {

            }).catch(err => {
                ElMessage({ message: "获取数据失败" + err, type: 'error' });
            });
        }
    }
};
</script>

<style></style>
