<script>
import MenuBar from '../components/MenuBar.vue';
import addChanges from '../components/controlChangesComponents/addChanges.vue';

export default{
    components:{
        MenuBar,
        addChanges
    },
    data(){
        return{
            addChangesVisible: false
        }
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
    </div>
    <addChanges
        :visible="addChangesVisible"
        @update:visible="addChangesVisible = $event"
    ></addChanges>
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