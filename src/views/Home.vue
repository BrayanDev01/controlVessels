<script>
import Form from '../components/Form.vue';
import Dashboard from '../components/Dashboard.vue';
import { mapState } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'
import Anomalies from './Anomalies.vue';
import Instruments from '../views/Instruments.vue';

export default{
    components:{
        Form,
        Dashboard,
        Anomalies,
        Instruments
    },
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("loggedUser"))
        }
    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    },
    created(){
        document.title = "Home | Controle de Embarcações"
    }
}
</script>
<template>
    <Instruments v-if="userInfo?.accessLevel === 3"></Instruments>
    <Anomalies v-if="userInfo?.accessLevel === 2"></Anomalies>
    <Form v-if="userInfo?.accessLevel === 1"></Form>
    <Dashboard v-if="userInfo?.accessLevel === 0"></Dashboard>
</template>