export const MockTypeImpacts ={
    getData(){
        return [
            {name:"Acidente de trabalho"},
            {name:"Atraso na Operação"},
            {name:"Compliance"},
            {name:"Condições ilegais de viagem"},
            {name:"Contaminação ambiental"},
            {name:"Desvio de produtos"},
            {name:"Excesso de remanescente"},
            {name:"Impacto Financeiro"},
            {name:"Interrupção na Operação"},
            {name:"Notificação"},
            {name: "Higiene e Saúde"},
            {name:"Passivo trabalhista"},
            {name:"Perda de licença"},
            {name:"Quebra de equipamento"},
            {name:"Risco de segurança"},
            {name:"Tributário / Financeiro"},
            {name:"Tripulação incompleta"}
        ]
    },
    getImpacts(){
        return Promise.resolve(this.getData())
    }
}