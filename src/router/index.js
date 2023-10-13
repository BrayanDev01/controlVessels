import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path:'/',
        component: Login
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/form',
        component: Form
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router