<script>
import Dropdown from 'primevue/dropdown';
import MenuBar from '../components/MenuBar.vue';
import axios from 'axios'
import { FilterMatchMode } from 'primevue/api';

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("loggedUser")),
            anomalies:[],
            visible: false,
            resumeAnomalie: '',
            dateAnomalie: null,
            departmentResp: '',
            typeAnomalie:'',
            baseAnomalie:'',
            placeAnomalie:'',
            equipamentAnomalie:'',
            nameEquipament:'',
            impactAnomalie:'',
            statusAnomalie:'',
            departments:[
                {name:"Comercial"},
                {name:"Controladoria"},
                {name:"SGI"},
                {name:"Inspeção"},
                {name:"Manutenção"},
                {name:"Navegação"},
                {name:"Patrimonial"},
                {name:"RH"},
                {name:"Rodoviário"},
                {name:"SESMT"},
                {name:"Suprimentos"},
                {name:"TI"},
                {name:"Terceirizado"}
            ],
            typesOptions:[
                {name:"Ambiental"},
                {name:"Atendimento de Legal"},
                {name:"Controle de pragas"},
                {name:"Equipamento"},
                {name:"Infraestrutura"},
                {name:"Operacional"},
                {name:"Processo"},
                {name:"Programação"},
                {name:"Segurança"},
                {name:"Terceiros"},
                {name:"5S"}
            ],
            baseOptions:[
                {name:"Itacoatiara"},
                {name:"Itaituba"},
                {name:"Manaus"},
                {name:"Peru"},
                {name:"Porto Velho"},
                {name:"Santarém"},
                {name:"Viagem"}
            ],
            localOptions:[
                {name:"Boia Porto 3NF"},
                {name:"Boia do Vigia"},
                {name:"EQD (Equador)"},
                {name:"Escritório"},
                {name:"Porto 3NF"},
                {name:"Porto Cidade"},
                {name:"Refinaria (REAM)"},
                {name:"Terminal ABI"},
                {name:"Viagem"}
            ],
            equipamentOptions:[
                {name:"Balsa"},
                {name:"Caminhão"},
                {name:"Empurrador"},
                {name:"Carreta"},
                {name:"Outros"}
            ],
            impactOptions:[
                {name:"Acidente de trabalho"},
                {name:"Atraso na Operação"},
                {name:"Compliance"},
                {name:"Condições ilegais de viagem"},
                {name:"Contaminação ambiental"},
                {name:"Desvio de produtos"},
                {name:"Excesso de remanescente"},
                {name:"Impacto Financeiro"},
                {name:"Interrupção na Operação"},
                {name:"Notificação"},
                {name:"Passivo trabalhista"},
                {name:"Perda de licença"},
                {name:"Quebra de equipamento"},
                {name:"Risco de segurança"},
                {name:"Tributário / Financeiro"},
                {name:"Tripulação incompleta"}
            ],
            statusOptions:[
                {name:"Ainda não analisado"},
                {name:"Em análise"},
                {name:"Fechado"}
            ],
            filters:{
                global:{ value: null, matchMode: FilterMatchMode.CONTAINS},
                objectId: { value: null, matchMode: FilterMatchMode.CONTAINS},
                base: { value: null, matchMode: FilterMatchMode.CONTAINS},
                departmentResp: { value: null, matchMode: FilterMatchMode.CONTAINS},
                equipament: { value: null, matchMode: FilterMatchMode.CONTAINS},
                impact: { value: null, matchMode: FilterMatchMode.CONTAINS},
                nameEquipament: { value: null, matchMode: FilterMatchMode.CONTAINS},
                place: { value: null, matchMode: FilterMatchMode.CONTAINS},
                resumeAnomalie: { value: null, matchMode: FilterMatchMode.CONTAINS},
                status: { value: null, matchMode: FilterMatchMode.CONTAINS},
                typeAnomalie: { value: null, matchMode: FilterMatchMode.CONTAINS}
            }

        }
    },
    methods:{
        async getAnomalies(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies`,
                params:{order: "-createdAt"},
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }

            await axios.request(options).then((response) =>{
                this.anomalies = response.data.results
                console.log(response)
            }).catch(error =>{
                console.log(error)
            })
        },

        async createAnomalie(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    resumeAnomalie: this.resumeAnomalie,
                    date: this.dateAnomalie,
                    departmentResp: this.departmentResp.name,
                    typeAnomalie: this.typeAnomalie.name,
                    base: this.baseAnomalie.name,
                    place: this.placeAnomalie.name,
                    equipament: this.equipamentAnomalie.name,
                    nameEquipament: this.nameEquipament,
                    impact: this.impactAnomalie.name,
                    status: this.statusAnomalie.name
                }

            }

            await axios.request(options).then((response) =>{
                
                this.clearForm();
                this.closeModal();
                this.tostAdvice('success', 'Anomalia Registrada');                
                console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.clearForm();
                console.log(error)
            })
            
        },
        getStatusLabel(status) {
            switch (status) {
                case 'Fechado':
                    return 'success';

                case 'Em análise':
                    return 'warning';

                case 'Ainda não analisado':
                    return 'danger';

                default:
                    return null;
            }
        },
        clearForm(){
            this.resumeAnomalie = "";
            this.dateAnomalie = null;
            this.departmentResp = "";
            this.typeAnomalie = "";
            this.baseAnomalie = "";
            this.placeAnomalie = "";
            this.equipamentAnomalie = "";
            this.nameEquipament = "";
            this.impactAnomalie = "";
            this.statusAnomalie = "";
        },
        closeModal(){
            this.visible = false
        },
        tostAdvice(cor, msg){
            this.$toast.add({ severity: `${cor}`, summary: `${msg}`, life: 5000 });
        }

    },
    created(){
        this.getAnomalies()
    }
}
</script>
<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dataCentral">
            <div class="header">
                <Button @click="visible=true">Nova Anomalia</Button>
            </div>
            <div>
                <DataTable
                    :value="anomalies"
                    ref="charges"
                    dataKey="id"
                    removableSort
                    v-model:filters="filters"
                    :globalFilterFields="['global', 'base', 'departmentResp', 'equipament', 'impact', 'nameEquipament', 'place', 'resumeAnomalie', 'status', 'typeAnomalie']"
                >
                    <template #header>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <FloatLabel>
                                <InputText id="username" v-model="filters['global'].value"/>
                                <label for="username">Global Search</label>
                            </FloatLabel>
                            <div>
                                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" v-show="userInfo.accessLevel < 1"/>
                            </div>
                        </div>
                    </template>
                    <Column field="typeAnomalie" header="Tipo" sortable></Column>
                    <Column field="base" header="Base" sortable></Column>
                    <Column field="place" header="Local" sortable></Column>
                    <Column field="status" header="Status" sortable>
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)"></Tag>
                        </template>
                    </Column>
                    <Column field="equipament" header="Equipamento" sortable></Column>
                    <Column field="departmentResp" header="Departamento Responsável" sortable></Column>                    
                </DataTable>
            </div>
        </div>
        <Dialog v-model:visible="visible" modal :style="{width: '60dvw'}">
            <template #header>
                <div class="titleDialog">Cadastrar Anomalia</div>
            </template>
            <div class="formAnomalies">
                <div style="display: flex; gap: 20px;">
                    <FloatLabel>
                        <Textarea v-model="resumeAnomalie" rows="5" cols="100" autoResize />
                        <label>Resumo da Anomalia</label>
                    </FloatLabel>
                    <div class="groupQuestion">
                        <span>Data da ocorrência</span>
                        <Calendar v-model="dateAnomalie" dateFormat="dd/mm/yy" touchUI/>
                    </div>
                </div>
                <div style="display: flex; width: 100%;">
                    <div class="optionsSide">
                        <div class="groupQuestion">
                            <span>Departamento Responsável:</span>
                            <Dropdown 
                                v-model="departmentResp" 
                                :options="departments"
                                optionLabel="name" 
                                placeholder="Selecione o Departamento">
                            </Dropdown>
                        </div>
                        <div class="groupQuestion">
                            <span>Tipo de Anomalia:</span>
                            <Dropdown 
                                v-model="typeAnomalie" 
                                :options="typesOptions"
                                optionLabel="name" 
                                placeholder="Selecione o tipo">
                            </Dropdown>
                        </div>
                        <div class="groupQuestion">
                            <span>Base:</span>
                            <Dropdown 
                                v-model="baseAnomalie" 
                                :options="baseOptions"
                                optionLabel="name" 
                                placeholder="Selecione a base">
                            </Dropdown>
                        </div>
                        <div class="groupQuestion">
                            <span>Local:</span>
                            <Dropdown 
                                v-model="placeAnomalie" 
                                :options="localOptions"
                                optionLabel="name" 
                                placeholder="Selecione o local">
                            </Dropdown>                            
                        </div>
                    </div>
                    <div class="optionsSide">
                        <div class="groupQuestion">
                            <span>Tipo de equipamento:</span>
                            <Dropdown 
                                v-model="equipamentAnomalie" 
                                :options="equipamentOptions"
                                optionLabel="name" 
                                placeholder="Selecione o tipo de equipamento">
                            </Dropdown>
                        </div>
                        <div class="groupQuestion">
                            <span>Nome do equipamento:</span>
                            <FloatLabel>
                                <InputText id="username" style="width: 100%;" v-model="nameEquipament" />
                                <label for="username">Equipamento</label>
                            </FloatLabel>
                        </div>
                        <div class="groupQuestion">
                            <span>Selecione o impacto:</span>
                            <Dropdown 
                                v-model="impactAnomalie" 
                                :options="impactOptions"
                                optionLabel="name" 
                                placeholder="Selecione o impacto">
                            </Dropdown>
                        </div>
                        <div class="groupQuestion">
                            <span>Selecione o status</span>
                            <Dropdown 
                                v-model="statusAnomalie" 
                                :options="statusOptions"
                                optionLabel="name" 
                                placeholder="Selecione o status">
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div>
                    <Button @click="createAnomalie()">Enviar Anomalia</Button>
                    <Button @click="clearForm() & closeModal()">Cancelar</Button>
                </div>
            </div>
        </Dialog>
    </div>
    <Toast></Toast>
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
Button{
    margin: 10px;
    background-color: var(--secondary-color-gc);
    color: var(--primary-color-gc);
    font-weight:bold;
    border: none;
}
.titleDialog{
    font-weight: bolder;
    font-size: larger;
}
.formAnomalies{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.groupQuestion{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}
.optionsSide{
    width: 100%;
    gap: 10px;
}
</style>