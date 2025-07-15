<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import addChanges from '../components/controlChangesComponents/addChanges.vue';
import editChanges from '../components/controlChangesComponents/editChanges.vue';
export default{
    components:{
        MenuBar,
        addChanges,
        editChanges
    },
    data(){
        return{
            addChangesVisible: false,
            editChangesVisible: false,
            id: null,
            changes: []
        }
    },
    methods:{
        async getChanges(){
            const options = {
                url: `${import.meta.env.VITE_URL_API}classes/controlChanges`,
                method: 'GET',
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }

            await axios.request(options).then((response) => {
                this.changes = response.data.results
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        },
        formatData(data){
            return new Date(data).toLocaleDateString()
        },
        editDoc(e){
            console.log(e.data.objectId)
            this.editChangesVisible = true;
            this.id = e.data.objectId
        }
    },
    created(){
        this.getChanges()
    }

}

</script>
<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin: 50px;">
            <Button
                style="background-color: var(--secondary-color-gc); color: var(--primary-color-gc); font-weight: bold;"
                label="Cadastrar Mudança"
                @click="addChangesVisible = true"
            ></Button>
        </div>
        <div style="border: 1px solid white; width: 90%;">
            <DataTable
                :value="changes"
                :style="{width: '100%'}"
                scrollable
                scrollHeight="600px"
                @row-click="editDoc($event)"
            >
                <template #empty>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <strong>Nenhuma Mudança Cadastrada</strong>
                    </div>
                </template>
                <Column field="numericId" header="Código"></Column>
                <Column field="origin" header="Origem"></Column>
                <Column field="responsible" header="Responsável"></Column>
                <Column field="startDate" header="Inicio">
                    <template #body="{data}">                       
                        {{ formatData(data.startDate) }}
                    </template>
                </Column>
                <Column field="endDate" header="Fim">
                    <template #body="{data}">
                        {{ formatData(data.endDate) }}
                    </template>
                </Column>
                <Column field="severity.name" header="Gravidade"></Column>
                <Column field="urgency.name" header="Urgência"></Column>
                <Column field="trend.name" header="Tendência"></Column>
                <Column field="priority" header="Prioridade"></Column>
                <Column field="typeOfChange.name" header="Tipo"></Column>
                <Column field="status.name" header="Status"></Column>
            </DataTable>
        </div>
    </div>
    <addChanges
        :visible="addChangesVisible"
        @update:visible="addChangesVisible = $event"
    ></addChanges>
    <editChanges
        :visible="editChangesVisible"
        @update:visible="editChangesVisible = $event"
        :infoId="id"
        @close="getChanges()"
    ></editChanges>
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
</style>