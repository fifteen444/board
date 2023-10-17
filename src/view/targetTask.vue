<template>
	<SecondNav />
	<div class="targetTask-screen" id="innerbox">
		<div class="targetTask-Toolbar">
			<el-form class="targetTask-form">
				<el-form-item class="targetTask-form_item">
					<el-input-number class="targetTask-Toolbar-Input" v-model="dayCount" placeholder="请输入显示天数" />
				</el-form-item>
			</el-form>
			<el-button style="margin-left: 10px;" type="primary" @click="getPageData">确认</el-button>
		</div>
		<div class="targetTask-Table">
			<el-table :data="tableData" ref="taskTableRef" border style="width: 100%;">
				<el-table-column prop="staff" align="center" label="姓名" fixed width="100" />
				<el-table-column v-for="date in dates" :label="date" width="400" align="center">
					<template #default="scope">
						<div class="table-column-cell-task" v-for="task in (scope.row as TableData).dateToTasks[date]">
							<div class="table-column-cell-task-taskContent">{{ task.taskContent }}</div>
							<div class="table-column-cell-task-taskState">
								<el-tag effect="dark" :type="task.taskState == '完成' ? 'success' : (task.taskState == '未完成' ? 'warning' : 'danger')">
									{{ task.taskState }}
								</el-tag>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '../axios';
import { groupBy } from 'lodash';
import scrollTable from '../utils/scrollTable';
import SecondNav from '../components/SecondNav.vue';
import * as dayjs from 'dayjs';

interface Task {
	id: number,
	staffId: number,
	staffName: string,
	taskContent: string,
	workingHour: number,
	date: string,
	taskState: string,
	taskScore: number
}

interface TableData {
	staff: string,
	dateToTasks: {
		[date: string]: Task[]
	}
}

const dayCount = ref(7);
const dates = ref<string[]>([]);
const tableData = ref<TableData[]>([]);
const taskTableRef = ref();
async function getPageData() {

	const dateValues = getDates(dayCount.value);

	dates.value = dateValues;

	const start = dateValues[0];
	const end = dateValues[dateValues.length - 1];

	const tasks = await getTasks(start, end);

	tableData.value = [];

	const staffIdToTasks = groupBy(tasks, t => t.staffName);

	for (const staff in staffIdToTasks) {
		const tasksOfStaff = staffIdToTasks[staff];

		const dateToTasks = groupBy(tasksOfStaff, t => t.date);
		tableData.value.push({ staff: staff, dateToTasks: dateToTasks });
	}
}

function getDates(dayCount: number) {

	const dates: string[] = [];
	const earliestOffset = Math.floor(dayCount / 2);
	const earliestDate = dayjs().subtract(earliestOffset, 'd');
	dates.push(format(earliestDate));

	for (let i = 1; i < dayCount; i++) {
		const date = earliestDate.add(i, 'd');
		dates.push(format(date));
	}
	return dates;
}

function format(date: dayjs.Dayjs) {
	return date.format('YYYY-MM-DD');
}

async function getTasks(startDate: string, endDate: string) {
	const res = await axios.get('/staff/taskInRange', {
		params: {
			endDate: endDate,
			startDate: startDate
		}
	})
	return res.data.data as Task[];
}


onMounted(async () => {
	await getPageData();
	scrollTable.scrollUp(taskTableRef.value);
	scrollTable.scrollLeft(taskTableRef.value);
});


</script>
<style>
.targetTask-screen {
	position: relative;
	width: 100%;
	height: 91vh;
	overflow: hidden;
	box-sizing: border-box;
	top: 80px;
}
.targetTask-Toolbar {
	width: 270px;
	height: 50px;
	margin-left: 50px;
	display: flex;
	align-items: center;
}
.targetTask-Toolbar-Input {
	display: block;
}
.targetTask-form {
	display: block;
	height: 50px;
}
.targetTask-form_item {
	display: block;
	margin-top: 9px;
	height: 30px;
}
.targetTask-Table {
	width: 100%;
}
.table-column-cell-task {
	display: flex;
	text-align: center;
	border-bottom: 1px solid #ebeef5;
	align-items: center;
}
.table-column-cell-task:last-child {
	border-bottom: none;
}
.table-column-cell-task:not(:first-child) {
	padding-top: 8px;
}
.table-column-cell-task:not(:last-child) {
	padding-bottom: 8px;
}
.table-column-cell-task-taskContent {
	width: 310px;
}
.table-column-cell-task-taskState {
	width: 60px;
}
</style>