<script>
import axios, { AxiosError } from 'axios';
import { mapState, mapActions } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'

export default {
    data(){
        return{
            user:"",
            password:"",
            email:"",
            visible: false,
            loading: false,
            change: false
        }
    },
    methods:{
        ...mapActions(userInfoStore, ['saveInfo']),
        
        alert(x){
            this.$toast.add({severity:'error', summary:'Algo deu errado', detail:`${x}`})
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
                // console.log(response);
                this.$router.push({ path: '/home'});
                
                return response.data

            }).catch((error) => {
                console.log(error.response.data.error)
                this.alert(error.response)
                return error.response
            });

            // console.log(data)
            this.loading = false
        },
        async rememberPass(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}requestPasswordReset`,
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                },
                data:{
                    email: this.email
                }
            }

            await axios.request(options).then((response) =>{
                this.$toast.add({severity:'success', summary:'Email enviado', detail:'Verifique seu email', life: 3000})
                this.visible = false
                // console.log(response)
            }).catch((error) =>{
                this.$toast.add({severity:'error', summary:'Algo deu errado', detail:'Recarregue e tente novamente', life: 3000})
                console.log(error)
            })
        },
        verification(){
            if(this.email === ''){
                this.change = true
                this.$toast.add({severity:'error', summary:'Campo vazio', detail:'Preencha com o seu email', life: 3000})
            }else{
                this.rememberPass()
            }
        },
        modalOpen(){
            this.visible = true
        },
        modalClose(){
            this.visible = false
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
                    <InputText id="username" v-model="user" :pt="{root:{ style: 'width: 100%'}}"/>
                    <label for="username">Usúario</label>
                </span>
                <!-- <span class="p-float-label teste">
                    <Password v-model="password" inputId="password" toggleMask style="width: 100%;" :pt="{input:{ style: 'width: 100%'}}" :feedback="false" @keyup.enter="login()"></Password>
                    <label for="password">Password</label>
                </span> -->
                <FloatLabel class="teste">
                    <Password v-model="password" inputId="password" toggleMask style="width: 100%;" :pt="{input: { root: { style: 'width: 100%' } }}" :feedback="false" @keyup.enter="login()" class="inpuTest"/>
                    <label for="password">Senha</label>
                </FloatLabel>

                <Button label="Entrar" @click="login()" :loading="loading"></Button>
                <a class="remember" @click="modalOpen()">Esqueci minha senha</a> 
            </div>
        </div>
        <Toast />
        <Dialog
            :visible="visible"
            modal
            :pt="{
                mask: {
                    style: 'backdrop-filter: blur(2px);'
                },
                root:{
                    style:'max-width: 100%'
                }
            }"
        >
            <template #container="{ closeCallback }">
                <div class="bodyModal">
                    <h1>Esqueceu sua senha?</h1>
                    <p style="margin:10px">Digite o email cadastrado abaixo e aguarde o link para alteração da senha</p>
                    <p>Caso o seu email não chegue tente verificar se seu email foi escrito corretamente</p>
                    <span class=" item p-float-label modal">
                        <InputText id="email" v-model="email" :pt="{root:{ style: 'width: 100%'}}" :class="change ? 'p-invalid' : ''"/>
                        <label for="email">Email</label>
                    </span>
                    <div class="footer">
                        <Button label="Enviar" @click="verification()"></Button>
                        <Button label="Cancelar" @click="modalClose"></Button>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
.inpuTest {
    width: 100%;
}
.teste{
    margin-bottom: 10px; 
}
.main{
    width: 100dvw;
    min-height: 100dvh;
    height: 100%;
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
    margin: 0 0 30px 0;
    width: 100%;
    height: 100%;
}
.form{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 70%;
}
.item{
    width: 100%;
    margin-bottom: 20px;
}
.modal{
    width: 60%;
}
.remember{
    margin: 20px;
    text-decoration: underline;
    color: blue;
}
.remember:hover{
    cursor: pointer;
}
.bodyModal{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    padding: 20px;
    gap: 20px;
    background-color: white;
}
h1{
    color: var(--primary-color-gc);
}
p{
    text-align: center;
}
.footer{
    display: flex;
    gap: 10px;
}

@media(max-width:500px){
    .card{
        width: 90%;
        height: 650px;
    }
    .form{
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 90%;
        gap: 10px;
    }
}
</style>