export const MockOptions ={
    getSeverity(){
        return [
            {
                name: 'Extremamente Grave',
                value: 5
            },
            {
                name: 'Muito Grave',
                value: 4
            },
            {
                name: 'Grave',
                value: 3
            },
            {
                name: 'Um Pouco Grave',
                value: 2
            },
            {
                name: 'Sem Gravidade',
                value: 1
            }
        ]
    },
    getUrgency(){
        return[
            {
                name: 'Ação Imediata',
                value: 5
            },
            {
                name: 'Muito Urgente',
                value: 4
            },
            {
                name: 'Urgente',
                value: 3
            },
            {
                name: 'Pouco Urgente',
                value: 2
            },
            {
                name: 'Sem Urgência',
                value: 1
            }
            
        ]
    },
    getTrend(){
        return[
            {
                name: 'Piora Imediata',
                value: 5
            },
            {
                name: 'Piora a Curto Prazo',
                value: 4
            },
            {
                name: 'Piora a Médio Prazo',
                value: 3
            },
            {
                name: 'Piora a Longo Prazo',
                value: 2
            },
            {
                name: 'Não Muda',
                value: 1
            }
        ]
    },
    getDataSeverity(){
        return Promise.resolve(this.getSeverity())
    },
    getDataUrgency(){
        return Promise.resolve(this.getUrgency())
    },
    getDataTrend(){
        return Promise.resolve(this.getTrend())
    }
}