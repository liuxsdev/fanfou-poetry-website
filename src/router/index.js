import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
    {
        path: '/:id?',
        name: 'Home',
        component: Home,
        props: true
    }
]


const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})


export default router