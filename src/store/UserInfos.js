import {defineStore} from 'pinia';

export const userInfoStore = defineStore('userInfo', {

    // Informações que serão salvas e ficarão guardadas
    state:() =>({
        
        userInformations: undefined
        // "objectId": "ecOVy087cb",
        // "username": "teste",
        // "email": "teste@teste.com.br",
        // "createdAt": "2023-10-12T20:33:18.860Z",
        // "updatedAt": "2023-11-13T19:20:56.029Z",
        // "accessLevel": 0,
        // "sessionToken": "r:f336e9e07f8d3943f2c8761960d887b8"
        
    }),

    actions:{
        saveInfo(x){
            this.userInformations = x
        },

        saindo(){
            this.userInformations = undefined
        }
    },


    getters:{
        returnInfos(state){
            return state.userInformations
        }
    }

})