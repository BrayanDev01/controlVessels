<script>
export default {
    data(){
        return{

        }
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
                            <div class="rightSide">
                                <div class="groupInput">
                                    <span>Descrição :</span>
                                    <TextArea
                                        v-model="description"
                                        rows="5" 
                                        cols="50"
                                    ></TextArea>                                    
                                </div>
                                <div class="organizerInputs">
                                    <div class="groupInput">
                                        <span>Setor :</span>
                                        <InputText
                                            v-model="setor"
                                        ></InputText>
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
                            <div class="leftSide">
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
                                            <InputText
                                                v-model="unResolucao"
                                            ></InputText>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <strong>Localização :</strong>
                                    <div class="organizerInputs">                                        
                                        <div class="groupInput">
                                            <span>Setor :</span>
                                            <InputText
                                                v-model="setorLocalizacao"
                                            ></InputText>
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
                                            <InputText
                                                v-model="un"
                                            ></InputText>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end;">
                            <Button
                                label="Proximo"
                                @click="nextCallback"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                            ></Button>
                        </div>
                    </template>
                </StepperPanel>
                <StepperPanel header="Calibração"></StepperPanel>
                <StepperPanel header="Avaliação"></StepperPanel>
            </Stepper>
        </div>
    </Dialog>
</template>

<style>
.groupInput{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.organizerInputs{
    display: flex;
    gap: 10px;
    margin: 10px 0;
}
.rightSide, .leftSide{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>