export const MockLocations ={
    getData(){
        return[
            {name:"Boia Porto 3NF"},
            {name:"Boia do Vigia"},
            {name:"EQD (Equador)"},
            {name:"Escritório"},
            {name:"Porto 3NF"},
            {name:"Porto Cidade"},
            {name:"Refinaria (REAM)"},
            {name:"Terminal ABI"},
            {name:"Viagem"},
            {name:"Terminal TFB"},
            {name:"Terminal Ipiranga"},
            {name:"Outros"}            
        ]
    },
    getLocations(){
        return Promise.resolve(this.getData())
    }
}