<script>
import axios from 'axios'
import { MockLocations } from '../../mocks/locationsMocks'

export default {
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("loggedUser")),
            equipamentName: null,
            description: null,
            setor: null,
            marca: null,
            modelo: null,
            nSerieLacre: null,
            etiquetaIdentificacao: null,
            faixaMedicao: null,
            classe:null,
            valorResolucao: null,
            unResolucao: null,
            setorLocalizacao: null,
            responsavel: null,
            valorTolerancia: null,
            unTolerancia: null,
            dataCalibracao: null,
            validadeCalibracao: null,
            daysToInvalid: null,
            monthsToInvalid: null,
            nameResponsavel: null,
            emailResponsavel: null,
            responsaveis:[],
            

            labEng: null,
            numberCertificado: null,
            status: null,
            document:null,
            acoesTomadas: null,
            quaisAcoes: null,
            observacao: null,

            additionalDocuments:[],
            entreguePara: null,


            statusOptions:[
                {name: 'Conforme'},
                {name: 'Não Conforme'}
            ],
            unMedOptions:[
                {name:  'Âmperes'},
                {name: 'Volts'},
                {name: 'Watts'},
                {name: 'kgf/cm²'},
                {name: 'mol/mol'},
                {name: 'μmol/mol'},
                {name: 'g/cm³'},
                {name: 'g/ml'},
                {name: 'Cº'},
                {name: 'M'},                
            ],
            equipaments:[
                {name: 'Densímetro'},
                {name: 'Termômetro Analógico'},
                {name: 'Termômetro Digital'},
                {name: 'Trena'},
                {name: 'Explosímetro'},
                {name: 'Manômetro Analógico'},
                {name: 'Manômetro Digital'},
                {name: 'Alicate Amperímetro'}        
            ],
            setores:[
                {name: 'Navegação'},
                {name: 'Inspeção'},
                {name: 'Manutenção'},
                {name: 'SESMT'}
            ],
            locationsOptions:[],
            loading: false
        }
    },
    methods:{
        async createEquipament(){
            this.loading = true

            const options ={
                url: `${import.meta.env.VITE_URL_API}classes/instrumentMed`,
                method: 'POST',
                headers: {
                    'X-Parse-REST-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    equipamentName: this.equipamentName.name,
                    description: this.description,
                    infoMed: {
                        setor: {name: this.setor.name},
                        marca: this.marca,
                        modelo: this.modelo,
                        nSerieLacre: this.nSerieLacre,
                        etiquetaIdentificacao: this.etiquetaIdentificacao,
                        faixaMedicao: this.faixaMedicao,
                        resolucao: {
                            valor: this.valorResolucao,
                            un: this.unResolucao?.name
                        },
                        classe: this.classe,
                        localizacao: {
                            setor: {name: this.setor.name},
                            responsavel: this.responsavel
                        },
                        tolerancia: {
                            valor: this.valorTolerancia,
                            un: this.unTolerancia?.name
                        }         
                    },
                    calibrationInterval: {
                        date: this.dataCalibracao,
                        validade: this.validadeCalibracao,
                        diasVencer: this.daysToInvalid,
                        periodoMeses: this.monthsToInvalid,
                        responsaveis: this.responsaveis
                    },
                    calibrationResults: {
                        laboratorioEngenheiro: this.labEng,
                        nCertificadoArt: this.numberCertificado,
                    },
                    avaliationCalibration: {
                        status: this.status?.name,
                        document: this.document,
                        acoesTomadas: this.acoesTomadas,
                        quaisAcoes: this.quaisAcoes,
                    },
                    obs: this.observacao,
                    additionalDocuments: this.additionalDocuments,
                    entreguePara: this.entreguePara
                }
            }

            await axios.request(options).then((response) => {
                console.log(response);
                this.$emit('update:visible', false)
                this.$emit('reGet')
            }).catch((error) => {
                console.log(error);
            })
        },
        clearForm(){
            this.equipamentName = null
            this.description = null
            this.setor = null
            this.marca = null
            this.modelo = null
            this.nSerieLacre = null
            this.etiquetaIdentificacao = null
            this.faixaMedicao = null
            this.classe = null
            this.valorResolucao = null
            this.unResolucao = null
            this.setorLocalizacao = null
            this.responsavel = null
            this.valorTolerancia = null
            this.unTolerancia = null
            this.dataCalibracao = null
            this.validadeCalibracao = null
            this.daysToInvalid = null
            this.monthsToInvalid = null
            this.responsaveis = []
            this.nameResponsavel = null
            this.emailResponsavel = null
            this.labEng = null
            this.numberCertificado = null
            this.status = null
            this.document = null
            this.acoesTomadas = null
            this.quaisAcoes = null
            this.verde = null
            this.observacao = null
            this.additionalDocuments = []
            this.entreguePara = null
            this.loading = false
        },
        afterSend(e){
            const response = JSON.parse(e.xhr.responseText);
            this.document = response.files[0]
        },
        sendSomeDocuments(e){
            const response = JSON.parse(e.xhr.responseText);
            this.additionalDocuments = [...this.additionalDocuments, ...response.files];
        },
        cleanDownload(){
            this.document = null
        },
        cleanDocument(data){
            this.additionalDocuments = this.additionalDocuments.filter(item => item.location !== data)
        },
        downloadDocument(location){
            window.open(location, '_blank');
        },
        calcularDiferencas() {
            if(!this.dataCalibracao || !this.validadeCalibracao) return

            const hoje = new Date();
            const dataInicial = new Date(this.dataCalibracao);
            const dataFinal = new Date(this.validadeCalibracao);

            // Calcular diferença em dias da data inicial até hoje
            const diferencaEmMilissegundos = dataFinal - hoje;
            const diasDeDiferenca = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            // Calcular diferença em meses da data final até hoje
            let anos = dataFinal.getFullYear() - hoje.getFullYear();
            let meses = dataFinal.getMonth() - hoje.getMonth();
            let diferencaEmMeses = anos * 12 + meses;

            // Ajuste se o dia atual for maior que o dia da data final
            if (hoje.getDate() > dataFinal.getDate()) {
                diferencaEmMeses -= 1;
            }

            return this.daysToInvalid = diasDeDiferenca, this.monthsToInvalid = diferencaEmMeses

        },
        toggle(event){
            this.$refs.op.toggle(event);
        },
        close(){
            this.nameResponsavel = null;
            this.emailResponsavel = null;
            this.$refs.op.hide();
        },
        addResponsavel(){
            const responsavel = {name: this.nameResponsavel, email: this.emailResponsavel}

            this.responsaveis.push(responsavel)
            this.nameResponsavel = null
            this.emailResponsavel = null

            this.close()
        },
        checkIfAllFieldsAreFilled() {
            const fields = [
                this.equipamentName,
                this.setor,
                this.marca,
                this.modelo,
                this.nSerieLacre,
                this.etiquetaIdentificacao,
                this.faixaMedicao,
                this.valorResolucao,
                this.unResolucao,
                this.classe,
                this.responsavel,
                this.valorTolerancia,
                this.unTolerancia,
                this.dataCalibracao,
                this.validadeCalibracao,
                this.labEng,
                this.numberCertificado,
                this.status,
                this.acoesTomadas,
                this.quaisAcoes,
                this.observacao
            ];

            const allFieldsAreFilled = fields.every(field => field !== null && field !== '');

            return allFieldsAreFilled;
        }
    },
    watch: {
      equipamentName() {
        this.checkIfAllFieldsAreFilled();
      },
      description() {
        this.checkIfAllFieldsAreFilled();
      },
      setor() {
        this.checkIfAllFieldsAreFilled();
      },
      marca() {
        this.checkIfAllFieldsAreFilled();
      },
      modelo() {
        this.checkIfAllFieldsAreFilled();
      },
      nSerieLacre() {
        this.checkIfAllFieldsAreFilled();
      },
      etiquetaIdentificacao() {
        this.checkIfAllFieldsAreFilled();
      },
      faixaMedicao() {
        this.checkIfAllFieldsAreFilled();
      },
      valorResolucao() {
        this.checkIfAllFieldsAreFilled();
      },
      unResolucao() {
        this.checkIfAllFieldsAreFilled();
      },
      classe() {
        this.checkIfAllFieldsAreFilled();
      },
      responsavel() {
        this.checkIfAllFieldsAreFilled();
      },
      valorTolerancia() {
        this.checkIfAllFieldsAreFilled();
      },
      unTolerancia() {
        this.checkIfAllFieldsAreFilled();
      },
      dataCalibracao() {
        this.checkIfAllFieldsAreFilled();
      },
      validadeCalibracao() {
        this.checkIfAllFieldsAreFilled();
      },
      labEng() {
        this.checkIfAllFieldsAreFilled();
      },
      numberCertificado() {
        this.checkIfAllFieldsAreFilled();
      },
      status() {
        this.checkIfAllFieldsAreFilled();
      },      
      acoesTomadas() {
        this.checkIfAllFieldsAreFilled();
      },
      quaisAcoes() {
        this.checkIfAllFieldsAreFilled();
      },
      observacao() {
        this.checkIfAllFieldsAreFilled();
      }
    },
    created(){
        MockLocations.getLocations().then((data) =>{ this.locationsOptions = data })
    }
}
</script>
<template>
    <Dialog
        modal
        header="Cadastrar Equipamento"
        :draggable="false"
        :style="{width: '70vw'}"
        @hide="clearForm()"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <div>
            <Stepper>
                <StepperPanel header="Informações">
                    <template #content="{nextCallback}">
                        <div class="flex gap-5 w-full">
                            <div class="leftSide">
                                <div class="organizerInputs">
                                    <!-- <div class="groupInput">
                                        <span>Descrição :</span>
                                        <Textarea
                                            v-model="description"
                                            rows="5" 
                                            cols="30"
                                        ></Textarea>                                    
                                    </div> -->
                                    <div class="groupInput">
                                        <span>Equipamento :</span>
                                        <Dropdown
                                            v-model="equipamentName"
                                            :options="equipaments"
                                            optionLabel="name"
                                            placeholder="Selecione o equipamento"
                                        ></Dropdown>                                   
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Setor :</span>
                                        <Dropdown
                                            v-model="setor"
                                            :options="setores"
                                            optionLabel="name"
                                            placeholder="Selecione o setor" 
                                        ></Dropdown>
                                    </div>
                                    <div class="groupInput">
                                        <span>Marca :</span>
                                        <InputText
                                            v-model="marca"
                                        ></InputText>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Modelo :</span>
                                        <InputText
                                            v-model="modelo"
                                        ></InputText>
                                    </div>
                                    <div class="groupInput">
                                        <span>Nº Serie / Lacre :</span>
                                        <InputText
                                            v-model="nSerieLacre"
                                        ></InputText>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Etiqueta Id :</span>
                                        <InputText
                                            v-model="etiquetaIdentificacao"
                                        ></InputText>
                                    </div>
                                    <div class="groupInput">
                                        <span>Faixa de Medição :</span>
                                        <InputText
                                            v-model="faixaMedicao"
                                        ></InputText>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Classe :</span>
                                        <InputText
                                            v-model="classe"
                                        ></InputText>
                                    </div>
                                </div>
                            </div>
                            <div class="rightSide">
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <strong>Resolução :</strong>
                                    <div class="organizerInputs">                                        
                                        <div class="groupInput">
                                            <span>Valor :</span>
                                            <InputText
                                                v-model="valorResolucao"
                                            ></InputText>
                                        </div>
                                        <div class="groupInput">
                                            <span>Un. :</span>
                                            <Dropdown
                                                v-model="unResolucao"
                                                :options="unMedOptions"
                                                optionLabel="name"
                                                placeholder="Selecione a Unidade"
                                            ></Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <strong>Localização :</strong>
                                    <div class="organizerInputs">                                        
                                        <div class="groupInput">
                                            <span>Localidade :</span>
                                            <Dropdown
                                                filter
                                                v-model="setorLocalizacao"
                                                :options="locationsOptions"
                                                optionLabel="name"
                                                placeholder="Selecione o setor"
                                            ></Dropdown>
                                        </div>
                                        <div class="groupInput">
                                            <span>Responsável :</span>
                                            <InputText
                                                v-model="responsavel"
                                            ></InputText>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <strong>Tolerância :</strong>
                                    <div class="organizerInputs">                                        
                                        <div class="groupInput">
                                            <span>Valor (+/-) :</span>
                                            <InputText
                                                v-model="valorTolerancia"
                                            ></InputText>
                                        </div>
                                        <div class="groupInput">
                                            <span>Un. :</span>
                                            <Dropdown
                                                v-model="unTolerancia"
                                                :options="unMedOptions"
                                                optionLabel="name"
                                                placeholder="Selecione a Unidade"
                                            ></Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; margin: 10px;">
                            <Button
                                label="Proximo"
                                @click="nextCallback"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                            ></Button>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Calibração">
                    <template #content="{prevCallback, nextCallback}">
                        <div class="flex">
                            <div class="leftSide">
                                <strong>Intervalo de Calibração</strong>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Data da Calibração :</span>
                                        <Calendar
                                            v-model="dataCalibracao"
                                            dateFormat="dd/mm/yy"
                                            @update:modelValue="calcularDiferencas()"
                                        ></Calendar>
                                    </div>
                                    <div class="groupInput">
                                        <span>Validade :</span>
                                        <Calendar
                                            v-model="validadeCalibracao"
                                            dateFormat="dd/mm/yy"
                                            @update:modelValue="calcularDiferencas()"
                                        ></Calendar>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Dias a vencer :</span>
                                        <InputNumber
                                            v-model="daysToInvalid"
                                            disabled
                                        ></InputNumber>
                                    </div>
                                    <div class="groupInput">
                                        <span>Periodo (meses) :</span>
                                        <InputNumber
                                            v-model="monthsToInvalid"
                                            disabled
                                        ></InputNumber>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <strong>Cadastrar Responsaveis :</strong>
                                    <div>
                                        <DataTable
                                            :value="responsaveis"
                                            tableStyle="max-width: 35rem; min-width: 30rem;"
                                            scrollable 
                                            scrollHeight="150px"
                                        >
                                            <template #header>
                                                <div style="display: flex; justify-content: center;">
                                                    <Button
                                                        icon="pi pi-plus"
                                                        label="Adicionar Responsavel" 
                                                        @click="toggle"
                                                    ></Button>
                                                </div>
                                                <OverlayPanel ref="op" appendTo="body">
                                                    <div class="flex gap-5">
                                                        <div style="display: flex; flex-direction: column;">
                                                            <span>Nome do Responsavel :</span>
                                                            <InputText
                                                                v-model="nameResponsavel"
                                                            ></InputText>
                                                        </div>
                                                        <div style="display: flex; flex-direction: column;">
                                                            <span>Email do Responsavel :</span>
                                                            <InputText
                                                                v-model="emailResponsavel"
                                                            ></InputText>
                                                        </div>
                                                    </div>
                                                    <div style="display: flex; gap: 10px; justify-content: center; margin:10px">
                                                        <Button @click="addResponsavel">Adicionar</Button>
                                                        <Button severity="danger" @click="close">Cancelar</Button>
                                                    </div>
                                                </OverlayPanel>
                                            </template>
                                            <template #empty>
                                                <div style="display: flex; justify-content: center;">
                                                    <span>Nenhum Responsavel Cadastrado</span>
                                                </div>
                                            </template>
                                            <Column field="name" header="Nome"></Column>
                                            <Column field="email" header="Email"></Column>
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                            <div class="rightSide">
                                <strong>Resultados da Calibração</strong>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Laboratório / Engenheiro :</span>
                                        <InputText
                                            v-model="labEng"
                                        ></InputText>
                                    </div>
                                    <div class="groupInput">
                                        <span>Nº Certificado / ART :</span>
                                        <InputText
                                            v-model="numberCertificado"
                                        ></InputText>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="flex justify-content-between m-5">
                            <Button
                                label="Anterior"
                                @click="prevCallback"
                                icon="pi pi-arrow-left"
                                iconPos="left"
                            ></Button>
                            <Button
                                label="Proximo"
                                @click="nextCallback"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                            ></Button>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Avaliação">
                    <template #content="{prevCallback}">
                        <div class="flex">
                            <div class="leftSide">
                                <strong>Avaliação da Calibração</strong>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Situação Atual :</span>
                                        <Dropdown
                                            v-model="status"
                                            :options="statusOptions"
                                            optionLabel="name"
                                            placeholder="Selecione a situação"
                                        ></Dropdown>
                                    </div>
                                    <div class="groupInput">
                                        <span>Documento :</span>
                                        <FileUpload
                                            v-if="!document"
                                            mode="basic"
                                            name="files"
                                            :auto="true"
                                            chooseLabel="Documento da Calibração"
                                            @upload="afterSend($event)"
                                            url="https://connectapi.3nf.com.br/upload"
                                        ></FileUpload>
                                        <div v-else style="display: flex; flex-direction: column; align-items: center;">
                                            <i class="pi pi-file" style="font-size: 2.5rem"></i>
                                            <div class="flex gap-2">
                                                <Button icon="pi pi-download" rounded @click="downloadDocument(this.document.location)"/>
                                                <Button icon="pi pi-times" rounded @click="cleanDownload(this.document.location)"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Ações Tomadas :</span>
                                        <InputText
                                            v-model="acoesTomadas"
                                        ></InputText>
                                    </div>
                                    <div class="groupInput">
                                        <span>Quais ações ?</span>
                                        <Textarea
                                            v-model="quaisAcoes"
                                            rows="5"
                                            cols="30"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput" style="display: flex; flex-direction: column; align-items: center;">
                                        <span>Documentos auxiliares :</span>
                                        <FileUpload
                                            mode="basic"
                                            name="files"
                                            :auto="true"
                                            chooseLabel="Documentos Auxiliares"
                                            @upload="sendSomeDocuments($event)"
                                            url="https://connectapi.3nf.com.br/upload"
                                        ></FileUpload>
                                        <div class="uploadBox">
                                            <div v-for="(item, index) in additionalDocuments" :key="index" style="display: flex; flex-direction: column; align-items: center;">
                                                <i class="pi pi-file" style="font-size: 2.5rem"></i>
                                                <div class="flex gap-2">
                                                    <Button icon="pi pi-download" rounded @click="downloadDocument(item.location)"/>
                                                    <Button icon="pi pi-times" rounded @click="cleanDocument(item.location)"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                            <div class="rightSide">
                                <div class="groupInput">
                                    <strong>Observação</strong>
                                    <Textarea
                                        v-model="observacao"
                                        rows="8"
                                        cols="50"
                                        class="mt-3"
                                    ></Textarea>
                                </div>
                                <div class="groupInput">
                                    <span>Entregue para:</span>
                                    <InputText
                                        v-model="entreguePara"
                                    ></InputText>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-content-between m-5">
                            <Button
                                label="Anterior"
                                @click="prevCallback"
                                icon="pi pi-arrow-left"
                                iconPos="left"
                            ></Button>
                            <Button
                                label="Cadastrar Equipamento"
                                @click="createEquipament()"
                                icon="pi pi-check"
                                iconPos="right"
                                class="p-button-success"
                                :disabled="!checkIfAllFieldsAreFilled()"
                                :loading="loading"
                            ></Button>
                        </div>
                    </template>
                </StepperPanel>
            </Stepper>
        </div>
    </Dialog>
</template>

<style>
.groupInput{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}
.organizerInputs{
    display: flex;
    gap: 20px;
    margin: 10px 0
}
.rightSide, .leftSide{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.uploadBox{
    display: flex; 
    gap: 20px; 
    width: 100%; 
    flex-wrap: wrap; 
    max-height: 150px; 
    overflow-y: scroll;
}

</style>