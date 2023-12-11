<script>
import axios from 'axios';

export default{
    data(){
        return{
            charges:[],
            loading: true
        }
    },
    methods:{
        async getCharges(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Charge`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            await axios.request(options).then((response) =>{
                this.charges = response.data.results
                this.loading = false
                console.log(response.data.results)
            }).catch(error =>{
                this.$toast.add({ severity: 'error', summary: 'Houve um erro', detail: `${error.message}`, life: 3000 });
                console.log(error)
            })
        },
        formatDate(value){
            if(value){
                return new Date(value).toLocaleString()
            }
        }
    },
    created(){
        this.getCharges()
    }
}
</script>

<template>
    <div class="bgMain">
        <header>
            <Button>Novo Documento</Button>
        </header>
        <div>
            <DataTable
                :value="charges"
                :loading="loading"
            >
                <Column field="objectId" header="Codigo"></Column>
                <Column field="cargo.docking.date" header="Atracação Carregamento">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.cargo.docking.date) }}
                    </template>                    
                </Column>
                <Column field="cargo.undocking.date" header="Desatracação Carregamento">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.cargo.undocking.date) }}
                    </template>                 
                </Column>
                <Column field="uncargo.docking.date" header="Atracação Descarregamento">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.uncargo.docking.date) }}
                    </template>                 
                </Column>
                <Column field="uncargo.undocking.date" header="Desatracação Descarregamento">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.uncargo.undocking.date) }}
                    </template>                 
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<style>
.bgMain{
    width: 90%;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
}
</style>