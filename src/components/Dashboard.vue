<script>
import axios from 'axios'

export default{
    data(){
        return{
            vessels:[],
            reports:[]
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
        goHome(){
            
        },
        goForm(){

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
                <div>Home</div>
                <div>Formulário</div>
            </div>
        </div>
        <div class="dashboard">
            <div class="vesselSide">
                <DataTable :value="vessels" tableStyle="min-width: 50rem">
                    <Column field="name" header="Nome"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="location" header="Localização"></Column>
                </DataTable>                
            </div>
            <div class="reportSide">
                <DataTable :value="reports" tableStyle="min-width: 50rem">
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
</style>