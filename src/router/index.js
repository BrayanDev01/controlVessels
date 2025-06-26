import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import VesselView from '../views/VesselView.vue';
import Locations from '../views/Locations.vue';
import Anomalies from '../views/Anomalies.vue'
import HistoricForm from '../views/HistoricForm.vue'
import ControlChanges from '../views/ControlChanges.vue'
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
        path:'/locations',
        name:'locations',
        component: Locations
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
    },
    {
        path: '/anomalies',
        name: 'anomalies',
        component: Anomalies
    },
    {
        path: '/historic/:id',
        name: 'historic',
        component: HistoricForm
    },
    {
        path: '/controlchanges',
        name: 'ControlChanges',
        component: ControlChanges
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