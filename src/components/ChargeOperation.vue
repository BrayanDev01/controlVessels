<script>
import axios from 'axios';


export default{
    data(){
        return{
            charges:[],
            ports:[
                { port: "Master" },
                { port: "Cdp 201" },
                { port: "Cdp Fundeio" },
                { port: "Gauxo" },
                { port: "Uni-z" },
                { port: "Bertuol" },
                { port: "Arthur" },
                { port: "Ciamport"} ,
            ],
            cities:[
                {city: "Miritituba"},
                {city: "Manaus"},
                {city: "Santarém"},
                {city: "Santana"}
            ],
            frota:[
                {barcaca: "NVG X (10)"},
                {barcaca: "NVG LIV (54)"},
                {barcaca: "NVG LIX (59)"},
                {barcaca: "NVG LVII (57)"},
                {barcaca: "NVG LIII (53)"},
                {barcaca: "NVG LXI (61)"},
                {barcaca: "BERTUOL XIII (13)"},
                {barcaca: "BERTUOL III (03)"},
                {barcaca: "NVG LXIV (64)"},
                {barcaca: "NVG LXIII (63)"},
                {barcaca: "NVG XXVII (27)"},
                {barcaca: "NVG LVI(56)"},
                {barcaca: "NVG LXX(70)"},
                {barcaca: "NVG LXVI(66)"},
                {barcaca: "NVG LXII(62)"},
                {barcaca: "NVG XXVI(26)"},
                {barcaca: "NVG LXIX(69)"},
                {barcaca: "NVG LXVIII(68)"},
                {barcaca: "NVG LXVII(67)"},
                {barcaca: "NVG XII(12)"},
                {barcaca: "NVG LII(52)"},
                {barcaca: "NVG LVIII(58)"},
                {barcaca: "NVG XVI(16)"},
                {barcaca: "NVG LXV(65)"},
                {barcaca: "NG XIII(13)"},
                {barcaca: "NG XIV(14)"},
                {barcaca: "NG XV(15)"},
                {barcaca: "NGXVI(16)"},
                {barcaca: "UNG III(03)"},
                {barcaca: "NVG XI(11)"},
                {barcaca: "NVG LX(60)"},
            ],
            metaKey: false,
            visible: false,
            loading: true,
            selectedCharge: null,
            objectId:"",
            barcacaSelected:"",
            vessel:"",
            pusher:"",
            cargoSelectedPort:"",
            cargoSelectedCity:"",
            cargoDocking:"",
            cargoUndocking:"",
            cargoStartOperation:"",
            cargoEndOperation:"",
            cargoStartDraft:"",
            cargoEndDraft:"",
            cargoObservation: "",
            uncargoSelectedPort:"",
            uncargoSelectedCity:"",
            uncargoDocking:"",
            uncargoUndocking:"",
            uncargoStartOperation:"",
            uncargoEndOperation:"",
            uncargoStartDraft:"",
            uncargoEndDraft:"",
            uncargoObservation:"",
            datepickerOptions: {
                datepickerMask: '99/99/9999' // Defina a máscara desejada
            }
        }
    },
    methods:{
        async getCharges(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Charge`,
                params:{order: "-createdAt"},
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            await axios.request(options).then((response) =>{
                this.charges = response.data.results
                this.loading = false
                // console.log(response.data.results)
            }).catch(error =>{
                this.$toast.add({ severity: 'error', summary: 'Houve um erro', detail: `${error.message}`, life: 3000 });
                console.log(error)
            })
        },
        async createCharge(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}classes/Charge`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    barcaca: this.barcacaSelected,
                    vessel: this.vessel,
                    pusher: this.pusher,
                    cargo: {
                        docking: {date: this.cargoDocking},
                        undocking: {date: this.cargoUndocking},
                        startOperation: {date: this.cargoStartOperation},
                        endOperation: {date: this.cargoEndOperation},
                        port: this.cargoSelectedPort,
                        city: this.cargoSelectedCity,
                        startDraft: {date: this.cargoStartDraft},
                        endDraft: {date: this.cargoEndDraft},
                        observation: this.cargoObservation,
                        Draft: {url: ''}
                    },
                    uncargo: {
                        docking: {date: this.uncargoDocking},
                        undocking: {date: this.uncargoUndocking},
                        startOperation: {date: this.uncargoStartOperation},
                        endOperation: {date: this.uncargoEndOperation},
                        port: this.uncargoSelectedPort,
                        city: this.uncargoSelectedCity,
                        startDraft: {date: this.uncargoStartDraft},
                        endDraft: {date: this.uncargoEndDraft},
                        observation: this.uncargoObservation,
                        Draft: {url: ''}
                    }
                }
            }

            await axios.request(options).then((response) =>{
                this.successToast(response.data.objectId)
                this.closeModal()
            }).catch(error =>{
                console.log(error)
            })
        },

        async updateCharge(){
            const options = {
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Charge/${this.objectId}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    barcaca: this.barcacaSelected,
                    vessel: this.vessel,
                    pusher: this.pusher,
                    cargo: {
                        docking: {date: this.cargoDocking},
                        undocking: {date: this.cargoUndocking},
                        startOperation: {date: this.cargoStartOperation},
                        endOperation: {date: this.cargoEndOperation},
                        port: this.cargoSelectedPort,
                        city: this.cargoSelectedCity,
                        startDraft: {date: this.cargoStartDraft},
                        endDraft: {date: this.cargoEndDraft},
                        observation: this.cargoObservation,
                        Draft: {url: ''}
                    },
                    uncargo: {
                        docking: {date: this.uncargoDocking},
                        undocking: {date: this.uncargoUndocking},
                        startOperation: {date: this.uncargoStartOperation},
                        endOperation: {date:this.uncargoEndOperation},
                        port: this.uncargoSelectedPort,
                        city: this.uncargoSelectedCity,
                        startDraft: {date: this.uncargoStartDraft},
                        endDraft: {date: this.uncargoEndDraft},
                        observation: this.uncargoObservation,
                        Draft: {url: ''}
                    }
                }
            }

            await axios.request(options).then((response) =>{
                this.successToast(response.data.objectId)
                this.cleanForm()
                this.closeModal()
            }).catch(error =>{
                console.log(error)
            })
        },
        openModal(){
            this.visible = true
        },
        closeModal(){
            this.getCharges()
            this.cleanForm()
            this.visible = false
        },
        formatDate(value){
            if(value){
                return new Date(value).toLocaleString()
            }
        },
        successToast(x){
            this.$toast.add({ 
                severity: 'success', 
                summary: 'Formulario Criado', 
                detail: `Formulário criado código: ${x}`, 
                life: 3000 
            });
        },
        cleanForm(){
            this.cargoSelectedCity = '',
            this.cargoSelectedPort = '',
            this.cargoVessel = '',
            this.cargoDocking = '',
            this.cargoUndocking = '',
            this.cargoStartOperation = '',
            this.cargoEndOperation = '',
            this.cargoStartDraft = '',
            this.cargoEndDraft = '',
            this.uncargoSelectedPort = '',
            this.uncargoSelectedCity = '',
            this.uncargoVessel = '',
            this.uncargoDocking = '',
            this.uncargoUndocking = '',
            this.uncargoStartOperation = '',
            this.uncargoEndOperation = '',
            this.uncargoStartDraft = ''
            this.uncargoEndDraft = ''
            this.barcacaSelected = '',
            this.vessel = '',
            this.pusher = '',
            this.cargoObservation = '',
            this.uncargoObservation = '',
            this.objectId = ''
        },
        ifEmpty(campo, dado){
            
            if(dado === ""){ 
                return campo = ""
            }else{
                return campo = new Date(dado)
            }

        },

        editMode(event){
            
            // console.log(event)
            this.objectId = event.data.objectId;
            this.barcacaSelected = event.data.barcaca;
            this.vessel = event.data.vessel;
            this.pusher = event.data.pusher;
            this.cargoSelectedPort = event.data.cargo.port;
            this.cargoSelectedCity = event.data.cargo.city;
            this.cargoDocking = this.ifEmpty(this.cargoDocking, event.data.cargo.docking.date)
            this.cargoUndocking = this.ifEmpty(this.cargoUndocking, event.data.cargo.undocking.date)
            this.cargoStartOperation = this.ifEmpty(this.cargoStartOperation, event.data.cargo.startOperation.date)
            this.cargoEndOperation = this.ifEmpty(this.cargoEndOperation, event.data.cargo.endOperation.date)
            this.cargoStartDraft = this.ifEmpty(this.cargoStartDraft, event.data.cargo.startDraft.date)
            this.cargoEndDraft = this.ifEmpty(this.cargoEndDraft, event.data.cargo.endDraft.date)
            this.cargoObservation = event.data.cargo.observation;
            this.uncargoSelectedPort = event.data.uncargo.port;
            this.uncargoSelectedCity = event.data.uncargo.city;
            this.uncargoDocking = this.ifEmpty(this.uncargoDocking, event.data.uncargo.docking.date)
            this.uncargoUndocking = this.ifEmpty(this.uncargoUndocking, event.data.uncargo.undocking.date)
            this.uncargoStartOperation = this.ifEmpty(this.uncargoStartOperation, event.data.uncargo.startOperation.date)
            this.uncargoEndOperation = this.ifEmpty(this.uncargoEndOperation, event.data.uncargo.endOperation.date)
            this.uncargoStartDraft = this.ifEmpty(this.uncargoStartDraft, event.data.uncargo.startDraft.date)
            this.uncargoEndDraft = this.ifEmpty(this.uncargoEndDraft, event.data.uncargo.endDraft.date)
            this.uncargoObservation = event.data.uncargo.observation;
            
            this.openModal();
        },
        createOrUpdate(){
            if(!this.objectId){
                this.createCharge()
            }else{
                this.updateCharge()
            }
        },
    },
    created(){
        this.getCharges()
    },
    watch:{
    }
}
</script>

<template>
    <div class="bgMain">
        <header>
            <Button @click="openModal">Novo Documento</Button>
        </header>
        <div>
            <DataTable
                :value="charges"
                :loading="loading"
                removableSort
                :selection="selectedCharge"
                selectionMode="single"
                @rowSelect="editMode"
                paginator
                :rows="7"
                :rowsPerPageOptions="[5, 7]"
            >
                <Column sortable field="objectId" header="Codigo"></Column>
                <Column sortable field="barcaca.barcaca" header="Barcaça"></Column>
                <Column sortable field="cargo.docking.date" header="Atracação Carregamento">
                    <template #body="{ data }">
                        {{ formatDate(data.cargo.docking.date) }}
                    </template>
                </Column>
                <Column sortable field="cargo.undocking.date" header="Desatracação Carregamento">
                    <template #body="{ data }">
                        {{ formatDate(data.cargo.undocking.date) }}
                    </template>
                </Column>
                <Column sortable field="uncargo.docking.date" header="Atracação Descarregamento">
                    <template #body="{ data }">
                        {{ formatDate(data.uncargo.docking.date) }}
                    </template>
                </Column>
                <Column sortable field="uncargo.undocking.date" header="Desatracação Descarregamento">
                    <template #body="{ data }">
                        {{ formatDate(data.uncargo.undocking.date) }}
                    </template>
                </Column>
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
                    style:'max-width: 100%; height:100%; background-color: white'
                }
            }"
        >
            <template #container="{ closeCallback }">
                <div class="bodyModal">
                    
                    <div class="titleHeader">Criação de Carga / Descarga</div>
                    <div class="itemConfig organizer">
                        <Dropdown 
                            v-model="barcacaSelected" 
                            :options="frota" 
                            showClear filter 
                            optionLabel="barcaca" 
                            placeholder="Selecione a Barcaça"
                        />
            
                        <span class=" item p-float-label">
                            <InputText id="exitPort" v-model="vessel"/>
                            <label for="exitPort">Navio</label>
                        </span>

                        <span class=" item p-float-label">
                            <InputText id="exitPort" v-model="pusher"/>
                            <label for="exitPort">Empurrador</label>
                        </span>
                        
                    </div>
                    <div class="panel">
                        <div class="cargoConfig">
                            <div style="font-weight: bold;">Carregamento</div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <Dropdown 
                                        v-model="cargoSelectedPort" 
                                        :options="ports" 
                                        showClear 
                                        filter 
                                        optionLabel="port" 
                                        placeholder="Selecione o porto"
                                    />
                                </div>
                                <div class="itemConfig">
                                    <Dropdown 
                                        v-model="cargoSelectedCity" 
                                        :options="cities" 
                                        showClear 
                                        filter 
                                        optionLabel="city" 
                                        placeholder="Selecione a cidade"
                                    />
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation"
                                            dateFormat="dd/mm/yy"
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoDocking"
                                        ></Calendar>
                                        <label for="endOperation">Atracação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoUndocking"
                                        />
                                        <label for="endOperation">Desatracação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoStartOperation"
                                        />
                                        <label for="endOperation">Inicio da Operação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoEndOperation" 
                                        />
                                        <label for="endOperation">Fim da Operação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoStartDraft"
                                        />
                                        <label for="endOperation">Inicio do Draft</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="cargoEndDraft" 
                                        />
                                        <label for="endOperation">Fim do Draft</label>
                                    </span>
                                </div>
                            </div>
                            <div class="itemConfig">
                                <span class="p-float-label">
                                    <Textarea v-model="cargoObservation" rows="5" cols="30" />
                                    <label>Observação</label>
                                </span>
                            </div>
                        </div>
                        <div class="uncargoConfig">
                            <div style="font-weight: bold;">Descarregamento</div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <Dropdown 
                                        v-model="uncargoSelectedPort" 
                                        :options="ports" 
                                        showClear 
                                        filter 
                                        optionLabel="port" 
                                        placeholder="Selecione o porto"
                                    />
                                </div>
                                <div class="itemConfig">
                                    <Dropdown 
                                        v-model="uncargoSelectedCity" 
                                        :options="cities" 
                                        showClear 
                                        filter 
                                        optionLabel="city" 
                                        placeholder="Selecione a cidade"
                                    />
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoDocking" 
                                        />
                                        <label for="endOperation">Atracação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoUndocking"
                                        />
                                        <label for="endOperation">Desatracação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoStartOperation"
                                        />
                                        <label for="endOperation">Inicio da Operação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoEndOperation"
                                        />
                                        <label for="endOperation">Fim da Operação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoStartDraft" 
                                        />
                                        <label for="endOperation">Inicio do Draft</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar 
                                            inputId="endOperation" 
                                            dateFormat="dd/mm/yy" 
                                            touchUI 
                                            showTime 
                                            hourFormat="24" 
                                            v-model="uncargoEndDraft" 
                                        />
                                        <label for="endOperation">Fim do Draft</label>
                                    </span>
                                </div>
                            </div>
                            <div class="itemConfig">
                                <span class="p-float-label">
                                    <Textarea v-model="uncargoObservation" rows="5" cols="30" />
                                    <label>Observação</label>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <Button @click="createOrUpdate()">{{ this.objectId ? "Atualizar": "Enviar" }}</Button>
                        <Button label="Cancelar" @click="closeModal()"></Button>
                    </div>
                </div>
            </template>
        </Dialog>

    </div>
    <Toast></Toast>
</template>

<style scoped>
header{
    display: flex;
    justify-content: flex-end
}
.bgMain{
    width: 90%;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
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
    height: 100dvh;
    overflow: auto;
    
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
.cargoConfig, .uncargoConfig{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.titleHeader{
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    margin: 5px;
}
.organizer{
    display: flex;
    justify-content: center;
    gap: 20px;
}

@media(max-width: 500px){
    .titleHeader{
        font-size: 1.2rem;
    }
    .bodyModal{
        width: 90dvw;
        height: 100%;
        overflow: auto;
    }
    .organizer{
        flex-direction: column;
        align-items: center;
    }
    .panel{
        flex-direction: column;
        align-items: center;
    }
    .groupItem{
        flex-direction: column;
    }

}
</style>