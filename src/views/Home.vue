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
            teste: 0
        }
    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    }
}
</script>
<template>
    <Form v-if="userInformations?.accessLevel > 0"></Form>
    <Dashboard v-else></Dashboard>
</template>