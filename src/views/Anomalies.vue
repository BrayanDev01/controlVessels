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
            nameEquipament:'',
            impactAnomalie:'',
            statusAnomalie:'',
            resumeQuality:'',
            archives:[],
            imageFacts:[],
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
                {name:"Solucionado"},
                {name:"Em tratativa"},
                {name:"Análise de eficácia"}, 
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
                    departmentResp: this.departmentResp?.name,
                    typeAnomalie: this.typeAnomalie?.name,
                    base: this.baseAnomalie?.name,
                    place: this.placeAnomalie?.name,
                    equipament: this.equipamentAnomalie?.name,
                    nameEquipament: this.nameEquipament,
                    impact: this.impactAnomalie?.name,
                    status: this.statusAnomalie?.name,
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
                    nameEquipament: this.nameEquipament,
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
            this.departmentResp= {name: e.data.departmentResp};
            this.reasonAnomalie= e.data.reasonAnomalie;
            this.envolvedInAnomalie= e.data.envolvedInAnomalie;
            this.typeAnomalie= {name: e.data.typeAnomalie};
            this.baseAnomalie= {name: e.data.base};
            this.placeAnomalie= {name: e.data.place}
            this.equipamentAnomalie= {name: e.data.equipament};
            this.nameEquipament= e.data.nameEquipament;
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
                    ref="charges"
                    dataKey="id"
                    :style="{width:'90dvw'}"
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
        <Dialog 
            v-model:visible="visible" 
            modal 
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
                                    <span>Tipo de equipamento:</span>
                                    <Dropdown 
                                        v-model="equipamentAnomalie" 
                                        :options="equipamentOptions"
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
                                <div class="groupQuestion" v-show="userInfo?.accessLevel === 0">
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
    height: 150px;
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