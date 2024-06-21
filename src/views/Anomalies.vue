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
            uploadedFile: null,
            active: 0,
            loadingCreate: false,
            visible: false,
            objectId: null,
            resumeAnomalie: '',
            dateAnomalie: null,
            departmentResp: '',
            reasonAnomalie:'',
            envolvedInAnomalie: '',
            typeAnomalie:'',
            baseAnomalie:'',
            placeAnomalie:'',
            equipamentAnomalie:'',
            nameEquipament:null,
            impactAnomalie:'',
            statusAnomalie:'',
            resumeQuality:'',
            archives:[],
            imageFacts:[],
            departments:[
                {name:"Comercial", email:''},
                {name:"Controladoria", email:'controller@grupocidade.com'},
                {name:"SGI", email:'qualidade@grupocidade.com'},
                {name:"Inspeção", email:'eltonguedes@hotmail.com'},
                {name:"Manutenção", email:'sup.manutencao@grupocidade.com'},
                {name:"Navegação", email:'planejamento@grupocidade.com'},
                {name:"Patrimonial", email:'patrimonio@grupocidade.com'},
                {name:"RH", email:'rh@grupocidade.com'},
                {name:"Rodoviário", email:'supercisorod@grupocidade.com'},
                {name:"SESMT", email:'sesmt@grupocidade.com'},
                {name:"Suprimentos", email:'compras2@grupocidade.com'},
                {name:"TI", email:'ti@grupocidade.com'},
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
            equipamentTypeOptions:[
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
                {name:"Solucionado"},
                {name:"Em tratativa"},
                {name:"Análise de eficácia"}, 
                {name:"Fechado"}
            ],
            equipamentOptions:[
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
                {name:"BT CT 2"},
                {name:"BT CT 2"},
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
                {name:"Outros"},
                {name:"Não aplicável"},
                {name:"Caminhão "},
                {name:"Chopin"}    
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
                    departmentResp: this.departmentResp?.name,
                    typeAnomalie: this.typeAnomalie?.name,
                    base: this.baseAnomalie?.name,
                    place: this.placeAnomalie?.name,
                    equipament: this.equipamentAnomalie?.name,
                    nameEquipament: this.nameEquipament?.name,
                    impact: this.impactAnomalie?.name,
                    status: this.statusAnomalie?.name,
                    archives: this.archives,
                    imageFacts: this.imageFacts,
                    reasonAnomalie: this.reasonAnomalie,
                    envolvedInAnomalie: this.envolvedInAnomalie,
                    resumeQuality: this.resumeQuality,
                    emailResp: this.departmentResp?.email
                }

            }

            await axios.request(options).then((response) =>{
                
                this.clearForm();
                this.closeModal();
                this.tostAdvice('success', 'Anomalia Registrada');
                this.resetData()             
                // console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.clearForm();
                console.log(error)
            })
            
        },
        async updateAnomalie(){
            const options = {
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${this.objectId}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    resumeAnomalie: this.resumeAnomalie,
                    date: new Date(this.dateAnomalie).toISOString(),
                    departmentResp: this.departmentResp.name,
                    typeAnomalie: this.typeAnomalie.name,
                    base: this.baseAnomalie.name,
                    place: this.placeAnomalie.name,
                    equipament: this.equipamentAnomalie.name,
                    nameEquipament: this.nameEquipament.name,
                    impact: this.impactAnomalie.name,
                    status: this.statusAnomalie.name,
                    archives: this.archives,
                    imageFacts: this.imageFacts,
                    reasonAnomalie: this.reasonAnomalie,
                    envolvedInAnomalie: this.envolvedInAnomalie,
                    resumeQuality: this.resumeQuality
                }

            }

            await axios.request(options).then((response) =>{
                
                this.clearForm();
                this.closeModal();
                this.tostAdvice('success', 'Anomalia Atualizada');
                this.resetData()                
                // console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.clearForm();
                this.resetData();
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
                
                case 'Solucionado':
                    return 'success';
                
                case 'Em tratativa':
                    return 'warning';

                case 'Análise de Eficácia':
                    return 'info'

                default:
                    return null;
            }
        },
        clearForm(){
            this.resumeAnomalie = null;
            this.dateAnomalie = null;
            this.departmentResp = null;
            this.typeAnomalie = null;
            this.baseAnomalie = null;
            this.placeAnomalie = null;
            this.equipamentAnomalie = null;
            this.nameEquipament = null;
            this.impactAnomalie = null;
            this.statusAnomalie = null;
            this.reasonAnomalie = null;
            this.envolvedInAnomalie = null;
            this.imageFacts = [];
            this.resumeQuality = null;
            this.archives = [];

        },
        closeModal(){
            this.visible = false
        },
        tostAdvice(cor, msg){
            this.$toast.add({ severity: `${cor}`, summary: `${msg}`, life: 5000 });
        },
        beforeAnalise(e){
            const response = JSON.parse(e.xhr.responseText);
            console.log(response);
            this.imageFacts = [...this.imageFacts, ...response.files];
        },
        afterAnalise(e){
            const response = JSON.parse(e.xhr.responseText);
            console.log(response);
            this.archives = [...this.archives, ...response.files];
        },
        async teste(){
            let input = document.getElementById('inputFile')

            console.log(input.files[0])

            let formData = new FormData();
            formData.append('files', input.files[0])

            console.log('>> formData >> ', formData);

            await axios.post('https://apiconnect.3nf.com.br/uploadAnomalias', 
                formData, 
                {headers: {'Content-Type': 'multipart/form-data'}}
            ).then((response)=> {
                console.log('SUCCESS!!', response);
            })
            .catch((error)=> {
                console.log('FAILURE!!', error);
            });

        },
        async deleteImageBefore(url, index){
            const options = {
                method: 'DELETE',
                url: `https://apiconnect.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'success', summary:'Arquivo Deletado', life:3000})
                this.retirarimageFacts(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um problema', life:3000})
            })
        },
        async deleteImageAfter(url, index){
            const options = {
                method: 'DELETE',
                url: `https://apiconnect.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'successs', summary:'Arquivo Deletado', life:3000})
                this.retirarArchives(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um erro', life:3000})
            })
        },
        downloadImage(url){
            window.open(url, '_blank')
        },
        retirarimageFacts(index){
            if (index > -1 && index < this.imageFacts.length) {
                this.imageFacts.splice(index, 1);
            }
        },
        retirarArchives(index){
            if (index > -1 && index < this.archives.length) {
                this.archives.splice(index, 1);   
            }
        },
        editAnomalie(e){
            console.log(e)
            this.objectId = e.data.objectId;
            this.resumeAnomalie= e.data.resumeAnomalie;
            this.dateAnomalie= new Date(e.data.date);
            this.departmentResp= {name: e.data.departmentResp, email:e.data.emailResp};
            this.reasonAnomalie= e.data.reasonAnomalie;
            this.envolvedInAnomalie= e.data.envolvedInAnomalie;
            this.typeAnomalie= {name: e.data.typeAnomalie};
            this.baseAnomalie= {name: e.data.base};
            this.placeAnomalie= {name: e.data.place}
            this.equipamentAnomalie= {name: e.data.equipament};
            this.nameEquipament= {name: e.data.nameEquipament};
            this.impactAnomalie= {name: e.data.impact};
            this.statusAnomalie= {name: e.data.status};
            this.resumeQuality= e.data.resumeQuality;
            this.archives= e.data.archives;
            this.imageFacts= e.data.imageFacts;

            this.visible= true;
        },
        resetData(){
            this.anomalies = [];
            this.getAnomalies()
        },
        formatData(x){
            return new Date(x).toLocaleDateString()
        },
        exportCSV(){
            this.$refs.anomalies.exportCSV()
        }

    },
    created(){
        if(this.userInfo.accessLevel === 0){
            this.getAnomalies()
        } return
        
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
            <div v-show="userInfo?.accessLevel === 0">
                <DataTable
                    :value="anomalies"
                    selectionMode="single"
                    @rowSelect="editAnomalie"
                    ref="anomalies"
                    dataKey="id"
                    :style="{width:'90dvw'}"
                    scrollable 
                    scrollHeight="500px"
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
                    <Column field="numericId" header="Código"></Column>
                    <Column field="typeAnomalie" header="Tipo" sortable></Column>
                    <Column field="base" header="Base" sortable></Column>
                    <Column field="place" header="Local" sortable></Column>
                    <Column field="date" header="Data do ocorrido" sortable>
                        <template #body="{data}">
                            <div>{{ formatData(data.date) }}</div>                            
                        </template>
                    </Column>
                    <Column field="nameEquipament" header="Equipamento" sortable></Column>
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
        <Dialog 
            v-model:visible="visible" 
            modal
            :draggable="false"
            :style="{width: '60dvw'}" 
            @hide="clearForm()" 
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
            <template #header>
                <div class="titleDialog">Cadastrar Anomalia</div>
            </template>
            <div class="formAnomalies">
                <TabView style="width: 100%;" v-model:activeIndex="active">
                    <TabPanel header="Ocorrência">
                        <div class="topBox">
                            <div>
                                <FloatLabel>
                                    <Textarea v-model="resumeAnomalie" rows="5" cols="40" style="resize: none;"/>
                                    <label>Resumo da Anomalia :</label>
                                </FloatLabel>
                            </div>
                            <div class="groupQuestion">
                                <span>Data da ocorrência :</span>
                                <Calendar v-model="dateAnomalie" dateFormat="dd/mm/yy" touchUI/>
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
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Causa da ocorrência:</span>
                                <InputText id="username" style="width: 100%;" v-model="reasonAnomalie" />
                            </div>
                            <div class="groupQuestion">
                                <span>Envolvidos:</span>
                                <InputText id="username" style="width: 100%;" v-model="envolvedInAnomalie" />
                            </div>                          
                        </div>
                        <div style="display: flex; align-items: center;">
                            <FileUpload
                                mode="basic" 
                                name="files"
                                :multiple="true"
                                :auto="true"
                                @upload="beforeAnalise($event)"
                                url="https://apiconnect.3nf.com.br/uploadAnomalias"
                            >
                            </FileUpload>
                            <div class="boxImages">
                                <div 
                                    v-for="(image, index) in imageFacts" 
                                    :key="index"
                                >
                                    <div 
                                        style="width: 120px; display: flex; flex-direction: column; align-items: center;">
                                        <Image :src="image.location" alt="Teste" width="100" height="100" preview ></Image>
                                        <div style="display: flex;">
                                            <Button  icon="pi pi-times" rounded  @click="deleteImageBefore(image.location, index)"></Button>
                                            <Button  icon="pi pi-download" rounded @click="downloadImage(image.location)"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Informações">
                        <div style="display: flex; gap: 20px;width: 100%;">
                            <div style="width: 100%;">
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
                            </div>
                            <div style="width: 100%;">
                                <div class="groupQuestion">
                                    <span>Nome do Equipamento:</span>
                                    <Dropdown 
                                        v-model="nameEquipament" 
                                        :options="equipamentOptions"
                                        filter
                                        optionLabel="name" 
                                        placeholder="Selecione o equipamento">
                                    </Dropdown>
                                </div>
                                <div class="groupQuestion">
                                    <span>Tipo de equipamento:</span>
                                    <Dropdown 
                                        v-model="equipamentAnomalie" 
                                        :options="equipamentTypeOptions"
                                        optionLabel="name" 
                                        placeholder="Selecione o tipo de equipamento">
                                    </Dropdown>
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
                            </div>
                        </div>
                        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
                            <div class="groupQuestion" style="width: 30%;" v-show="userInfo?.accessLevel === 0">
                                <span>Selecione o status</span>
                                <Dropdown 
                                    v-model="statusAnomalie" 
                                    :options="statusOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o status">
                                </Dropdown>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Pós-analise">
                        <div class="topBox" v-if="userInfo?.accessLevel === 0">
                            <div >
                                <FloatLabel>
                                    <Textarea v-model="resumeQuality" rows="5" cols="40" style="resize: none;"/>
                                    <label>Resumo do Avaliador :</label>
                                </FloatLabel>
                            </div>
                            <div class="boxUpload">
                                <FileUpload 
                                    mode="basic" 
                                    name="files"
                                    :auto="true"
                                    :multiple="true"
                                    @upload="afterAnalise($event)"
                                    url="https://apiconnect.3nf.com.br/upload"
                                />
                                <div v-for="(file, i) in archives" :key="i" 
                                    style="display: flex; margin: 10px; flex-wrap: wrap;"
                                >
                                    <div 
                                        class="uploadBox"
                                    >
                                        <Image :src="file.location" alt="teste" width="100" height="100" preview ></Image>
                                        <div style="display: flex; gap: 15px; padding: 10px;">
                                            <i class="pi pi-times" style="font-size: 1rem;" @click="deleteImageAfter(file.location, i)"></i>
                                            <i class="pi pi-download" style="font-size: 1rem;" @click="downloadImage(file.location)"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else >
                            <strong>Você não tem acesso a essa aba</strong>
                        </div>
                        <Divider></Divider>
                        
                        
                    </TabPanel>
                </TabView>
                <div class="buttonsBottom">
                    <Button 
                        @click="createAnomalie()" 
                        :loading="loadingCreate"
                        v-if="!objectId"
                    >
                        Enviar Anomalia
                    </Button>
                    <Button 
                        @click="updateAnomalie()" 
                        :loading="loadingCreate"
                        v-else
                    >
                        Atualizar Anomalia
                    </Button>
                    <Button 
                        @click="clearForm() & closeModal()"
                    >   
                        Cancelar
                    </Button>
                </div>
                <div style="width: 100%;">
                    <Message 
                        severity="error"
                        :closable="false"
                        icon="pi pi-exclamation-circle"
                        v-if="!objectId"
                    >
                        Todos os campos são necessarios
                    </Message>
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
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
.topBox{
    display: flex;
    gap: 20px;
}
.bottomBox{
    display: flex;
    width: 100%;
}
.formAnomalies{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.groupQuestion{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}
.optionsSide{
    width: 100%;
    gap: 10px;
}
.boxUpload{
    width: 100%;
    overflow: auto;
    max-height: 300px; 
    display: flex;
    flex-wrap: wrap;
}
.uploadBox{
    overflow: hidden;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    align-items: center;
    border: 1px solid #cecece;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 6px 10px 22px -9px rgba(89,89,89,1);
}
.boxImages{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

@media (max-width:500px){
    .topBox{
        flex-direction: column;
        max-width: 100%;
    }
    .bottomBox{
        flex-direction: column;
    }
    .buttonsBottom{
        display: flex;

    }

}
</style>