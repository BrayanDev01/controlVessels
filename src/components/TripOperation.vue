<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';


export default{
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("loggedUser")),
            trips:[],
            cargoOptions:[],
            frota:[
                {barcaca: "NVG X (10)", carga:""},
                {barcaca: "NVG LIV (54)", carga:""},
                {barcaca: "NVG LIX (59)", carga:""},
                {barcaca: "NVG LVII (57)", carga:""},
                {barcaca: "NVG LIII (53)", carga:""},
                {barcaca: "NVG LXI (61)", carga:""},
                {barcaca: "BERTUOL XIII (13)", carga:""},
                {barcaca: "BERTUOL III (03)", carga:""},
                {barcaca: "NVG LXIV (64)", carga:""},
                {barcaca: "NVG LXIII (63)", carga:""},
                {barcaca: "NVG XXVII (27)", carga:""},
                {barcaca: "NVG LVI(56)", carga:""},
                {barcaca: "NVG LXX(70)", carga:""},
                {barcaca: "NVG LXVI(66)", carga:""},
                {barcaca: "NVG LXII(62)", carga:""},
                {barcaca: "NVG XXVI(26)", carga:""},
                {barcaca: "NVG LXIX(69)", carga:""},
                {barcaca: "NVG LXVIII(68)", carga:""},
                {barcaca: "NVG LXVII(67)", carga:""},
                {barcaca: "NVG XII(12)", carga:""},
                {barcaca: "NVG LII(52)", carga:""},
                {barcaca: "NVG LVIII(58)", carga:""},
                {barcaca: "NVG XVI(16)", carga:""},
                {barcaca: "NVG LXV(65)", carga:""},
                {barcaca: "NG XIII(13)", carga:""},
                {barcaca: "NG XIV(14)", carga:""},
                {barcaca: "NG XV(15)", carga:""},
                {barcaca: "NGXVI(16)", carga:""},
                {barcaca: "UNG III(03)", carga:""},
                {barcaca: "NVG XI(11)", carga:""},
                {barcaca: "NVG LX(60)", carga:""},
            ],
            metaKey: false,
            visible: false,
            selectedReport: null,
            selectedCharge: null,
            selectedFrota: null,
            filters:{
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                objectId: { value: null, matchMode: FilterMatchMode.CONTAINS },
                embarcacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
                'trajeto.vessel': { value: null, matchMode: FilterMatchMode.IN },
                'trajeto.startOperation': { value: null, matchMode: FilterMatchMode.EQUALS },
                'trajeto.endPoint': { value: null, matchMode: FilterMatchMode.EQUALS },
                'trajeto.endOperation': {value: null, matchMode: FilterMatchMode.CONTAINS}
            },
            loading:true,
            objectId:'',
            vessel:'',
            startPoint:'',
            endPoint:'',
            product:'',
            startOperation:'',
            endOperation:'',
            captain:'',
            client: '',
            creator:'',            
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
                },
                params:{include:"chargeInfos"}
            };

            await axios.request(options).then((response) =>{
                this.trips = response.data.results
                this.loading = false
                console.log(response.data.results)
            }).catch(error =>{
                this.$toast.add({ severity: 'error', summary: 'Houve um erro', detail: `${error.message}`, life: 3000 });
                console.log(error)
            })

        },
        editMode(event){
            this.objectId = event.data.objectId;
            // console.log(event.data)
            this.vessel = event.data.trajeto.vessel;
            this.startPoint = event.data.trajeto.startPoint;
            this.endPoint = event.data.trajeto.endPoint;
            this.product = event.data.trajeto.product;
            this.startOperation = event.data.trajeto.startOperation;
            this.endOperation = event.data.trajeto.endOperation;
            this.captain = event.data.trajeto.captain;
            this.creator = event.data.trajeto.criador;
            this.client = event.data.trajeto.client;
            this.selectedFrota = event.data.embarcations;
            this.visible = true;          
        },
        createOrUpdate(){
            if(!this.objectId){
                this.sendTrip()
            }else{
                this.updateTrip()
            }
        },
        async sendTrip(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}classes/Trips`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    trajeto: {
                        "startPoint": this.startPoint,
                        "endPoint": this.endPoint,
                        "product": this.product,
                        "vessel": this.vessel,
                        "startOperation": new Date(this.startOperation).toLocaleString(),
                        "endOperation": new Date(this.endOperation).toLocaleString(),
                        "captain": this.captain,
                        "client": this.client,
                        "criador": this.userInfo.username

                    },
                    embarcations: Object.assign({}, this.selectedFrota)
                }
            };

            await axios.request(options).then((response) =>{
                this.closeModal()
                this.cleanInputs
                this.sucessToast(response.data.objectId)
                console.log(response)
            }).catch(error =>{
                console.log(error)
            })
        },
        async updateTrip(){
            const options = {
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Trips/${this.objectId}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    trajeto: {
                        "startPoint": this.startPoint,
                        "endPoint": this.endPoint,
                        "product": this.product,
                        "vessel": this.vessel,
                        "startOperation": new Date(this.startOperation).toLocaleString(),
                        "endOperation": new Date(this.endOperation).toLocaleString(),
                        "captain": this.captain,
                        "client": this.client,
                        "criador": this.userInfo.username,

                    },
                    embarcations: Object.assign({}, this.selectedFrota)
                }
            }

            await axios.request(options).then((response) =>{
                this.getTrips
                this.closeModal()
                this.cleanInputs
                this.updateToast(response.data)
                console.log(response.data)
            }).catch(error =>{
                console.log(error)
            })
            
        },
        closeModal(){
            this.getTrips()
            this.visible = false;
            this.cleanInputs();
        },
        seeReport(){
            this.visible = true;
        },
        cleanInputs(){
            this.objectId = '';
            this.startPoint = '';
            this.endPoint = '';
            this.product = '';
            this.vessel = '';            
            this.startOperation = '';
            this.endOperation = '';
            this.captain = '';
            this.creator = '';
            this.selectedFrota = null;
        },
        sucessToast(x){
            this.$toast.add({ severity: 'success', summary: 'Viagem criada com sucesso', detail: `Viagem criada código: ${x}`, life: 4000 });
        },
        updateToast(x){
            this.$toast.add({ 
                severity: 'success', 
                summary: 'Viagem atualizada com sucesso', 
                detail: `Viagem atualizada código: ${x}`, 
                life: 4000 
            });
        },
        calculetCargo(){
            if(!this.selectedFrota){
                return
            } else{
                return Object.values(this.selectedFrota)
                .map(item => parseInt(item.carga, 10) || 0)
                .reduce((soma, valor) => soma + valor, 0);
            }
        }

    },
    created(){
        this.getTrips();
    },
    watch:{}
}
</script>

<template>
    <div class="bgMain">
        <header>
            <Button @click="seeReport()">Nova Viagem</Button>
        </header>
        <div>
            <DataTable 
                :value="trips" 
                tableStyle="min-width: 50rem" 
                removableSort
                :selection="selectedReport"
                selectionMode="single"
                :rows="5"
                :rowsPerPageOptions="[5, 7]"
                paginator
                @rowSelect="editMode"
                :metaKeySelection="metaKey"
                v-model:filters="filters"
                dataKey="id"
                :loading="loading"
                :globalFilterFields="['objectId', 'trajeto.vessel', 'trajeto.startOperation', 'trajeto.endPoint', 'trajeto.endOperation']"
            >
                <template #header>
                    <div >
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"></i>
                            <InputText v-model="filters['global'].value" placeholder="Digite o que procura" />
                        </span>
                    </div>
                </template>
                <template #loading> Carregando os dados, aguarde... </template>
                <Column field="objectId" header="Codigo" sortable></Column>
                <Column field="trajeto.vessel" header="Embarcação" sortable></Column>
                <Column field="trajeto.startOperation" header="Inicio da Viagem" sortable></Column>
                <Column field="trajeto.endPoint" header="Trajeto" sortable></Column>
                <Column field="trajeto.endOperation" header="Fim da Viagem" sortable></Column>
            </DataTable>
        </div>
        <Dialog
            :visible="visible"
            modal
            :pt="{
                mask: {
                    style: 'backdrop-filter: blur(2px);'

                },
                root:{
                    style:'max-width: 100%; background-color: white'
                }
            }"
        >
            <template #container="{ closeCallback }">
                <div class="bodyModal">
                    
                    <div class="titleHeader">Criação de viagem</div>
                    <div class="panel">
                        <div class="tripConfig">
                            <div>Configuração de Trajeto</div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="exitPort" v-model="startPoint"/>
                                        <label for="exitPort">Local de Saída</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="arrivalPort" v-model="endPoint"/>
                                        <label for="arrivalPort">Local de Chegada</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="product" v-model="product"/>
                                        <label for="product">Carga</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="product" v-model="vessel"/>
                                        <label for="product">Embarcação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="startOperation"/>
                                        <label for="endOperation">Inicio Previsto</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="endOperation"/>
                                        <label for="endOperation">Fim Previsto</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="captainLabel" v-model="captain"/>
                                        <label for="captainLabel">Capitão</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="clientLabel" v-model="client"/>
                                        <label for="clientLabel">Cliente</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="cargoConfig">
                            <div style="margin: 10px;">Selecione o comboio</div>
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <MultiSelect v-model="selectedFrota" :options="frota" showClear display="chip" filter :maxSelectedLabels="1" optionLabel="barcaca" placeholder="Selecione a barcaça" style="max-width: 100%;"/>
                                <div>{{ calculetCargo() }}</div>
                            </div>
                            <div v-if="!selectedFrota"></div>
                            <div v-else style="width: 90%; height: 450px; overflow: auto; overflow-x:hidden;">
                                <Fieldset legend="Barcaça" class="fieldSet" :toggleable="true" v-for="frota in selectedFrota">
                                    <div class="groupItem">
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="exitPort" v-model="frota.barcaca" disabled></InputText>
                                                <label for="exitPort">Barcaça</label>
                                            </span>
                                        </div>
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="arrivalPort" v-model="frota.carga"/>
                                                <label for="arrivalPort">Volume</label>
                                            </span>
                                        </div>
                                    </div>                                
                                </Fieldset>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <Button label="Enviar" @click="createOrUpdate()"></Button>
                        <Button label="Cancelar" @click="closeModal()"></Button>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
    <Toast></Toast>
</template>

<style scoped>
.titleHeader{
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    margin: 5px;
}
.fieldSet{
    margin: 10px;
}
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
.bodyModal{
    width: 80dvw;
    height: 100%;
}
.panel{
    display: flex;
}
.groupItem{
    display: flex;
}
.itemConfig{
    margin: 20px;
}
.tripConfig, .cargoConfig{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media(max-width: 500px){
    .bodyModal{
        width: 90dvw;
        height: 100%;
        overflow: auto;
    }
    .panel{
        display: flex;
        flex-direction: column;
    }
    .tripConfig, .cargoConfig{
        width: 100%;
        height: 100%;
    }
    .groupItem{
        display: flex;
        flex-direction: column;
    }
}
</style>