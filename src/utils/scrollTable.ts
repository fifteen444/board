import { ref } from 'vue';
 
export default {
    scrollUp(tableRef) {
         const table_scroll = tableRef.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0];
         const tableScroll = ref(true);
         setInterval(() => {
             if(tableScroll.value) {
                table_scroll.scrollTop += 1;
                 if(table_scroll.clientHeight + table_scroll.scrollTop === table_scroll.scrollHeight) {
                    table_scroll.scrollTop = 0;
                 }
             }
         }, 100)
    },
    scrollLeft(tableRef) {
        const table_scroll = tableRef.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0];
        const tableScroll = ref(true);
        setInterval(() => {
            if(tableScroll.value) {
               table_scroll.scrollLeft += 1;
                if(table_scroll.clientWidth + table_scroll.scrollLeft === table_scroll.scrollWidth) {
                   table_scroll.scrollLeft = 0;
                }
            }
        }, 100)
   }

}