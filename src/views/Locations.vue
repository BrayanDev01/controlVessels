<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import MapView from '../components/map/MapComponent.vue';

export default{
    components:{
        MenuBar,
        MapView
    },
    data(){
        return{
            vessels: null,
            rowsExpanded: {},
            loading: true
        }
    },
    methods:{
        async getVessels(){
            const options ={
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/History`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                params:{include: 'Ferrie', order: "-createdAt"}
            }

            await axios.request(options).then((response) =>{
                console.log(response.data.results)
                this.vessels = response.data.results;
                this.loading = false
            }).catch(error =>{
                console.log(error)
            })
        },
        onRowExpand(event){
            console.log(event.data)
        }
    },
    mounted(){
        this.getVessels()
    }
}
</script>
<template>
<Toast></Toast>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dataCentral">
            <DataTable                
                :value="vessels"
                :loading="loading"
                dataKey="objectId"
                tableStyle="min-width: 50rem"
                :expandedRows="rowsExpanded"
            >
                <Column expander style="width: 5rem" />
                <Column field="Ferrie.name" header="Embarcação"></Column>
                <Column field="convoy" header="Comboio"></Column>
                <Column field="actualPosition" header="Posição atual"></Column>
                <Column field="prevision" header="Previsão"></Column>
                <Column field="destination" header="Destino"></Column>
                <template #expansion="slotProps">
                    <div style="display: flex; gap: 5px;">
                        <MapView 
                            :latitude="slotProps.data.localization.latitude"
                            :longitude="slotProps.data.localization.longitude"
                            :largura="400"
                            :altura="400"
                        ></MapView>
                        <div class="infoSideMap">
                            <div class="ferrieSection">
                                <div class="titleForm">Informações da Embarcação</div>
                                <div class="ferriesInfos">
                                    <div class="inputInfo">
                                        <div class="infoTitle">
                                            Nome:
                                        </div>
                                        <div class="infoAnswer">
                                            {{ slotProps.data.Ferrie.name }}
                                        </div>
                                    </div>
                                    <div class="inputInfo">
                                        <div class="inputTitle">
                                            Tipo de embarcação:
                                        </div>
                                        <div class="infoAnswer">
                                            {{ slotProps.data.Ferrie.typeVessel }}
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
                                            <div class="infoTitle">Posição atual:</div>
                                            <div class="infoAnswer">{{ slotProps.data.actualPosition }}</div>
                                        </div>
                                    </div>
                                    <div class="inputGroupInfo">
                                        <div>
                                            <div class="infoTitle">Comboio:</div>
                                            <div class="infoAnswer">{{ slotProps.data.convoy }}</div>
                                        </div>
                                        <div>
                                            <div class="infoTitle">Destino:</div>
                                            <div class="infoAnswer">{{ slotProps.data.destination }}</div>
                                        </div>
                                    </div>
                                    <div class="inputInfo">
                                        <div class="infoTitle">Previsão:</div>
                                        <div class="infoAnswer">{{ slotProps.data.prevision }}</div>
                                    </div>
                                    <div class="inputInfo">
                                        <div class="infoTitle">Status:</div>
                                        <div class="infoAnswer">{{ slotProps.data.status}}</div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </template> 
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
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
    background-color: white;
}
.infoSideMap{
    box-shadow: 10px 10px 16px -9px rgba(0,0,0,0.41);
    width: 100%;
    min-height: 100%;
    display: flex;
    gap: 9px;
}
.ferrieSection{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
}
.titleForm{
    font-size: large;
    font-weight: bolder;
}
.ferriesInfos, .tripInfos{
    width: 80%;
    height: 100%;
}
.inputInfo, .inputGroupInfo{
    gap: 5px;
    margin: 20px;
}
.inputGroupInfo{
    display: flex;
    justify-content: space-between;
}
.infoTitle{
    color: gray;
}
.infoAnswer{
    font-weight: bolder;
    font-size: larger;
}
</style>