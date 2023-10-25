<script>
import MenuBar from '../components/MenuBar.vue'
import axios from 'axios'

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            vesselInfos: null
        }
    },
    methods:{
        // Essa função puxará a embarcação pelo parametro passado pela rota
        async getVessel(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Vessels/${this.$route.params.id}`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            const data = await axios.request(options).then(function (response) {
                console.log(response.data);
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            this.vesselInfos = data
        }
    },
    created(){
    }
}
</script>

<template>
    <MenuBar></MenuBar>
    <div class="main">
        <div class="leftSide">
            <div>Informações da embarcação</div>
            <div>Nome da embarcação</div>
            <div>Location</div>
            <div>Status</div>
            
        </div>
        <div class="rigthSide">

        </div>
    </div>

</template>

<style scoped>
.main{
    width: 100%;
    height: 100%;
    border: 1px solid red;
}
</style>