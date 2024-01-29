<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import TripOperation from '../components/TripOperation.vue';
// import RescueOperation from '../components/RescueOperation.vue';
// import MovementOperantion from '../components/MovementOperation.vue';
import ChargeOperation from '../components/ChargeOperation.vue';
import { mapState } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'


export default{
    name:'Form', 
    components:{
        MenuBar,
        TripOperation,
        // RescueOperation,
        // MovementOperantion,
        ChargeOperation
    },
    data(){
        return{
            actions:['Viagem', 'Carregamento / Descarregamento'],
            vessels:[],
            selectOperation: "",
            typesOfOperation:['Carregando', 'Descarga', 'Viagem'],
            typeOperation:"",
            startOperation:"",
            endOperation:"",
            cities:["Miritituba", "Manaus", "Santarém", "Santana"],
            selectedCity:"",
            ports:["Master", "Cdp 201", "Cdp Fundeio", "Gauxo", "Uni-z", "Bertuol", "Arthur", "Ciamport"],
            selectedPorto:"",
            observations:"",
            pdf: null
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
                    local: this.selectedCity,
                    vessel: {__type: 'Pointer', className: 'Vessels', objectId: this.selectVessel},
                    port: this.selectedPorto,
                    observation: this.observations
                }
            };

            const results = await axios.request(options).then(function (response) {
                // console.log(response.data.result);
                this.$toast.add({ severity: 'success', summary: 'Report Enviado', detail: 'Report enviado com sucesso', life: 3000 });
                return results                
            }).catch(error => {  
                this.errorCode(error);
                this.resetForm()        
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
            this.selectedCity = '';
            this.selectedPorto = '';
            this.observations = '';
        }
        
    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    },
    created(){
        // this.getVessels()
    },
    watch:{
    }
}
</script>   

<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="header">
            <div class="titleHeader">Selecione a operação</div>
            <Dropdown v-model="selectOperation" :options="actions" placeholder="Selecione uma operação"/>
        </div>

        <TripOperation v-if="selectOperation === 'Viagem'"></TripOperation>
        <!-- <RescueOperation v-else-if="selectOperation === 'Socorro'"></RescueOperation>
        <MovementOperantion v-else-if="selectOperation === 'Manobra'"></MovementOperantion> -->
        <ChargeOperation v-else-if="selectOperation === 'Carregamento / Descarregamento'"></ChargeOperation>
        <div v-else></div>

               
    </div>
</template>

<style scoped>
.main{
    width: 100vw;
    min-height: 100dvh;
    height: 100%;
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
    margin: 10px;
}
.form{
    border-radius: 10px;
    width: 80%;
    height: 100%;
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

@media (min-width: 700px) {
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