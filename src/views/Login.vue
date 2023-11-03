<script>

export default {
    data(){
        return{
            user:"",
            password:"",
            dbUser:"teste",
            dbPassword:"teste",
            loading: false
        }
    },
    methods:{
        
        send(){
            this.loading = true
            setTimeout(()=>{
                if(this.user === this.dbUser && this.password === this.dbPassword){
                    this.$toast.add({ 
                    severity: 'success', 
                    summary: 'Login correto', 
                    detail: 'Parabens',
                    life: 3000 
                    });
                    this.loading = false
                    this.$router.push({ path: '/home' })
                }else{
                    this.$toast.add({ 
                    severity: 'error', 
                    summary: 'Login errado', 
                    detail: 'Tente novamente',
                    life: 3000 
                    });
                    this.user = ''
                    this.password = ''
                    this.loading = false
                }
                }, 2000)
            
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="card">
            <div class="form">
                <img src="../assets/Gp_Cidade_Base1.png" alt="grupo cidade" class="logoImg">
                <span class=" item p-float-label">
                    <InputText id="username" v-model="user" style="width: 100%;"/>
                    <label for="username">Usúario</label>
                </span>
                <span class="p-float-label teste">
                    <Password v-model="password" inputId="password" toggleMask style="width: 100%;" :pt="{input:{ style: 'width: 100%'}}"></Password>
                    <label for="password">Password</label>
                </span>
                <Button label="Entrar" @click="send()" :loading="loading"></Button>
            </div>
        </div>
        <Toast />    
    </div>
</template>

<style scoped>
.teste{
    margin-bottom: 10px; 
}
.main{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to left bottom, #1d70b7, #2562a4, #295591, #29487f, #273c6d, #3d3b72, #533874, #683372, #a02f73, #d13063, #f34943, #ff7400);
}
.card{
    width: 500px;
    height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
}
.logoImg{
    margin: 0 0 10px 0;
}
.form{
    display: flex;
    flex-direction: column;
    width: 70%;
}
.item{
    margin-bottom: 20px;
}
</style>