<script>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default{
    name:'Form', 
    data(){
        return{
            actions:[],
            selectVessel: "",
            typesOfOperation:['Carregando', 'Descarga'],
            typeOperation:"",
            startOperation:"",
            endOperation:"",
            local:"",
            port:"",
            observations:""
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

            this.actions = results
        },
        async sendReport(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}functions/createReport`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data: {
                    typeOperation: this.typeOperation,
                    startOperation: { __type: "Date", iso: this.startOperation },
                    endOperation: { __type: "Date", iso: this.endOperation },
                    local: this.local,
                    vessel: {__type: 'Pointer', className: 'Vessels', objectId: this.selectVessel},
                    port: this.port,
                    observation: this.observations
                }
            };

            const results = await axios.request(options).then(function (response) {
                console.log(response.data.result);
                this.$toast.add({ severity: 'success', summary: 'Report Enviado', detail: 'Report enviado com sucesso', life: 3000 });
                return results                
            }).catch(error => {  
                this.errorCode(error);
                // this.resetForm()          
                // console.error(error);
            });
        },
        errorCode(error){
            this.$toast.add({ severity: 'error', summary: 'Report Não Enviado', detail: error, life: 3000 });
        },
        resetForm(){
            this.selectVessel = '';
            this.typeOperation = '';
            this.startOperation = '';
            this.endOperation = '',
            this.local = '';
            this.port = '';
            this.observations = '';
        }
        
    },
    created(){
        this.getVessels()
    },
    watch:{}
}
</script>   

<template>
    <div class="main">
        <div class="header">
            <div class="titleHeader">Selecione a embarcação</div>
            <Dropdown v-model="selectVessel" :options="actions" optionValue="objectId" optionLabel="name" placeholder="Selecione uma embarcação"/>
        </div>

        <div class="form" v-if="selectVessel !== ''">
            <Dropdown v-model="typeOperation" :options="typesOfOperation" placeholder="Selecione o tipo de operação" style="width: 45%;"></Dropdown>

            <div class="timeBox">
                <span class="p-float-label">
                    <Calendar v-model="startOperation" inputId="startOperation" touchUI showTime hourFormat="24"/>
                    <label for="startOperation">Início da operação</label>
                </span>
                <span class="p-float-label">
                    <Calendar v-model="endOperation" inputId="endOperation" touchUI showTime hourFormat="24"/>
                    <label for="endOperation">Fim da operação</label>
                </span>
            </div>

            <span class="p-float-label">
                <InputText id="username" v-model="local" />
                <label for="username">Local da operação</label>
            </span>
            <span class="p-float-label">
                <InputText id="username" v-model="port" />
                <label for="username">Porto da operação</label>
            </span>

            <span class="p-float-label">
                <Textarea v-model="observations" rows="5" cols="40" />
                <label>Observação</label>
            </span>

            <Button label="Enviar Relatório" @click="sendReport()"></Button>
            <Toast /> 
        </div>        
    </div>
</template>

<style scoped>
.main{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary-color-gc)
}
.header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
.titleHeader{
    color: var(--white-gc);
    font-weight: bold;
    font-size: larger;
}
.form{
    border-radius: 10px;
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: var(--white-gc);
}
.timeBox{
    display: flex;
    gap: 20px;
}

@media (min-width: 1500px) {
    .form{
        border-radius: 10px;
        width: 50%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: var(--white-gc);
    }   
}
</style>