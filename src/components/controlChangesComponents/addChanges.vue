<script>
import { MockOptions } from '../../mocks/optionsControlChanges.js'
export default{
    data(){
        return{
            userInfos: JSON.parse(localStorage.getItem("loggedUser")),
            proposalChange: null,
            origin: null,
            responsible: null,
            startDate: null,
            endDate: null,
            potencialConsequences: null,
            severity: null,
            urgency: null,
            trend: null,
            priority: null,
            status: null,
            matrixGUT: null,

            what: null,
            why: null,
            where: null,
            when: null,
            who: null,
            how: null,
            howMuch: null,

            filesQualidade: [],

            uploadingValue: 0,
            severityOptions:[],
            urgencyOptions:[],
            trendOptions:[],
            statusOptions:[
                {name:'Em Atraso'},
                {name:'Em Execução'},
                {name:'Concluído'},
                {name:'Ainda Não Iniciado'}
            ],
            efficacyStatusOptions:[
                {name: 'Implantação Cancelada'},
                {name: 'Implantação Concluida'},
                {name: 'Implantação Em Andamento'},
                {name: 'Ainda Não Analisado'}
            ]
        }
    },
    methods:{
        clearForm(){
            this.proposalChange = null
            this.origin = null
            this.responsible = null
            this.startDate = null
            this.endDate = null
            this.potencialConsequences = null
            this.gravidade = null
            this.severity = null
            this.urgency = null
            this.trend = null
            this.priority = null
            this.status = null
            this.matrixGUT = null
        },
        afterUpload(e) {
            const response = JSON.parse(e.xhr.responseText);
            this.filesQualidade = [...this.filesQualidade, ...response.files];
            this.uploadingValue = 0                       
        },
        deleteFileQualidade(urlFile, i){
            this.filesQualidade.splice(i, 1);
        },
        uploadingLogic(e){
            this.uploadingValue = e.progress
            if(e.progress === 100){
                this.uploading = false
            }
        }
    },
    watch: {
        severity(){
            this.matrixGUT = this.severity?.value * this.urgency?.value * this.trend?.value
            return this.matrixGUT > 11 ? this.priority = 'Tratar Com Plano de Ação' : this.priority = 'Tratar Sem Plano de Ação'
        },
        trend(){            
            this.matrixGUT = this.severity?.value * this.urgency?.value * this.trend?.value
            return this.matrixGUT > 11 ? this.priority = 'Tratar Com Plano de Ação' : this.priority = 'Tratar Sem Plano de Ação'
        },
        urgency(){
            this.matrixGUT = this.severity?.value * this.urgency?.value * this.trend?.value
            return this.matrixGUT > 11 ? this.priority = 'Tratar Com Plano de Ação' : this.priority = 'Tratar Sem Plano de Ação'
        }
    },
    mounted(){
        MockOptions.getDataSeverity().then((data) =>{this.severityOptions = data})
        MockOptions.getDataUrgency().then((data) =>{this.urgencyOptions = data})
        MockOptions.getDataTrend().then((data) =>{this.trendOptions = data})
    }
}
</script>

<template>
    <Dialog
        modal
        header="Cadastrar Mudança"
        :draggable="false"
        :style="{width: '70vw'}"
        @hide="clearForm()"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"       
    >
        <Stepper>
            <StepperPanel header="Informações">
                <div class="main">
                    <div class="leftSide">
                        <div class="groupOfInputs">
                            <div class="inputGroup">
                                <span>Mudança proposta :</span>
                                <Textarea 
                                    v-model="proposalChange"
                                    rows="5" 
                                    cols="50"
                                ></Textarea>
                            </div>   
                        </div>
                        <div class="groupOfInputs">
                            <div class="inputGroup">
                                <span>Origem :</span>
                                <InputText
                                    v-model="origin"
                                ></InputText>
                            </div>
                            <div class="inputGroup">
                                <span>Responsável :</span>
                                <InputText
                                    v-model="responsible"
                                ></InputText>
                            </div>
                        </div>
                        <div class="groupOfInputs">
                            <div class="inputGroup">
                                <span>Data de Inicio Previsto:</span>
                                <Calendar
                                    v-model="startDate"
                                    dateFormat="dd/mm/yy"
                                ></Calendar>
                            </div>
                            <div class="inputGroup">
                                <span>Data de Fim Previsto :</span>
                                <Calendar
                                    v-model="endDate"
                                    dateFormat="dd/mm/yy"
                                ></Calendar>
                            </div>
                        </div>                             
                    </div>
                    <div class="rigthSide">
                        <div class="groupOfInputs">
                            <div class="inputGroup">
                                <span>Potenciais Consquências :</span>
                                <Textarea 
                                    v-model="potencialConsequences"
                                    rows="5" 
                                    cols="50"
                                ></Textarea>
                            </div>   
                        </div>
                        <div class="groupOfInputs">
                            <div class="inputGroup">
                                <span>Gravidade :</span>
                                <Dropdown
                                    v-model="severity"
                                    :options="severityOptions"
                                    optionLabel="name"
                                    placeholder="Selecione a Gravidade"
                                ></Dropdown>                        
                            </div>
                            <div class="inputGroup">
                                <span>Urgência :</span>
                                <Dropdown
                                    v-model="urgency"
                                    :options="urgencyOptions"
                                    optionLabel="name"
                                    placeholder="Selecione a Urgência"
                                ></Dropdown>                        
                            </div>
                            <div class="inputGroup">
                                <span>Tendência :</span>
                                <Dropdown
                                    v-model="trend"
                                    :options="trendOptions"
                                    optionLabel="name"
                                    placeholder="Selecione a Tendência"
                                ></Dropdown>                        
                            </div>
                        </div>
                        <div class="groupOfInputs">
                            <div class="inputGroup" style="align-items: center;">
                                <span>Resultado GUT :</span>
                                <strong>{{matrixGUT}}</strong>
                            </div>
                            <div class="inputGroup">
                                <span>Prioridade :</span>
                                <InputText
                                    v-model="priority"
                                    :disabled="true"
                                    placeholder="Prioridade"
                                ></InputText>                     
                            </div>
                            <div class="inputGroup">
                                <span>Status :</span>
                                <Dropdown
                                    v-model="status"
                                    :options="statusOptions"
                                    optionLabel="name"
                                    placeholder="Selecione o Status"
                                ></Dropdown>                        
                            </div>
                        </div>
                    </div>
                </div>
                <div class="organizer" v-if="priority === 'Tratar Com Plano de Ação'">
                    <strong>Plano de Ação</strong>
                    <div style="width: 100%; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                        <div class="inputGroup">
                            <span>O que? :</span>
                            <Textarea
                                v-model="what"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Por que? :</span>
                            <Textarea
                                v-model="why"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Onde ? :</span>
                            <Textarea
                                v-model="where"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Quando ? :</span>
                            <Textarea
                                v-model="when"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Quem ? :</span>
                            <Textarea
                                v-model="who"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Como ? :</span>
                            <Textarea
                                v-model="how"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Quanto vai custar ? :</span>
                            <Textarea
                                v-model="howMuch"
                                rows="5" 
                                cols="30"
                            ></Textarea>
                        </div>
                    </div>
                </div>
            </StepperPanel>
            <StepperPanel header="Qualidade" v-show="userInfos.department === 'Qualidade'">
                <div class="organizer">
                    <strong>Verificação de Eficácia</strong>
                    <div class="groupOfInputs">
                        <div class="inputGroup">
                            <span>Comentários :</span>
                            <Textarea
                                v-model="comments"
                                rows="5" 
                                cols="50"
                            ></Textarea>
                        </div>
                        <div class="inputGroup">
                            <span>Status de Eficácia :</span>
                            <Dropdown
                                v-model="efficacyStatus"
                                :options="efficacyStatusOptions"
                                optionLabel="name"
                                placeholder="Selecione o Status de Eficácia"
                            ></Dropdown>                            
                        </div>
                    </div>
                    <div class="groupOfInputs">
                        <div class="inputGroup">
                            <FileUpload
                                mode="basic" 
                                name="files"
                                :auto="true"
                                url="https://connectapi.3nf.com.br/upload"
                                @upload="afterUpload($event)"
                                @progress="uploadingLogic($event)"
                            ></FileUpload>
                            <ProgressBar
                                :value="uploadingValue"
                            ></ProgressBar>
                        </div>
                        <div class="uplodsBox">
                            <div 
                                v-for="(file, i) in filesQualidade" 
                                :key="i"
                            >
                                <div class="mediaBox">
                                    <Image :src="file.location" width="120" height="140" preview ></Image>
                                    <div style="display: flex; gap: 15px; padding: 10px; justify-items: center; align-items: center;">
                                        <i class="pi pi-times" style="font-size: 1rem; cursor: pointer;" @click="deleteFileQualidade(file.location, i)"></i>
                                        <i class="pi pi-download" style="font-size: 1rem; cursor: pointer;" @click="downloadFile(file)"></i>
                                    </div>
                                </div>            
                            </div>
                        </div>
                    </div>
                </div>
            </StepperPanel>
        </Stepper>
        <div style="display: flex; justify-content: end; gap: 10px; margin: 20px;">
            <Button
                label="Salvar"
                @click="clearForm()"
                style="background-color: var(--secondary-color-gc); color: var(--primary-color-gc); font-weight: bold;"
            ></Button>
            <Button
                label="Cancelar"
                @click="$emit('update:visible', false)"
                style="background-color: var(--white-gc); color: var(--primary-color-gc); font-weight: bold;"
            ></Button>
        </div>
    </Dialog>
</template>

<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
}
.organizer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    gap: 10px;
}
.leftSide, .rigthSide{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.inputGroup{
    display: flex;
    flex-direction: column;
    gap: 10px; 
}
.uplodsBox{
    display: flex;
    flex-wrap: wrap;
    max-height: 350px;
    overflow: auto;
    gap: 10px;
    max-width: 100%;
    padding: 10px;
}

.mediaBox{
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.groupOfInputs{
    display: flex;
    margin: 10px;
    gap: 10px;
}
</style>