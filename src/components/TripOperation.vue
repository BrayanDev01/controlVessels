<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';


export default{
    data(){
        return{
            trips:[],
            cargoOptions:[],
            metaKey: false,
            visible: false,
            selectedReport: null,
            selectedCharge: null,
            filters:{
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                objectId: { value: null, matchMode: FilterMatchMode.CONTAINS },
                embarcacao: { value: null, matchMode: FilterMatchMode.CONTAINS },
                'trajeto.startOperation': { value: null, matchMode: FilterMatchMode.IN },
                'trajeto.endPoint': { value: null, matchMode: FilterMatchMode.EQUALS },
                'chargeInfos.cargo.docking.date': { value: null, matchMode: FilterMatchMode.EQUALS },
                'chargeInfos.cargo.startOperation.date': {value: null, matchMode: FilterMatchMode.CONTAINS}
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
        async getIdCharge(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Charge`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            await axios.request(options).then((response)=>{
                this.cargoOptions = response.data.results
                console.log(response.data.results)
            }).catch(error =>{
                console.log(error)
            })
        },
        editMode(event){
            this.objectId = event.data.objectId;
            console.log(event.data)
            this.vessel = event.data.embarcacao;
            this.startPoint = event.data.trajeto.startPoint;
            this.endPoint = event.data.trajeto.endPoint;
            this.product = event.data.trajeto.product;
            this.startOperation = event.data.trajeto.startOperation;
            this.endOperation = event.data.trajeto.endOperation;
            this.captain = event.data.trajeto.captain;
            this.creator = event.data.trajeto.criador
            this.selectedCharge = event.data.chargeInfos
            this.visible = true;
            this.getIdCharge();            
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
                        "startOperation": new Date(this.startOperation).toLocaleString(),
                        "endOperation": new Date(this.endOperation).toLocaleString(),
                        "captain": this.captain,
                        "criador": "teste"

                    },
                    chargeInfos: { 
                        __type: "Pointer", 
                        className: "Charge", 
                        objectId: this.selectedCharge.objectId
                    },
                    embarcacao: this.vessel
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
                        "startOperation": new Date(this.startOperation).toLocaleString(),
                        "endOperation": new Date(this.endOperation).toLocaleString(),
                        "captain": this.captain,
                        "criador": "teste"

                    },
                    embarcacao: this.vessel
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
            this.getIdCharge();
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
            this.selectedCharge = null;
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
                :globalFilterFields="['objectId', 'embarcacao', 'chargeInfos.cargo.startOperation.date', 'trajeto.endPoint', 'chargeInfos.uncargo.startOperation.date']"
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
                <Column field="embarcacao" header="Embarcação" sortable></Column>
                <Column field="chargeInfos.cargo.startOperation.date" header="Carregamento" sortable></Column>
                <Column field="trajeto.endPoint" header="Trajeto" sortable></Column>
                <Column field="chargeInfos.uncargo.startOperation.date" header="Descarregamento" sortable></Column>
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
                            <div class="itemConfig">
                                <span class=" item p-float-label">
                                    <InputText id="exitPort" v-model="captain"/>
                                    <label for="exitPort">Capitão</label>
                                </span>
                            </div>
                        </div>
                        <div class="cargoConfig">
                            <div>Selecionar Carga / Descarga</div>
                            <Dropdown v-model="selectedCharge" :options="cargoOptions" showClear filter optionLabel="objectId" placeholder="Selecione o processo"/>
                            <div v-if="!selectedCharge"></div>
                            <div v-else style="width: 90%;">
                                <Fieldset legend="Carga" class="fieldSet" :toggleable="true">
                                    <div class="groupItem">
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="exitPort" v-model="selectedCharge.cargo.docking.date" disabled></InputText>
                                                <label for="exitPort">Atracação</label>
                                            </span>
                                        </div>
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="arrivalPort" v-model="selectedCharge.cargo.undocking.date" disabled/>
                                                <label for="arrivalPort">Desatracação</label>
                                            </span>
                                        </div>
                                    </div>                                
                                </Fieldset>
                                <Fieldset legend="Descarga" class="fieldSet" :toggleable="true">
                                    <div class="groupItem">
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="exitPort" v-model="selectedCharge.uncargo.docking.date" disabled/>
                                                <label for="exitPort">Atracação</label>
                                            </span>
                                        </div>
                                        <div class="itemConfig">
                                            <span class=" item p-float-label">
                                                <InputText id="arrivalPort" v-model="selectedCharge.uncargo.undocking.date" disabled/>
                                                <label for="arrivalPort">Desatracação</label>
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
</style>