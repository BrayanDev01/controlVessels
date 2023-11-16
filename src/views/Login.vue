<script>
import axios, { AxiosError } from 'axios';
import { mapState, mapActions } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'

export default {
    data(){
        return{
            user:"",
            password:"",
            loading: false
        }
    },
    methods:{
        ...mapActions(userInfoStore, ['saveInfo']),
        
        alert(x){
            this.$toast.add({severity:'error', summary:'Algo deu errado', detail:`${x}`})
            console.log(x)
        },

        async login(){
            this.loading = true

            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}login`,
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Revocable-Session': '1'
                },
                data:{
                    username: this.user,
                    password: this.password
                }
            };

            const data = await axios.request(options).then((response) => {
                this.saveInfo(response.data);
                console.log(response);
                this.$router.push({ path: '/home'});
                
                return response.data

            }).catch((error) => {
                
                this.alert(error.response.data.error)
                return error.response
            });

            console.log(data)
            this.loading = false
        }

    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
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
                <Button label="Entrar" @click="login()" :loading="loading"></Button>
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