<script>
import axios from 'axios'
import MenuBar from '../components/MenuBar.vue'

export default{
    components:{
        MenuBar
    },

    data(){
        return{
            vessels:[],
            charges:[],
            selectedVessel:[],
            metaKey: true,
            reportDialog: false,
            monthAnomaliesData: null,
            baseAnomaliesData: null,
            typeAnomaliesData: null,
            qtdAnomaliesData: null,
            visible: true,

            qtdAnomalias: null,
            qtdRnc: null,
            qtdNaoAnalisada: null,
            qtdOM: null,
            qtdProxValidade: null,
            qtdVencidas: null,

            chartRncData: null,
            chartAnomaliesData: null,
            chartOptions: null,
            chartRncByDepartments: null,
            chartAnomalieByDepartments: null,
            chartInstruments: null,
            chartAnomalieByYear: null
        }
    },
    methods:{
        async getQntAnomalies(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}functions/getAnomaliesCharts`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }

            await axios.request(options).then((response)=>{
                const data = response.data
                this.organizeHome(data.result)   
                this.visible = false
            }).catch((error)=>{
                console.log(error)
            })
        },
        organizeHome(data){
            console.log(data)
            this.chartAnomalieByDepartments = this.setChartData(data.anomaliesByDepartment.labels, data.anomaliesByDepartment.data, 'Anomalias')
            this.chartRncByDepartments = this.setChartData(data.rncByDepartment.labels, data.rncByDepartment.data, 'RNCs')
            this.chartRncData = this.setChartData(data.rncByStatus.labels, data.rncByStatus.data, 'RNCs')
            this.chartAnomaliesData = this.setChartData(data.anomaliesByStatus.labels, data.anomaliesByStatus.data, 'Anomalias')
            this.chartInstruments = this.setChartData(data.instrumentMed.byValidity.labels, data.instrumentMed.byValidity.data, 'Instrumentos')
            this.chartAnomalieByYear = this.setChartData(data.anomaliesByYear.labels, data.anomaliesByYear.data, 'Anomalias')
            this.chartOptions = this.setChartOptions()

            this.qtdAnomalias = data.totals.data[1]
            this.qtdRnc = data.totals.data[0]
            this.qtdNaoAnalisada = data.instrumentMed.total
            this.qtdOM = data.totals.data[3]
            this.qtdProxValidade = data.instrumentMed.nearToExpire
            this.qtdVencidas = data.instrumentMed.expired
            
        },
        organizeQtdAnomalies(x, y){
            return{
                labels: x,
                datasets:[
                    {
                        label:'Anomalias',
                        data: y,
                        backgroundColor: [
                            '#222C56', 
                            '#FF7400', 
                            '#BFFDB8', 
                            '#836055', 
                            '#AA6A95', 
                            '#D22420', 
                            '#E62CA3'
                        ],
                        borderColor: [
                            '#222C56', 
                            '#FF7400', 
                            '#BFFDB8', 
                            '#836055', 
                            '#AA6A95', 
                            '#D22420', 
                            '#E62CA3'
                        ],
                        borderWidth: 1
                    }
                ]
            }
        },
        
        setChartData(x, y, w) {
            return {
                labels: x,
                datasets: [
                    {
                        label: w,
                        data: y,
                        backgroundColor: ['#222C56', '#FF7400', '#BFFDB8', '#836055'],
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--primary-color-gc') || '#222';
            const textColorSecondary = documentStyle.getPropertyValue('--primary-color-gc') || '#666';
            const textLabel = documentStyle.getPropertyValue('--secondary-color-gc') || '#222';

            return {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        labels: { color: textColor }
                    },

                    // se quiser, pode desligar tooltip já que tem label fixo
                    tooltip: { enabled: true },

                    // labels fixos no gráfico
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        offset: 4,
                        clamp: true,
                        color: (ctx) => {
                            const bgColor = ctx.dataset.backgroundColor[ctx.dataIndex];
                            return bgColor === '#0064ac' ? '#ffffff' : '#000000';
                        },
                        font: { size: 12, weight: 'bold' }
                    }
                },

                scales: {
                    x: {
                        ticks: { color: textColorSecondary }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: textColorSecondary } // ✅ aqui estava "te"
                    }
                }
            };
        }
    },
    created(){
        this.getQntAnomalies();
    }
}
</script>
<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dashboard">
            <div class="div1 card wNumbers">
                <strong class="title">Quantidade de Anomalias</strong>
                <strong class="number">{{ qtdAnomalias }}</strong>
            </div>
            <div class="div2 card wNumbers">
                <strong class="title">Quantidade de RNC's</strong>
                <strong class="number">{{ qtdRnc }}</strong>
            </div>
            <div class="div3 card wNumbers">
                <strong class="title">Quantidade de Instrumentos de Medição</strong>
                <strong class="number">{{ qtdNaoAnalisada }}</strong>
            </div>
            <div class="div4 card wNumbers">
                <strong class="title">Quantidade de Oportunidades de Melhoria</strong>
                <strong class="number">{{ qtdOM }}</strong>
            </div>
            <div class="div4 card wNumbers">
                <strong class="title">Instrumentos de medição proximos da validade</strong>
                <strong class="number">{{ qtdProxValidade }}</strong>
            </div>
            <div class="div4 card wNumbers">
                <strong class="title">Instrumentos de medição vencidos</strong>
                <strong class="number">{{ qtdVencidas }}</strong>
            </div>
            <div class="div5 card wGraphs">
                <strong>Rnc's por Status</strong>
                <Chart type="bar" :data="chartRncData" :options="chartOptions" class="chartGraph"/>
            </div>
            <div class="div6 card wGraphs">
                <strong>Anomalias por Status</strong>
                <Chart type="bar" :data="chartAnomaliesData" :options="chartOptions" class="chartGraph"/>
            </div>
            <div class="div7 card wGraphs">
                <strong>Anomalias por Setor</strong>
                <Chart type="bar" :data="chartAnomalieByDepartments" :options="chartOptions" class="chartGraph"/>
            </div>
            <div class="div8 card wGraphs">
                <strong>RNC\ por Setor</strong>
                <Chart type="bar" :data="chartRncByDepartments" :options="chartOptions" class="chartGraph"/>
            </div>
            <div class="div10 card wGraphs">
                <strong>Instrumentos de Medição</strong>
                <Chart type="pie" :data="chartInstruments" :options="chartOptions" class="chartGraph"/>                
            </div> 
            <div class="div9 card wGraphs">
                <strong>Anomalias por ano</strong>
                <Chart type="bar" :data="chartAnomalieByYear" :options="chartOptions" class="chartGraph"/>                
            </div> 
                      
        </div>
    </div>
    <Dialog
        v-model:visible="visible" 
        modal
        :draggable="false"
        :closable="false"
        :pt="{
            root: {
                class: 'my-custom-class',
                style: {
                    background: 'none !important'
                }
            }
        }"       
    >
        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
            <span class="loader"></span>
        </div>
    </Dialog>
</template>

<style scoped>
.main{
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    background-color: var(--gray-bg-gc);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
}
.titleSide{
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: larger;
    margin:10px 0 10px 0 ;

}

.dashboard{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
    padding: 40px;
}

.div7 {
    grid-column: span 2 / span 2;
}

.div8 {
    grid-column: span 2 / span 2;
    grid-row-start: 3;
}

.div9 {
    grid-column: span 2 / span 2;
    grid-column-start: 3;
    grid-row-start: 3;
}

.div10 { 
    grid-area: 4 / 3 / 5 / 5; 
}

.card{
    border-radius: 20px;
    background-color: var(--white-gc);
    padding: 20px;
}

.wGraphs{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.wNumbers{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.number{
    font-weight: bolder;
    font-size: 4rem;
    color: var(--primary-color-gc); 
}

.chartGraph{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title{
    font-weight: bolder;
    font-size: 1.5rem;
}

.my-custom-class{
    border: 12px solid red !important;
}

.cardGraph{
    width: 600px;
    height: 400px;
    padding: 30px;
    background-color: #fdfdfd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.loader {
    width: 84px;
    height: 84px;
    position: relative;
}
.loader:before , .loader:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width:84px;
    height: 84px;
    border-radius: 50%;
    background:var(--secondary-color-gc);
    animation: push 1s infinite linear alternate;
}
.loader:after {
    background: var(--primary-color-gc);
    animation-direction: alternate-reverse;
}
@keyframes push {
    0% {
        width:14px;
        height: 14px;
    }
    100% {
        width:84px;
        height: 84px;
    }
}
  

@media (max-width: 1500px){
    .main{
        width: 100vw;
        height: 100%;
        background-color: var(--gray-bg-gc);
        display: flex;
        flex-direction: column;
    }
    .dashboard{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 30px 0 0 0 ;
        gap: 20px;
    }
    .vesselSide, .reportSide{
        width: 90%;
        height: 40rem;
        border-radius: 20px;
        background-color: var(--white-gc);
    }
    .cardGraph{
        width: 500px;
        height: 300px;
        padding: 30px;
        background-color: #fdfdfd;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }
}
</style>