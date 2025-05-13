<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import addEquipament from '../components/locationsComponents/addEquipament.vue';
import { FilterMatchMode } from 'primevue/api';

export default{
    components:{
        MenuBar,
        addEquipament
    },
    data(){
        return{
            vessels: null,
            showAddEquipament: false,
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
            equipaments:[],
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
        async getEquipaments(){
            const options ={
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/instrumentMed`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }
            
            await axios.request(options).then((response) => {
                console.log(response)
                this.equipaments = response.data.results
                this.loading = false
            }).catch((error) => {
                console.log(error)
            })
        },
        downloadFile(file){
            console.log(file)
            window.open(file.location, '_blank')
        },
        formatDate(value){
            return new Date(value).toLocaleDateString('pt-BR')
        },
        resetData(){
            this.loading = true
            this.equipaments = []
            this.getEquipaments()
        }
    },
    mounted(){
        this.getEquipaments()
        document.title = "Materiais de Inspeção | Controle de Embarcação"
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
                    @click="showAddEquipament = true"
                    label="Adicionar Equipamento"
                >
                </Button>
            </div>
            <DataTable                
                :value="equipaments"
                :loading="loading"
                dataKey="id"
                tableStyle="min-width: 50rem"
                :expandedRows="rowsExpanded"
                scrollable 
                removableSort
                scrollHeight="600px"
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
                <template #empty>
                    <div style="width: 100%; display: flex; justify-content: center;">
                        <strong>Sem dados atualizados</strong>
                    </div>
                </template>
                <ColumnGroup type="header">
                    <Row>
                        <Column header="Item" :rowspan="3" field="id"></Column>
                        <Column header="Descrição" :rowspan="3"></Column>
                        <Column header="Informações sobre o instrumento de medição" :colspan="13"></Column>
                        <Column header="Intervalo da Calibração" :colspan="4"></Column>
                        <Column header="Resultados da Calibração" :colspan="2"></Column>
                        <Column header="Avaliação da Calibração" :colspan="3" ></Column>
                        <Column header="Obs" :rowspan="3"></Column>
                    </Row>
                    <Row>
                        <Column header="Setor" :rowspan="2"></Column>
                        <Column header="Marca" :rowspan="2"></Column>
                        <Column header="Modelo" :rowspan="2"></Column>
                        <Column header="Nª Série / Lacre" :rowspan="2"></Column>
                        <Column header="Etiqueta / Identificação" :rowspan="2"></Column>
                        <Column header="Faixa de medição" :rowspan="2"></Column>
                        <Column header="Resolução" :colspan="2"></Column>
                        <Column header="Classe" :rowspan="2"></Column>
                        <Column header="Localização" :colspan="2"></Column>
                        <Column header="Tolerância" :colspan="2"></Column>

                        <Column header="Data da Calibração" :rowspan="2"></Column>
                        <Column header="Validade" :rowspan="2"></Column>
                        <Column header="Dias a Vencer" :rowspan="2"></Column>
                        <Column header="Periodo (meses)" :rowspan="2"></Column>

                        <Column header="Laboratório / Engenheiro" :rowspan="2"></Column>
                        <Column header="Nº Certificado / ART" :rowspan="2"></Column>
                        
                        <Column header="Situação Atual" :rowspan="2"></Column>
                        <Column header="Documento" :rowspan="2"></Column>
                        <Column header="Ações Tomadas" :rowspan="2"></Column>
                    </Row>
                    <Row>
                        <Column header="Valor"></Column>
                        <Column header="Un"></Column>

                        <Column header="Setor"></Column>
                        <Column header="Responsável"></Column>

                        <Column header="Valor"></Column>
                        <Column header="Un"></Column>                   
                    </Row>
                </ColumnGroup>
                <Column field="item"></Column>
                <Column field="description"></Column>
                <Column field="infoMed.setor"></Column>
                <Column field="infoMed.marca"></Column>
                <Column field="infoMed.modelo"></Column>
                <Column field="infoMed.nSerieLacre"></Column>
                <Column field="infoMed.etiquetaIdentificacao"></Column>
                <Column field="infoMed.faixaMedicao"></Column>
                <Column field="infoMed.resolucao.valor"></Column>
                <Column field="infoMed.resolucao.un"></Column>
                <Column field="infoMed.classe"></Column>
                <Column field="infoMed.localizacao.setor"></Column>
                <Column field="infoMed.localizacao.responsavel"></Column>
                <Column field="infoMed.tolerancia.valor"></Column>
                <Column field="infoMed.tolerancia.un"></Column>
                <Column field="calibrationInterval.date">
                    <template #body="slotProps">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                            {{ formatDate(slotProps.data.calibrationInterval.date) }}
                        </div>
                    </template>
                </Column>
                <Column field="calibrationInterval.validade">
                    <template #body="slotProps">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                            {{ formatDate(slotProps.data.calibrationInterval.validade) }}
                        </div>
                    </template>
                </Column>
                <Column field="calibrationInterval.diasVencer"></Column>
                <Column field="calibrationInterval.periodoMeses"></Column>
                <Column field="calibrationResults.laboratorioEngenheiro"></Column>
                <Column field="calibrationResults.nCertificadoArt"></Column>
                <Column field="avaliationCalibration.status"></Column>
                <Column field="avaliationCalibration.document">
                    <template #body="slotProps">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                            <i class="pi pi-download" style="font-size: 1rem; cursor: pointer;" @click="downloadFile(slotProps.data.avaliationCalibration.document)"></i>                            
                        </div>
                    </template>
                </Column>
                <Column field="avaliationCalibration.actions"></Column>
                <Column field="obs"></Column>
            </DataTable>
        </div>
        <addEquipament
            v-model:visible="showAddEquipament"
            @update:visible="showAddEquipament = $event"
            @reGet="resetData()"
        ></addEquipament>
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
