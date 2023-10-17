<template>
    <div class="task-add">
        <task-table-add-dialog :stateList="stateList" :staffList="staffList" :taskList="taskList" />
        <task-table-add-task-state-dialog :stateList="stateList" />
    </div>

    <el-table :ref="tableRef" :data="taskList" height="850" style="width: 100%; margin-top: 39px;">
        <el-table-column prop="staffName" align="center" label="姓名" width="180" />
        <el-table-column prop="date" :sortable="true" label="日期" align="center" width="180" :column-key="date" />
        <el-table-column prop="taskContent" align="center" label="任务">
            <template slot-scope="scope">{{ formatter(scope.row) }}</template>
        </el-table-column>
        <el-table-column prop="taskState" align="center" label="状态" width="120" :filters="stateToFilter"
            :filter-method="filterState" filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag effect="dark"
                    :type="scope.row.taskState === '完成' ? 'success' : (scope.row.taskState === '未完成' ? 'warning' : 'danger')"
                    disable-transitions>
                    {{ scope.row.taskState }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
                <task-table-edit-dialog :staffList="staffList" :stateList="stateList" :scope="scope" :taskList="taskList" />
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script>
import axios from '../../axios';
import TaskTableAddDialog from './taskDialog/taskTableAddDialog.vue';
import TaskTableEditDialog from './taskDialog/taskTableEditDialog.vue';
import TaskTableAddTaskStateDialog from './taskDialog/taskTableAddTaskStateDialog.vue';

export default {
    data() {
        return {
            tableRef: null,
            taskList: [],
            staffList: [],
            stateList: [],
            stateToFilter: [],
        };
    },
    mounted() {
        this.getStaffTask();
        this.getStaffList();
        this.getTaskState();
    },
    methods: {
        async getStaffTask() {
            const res = await axios.get("/staff/taskList?days=7");
            this.taskList = res.data.data;
        },
        async getStaffList() {
            const res = await axios.get('http://192.168.10.248:9001/api/user/department/users?department=制造部');
            this.staffList = res.data.users;
        },
        async getTaskState() {
            const res = await axios.get('/taskState/taskStates');
            this.stateList = res.data.data;
            this.stateToFilter = this.stateList.map((state) => {
                return { text: state.taskState, value: state.taskState };
            });
        },
        resetDateFilter() {
            this.tableRef.clearFilter(['date']);
        },
        formatter(row) {
            return row.taskContent;
        },
        filterState(value, row) {
            return row.taskState === value;
        },
    },
    components: { TaskTableAddDialog, TaskTableEditDialog, TaskTableAddTaskStateDialog },
};
</script>
  
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.task-add {
    width: 100px;
    display: flex;
    height: 32px;
    position: relative;
    top: 0;
    left: 120px;
}

.task-add>button:last-child {
    margin-left: 20px;
}
</style>
  