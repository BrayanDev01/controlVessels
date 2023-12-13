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
            visible: false,
            loading: true,
            cargoSelectedPort:"",
            cargoSelectedCity:"",
            cargoVessel:"",
            cargoDocking:"",
            cargoUndocking:"",
            cargoStartOperation:"",
            cargoEndOperation:"",
            cargoStartDraft:"",
            cargoEndDraft:"",
            uncargoSelectedPort:"",
            uncargoSelectedCity:"",
            uncargoVessel:"",
            uncargoDocking:"",
            uncargoUndocking:"",
            uncargoStartOperation:"",
            uncargoEndOperation:"",
            uncargoStartDraft:"",
            uncargoEndDraft:""
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
        },
        openModal(){
            this.visible = true
        },
        closeModal(){
            
            this.visible = false
        },
        cleanForm(){

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
            <Button @click="openModal">Novo Documento</Button>
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
                    
                    <div class="titleHeader">Criação de Carga / Descarga</div>
                    <div class="panel">
                        <div class="cargoConfig">
                            <div>Carregamento</div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <Dropdown v-model="cargoSelectedPort" :options="ports" showClear filter optionLabel="port" placeholder="Selecione o porto"/>
                                </div>
                                <div class="itemConfig">
                                    <Dropdown v-model="cargoSelectedCity" :options="cities" showClear filter optionLabel="city" placeholder="Selecione a cidade"/>
                                </div>
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="exitPort" v-model="cargoVessel"/>
                                        <label for="exitPort">Embarcação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoDocking"/>
                                        <label for="endOperation">Atracação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoUndocking"/>
                                        <label for="endOperation">Desatracação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoStartOperation"/>
                                        <label for="endOperation">Inicio da Operação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoEndOperation"/>
                                        <label for="endOperation">Fim da Operação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoStartDraft"/>
                                        <label for="endOperation">Inicio do Draft</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="cargoEndDraft"/>
                                        <label for="endOperation">Fim do Draft</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="uncargoConfig">
                            <div>Descarregamento</div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <Dropdown v-model="uncargoSelectedPort" :options="ports" showClear filter optionLabel="port" placeholder="Selecione o porto"/>
                                </div>
                                <div class="itemConfig">
                                    <Dropdown v-model="uncargoSelectedCity" :options="cities" showClear filter optionLabel="city" placeholder="Selecione a cidade"/>
                                </div>
                                <div class="itemConfig">
                                    <span class=" item p-float-label">
                                        <InputText id="exitPort" v-model="cargoVessel"/>
                                        <label for="exitPort">Embarcação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoDocking"/>
                                        <label for="endOperation">Atracação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoUndocking"/>
                                        <label for="endOperation">Desatracação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoStartOperation"/>
                                        <label for="endOperation">Inicio da Operação</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoEndOperation"/>
                                        <label for="endOperation">Fim da Operação</label>
                                    </span>
                                </div>
                            </div>
                            <div class="groupItem">
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoStartDraft"/>
                                        <label for="endOperation">Inicio do Draft</label>
                                    </span>
                                </div>
                                <div class="itemConfig">
                                    <span class="p-float-label">
                                        <Calendar inputId="endOperation" dateFormat="dd/mm/yy" touchUI showTime hourFormat="24" v-model="uncargoEndDraft"/>
                                        <label for="endOperation">Fim do Draft</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <Button label="Enviar" @click="sendTrip()"></Button>
                        <Button label="Cancelar" @click="closeModal()"></Button>
                    </div>
                </div>
            </template>
        </Dialog>

    </div>
</template>

<style scoped>
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
</style>