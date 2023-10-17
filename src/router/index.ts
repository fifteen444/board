import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TargetTaskView from "../view/targetTask.vue";
import ProjectScheduleView from "../view/projectSchedule.vue";
import BackgroundManageView from "../view/BackgroundManage.vue";
import UserLogin from "../view/login/UserLogin.vue";
import { useUserStore } from "../store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/TargetTask"
  },
  {
    path: "/TargetTask",
    name: "TargetTask",
    component: TargetTaskView
  },
  {
    path: "/ProjectSchedule",
    name: "ProjectSchedule",
    component: ProjectScheduleView
  },
  {
    path: "/UserLogin",
    name: "UserLogin",
    component: UserLogin
  },
  {
    path: "/BackgroundManage",
    name: "BackgroundManage",
    redirect: "/BackgroundManage/TaskTable",
    component: BackgroundManageView,
    children: [
      {
        path: "TaskTable",
        name: "TaskTable",
        component:()=> import('../view/background/taskTable.vue')
      },
      {
        path: "ProjectTable",
        name: "ProjectTable",
        component:()=> import('../view/background/projectTable.vue')
      },
      {
        path: "UserRegister",
        name: "UserRegister",
        component:()=> import('../view/background/UserRegister.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "linkActive"
});

router.beforeEach((to,from,next) => {
  const token = localStorage.getItem('token');
  const userStore = useUserStore();
  if(to.name == 'TargetTask' || to.name == 'ProjectSchedule') {
    userStore.backgroundIsShow = true;
  }else {
    userStore.backgroundIsShow = false;
  }
  
  if(to.path == '/BackgroundManage/TaskTable' || to.path == '/BackgroundManage/ProjectTable' || to.path == '/BackgroundManage/UserRegister') {
    if(token === null || token === '') {
      next({path:'/UserLogin'});
    }else {
      next();
    }
  }else{
    next();
  }
})

export default router;
