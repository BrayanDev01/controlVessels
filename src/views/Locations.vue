<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import MapView from '../components/map/MapComponent.vue';
import Dropdown from 'primevue/dropdown';
import { FilterMatchMode } from 'primevue/api';

export default{
    components:{
        MenuBar,
        MapView
    },
    data(){
        return{
            vessels: null,
            show:false,
            rowsExpanded: {},
            loading: true,
            selectedVessel: null,
            convoy: null,
            captain:null,
            actualPosition:null,
            finalPosition:null,
            prevision:null,
            areaLocal:null,
            latitude: null,
            longitude: null,
            areaOptions:[
                {name:'Calha do Solimões'},
                {name:'Calha do Madeira'},
                {name:'Calha do Tapajós/Amazonas'},
                {name:'Rotas Termicas'},
                {name:'Apoio Porto'}
            ],
            ferries:[
                {name:"ABI-01"},
                {name:"BT BEATRIZ FARIAS II"},
                {name:"BT CITY I"},
                {name:"BT CITY III"},
                {name:"BT CITY IX"},
                {name:"BT CITY LI"},
                {name:"BT CITY XLIII"},
                {name:"BT CITY XV"},
                {name:"BT CITY XX"},
                {name:"BT CITY XXI"},
                {name:"BT CITY XXII"},
                {name:"BT CITY XXV"},
                {name:"BT CITY XXXIV"},
                {name:"BT CITY XXXIX"},
                {name:"BT CITY XXXV"},
                {name:"BT CT 01"},
                {name:"BT CT 10"},
                {name:"BT CT 11"},
                {name:"BT CT 16"},
                {name:"BT CT 18"},
                {name:"BT CT 21"},
                {name:"BT CT 22"},
                {name:"BT CT 23"},
                {name:"BT CT 30"},
                {name:"BT CT 34"},
                {name:"BT CT 35"},
                {name:"BT CT 39"},
                {name:"BT CT 4"},
                {name:"BT CT 40"},
                {name:"BT CT 41"},
                {name:"BT CT 42"},
                {name:"BT CT 44"},
                {name:"BT CT 45"},
                {name:"BT CT 47"},
                {name:"BT CT 48"},
                {name:"BT CT 49"},
                {name:"BT CT 5"},
                {name:"BT CT 53"},
                {name:"BT CT 54"},
                {name:"BT CT 55"},
                {name:"BT CT 56"},
                {name:"BT CT 58"},
                {name:"BT CT 59"},
                {name:"BT CT 6"},
                {name:"BT CT 60"},
                {name:"BT CT 61"},
                {name:"BT CT 63"},
                {name:"BT CT 64"},
                {name:"BT CT 66"},
                {name:"BT CT 67"},
                {name:"BT CT 69"},
                {name:"BT CT 70"},
                {name:"BT CT 71"},
                {name:"BT CT 72"},
                {name:"BT CT 73"},
                {name:"BT CT 74"},
                {name:"BT CT 75"},
                {name:"BT CT 79"},
                {name:"BT CT 80"},
                {name:"BT CT 81"},
                {name:"BT CT 82"},
                {name:"BT CT 86"},
                {name:"BT CT 88"},
                {name:"BT CT 9"},
                {name:"BT EUDOCIA"},
                {name:"BT GDS 62"},
                {name:"BT GDS 63"},
                {name:"BT GLORIA DE DEUS I"},
                {name:"BT ITL I "},
                {name:"BT NOSSA SENHORA DE NAZARÉ"},
                {name:"BT PRECIOSA DE DEUS"},
                {name:"BT PRECIOSA DE DEUS I"},
                {name:"BT REBECCA GISLAINE"},
                {name:"CARGA"},
                {name:"CT 43 - BALSA TANQUE"},
                {name:"DESCARGA"},
                {name:"EMP BONECA DA JUJU"},
                {name:"EMP CT 100"},
                {name:"EMP CT 12"},
                {name:"EMP CT 13"},
                {name:"EMP CT 14"},
                {name:"EMP CT 19"},
                {name:"EMP CT 27"},
                {name:"EMP CT 29"},
                {name:"EMP CT 32 - EMPURRADOR"},
                {name:"EMP CT 36"},
                {name:"EMP CT 37"},
                {name:"EMP CT 38"},
                {name:"EMP CT 46"},
                {name:"EMP CT 52"},
                {name:"EMP CT 57"},
                {name:"EMP CT 65"},
                {name:"EMP CT 68"},
                {name:"EMP CT 77"},
                {name:"EMP CT 78"},
                {name:"EMP CT 8"},
                {name:"EMP CT 83"},
                {name:"EMP CT 84"},
                {name:"EMP EL REFUGIO"},
                {name:"EMP ESDRAS X"},
                {name:"EMP ITL 11"},
                {name:"EMP ITL 13"},
                {name:"EMP ITL 14"},
                {name:"EMP ITL 4"},
                {name:"EMP ITL 5"},
                {name:"EMP ITL 6"},
                {name:"EMP ITL 7"},
                {name:"EMP ITL 8"},
                {name:"EMP ITL I"},
                {name:"EMP ITL II"},
                {name:"EMP ITL III"},
                {name:"EMP ITL IX"},
                {name:"EMP ITL XII"},
                {name:"EMP LH III"},
                {name:"EMP MAXIMUS"},
                {name:"EMP NM VI"},
                {name:"EMP NM VII"},
                {name:"EMP NM XXVII"},
                {name:"EMP PETRODADO I"},
                {name:"EMP SEU JUAREZ"},
                {name:"EMP VALENTE DE DEUS I"},
                {name:"CT 02"},
                {name:"GALO DA SERRA 43"},
                {name:"WACCUM I"},
                {name:"WACCUM"} 
            ],
            vesselsOptions:[],
            filters:{
                global:{value:null, matchMode: FilterMatchMode.CONTAINS},
                name:{value:null, matchMode: FilterMatchMode.CONTAINS},
                convoy:{value:null, matchMode: FilterMatchMode.CONTAINS},
                actualPosition:{value:null, matchMode: FilterMatchMode.CONTAINS},
                destination:{value:null, matchMode: FilterMatchMode.CONTAINS},
                prevision:{value:null, matchMode: FilterMatchMode.CONTAINS},
                captain:{value:null, matchMode: FilterMatchMode.CONTAINS}
            }
        }
    },
    methods:{
        async getVesselsOptions(){
            const options ={
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Vessels`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                params:{include: 'Ferrie', order: "-createdAt"}
            }

            await axios.request(options).then((response) =>{
                console.log(response.data.results)
                this.vesselsOptions = response.data.results;
                this.vessels = response.data.results;
                this.loading = false
            }).catch(error =>{
                console.log(error)
            })
        },
        async attVessel(id){
            const options ={
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Vessels/${id}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    actualPosition: this.actualPosition,
                    captain: this.captain,
                    convoy: this.convoy,
                    destination: this.finalPosition,
                    latitude:this.latitude,
                    longitude: this.longitude,
                    prevision: this.prevision,
                    status: this.status,
                    history:{
                        __op: "Add",
                        objects:[{
                            actualPosition: this.actualPosition,
                            captain: this.captain,
                            convoy: this.convoy,
                            destination: this.finalPosition,
                            latitude:this.latitude,
                            longitude: this.longitude,
                            prevision: this.prevision,
                            status: this.status,
                            date: new Date().toISOString()                            
                        }]
                    }
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.clearModal()
            }).catch((error)=>{
                console.log(error)
            })
        },
        onRowExpand(event){
            console.log(event.data)
        },
        openModal(){
            this.show = true
        },
        clearModal(){
            this.loading = true;
            this.vessels = []
            this.getVesselsOptions()
            
            this.show = false
            this.selectedVessel= null;
            this.convoy = null;
            this.captain = null;
            this.actualPosition = null;
            this.finalPosition = null;
            this.prevision = null;
            this.areaLocal = null;
            this.latitude = null;
            this.longitude = null;
        },
        arrayConcat(array){
            const toString = (array || [] || null).map(item => item.name);

            return toString.join(', ')
        },
        goToHistoric(id){
            // this.$router.push({path:`/historic/${id}`});

            window.open(`/historic/${id}`, '_blank');            
        }
    },
    mounted(){
        // this.getVessels();
        this.getVesselsOptions();
    }
}
</script>
<template>
<Toast></Toast>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dataCentral">
            <div style="width: 100%; display: flex; justify-content: center; margin: 20px 0px">
                <Button
                    style="background-color: var(--secondary-color-gc); color: var(--primary-color-gc); font-weight: bold;"
                    @click="openModal()"
                >
                    Atualizar Localização
                </Button>
            </div>
            <DataTable                
                :value="vessels"
                :loading="loading"
                dataKey="objectId"
                tableStyle="min-width: 50rem"
                :expandedRows="rowsExpanded"
                scrollable 
                scrollHeight="650px"
                v-model:filters="filters"
                :globalFilterFields="['global', 'name', 'convoy', 'actualPosition', 'prevision', 'destination']">
                <template #header>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <FloatLabel>
                            <InputText id="username" v-model="filters['global'].value"/>
                            <label for="username">Pesquisa Global</label>
                        </FloatLabel>
                    </div>
                </template>
                <Column expander style="width: 5rem" />
                <Column field="name" header="Embarcação"></Column>
                <Column field="convoy" header="Comboio">
                    <template  #body="{data}">
                        <div>{{ arrayConcat(data.convoy) }}</div>
                    </template>
                </Column>
                <Column field="actualPosition" header="Posição atual"></Column>
                <Column field="prevision" header="Previsão"></Column>
                <Column field="destination" header="Destino"></Column>
                <template #expansion="slotProps">
                    <div style="display: flex; gap: 5px;">
                        <MapView 
                            :latitude="slotProps.data.latitude"
                            :longitude="slotProps.data.longitude"
                        ></MapView>
                        <div class="infoSideMap">
                            <div class="infoSection">
                                <div class="titleForm">Informações da Embarcação</div>
                                <div class="ferriesInfos">
                                    <div class="inputGroupInfo">
                                        <div class="inputInfo">
                                            <div class="infoTitle">
                                                Nome:
                                            </div>
                                            <div class="infoAnswer">
                                                {{ slotProps.data.name }}
                                            </div>
                                        </div>
                                        <div class="inputInfo">
                                            <div class="inputTitle">
                                                Tipo de embarcação:
                                            </div>
                                            <div class="infoAnswer">
                                                {{ slotProps.data.typeVessel }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ferrieSection">
                                <div class="titleForm">Informações da Viagem</div>
                                <div class="tripInfos">
                                    <div class="inputGroupInfo">
                                        <div>
                                            <div class="infoTitle">Capitão:</div>
                                            <div class="infoAnswer">{{ slotProps.data.captain }}</div>
                                        </div>
                                        <div>
                                            <div class="infoTitle">Comboio:</div>
                                            <!-- <div class="infoAnswer">{{ slotProps.data.convoy }}</div> -->
                                            <div class="infoAnswer">{{ arrayConcat(slotProps.data.convoy) }}</div>
                                        </div>
                                        <div>
                                            <div class="infoTitle">Previsão:</div>
                                            <div class="infoAnswer">{{ slotProps.data.prevision }}</div>
                                        </div>
                                        <div>
                                            <div class="infoTitle">Status:</div>
                                            <div class="infoAnswer">{{ slotProps.data.status}}</div>
                                        </div>
                                        
                                    </div>
                                    <div class="inputGroupInfo2">
                                        <div>
                                            <div class="infoTitle">Destino:</div>
                                            <div class="infoAnswer">{{ slotProps.data.destination }}</div>
                                        </div>
                                        <div>
                                            <div class="infoTitle">Posição atual:</div>
                                            <div class="infoAnswer">{{ slotProps.data.actualPosition }}</div>
                                        </div>
                                    </div>                                    
                                </div>
                                <div 
                                    class="linkButton"
                                    @click="goToHistoric(slotProps.data.objectId)"
                                >Vizualizar histórico >></div>
                            </div>                         
                        </div>
                    </div>
                </template> 
            </DataTable>
            <Dialog
                v-model:visible="show"
                modal
                header="Atualizar Localização"
                :style="{width:'70%'}"
                :draggable="false"
                @hide="clearModal()"
            >
                <div class="organizerForm">
                    <div class="inputGroup">
                        <span>Selecionar embarcação</span>
                        <Dropdown
                            v-model="selectedVessel" 
                            @update:modelValue="console.log(this.selectedVessel)"
                            :options="vesselsOptions"
                            optionLabel="name" 
                            placeholder="Selecione a embarcação"
                            filter
                        ></Dropdown>
                    </div>
                </div>
                <div class="organizerForm">
                    <div class="inputGroup">
                        <span>Selecione o Comboio :</span>
                        <MultiSelect
                            v-model="convoy"
                            filter
                            :maxSelectedLabels="3"
                            :options="ferries"
                            optionLabel="name"
                            placeholder="Selecione o comboio"
                        ></MultiSelect>
                    </div>
                    <div class="inputGroup">
                        <span>Capitão :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="captain" 
                        />
                    </div>
                    <div class="inputGroup">
                        <span>Previsões :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="prevision" 
                        />
                    </div>
                </div>
                <div class="organizerForm">
                    <div class="inputGroup">
                        <span>Posição atual :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="actualPosition" 
                        />
                    </div>
                    <div class="inputGroup">
                        <span>Destino :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="finalPosition" 
                        />
                    </div>
                    <div class="inputGroup">
                        <span>Area de localização :</span>
                        <Dropdown
                            v-model="areaLocal" 
                            :options="areaOptions"
                            optionLabel="name" 
                            placeholder="Selecione a calha"
                        ></Dropdown>
                    </div>
                </div>
                <div class="organizerForm">
                    <div class="inputGroup">
                        <span>Latitude :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="latitude" 
                        />
                    </div>
                    <div class="inputGroup">
                        <span>Longitude :</span>
                        <InputText 
                            style="width: 100%;" 
                            v-model="longitude" 
                        />
                    </div>                    
                </div>
                <div style="display: flex;gap:10px">
                    <Button
                        class="acceptButton"
                        label="Atualizar"
                        @click="attVessel(this.selectedVessel.objectId)"
                    ></Button>
                    <Button
                        @click="clearModal()"
                        class="rejectButton"
                        label="Cancelar"
                    ></Button>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<style scoped>
.linkButton{
    margin: 10px;
    color: blue;
    text-decoration:underline;
    cursor: pointer;
}
.acceptButton{
    background-color: var(--secondary-color-gc);
    border: 1px solid var(--secondary-color-gc);
    border: none;
}
.rejectButton{
    background-color: var(--white-gc);
    border: 1px solid var(--primary-color-gc);
    color: var(--primary-color-gc);
}
.main{
    width: 100dvw;
    height: 100%;
    min-height: 100dvh;
    background-color: var(--primary-color-gc);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.dataCentral{
    width: 90%;
    height: 100%;
    margin-top: 50px;
}
.organizerForm{
    display: flex; 
    gap:20px; 
    margin: 20px 10px;
    justify-content: center;
}

.inputGroup{
    display: flex;
    flex-direction: column;
    width: 30%;
}

.infoSideMap{
    box-shadow: 10px 10px 16px -9px rgba(0,0,0,0.41);
    border-radius: 10px;
    border: 1px solid rgb(230, 230, 230);
    width: 100%;
    min-height: 100%;
    display: flex;
    gap: 9px;
    margin: 10px;
}
.ferrieSection{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
.infoSection{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.titleForm{
    font-size: large;
    font-weight: bolder;
    margin: 10px;
}
.ferriesInfos, .tripInfos{
    width: 80%;
    height: 100%;
}
.tripInfos{
    display: flex;
}
.inputInfo, .inputGroupInfo{
    gap: 20px;  
}
.inputGroupInfo{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.inputGroupInfo2{
    display: flex;
    flex-direction: column;
    width: 50%;
}
.infoTitle{
    color: gray;
}
.infoAnswer{
    font-weight: bolder;
    font-size: larger;
}
</style>