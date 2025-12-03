<script>
export default{
    props:{
        infoTolerancia: Array
    },
    data(){
        return{
            explosimeters: infoTolerancia
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
                ></Button>
            </template>
            <template #empty>
                <div style="display: flex; justify-content: center;">
                    <strong>Sem itens cadastrados</strong>
                </div>
            </template>
            <Column header="Gás"></Column>
            <Column header="Valor Base"></Column>
            <Column header="Valor Medido"></Column>
            <Column header="Aprovado?"></Column>
        </DataTable>        
    </div>

</template>

<style scoped>
.main{
    width: 100%;
}

</style>