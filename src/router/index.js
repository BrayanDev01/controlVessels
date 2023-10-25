import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'
import NotFound from '../components/NotFound.vue'
import VesselView from '../views/VesselView.vue'


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
    {
        path:'/vesselView/:id',
        component: VesselView
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: NotFound 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router