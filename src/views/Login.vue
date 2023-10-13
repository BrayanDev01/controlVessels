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
                if(this.user != this.dbUser && this.password != this.dbPassword){
                this.$toast.add({ 
                  severity: 'error', 
                  summary: 'Login errado', 
                  detail: 'Tente novamente',
                  life: 3000 
                });
                this.user = ''
                this.password = ''
                this.loading = false
            }else{
                this.$toast.add({ 
                  severity: 'success', 
                  summary: 'Login correto', 
                  detail: 'Parabens',
                  life: 3000 
                });
                this.loading = false
                this.$router.push({ path: '/home' })
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
                <span class=" item p-float-label">
                    <InputText id="username" v-model="user" style="width: 100%;"/>
                    <label for="username">Usúario</label>
                </span>
                <span class="item p-float-label">
                    <InputText id="senha" v-model="password" type="password" style="width: 100%;"/>
                    <label for="senha">Senha</label>
                </span>
                <Button label="Entrar" @click="send()" :loading="loading"/>
            </div>
        </div>
        <Toast />    
    </div>
</template>

<style scoped>
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
.form{
    display: flex;
    flex-direction: column;
    width: 70%;
}
.item{
    margin-bottom: 20px;
}
</style>