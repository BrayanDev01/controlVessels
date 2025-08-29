export const MockTypeEquipaments ={
    getData(){
        return [
            {name:"Balsa"},
            {name:"Caminhão"},
            {name:"Barcaça"},
            {name:"Empurrador"},
            {name:"Carreta"},
            {name:"Outros"}
        ]
    },
    getTypes(){
        return Promise.resolve(this.getData())
    }
}