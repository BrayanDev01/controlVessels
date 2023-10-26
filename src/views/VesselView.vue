<script>
import MenuBar from '../components/MenuBar.vue'
import axios from 'axios'

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            vesselInfos: null,
            reportsVessel:[]
        }
    },
    methods:{
        // Essa função puxará a embarcação pelo parametro passado pela rota;
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
                return response.data

            }).catch(function (error) {
                console.error(error);
            });

            this.vesselInfos = data
        },
        // Função que puxará da do BD somente os reports relacionados a tal embarcação;
        async getReports(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}parse/functions/reportsVessel`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data: {vesselId: this.$route.params.id}
            };

            const results = await axios.request(options).then(function (response) {
                console.log(response.data);
                return response.data.result

            }).catch(function (error) {
                console.error(error);
            });

            this.reportsVessel = results
        },

        formatDate(value){
            if(value){
                return new Date(value).toLocaleString()
            }
        }
    },
    created(){
        this.getVessel()
        this.getReports()
    }
}
</script>

<template>
    <MenuBar></MenuBar>
    <div class="main">
        <div class="leftSide">
            <div class="titleVessel">Informações da embarcação</div>
            <div class="itemInfo">
                <div style="font-weight: bold; font-size: 25px;">Nome:</div>
                <div style="font-size: 25px;">{{ vesselInfos?.name }}</div>
            </div>
            <div class="itemInfo">
                <div style="font-weight: bold; font-size: 25px;">Localização:</div>
                <div style="font-size: 25px;">{{ vesselInfos?.location }}</div>
            </div>
            <div class="itemInfo">
                <div style="font-weight: bold; font-size: 25px;">Status:</div>
                <div style="font-size: 25px;">{{vesselInfos?.status}}</div>
            </div>
        </div>
        <div class="rigthSide">
            <div style="width: 100%; display: flex; justify-content: center; font-weight: bold;font-size: 25px; padding: 20px 0 20px 0;">Relatórios da embarcação</div>
            <DataTable :value="reportsVessel" tableStyle="min-width: 50rem" lazy>
                <Column field="objectId" header="Codigo"></Column>
                <Column field="port" header="Porto"></Column>
                <Column field="typeOperation" header="Operação"></Column>
                <Column field="startOperation.iso" header="Inicio">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.startOperation.iso) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

</template>

<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: flex;
}
.leftSide{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}
.itemInfo{
    display: flex;
    gap: 10px;
}
.titleVessel{
    font-weight: bold;
    font-size: 25px;
    margin: 20px 0 10px 0;
}
.rigthSide{
    width: 50%;
}
</style>