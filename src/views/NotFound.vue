<script>
export default{
    data(){
        return{
            path:''
        }
    },
    methods:{
        goToHome(){
            this.$router.push('/')
        }
    },
    created(){
        document.title="Not Found | Controle de Embarcação"
    }
}
</script>

<template>
    <div class="main">
        <img src="../assets/notfound.png" alt="not found">
        <div class="title">Esta pagina "{{ this.$route.path }}" não existe no mapeamento do site</div>

        <Button class="uniqueBtn" @click="goToHome()">Voltar a tela inicial</Button>

    </div>
</template>
<style scoped>

.main{
    width: 100vw;
    height: 100vh;
    background-color: var(--primary-color-gc);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
img{
    width: 20%;
}
.title{
    color: white;
    font-size: 40px;
    font-weight: bold;
}
.uniqueBtn{
    background-color: var(--secondary-color-gc);
    font-weight: bold;
    margin: 40px;
}
</style>