<script>
import Form from '../components/Form.vue';
import Dashboard from '../components/Dashboard.vue';

export default{
    components:{
        Form,
        Dashboard
    },
    data(){
        return{
            teste: 0     
        }
    }
}
</script>
<template>
    <Form v-if="teste === 1"></Form>
    <Dashboard v-else></Dashboard>
</template>