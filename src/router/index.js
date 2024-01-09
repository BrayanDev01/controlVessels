import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import VesselView from '../views/VesselView.vue'
import { userInfoStore } from "../store/UserInfos";


const routes = [
    {
        path:'/',
        name:'login',
        component: Login
    },
    {
        path:'/home',
        name:'home',
        component: Home
    },
    {
        path:'/form',
        name:'form',
        component: Form
    },
    {
        path:'/vesselView/:id',
        name:'vesselview',
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

router.beforeEach((to, from, next) => {
    const store = userInfoStore();
    if (to.name !== 'login' && store.returnInfos === null && localStorage.getItem('loggedUser') === null){
      next({ name:'login' })
    }
    else {
      next()
    }
})

export default router