<template>
    <div class="project-add">
        <!-- 添加项目弹窗 -->
        <ProjectTableAddDialog :projectStateList="projectStateList" :parentNodeList="parentNodeList"
            :node-state-list="nodeStateList"></ProjectTableAddDialog>
        <!-- 节点编辑弹窗 -->
        <ProjectTableNodeDialog :parentNodeList="parentNodeList" :projectList="projectList"></ProjectTableNodeDialog>
    </div>

    <el-table class="table" :data="projectList" :border="true" :cell-style="color"
        style="width: 100%;margin-top: 39px;" align="center" height="850">
        <el-table-column prop="projectName" fixed :resizable="true" align="center" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="mouldCount" align="center" :sortable="true" label="模具套数" width="60"></el-table-column>
        <el-table-column align="center" label="项目状态" prop="projectState" width="100" :filters="projectStateToFilter"
            :filter-method="filterProjectState" filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag effect="dark" :type="scope.row.projectState == '正常设计' ? 'success' : (scope.row.projectState == '未启动' ? 'warning' : 'danger')">
                    {{ scope.row.projectState }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="stateRemarks" :resizable="true" width="130" label="项目状态描述"></el-table-column>
        <el-table-column prop="progressRisk" align="center" :resizable="true" label="项目进度质量风险" width="200"></el-table-column>
        <el-table-column prop="processingCount" align="center" :sortable="true" label="设计中套数" width="70"></el-table-column>

        <!-- Render dynamic el-table-columns -->
        <el-table-column v-for="parentNode in parentNodeList" :key="parentNode.typeName" :label="parentNode.typeName" align="center">
            <el-table-column v-for="childNode in parentNode.projectDesignNodeList"
                :prop="`${parentNode.typeName}-${childNode.nodeName}`" :label="childNode.nodeName" align="center" width="90"></el-table-column>
        </el-table-column>

        <el-table-column prop="remarks" align="center" :resizable="true" label="备注" width="160"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="150">
            <template slot-scope="scope">
                <!-- 编辑项目弹窗 -->
                <ProjectTableEditDialog :projectStateList="projectStateList" :nodeStateList="nodeStateList"
                    :parentNodeList="parentNodeList" :scope="scope" :projectList="projectList"></ProjectTableEditDialog>
                <el-button type="danger" size="small" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import axios from '../../axios';
import ProjectTableAddDialog from './projectDialog/projectTableAddDialog.vue';
import ProjectTableNodeDialog from './projectDialog/projectTableNodeDialog.vue';
import ProjectTableEditDialog from './projectDialog/projectTableEditDialog.vue';
import nodeColor from '../../utils/nodeColor';

export default {
    data() {
        return {
            projectStateToFilter: [],
            deleteDialog_project: false,
            nodeStateList: [],
            projectList: [],
            parentNodeList: [],
            projectStateList: []
        };
    },
    mounted() {
        this.getAllProject();
        this.getAllParentNode();
        this.getNodeStateList();
        this.getProjectStateList();
    },
    methods: {
        filterProjectState(value, row) {
            return row.projectState === value;
        },
        color({ row, column, columnIndex }) {
            return nodeColor.nodeStateBgColor(row, column, columnIndex);
        },
        async getAllProject() {
            const res = await axios.get('/project/projects');
            res.data.data.forEach((project) => {
                for (const projectType of project.projectDesignNodeTypeList) {
                    for (const projectNode of projectType.projectDesignNodeList) {
                        project[`${projectType.typeName}-${projectNode.nodeName}`] = projectNode.nodeState.nodeState;
                    }
                }
            });
            this.projectList = res.data.data;
        },
        async getProjectStateList() {
            const res = await axios.get('/projectState/states');
            this.projectStateList = res.data.data;
            this.projectStateToFilter = this.projectStateList.map(cur => {
                return { text: cur.projectState, value: cur.projectState };
            });
        },
        async getNodeStateList() {
            const res = await axios.get('/node/states');
            this.nodeStateList = res.data.data;
        },
        async getAllParentNode() {
            const res = await axios.get('/nodeType/nodes');
            for (const r of res.data.data) {
                for (const p of r.projectDesignNodeList) {
                    p.nodeState = {
                        nodeState: '/',
                        nodeStateId: 1
                    };
                }
            }
            this.parentNodeList = res.data.data;
        },
        deleteRow(row) {
            this.$confirm('确认删除此数据吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete('/project/project/' + row.id);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {});
        }
    },
    components: {
        ProjectTableAddDialog,
        ProjectTableNodeDialog,
        ProjectTableEditDialog
    }
}
</script>

<style>
.table {
    margin-top: 5px;
}

.project-add {
    width: 100px;
    height: 32px;
    display: flex;
    position: relative;
    top: 0;
    left: 120px;
}

.deleteAlertMsg {
    font-size: 20px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>
