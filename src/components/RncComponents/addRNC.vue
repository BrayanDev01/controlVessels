<script>
import axios from 'axios';
import MenuBar from '../MenuBar.vue';


export default{
    name:'Form', 
    components:{
        MenuBar
    },
    data(){
        return{
            actions:['Viagem', 'Carregamento / Descarregamento'],
            vessels:[],
            selectOperation: "",
            typesOfOperation:['Carregando', 'Descarga', 'Viagem'],
            typeOperation:"",
            startOperation:"",
            endOperation:"",
            cities:["Miritituba", "Manaus", "Santarém", "Santana"],
            selectedCity:"",
            ports:["Master", "Cdp 201", "Cdp Fundeio", "Gauxo", "Uni-z", "Bertuol", "Arthur", "Ciamport"],
            selectedPorto:"",
            observations:"",
            pdf: null
        }
    },
    methods:{
        async getVessels(){
            const options = {
                method: 'GET',
                url: `${import.meta.env.VITE_URL_API}classes/Vessels`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            };

            const results = await axios.request(options).then(function (response) {
                // console.log(response.data.results);
                return response.data.results

            }).catch(function (error) {
                console.error(error);
            });

            this.vessels = results
        },
        async sendReport(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}functions/createReport`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data: {
                    typeOperation: this.typeOperation,
                    startOperation: { __type: "Date", iso: this.startOperation },
                    endOperation: { __type: "Date", iso: this.endOperation },
                    local: this.selectedCity,
                    vessel: {__type: 'Pointer', className: 'Vessels', objectId: this.selectVessel},
                    port: this.selectedPorto,
                    observation: this.observations
                }
            };

            const results = await axios.request(options).then(function (response) {
                // console.log(response.data.result);
                this.$toast.add({ severity: 'success', summary: 'Report Enviado', detail: 'Report enviado com sucesso', life: 3000 });
                return results                
            }).catch(error => {  
                this.errorCode(error);
                this.resetForm()        
                // console.error(error);
            });
        },
        errorCode(error){
            this.$toast.add({ severity: 'error', summary: 'Report Não Enviado', detail: error, life: 3000 });
        },
        resetForm(){
            this.selectVessel = '';
            this.typeOperation = '';
            this.startOperation = '';
            this.endOperation = '',
            this.selectedCity = '';
            this.selectedPorto = '';
            this.observations = '';
        }
        
    },
    computed:{
    },
    created(){
        // this.getVessels()
    },
    watch:{
    }
}
</script>   

<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="header">
            <div class="titleHeader">Adicionar RNC</div>
        </div> 

        <div class="centralBox">
            <Stepper style="width: 95%; margin-top: 20px" >
                <StepperPanel header="Ocorrência">
                    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                        <div class="topBox">
                            <div>
                                <FloatLabel>
                                    <Textarea v-model="resumeAnomalie" rows="5" cols="40" style="resize: none;"/>
                                    <label>Descrição da Ocorrência:</label>
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
                                    placeholder="Selecione o local"
                                >
                                </Dropdown>                            
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Departamentos Envolvidos:</span>
                                <Dropdown 
                                    v-model="departmentResp" 
                                    :options="departments"
                                    optionLabel="name" 
                                    placeholder="Selecione o Departamento">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion">
                                <span>Tipo do chamado :</span>
                                <Dropdown
                                    v-model="typeCall"
                                    :options="typeCallOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o tipo de chamado"
                                    v-if="userInfo?.department === 'ADMINISTRACAO' || userInfo?.department === 'Qualidade'"
                                ></Dropdown>
                            </div>                         
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Tipo de Não Conformidade :</span>
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
                                <span>Nome do Equipamento:</span>
                                <Dropdown 
                                    v-model="nameEquipament" 
                                    :options="equipamentOptions"
                                    filter
                                    optionLabel="name" 
                                    placeholder="Selecione o equipamento">
                                </Dropdown>
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Tipo de equipamento:</span>
                                <Dropdown 
                                    v-model="equipamentAnomalie" 
                                    :options="equipamentTypeOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o tipo de equipamento">
                                </Dropdown>
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion" style="width: 30%;" v-show="userInfo?.department === 'Qualidade' || userInfo?.department === 'ADMINISTRACAO'">
                                <span>Selecione o status</span>
                                <Dropdown 
                                    v-model="statusAnomalie" 
                                    :options="statusOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o status">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion" style="width: 30%;" v-show="userInfo?.department === 'Qualidade' || userInfo?.department === 'ADMINISTRACAO'">
                                <span>Selecione a criticidade :</span>
                                <Dropdown 
                                    v-model="criticalityAnomalie" 
                                    :options="criticalityOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione a criticidade">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion" style="width: 30%;">
                                <span>Selecione a classificação :</span>
                                <Dropdown 
                                    v-model="classification" 
                                    :options="classificationOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione a classificação">
                                </Dropdown>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <FileUpload
                                mode="basic" 
                                name="files"
                                :multiple="true"
                                :auto="true"
                                @upload="beforeAnalise($event)"
                                url="https://connectapi.3nf.com.br/uploadAnomalias"
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
                                            <Button  icon="pi pi-times" rounded  @click="deleteImageBefore(image.location, index)" v-show="userInfo?.accessLevel === 0"></Button>
                                            <Button  icon="pi pi-download" rounded @click="downloadImage(image.location)"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </StepperPanel>
                <StepperPanel header="Análise"></StepperPanel>
                <StepperPanel header="Verificação de Eficácia"></StepperPanel>
            </Stepper>          
        </div>
    </div>
</template>

<style scoped>
.main{
    width: 100vw;
    min-height: 100dvh;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary-color-gc)
}
.header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
.titleHeader{
    color: var(--white-gc);
    font-weight: bold;
    font-size: xx-large;
    margin: 10px;
}
.centralBox{
    border-radius: 10px;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--white-gc);
}
.timeBox{
    display: flex;
    gap: 20px;
}
.topBox{
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
}
.groupQuestion{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}

@media (min-width: 700px) {
    .form{
        border-radius: 10px;
        width: 50%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: var(--white-gc);
    }   
}
</style>