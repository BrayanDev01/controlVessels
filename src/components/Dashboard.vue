<script>
import axios from 'axios'

export default{
    data(){
        return{
            vessels:[],
            reports:[],
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
                console.log(response.data.results);
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            this.vessels = results
        },

        async getReports(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/reports?include=vessel`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            const results = await axios.request(options).then(function (response) {
                console.log(response.data.results);
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            this.reports = results
        },
        formatDate(value){
            if(value){
                return new Date(value).toLocaleString()
            }
        },
        onRowSelect(e){
            this.selectedVessel = e.data
            this.$toast.add({
                severity:'success', 
                summary:'Relátorio selecionado',
                detail: e.data.vessel.name,
                life: 3000
            })
            console.log(this.selectedVessel)
            this.reportDialog = true
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
        <div class="header">
            <img src="../assets/Gp_Cidade_DarkBG 1.png" alt="Grupo Cidade">
            <div class="options">
                <router-link to="/home" class="buttonLink">
                    <div>Home</div>
                </router-link>
                <router-link to="/form" class="buttonLink">
                    <div>Formulário</div>
                </router-link>
                <router-link to="/" class="buttonLink">
                    <div>Sair</div>
                </router-link>
            </div>
        </div>
        <div class="dashboard">
            <div class="vesselSide">
                <div class="titleSide">Embarcações</div>
                <DataTable :value="vessels" tableStyle="min-width: 50rem">
                    <Column field="name" header="Nome"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="location" header="Localização"></Column>
                </DataTable>                
            </div>
            <div class="reportSide">
                <div class="titleSide">Relatórios</div>
                <DataTable :value="reports" tableStyle="min-width: 50rem" selectionMode="single" dataKey="id" @rowSelect="onRowSelect">
                    <Column field="vessel.name" header="Embarcação"></Column>
                    <Column field="startOperation.iso" header="Inicio">
                        <template #body="slotProps">
                            {{ formatDate(slotProps.data.startOperation.iso) }}
                        </template>
                    </Column>
                    <Column field="endOperation.iso" header="Fim">
                        <template #body="slotProps">
                            {{ formatDate(slotProps.data.endOperation.iso) }}
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="reportDialog" modal header="Relatório" :style="{ width: '50vw' }">
                    <div class="rigthSide">
                        <div class="titleVessel">{{ selectedVessel?.vessel.name }}</div>
                        <div>{{ selectedVessel?.vessel.Status }}</div>
                        
                    </div>
                    <div class="leftSide">

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
    height: 100vh;
    background-color: var(--gray-bg-gc);
    display: flex;
    flex-direction: column;
}
.header{
    width: 100vw;
    height: 100px;
    background-color: var(--primary-color-gc);
    display: flex;
    align-items: center;
    color: var(--white-gc);
    justify-content: space-between
}
img{
    height: 80%;
    margin: 0 0 0 50px;
}
.buttonLink{
    color: var(--white-gc);
    text-decoration: none;
}
.buttonLink.router-link-active,
.buttonLink.router-link-exact-active {
   color: var(--secondary-color-gc);
   cursor: pointer;
 }

.titleSide{
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: larger;
    margin:10px 0 10px 0 ;

}
.options{
    display: flex;
    align-items: center;
    margin: 0 50px 0 0;
    gap: 20px;
}

.dashboard{
    display: flex;
    justify-content: center;
    margin: 30px 0 0 0 ;
    gap: 20px;
}
.vesselSide, .reportSide{
    width: 45%;
    height: 40rem;
    border-radius: 20px;
    background-color: var(--white-gc);
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