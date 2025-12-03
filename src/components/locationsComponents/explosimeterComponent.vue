<script>
export default{
    props:{
        infoTolerancia: Array
    },
    data(){
        return{
            explosimeters: this.infoTolerancia,

            gas: null,
            baseValue: null,
            unMedida: null,
            result: null,

            gasesOptions:[
                {
                    name:  'Oxigênio',
                    pre: 17.9,
                    pos: 18             
                },
                {
                    name: 'LEL-CH4',
                    pre: 50,
                    pos: 50 
                },
                {
                    name: 'Monoxido de Carbono',
                    pre: 98,
                    pos: 100 
                },
                {
                    name: 'Sulfeto de Hidrogênio',
                    pre: 25.4,
                    pos: 25.9
                }
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
                {name: 'ml'},
                {name: 'Cº'},
                {name: 'M'},                
            ],
        }
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        addTolerancia(){
            const item ={
                gas: this.gas,
                result: this.result,
                unMedida: this.unMedida                
            }
            this.$emit('attTolerancia', item)
            this.closeOP()
        },
        clearComp(){
            this.gas = null,
            this.unMedida = null,
            this.result = null
        },
        closeOP(){
            this.$refs.op.hide()
        }
    }
}
</script>

<template>
    <div class="main">
        <DataTable
            :value="explosimeters"
        >
            <template #header>
                <Button
                    label="Adicionar Tolerancia"
                    @click="toggle"
                ></Button>
                <OverlayPanel ref="op" @hide="clearComp()">
                    <div class="w-full flex gap-2 mb-2">
                        <div class="inputData">
                            <span>Gás :</span>
                            <Dropdown
                                v-model="gas"
                                :options="gasesOptions"
                                optionLabel="name"
                                placeholder="Selecione o gás"
                            ></Dropdown>
                        </div>
                        <div class="inputData">
                            <span>Valor Base :</span>
                            <div style="display: flex; justify-content: center; align-items: center; border:1px solid #e5e7eb ; border-radius: 5px; height: 100%;">
                                <span>{{gas?.pre}} - {{gas?.pos}}</span>
                            </div>
                            <!-- <InputText
                                v-model="baseValue"
                                :disabled="true" 
                            ></InputText> -->
                        </div>
                        <div class="inputData">
                            <span>Resultado :</span>
                            <InputText
                                v-model="result"
                                placeholder="Resultado"
                            ></InputText>
                        </div>
                        <div class="inputData">
                            <span>Un. Medida :</span>
                            <Dropdown
                                v-model="unMedida"
                                :options="unMedOptions"
                                optionLabel="name"
                                placeholder="Selecione a medida"
                            ></Dropdown>
                        </div>
                    </div>
                    <div class="adjustButton">
                        <Button
                            label="Adicionar"
                            @click="addTolerancia()"
                        ></Button>
                        <Button
                            label="Cancelar"
                            @click="closeOP"
                            severity="secondary"
                        ></Button>
                    </div>
                </OverlayPanel>
            </template>
            <template #empty>
                <div style="display: flex; justify-content: center;">
                    <strong>Sem itens cadastrados</strong>
                </div>
            </template>
            <Column header="Gás" field="gas.name"></Column>
            <Column header="Valor Base">
                <template #body="{data}">
                    <span>{{data.gas.pre}} - {{data.gas.pos}}</span>  
                </template>
            </Column>
            <Column header="Valor Medido">
                <template #body="{data}">
                    <span>{{data.result}} {{data.unMedida.name}}</span>  
                </template>
            </Column>
            <Column header="Aprovado?" field="aproved"></Column>
        </DataTable>        
    </div>

</template>

<style scoped>
.main{
    width: 100%;
}
.inputData{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.adjustButton{
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 10px;
}
</style>