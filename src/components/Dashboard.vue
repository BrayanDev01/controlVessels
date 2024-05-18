<script>
import axios from 'axios'
import MenuBar from '../components/MenuBar.vue'

export default{
    components:{
        MenuBar
    },

    data(){
        return{
            vessels:[],
            charges:[],
            selectedVessel:[],
            metaKey: true,
            reportDialog: false
        }
    },
    methods:{
        async getVessels(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Vessels`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            const results = await axios.request(options).then(function (response) {
                // console.log(response.data.results);
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            this.vessels = results
        },

        async getReports(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Charge`,
                params:{order: "-createdAt"},
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            await axios.request(options).then((response) => {
                // console.log(response.data.results);
                this.charges = response.data.results
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            
        },
        formatDate(value){
            if(value){
                return new Date(value).toLocaleString()
            }
        },
        goToView(e){
            this.$router.push(`/vesselView/${e.data.objectId}`)
            // console.log(e.data.objectId)
        },
        onRowSelect(e){
            this.selectedVessel = e.data
            this.$toast.add({
                severity:'success', 
                summary:'Relátorio selecionado',
                detail: e.data.vessel.name,
                life: 3000
            })
            // console.log(this.selectedVessel)
            this.reportDialog = true
            console.log(this.selectedVessel)
        }
    },
    created(){
        this.getVessels();
        this.getReports();
    }
}
</script>
<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dashboard">
            <div class="vesselSide">
                <div class="titleSide">Embarcações</div>
                <DataTable 
                    :value="vessels" 
                    tableStyle="min-width: 50rem" 
                    @rowSelect="goToView" 
                    selectionMode="single" 
                    dataKey="id"
                    :rows="8"
                    paginator
                >
                    <Column field="name" header="Nome"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="location" header="Localização"></Column>
                </DataTable>                
            </div>
            <div class="reportSide">
                <div class="titleSide">Carregamentos / Descarregamentos</div>
                <DataTable 
                    :value="charges" 
                    tableStyle="min-width: 50rem" 
                    selectionMode="single" 
                    dataKey="id" 
                    @rowSelect="onRowSelect"
                    :rows="8"
                    paginator
                >
                    <Column field="numericId" header="Código"></Column>
                    <Column field="barcaca.barcaca" header="Barcaça"></Column>
                    <Column field="vessel" header="Embarcação"></Column>
                </DataTable>
                <Dialog 
                    v-model:visible="reportDialog" 
                    modal
                    :style="{ width: '70vw'}" 
                    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                >
                    <template #header>
                        <span style="font-weight: bold; font-size: larger;">Relátorio - #{{ selectedVessel?.numericId }}</span>
                    </template>
                    <div style="display: flex;">
                        <div class="rigthSide">
                            <div class="titleVessel">Informações de Carregamento</div>

                            
                        </div>
                        <div class="leftSide">
                            <div class="titleVessel">Informações de Descarregamento</div>
                        </div>
                    </div>
                </Dialog>
                <Toast></Toast>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main{
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    background-color: var(--gray-bg-gc);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
}
.titleSide{
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: larger;
    margin:10px 0 10px 0 ;

}

.dashboard{
    max-width: 100dvw;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    margin: 30px 0px ;
    gap: 20px;
    
}
.vesselSide, .reportSide{
    width: 45%;
    height: 40rem;
    border-radius: 20px;
    background-color: var(--white-gc);
}
.rigthSide, leftSide{
    width: 50%;

}

@media (max-width: 1500px){
    .main{
        width: 100vw;
        height: 100%;
        background-color: var(--gray-bg-gc);
        display: flex;
        flex-direction: column;
    }
    .dashboard{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 30px 0 0 0 ;
        gap: 20px;
    }
    .vesselSide, .reportSide{
        width: 90%;
        height: 40rem;
        border-radius: 20px;
        background-color: var(--white-gc);
    }
}
</style>