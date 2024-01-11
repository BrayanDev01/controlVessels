<script>
import Form from '../components/Form.vue';
import Dashboard from '../components/Dashboard.vue';
import { mapState } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'

export default{
    components:{
        Form,
        Dashboard
    },
    data(){
        return{
            teste: 0,
            userInfo: JSON.parse(localStorage.getItem("loggedUser"))
        }
    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    }
}
</script>
<template>
    <Form v-if="userInfo?.accessLevel > 0"></Form>
    <Dashboard v-else></Dashboard>
</template>