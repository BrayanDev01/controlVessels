<script>
import { mapState, mapActions } from 'pinia';
import {userInfoStore} from '../store/UserInfos.js'
import axios from 'axios';

export default{
    data(){
        return {
            userInfo: JSON.parse(localStorage.getItem("loggedUser")),
            position: 'center',
            visible: false,
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/home');
                        // this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                    }
                },
                // {
                //     label: 'Navegrãos',
                //     icon: 'pi pi-objects-column',
                //     command: () => {
                //         this.$router.push('/form');
                //         // this.$toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                //     }
                // },
                {
                    label: 'Intrumentos',
                    icon: 'pi pi-map',
                    command: () => {
                        this.$router.push('/locations');
                        // this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                    }
                },
                {
                    label: 'Anomalias',
                    icon: 'pi pi-tag',
                    command: () => {
                        this.$router.push('/anomalies');
                    }
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logOut();
                    }
                }
            ]
        }
    },
    computed:{
        ...mapState(userInfoStore, ['userInformations'])
    },
    methods:{
        ...mapActions(userInfoStore, ['saindo']),

        transition(){
            this.$router.push({ path: '/'});
        },

        async logOut(){
            this.visible = true;

            const tokenExit = JSON.parse(localStorage.getItem("loggedUser"))

            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}logout`,
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Session-Token': `${tokenExit.sessionToken}`
                }
            };

            const data = await axios.request(options).then((response) => {
                
                // console.log(response);
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
        
        <img src="../assets/qualifix_black.png" alt="Grupo Cidade" style="height: 60%;">
        <div class="options">
            <router-link to="/home" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>Home</div>
            </router-link>
            <router-link to="/controlchanges" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>Gestão de Mudanças</div>
            </router-link>
            <router-link to="/noncompliance" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>RNC</div>
            </router-link>
            <router-link to="/locations" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>Instrumentos</div>
            </router-link>
            <router-link to="/purgatory" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>Purgatorio</div>
            </router-link>
            <router-link to="/anomalies" class="buttonLink" v-if="userInfo?.accessLevel < 1">
                <div>Anomalias</div>
            </router-link>
            <div class="buttonLink" @click="logOut()">
                <div>Sair</div>
            </div>
        </div>
        <div class="teste">
            <SpeedDial 
                :model="items"
                showIcon="pi pi-bars"
                hideIcon="pi pi-times"
                direction="down"
                :style="{ right: '10px', top: '10px' }"
                :tooltipOptions="{ position: 'left' }" 
            />
        </div>
        

    </div>
    
    <Dialog 
        v-model:visible="visible" 
        :position="position" 
        :modal="true" 
        :draggable="false"
    >
        <template #container>
            <ProgressSpinner /> 
        </template>
    </Dialog>

</template>

<style scoped>
.topMenu{
    width: 100vw;
    height: 100px;
    background-color: var(--primary-color-gc);
    display: flex;
    align-items: center;
    color: var(--white-gc);
    justify-content: space-between;
    box-shadow: 0px 10px 24px -10px rgba(0,0,0,0.49);
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
.teste{
    display: none;
}

@media (max-width: 500px) {

    img{
        width:150px;
        margin: 0px;
    }
    .options{
        display: none;
        margin: 0 15px 0 0;
        
    }
    .teste{
        display: flex;
    }
}
</style>