export default {
    //根据节点状态修改颜色
    nodeStateBgColor(row, column, columnIndex){
        if (columnIndex > 5 && column.property !== "remarks" && column.label !== "操作") {
            const nodeStateValue = row[column.property]
            if (nodeStateValue == "/") {
                return { color: '#606266' };
            } else if (nodeStateValue == "部分提供" || nodeStateValue == "部分完成") {
                return { color: '#E6A23C' };
            } else if (nodeStateValue == "提供" || nodeStateValue == "完成") {
                return { color: '#67C23A' };
            } else {
                return { color: '#F56C6C' };
            }
        }
    }
}

