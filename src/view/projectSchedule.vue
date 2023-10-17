<template>
  <SecondNav />
  <div class="screen">
    <el-table ref="projectTableRef" row-key="id" :data="projectScheduleList" :border="true" :cell-style="color"
      style="width: 100%" align="center" max-height="850">
      <el-table-column prop="projectName" align="center" fixed="" label="项目名称" width="150" />
      <el-table-column prop="mouldCount" align="center" label="模具套数" width="60" />
      <el-table-column align="center" label="项目状态" prop="projectState" width="100">
        <template #default="scope">
          <el-tag effect="dark"
            :type="scope.row.projectState == '正常设计' ? 'success' : (scope.row.projectState == '未启动' ? 'warning' : 'danger')">
            {{ scope.row.projectState }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="stateRemarks" width="130" label="项目状态描述" />
      <el-table-column prop="progressRisk" align="center" label="项目进度质量风险" width="200" />
      <el-table-column prop="processingCount" align="center" label="设计中套数" width="70" />
      <el-table-column v-for="parentNode in projectHeaderList" :key="parentNode.typeName" :label="parentNode.typeName"
        align="center">
        <el-table-column v-for="childNode in parentNode.projectDesignNodeList"
          :prop="`${parentNode.typeName}-${childNode.nodeName}`" :label="childNode.nodeName" align="center" width="90" />
      </el-table-column>
      <el-table-column prop="remark" align="center" :resizable="true" label="备注" width="160" />
    </el-table>
  </div>
</template>

 
<script lang="ts">
import axios from '../axios';
import { nextTick, onMounted, ref } from 'vue';
import SecondNav from '../components/SecondNav.vue';
import scrollTable from '../utils/scrollTable';
import nodeColor from '../utils/nodeColor';
export default {
  setup() {
    interface Project {
      id: number,
      mouldCount: number,
      processingCount: number,
      progressRisk: string,
      projectName: string,
      projectState: string,
      projectStateId: number,
      remarks: string,
      stateRemarks: string,
      projectDesignNodeTypeList: NodeType[]
    }
    interface NodeType {
      typeId: number,
      typeIndex: number,
      typeName: string,
      projectDesignNodeList: Node[]
    }
    interface Node {
      nodeId: number,
      nodeIndex: number,
      nodeName: string,
      nodeState: {
        nodeState: string,
        nodeStateId: number
      }
    }
    //项目列表
    const projectScheduleList = ref<Project[]>([]);
    //节点类型&节点表头数据
    const projectHeaderList = ref<NodeType[]>([]);
    const projectTableRef = ref();

    onMounted(() => {
      getProject();
      getHeaderList();
      nextTick(() => {
        scrollTable.scrollUp(projectTableRef.value);
        scrollTable.scrollLeft(projectTableRef.value);
      })
    })

    const color = ({ row, column, columnIndex }) => {
      return nodeColor.nodeStateBgColor(row, column, columnIndex);
    }

    //获取项目信息
    async function getProject() {
      const res = await axios.get('/project/projects')
      res.data.data.forEach((project: Project) => {
        for (const projectType of project.projectDesignNodeTypeList) {
          for (const projectNode of projectType.projectDesignNodeList) {
            project[`${projectType.typeName}-${projectNode.nodeName}`] = projectNode.nodeState.nodeState;
          }
        }
      });
      projectScheduleList.value = res.data.data;
    }

    //获取节点类型&节点表头数据
    async function getHeaderList() {
      const res = await axios.get('/nodeType/nodes');
      projectHeaderList.value = res.data.data;
    }

    return {
      projectScheduleList,
      projectHeaderList,
      projectTableRef,
      color
    };
  },
  components: { SecondNav }
}
</script>
 
<style>
.screen {
  position: relative;
  width: 100%;
  height: 91vh;
  overflow: hidden;
  box-sizing: border-box;
  top: 80px;
}
</style>