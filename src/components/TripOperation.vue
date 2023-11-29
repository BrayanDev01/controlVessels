<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';

// import axios from axios


export default{
    data(){
        return{
            trips:[],
            filters:{
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                objectId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'embarcacao.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'carregamento.startOperation': { value: null, matchMode: FilterMatchMode.IN },
                'trajeto.startOperation': { value: null, matchMode: FilterMatchMode.EQUALS },
                'descarregamento.startOperation': { value: null, matchMode: FilterMatchMode.EQUALS }
            },
            loading:true
            
        }
    },
    methods:{
        async getTrips(){

            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Trips`,
                params:{include:"embarcacao"},
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            await axios.request(options).then((response) =>{
                this.trips = response.data.results
                this.loading = false
                console.log(response.data.results)
            }).catch(error =>{
                this.$toast.add({ severity: 'error', summary: 'Houve um erro', detail: `${error.message}`, life: 3000 });
                console.log(error)
            })

        }
    }

}
</script>

<template>
    <div class="bgMain">
        <header>
            <Button @click="getTrips()">Nova Viagem</Button>
        </header>
        <div>
            <DataTable 
                :value="trips" 
                tableStyle="min-width: 50rem" 
                removableSort 
                :rows="7" 
                v-model:filters="filters"
                dataKey="id"
                :loading="loading"
                :globalFilterFields="['objectId', 'embarcacao.name', 'carregamento.startOperation', 'trajeto.startOperation', 'descarregamento.startOperation']"
            >
                <template #header>
                    <div >
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>
                </template>
                <template #loading> Carregando os dados, aguarde... </template>
                <Column field="objectId" header="Codigo" sortable></Column>
                <Column field="embarcacao.name" header="Embarcação" sortable></Column>
                <Column field="carregamento.startOperation" header="Carregamento" sortable></Column>
                <Column field="trajeto.startOperation" header="Trajeto" sortable></Column>
                <Column field="descarregamento.startOperation" header="Descarregamento" sortable></Column>
            </DataTable>
        </div>

    </div>
    <Toast></Toast>
</template>

<style scoped>
.bgMain{
    width: 90%;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
}

header{
    width: 100%;
    display: flex;
    justify-content: flex-end
}

Button{
    margin: 10px;
    background-color: var(--secondary-color-gc);
    color: var(--primary-color-gc);
    font-weight:bold;
    border: none;
}
</style>