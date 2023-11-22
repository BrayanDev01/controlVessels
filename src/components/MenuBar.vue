<script>
import { mapState } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'

export default{
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    }
}

</script>

<template>
    <div class="topMenu">
        <img src="../assets/Gp_Cidade_DarkBG1.png" alt="Grupo Cidade">
        <div class="options">
            <router-link to="/home" class="buttonLink" v-if="userInformations.accessLevel < 1">
                <div>Home</div>
            </router-link>
            <router-link to="/form" class="buttonLink" v-if="userInformations.accessLevel < 1">
                <div>Formulário</div>
            </router-link>
            <router-link to="/" class="buttonLink">
                <div>Sair</div>
            </router-link>
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