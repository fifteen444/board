import { defineStore } from 'pinia';
export const useUserStore = defineStore('userStore',{
  state: () => ({
      backgroundIsShow:true,
      registerIsShow:true,
      userName:'',
      
  }),
  actions:{
    	
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [{
      key: 'kanban',
      storage: localStorage
    }]
  }
})
