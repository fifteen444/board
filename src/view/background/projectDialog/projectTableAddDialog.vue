<template>
    <el-button type="primary" size="default" @click="addDialog_project = true">添加</el-button>
    <el-dialog v-model="addDialog_project" width="46%" style="margin-top: 35px;" align-center destroy-on-close>
        <el-form :model="addForm_project" ref="addFormRef" :rules="addFormRules" label-position="right" label-width="130px">
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="addForm_project.projectName"></el-input>
            </el-form-item>
            <el-form-item label="模具套数" prop="mouldCount">
                <el-input v-model.number="addForm_project.mouldCount" />
            </el-form-item>
            <el-form-item label="项目状态" prop="projectState">
                <el-select v-model="addForm_project.projectState">
                    <el-option v-for="projectState in props.projectStateList" :label="projectState.projectState"
                        :value="projectState.projectStateId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目状态描述">
                <el-input v-model="addForm_project.stateRemarks"></el-input>
            </el-form-item>
            <el-form-item label="项目进度质量风险">
                <el-input v-model="addForm_project.progressRisk"></el-input>
            </el-form-item>
            <el-form-item label="设计中套数" prop="processingCount">
                <el-input v-model.number="addForm_project.processingCount"></el-input>
            </el-form-item>

            <el-form-item v-for="(type, tIndex) in props.parentNodeList" :label="type.typeName">
                <el-form-item v-for="(node, nIndex) in type.projectDesignNodeList" :label="node.nodeName">
                    <el-select v-model="node.nodeState.nodeState">
                        <el-option v-for="state in props.nodeStateList" @click="getNodeStateId(state, tIndex, nIndex)"
                            :label="state.nodeState" :value="state.nodeState"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>

            <el-form-item label="备注">
                <el-input v-model="addForm_project.remarks"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialog_project = false">取消</el-button>
                <el-button type="primary" @click="onsubmitAdd_project(addFormRef)">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            addDialog_project: false,
            addForm_project: {
                projectName: '',
                mouldCount: '',
                projectStateId: '',
                stateRemarks: '',
                progressRisk: '',
                processingCount: '',
                projectDesignNodeTypeList: [],
                remarks: '',
                id: 0,
                projectState: ''
            },
            addFormRef: null,
            addFormRules: {
                projectName: [
                    { required: true, message: '请输入项目名', trigger: 'blur' }
                ],
                mouldCount: [
                    { required: true, message: '请输入模具套数' },
                    { type: 'number', message: '模具套数应为数字' }
                ],
                projectState: [
                    { required: true, message: '请选择项目状态', trigger: 'change' },
                ],
                processingCount: [
                    { required: true, message: '请输入设计中套数' },
                    { type: 'number', message: '设计中套数应为数字' }
                ]
            },
            props: this.$props
        };
    },
    methods: {
        getNodeStateId(state, tIndex, nIndex) {
            console.log(state, tIndex, nIndex);
            this.props.parentNodeList[tIndex].projectDesignNodeList[nIndex].nodeState = {
                nodeState: state.nodeState,
                nodeStateId: state.nodeStateId
            };
        },
        onsubmitAdd_project(formEl) {
            if (!formEl) return;
            formEl.validate((valid) => {
                if (valid) {
                    this.addForm_project.projectDesignNodeTypeList = this.props.parentNodeList;
                    axios.post('/project/project', {
                        projectName: this.addForm_project.projectName,
                        mouldCount: this.addForm_project.mouldCount,
                        projectStateId: this.addForm_project.projectState,
                        stateRemarks: this.addForm_project.stateRemarks,
                        progressRisk: this.addForm_project.progressRisk,
                        processingCount: this.addForm_project.processingCount,
                        projectDesignNodeTypeList: this.addForm_project.projectDesignNodeTypeList,
                        remarks: this.addForm_project.remarks
                    }).then(() => { }).catch(err => {
                        this.$message.error("获取数据失败" + err);
                    });
                } else {
                    this.$message.error('格式错误.');
                }
            });
        }
    }
};
</script>

<style></style>