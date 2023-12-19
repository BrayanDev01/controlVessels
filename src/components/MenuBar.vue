<script>
import { mapState, mapActions } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'
import axios from 'axios';

export default{
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    },
    methods:{
        ...mapActions(userInfoStore, ['saindo']),

        transition(){
            this.$router.push({ path: '/'});
        },

        async logOut(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}logout`,
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Session-Token': `${this.userInformations.sessionToken}`
                }
            };

            const data = await axios.request(options).then((response) => {
                
                console.log(response);
                this.saindo()
                this.transition()
                return response.data

            }).catch((error) => {
                
                this.transition()
                return error.response
            });
            
        }
    }

}

</script>

<template>
    <div class="topMenu">
        <img src="../assets/Gp_Cidade_DarkBG1.png" alt="Grupo Cidade">
        <div class="options">
            <router-link to="/home" class="buttonLink" v-if="userInformations?.accessLevel < 1">
                <div>Home</div>
            </router-link>
            <router-link to="/form" class="buttonLink" v-if="userInformations?.accessLevel < 1">
                <div>Formulário</div>
            </router-link>
            <div class="buttonLink" @click="logOut()">
                <div>Sair</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.topMenu{
    width: 100vw;
    height: 100px;
    background-color: var(--primary-color-gc);
    display: flex;
    align-items: center;
    color: var(--white-gc);
    justify-content: space-between
}
.buttonLink{
    color: var(--white-gc);
    text-decoration: none;
}
.buttonLink:hover{
    cursor: pointer;
    text-decoration: underline;
}
.buttonLink.router-link-active,
.buttonLink.router-link-exact-active {
   color: var(--secondary-color-gc);
   cursor: pointer;
}
.options{
    display: flex;
    align-items: center;
    margin: 0 50px 0 0;
    gap: 20px;
}
img{
    height: 5rem;
    margin: 0 0 0 50px;
}

@media (max-width: 500px) {

    img{
        height: 2.5rem;
        margin: 0 0 0 0px;
    }
    .options{
        
        margin: 0 15px 0 0;
        
    }
}
</style>