import Router from 'vue-router'

import interfaceManager from './interface-manager.vue'



export default new Router({
    routes:[
        {
            path:'/interface',
            name:'interface',
            component:interfaceManager
        }
    ]
})