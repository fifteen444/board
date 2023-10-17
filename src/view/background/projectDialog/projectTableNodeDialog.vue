<template>
    <el-button style="margin-left: 10px;" type="primary" size="default" @click="node_project = true">节点编辑</el-button>
    <el-dialog v-model="node_project" width="50%" align-center>

        <el-form :model="addNodeform_project" label-width="120px">
            <el-form-item label="节点类型">
                <el-select v-model="addNodeform_project.typeName" @change="typeNodeOptionChange" filterable allow-create
                    default-first-option :reserve-keyword="false">
                    <el-option v-for="parentNode in typeNodeList" @click="getTypeId(parentNode)"
                        :label="parentNode.typeName" :value="parentNode.typeName" />
                </el-select>
            </el-form-item>
            <el-form-item label="节点名称">
                <el-select v-model="addNodeform_project.nodeName" @change="nodeNameChange" filterable allow-create
                    default-first-option :reserve-keyword="false">
                    <el-option v-for="node in nodeNameOption" @click="getNodeId" :value="node.nodeName"
                        :label="node.nodeName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="saveBtn" @click="onsubmitAddNode_project">保存</el-button>
                <el-button type="primary" size="default" :disabled="deleteBtn"
                    @click="onsubmitDeleteNode_project">删除</el-button>
            </el-form-item>
        </el-form>


        <el-form label-width="120px">
            <el-form-item label="节点类型">
                <draggable v-model="typeNodeList" animation="500">
                    <transition-group>
                        <el-tag class="sortTypeTag" v-for="type in typeNodeList" :key="type.typeId">
                            {{ type.typeName }}
                        </el-tag>
                    </transition-group>
                </draggable>
            </el-form-item>

            <el-form-item v-for="type in typeNodeList" :label="type.typeName">
                <draggable class="dragBox" v-model="nodeList" animation="500">
                    <transition-group>
                        <div v-for="node in nodeList" :key="node.nodeId">
                            <el-tag class="sortNodeTag" v-if="node.typeId === type.typeId">
                                {{ node.nodeName }}
                            </el-tag>
                        </div>
                    </transition-group>
                </draggable>
            </el-form-item>
        </el-form>

        <template slot="footer">
            <span class="dialog-footer">
                <el-button @click="node_project = false">取消</el-button>
                <el-button type="primary" @click="onsubmitSortNode_project()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            typeNodeList: [],
            nodeList: [],
            node_project: false,
            nodeNameOption: [],
            nodeIdInSelect: null,
            typeIdInSelect: null,
            canBeDelete: [],
            deleteBtn: true,
            saveBtn: true,
            addNodeform_project: {
                typeName: '',
                nodeName: ''
            }
        };
    },
    props: ['parentNodeList', 'projectList'],
    mounted() {
        this.getTypeNode();
        this.getNode();
    },
    methods: {
        getTypeNode() {
            // Your axios code for fetching typeNodeList
        },
        getNode() {
            // Your axios code for fetching nodeList
        },
        typeNodeOptionChange() {
            // Your logic for typeNodeOptionChange
        },
        onsubmitAddNode_project() {
            // Your logic for adding a node
        },
        getTypeId(parentNode) {
            // Your logic for getting typeIdInSelect
        },
        nodeNameChange() {
            // Your logic for nodeNameChange
        },
        getNodeId() {
            // Your logic for getting nodeIdInSelect and canBeDelete
        },
        onsubmitDeleteNode_project() {
            // Your logic for deleting a node
        },
        onsubmitSortNode_project() {
            // Your logic for sorting nodes
        }
    },
    components: {
        draggable: window.vuedraggable // Assuming you have vuedraggable installed
    }
};
</script>

<style>
.sortTypeTag {
    margin-left: 10px;
    cursor: pointer;
}

.sortNodeTag {
    margin-left: 10px;
    cursor: pointer;
}

.dragBox {
    display: flex;
    flex-wrap: wrap;
}
</style>
