<template>
    <el-button type="primary" size="small" @click="editRow(scope.row)">编辑</el-button>
    <el-dialog v-model="editDialog_project" :modal="true" width="50%" height="300px"
        style="margin-top: 35px;z-index: 11 !important;" :center="true" :close-on-click-modal="false">
        <el-form :model="editForm_project" label-position="right" label-width="130px">
            <el-form-item label="项目名称">
                <el-input v-model="editForm_project.projectName"></el-input>
            </el-form-item>
            <el-form-item label="模具套数">
                <el-input v-model="editForm_project.mouldCount"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-select v-model="editForm_project.projectState">
                    <el-option v-for="projectState in props.projectStateList" :key="projectState.projectStateId"
                        :label="projectState.projectState" :value="projectState.projectStateId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目状态描述">
                <el-input v-model="editForm_project.stateRemarks"></el-input>
            </el-form-item>
            <el-form-item label="项目进度质量风险">
                <el-input v-model="editForm_project.progressRisk"></el-input>
            </el-form-item>
            <el-form-item label="设计中套数">
                <el-input v-model="editForm_project.processingCount"></el-input>
            </el-form-item>

            <el-form-item v-for="(type, tIndex) in parentNodeListNew" :key="tIndex" :label="type.typeName">
                <el-form-item v-for="(node, nIndex) in type.projectDesignNodeList" :key="nIndex" :label="node.nodeName">
                    <el-select v-model="node.nodeState.nodeState">
                        <el-option v-for="state in props.nodeStateList" :key="state.nodeStateId" :label="state.nodeState"
                            :value="state.nodeState"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>

            <el-form-item label="备注">
                <el-input v-model="editForm_project.remarks"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialog_project = false">取消</el-button>
            <el-button type="primary" @click="onsubmitEdit_project">
                确认
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            editForm_project: {
                id: '',
                projectName: '',
                mouldCount: '',
                projectState: '',
                projectStateId: '',
                stateRemarks: '',
                progressRisk: '',
                processingCount: '',
                projectDesignNodeTypeList: [],
                remarks: ''
            },
            editDialog_project: false,
            parentNodeListNew: [],
            projectId: null,
            projectStateIdInselect: null
        };
    },
    props: {
        projectStateList: Array,
        parentNodeList: Array,
        nodeStateList: Array,
        scope: Object,
        projectList: Array
    },
    methods: {
        getProjectState(projectState) {
            this.projectStateIdInselect = projectState.projectStateId;
        },
        editRow(row) {
            this.editDialog_project = true;
            this.projectId = row.id;
            this.parentNodeListNew = row.projectDesignNodeTypeList;
            this.$nextTick(() => {
                this.editForm_project.projectName = row.projectName;
                this.editForm_project.mouldCount = row.mouldCount;
                this.editForm_project.projectState = row.projectState;
                this.editForm_project.projectStateId = row.projectStateId;
                this.editForm_project.stateRemarks = row.stateRemarks;
                this.editForm_project.progressRisk = row.progressRisk;
                this.editForm_project.processingCount = row.processingCount;
                this.editForm_project.projectDesignNodeTypeList = row.projectDesignNodeTypeList;
                this.editForm_project.remarks = row.remarks;
            });
        },
        getNodeStateId(state, tIndex, nIndex) {
            this.parentNodeListNew[tIndex].projectDesignNodeList[nIndex].nodeState = {
                nodeState: state.nodeState,
                nodeStateId: state.nodeStateId
            };
        },
        onsubmitEdit_project() {
            // Assuming you have access to this.axios for making the HTTP request
            this.editForm_project.projectDesignNodeTypeList = this.parentNodeListNew;
            this.axios.put('/project/project', {
                id: this.projectId,
                projectName: this.editForm_project.projectName,
                mouldCount: this.editForm_project.mouldCount,
                projectStateId: this.projectStateIdInselect,
                stateRemarks: this.editForm_project.stateRemarks,
                progressRisk: this.editForm_project.progressRisk,
                processingCount: this.editForm_project.processingCount,
                projectDesignNodeTypeList: this.editForm_project.projectDesignNodeTypeList,
                remarks: this.editForm_project.remarks
            }).then(() => {

            }).catch(err => {
                this.$message.error("获取数据失败" + err);
            });
        }
    }
};
</script>

<style scoped></style>
