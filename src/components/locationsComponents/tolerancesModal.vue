<script>
import axios from 'axios';

export default {
    data() {
        return {
            loadData: false,    
            tolerances: [],
        };
    },
    methods: {
        getTolerances() {       
            this.loadData = true;
            
            const options = {
                url: `${import.meta.env.VITE_URL_API}classes/tolerancesList`,
                method: 'GET',
                headers: {
                    'X-Parse-REST-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }
            axios.request(options).then((response) => {
                this.tolerances = response.data.results                                    
            }).catch((error) => {
                console.error('Error fetching tolerances:', error);
            });

            this.loadData = false
        },
        fastUpdateTolerance(e){
            const options = {
                url: `${import.meta.env.VITE_URL_API}classes/tolerancesList/${e.data.objectId}`,
                method: 'PUT',
                headers: {
                    'X-Parse-REST-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    value: e.newValue
                }
            }
            // console.log(options)
            axios.request(options).then((response) => {
                this.$toast.add({severity:'success', summary:'Sucesso', detail:'Tolerância atualizada com sucesso', life: 3000});                                    
            }).catch((error) => {
                console.error('Error fetching tolerances:', error);
                this.$toast.add({severity:'error', summary:'Erro', detail:'Erro ao atualizar a tolerância', life: 3000});
            });
        },
        completeEditCell(e) {
            console.log(e)
            const { data, newValue, field } = e; // data = objeto da linha

            // validação simples para marketValue e marginPct
            const numericFields = ['marketValue', 'marginPct'];
            if (numericFields.includes(field) && (newValue === '' || newValue === null || isNaN(newValue))) {
                e.preventDefault(); // cancela o commit
                return;
            }

            // atualiza a propriedade (suporta "a.b.c" se usar campos aninhados)
            this.setByPath(data, field, numericFields.includes(field) ? Number(newValue) : newValue);

            // opcional: força re-render clonando a linha dentro do array
            const i = this.tolerances.findIndex(it => it === data);
            if (i !== -1) this.tolerances.splice(i, 1, { ...this.tolerances[i] });

            this.fastUpdateTolerance(e)
        },
        setByPath(obj, path, value) {
            const keys = path.split('.');
            const last = keys.pop();
            let cur = obj;
            for (const k of keys) {
            if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
            cur = cur[k];
            }
            cur[last] = value;
        },
    },
    computed: {
        tolerances(){
            return this.tolerancesInfos = this.tolerances
        }        
    },
    created() {
        this.getTolerances();
    }
}
</script>

<template>
    <Dialog
        modal
        header="Tolerancias"
        :draggable="false"
        :style="{ width: '50vw' }"
        :breakpoints="{
            '960px': '90vw',
        }"
    >
        <DataTable
            :value="tolerances"
            :loading="loadData"
            editMode="cell"
            @cell-edit-complete="completeEditCell"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }"
        >
            <template #empty>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <strong>Nenhuma tolerancia cadastrada</strong>
                </div>

                <Toast></Toast>
            </template>
            <Column header="Tipo Equip." field="type"></Column>
            <Column header="Valor" field="value">
                <template #editor="{ data }">
                    <InputNumber v-model="data.value" />
                </template>
            </Column>
        </DataTable>

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <Button label="Fechar" @click="$emit('update:visible', false)" />
        </div>
    </Dialog>
</template>