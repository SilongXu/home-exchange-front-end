import Router from 'vue-router'

import TransferLogs from './transfer-logs.vue'
import TransferManage from './transfer-manage.vue'


export default new Router({
    routes:[
        {
            path:'/transfer',
            name:'transfer',
            component:TransferManage,
        },
        {
            path:'/transfer/transferlog',
            name:'transferlog',
            component:TransferLogs
        },
    ]
})