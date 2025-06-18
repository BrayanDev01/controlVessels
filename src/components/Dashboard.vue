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
            visible: true
        }
    },
    methods:{
        async getQntAnomalies(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}functions/getAnomaliesStatusCounts`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.visible = false
                this.qtdAnomaliesData = this.organizeQtdAnomalies(response.data.result.statusArray, response.data.result.countArray )
                this.typeAnomaliesData = this.organizeQtdAnomalies(response.data.result.typeArray, response.data.result.countTypesArray)
                this.baseAnomaliesData = this.organizeQtdAnomalies(response.data.result.baseArray, response.data.result.countBasesArray)
                this.monthAnomaliesData = this.organizeQtdAnomalies(response.data.result.monthArray, response.data.result.countMonthArray)
            }).catch((error)=>{
                console.log(error)
            })
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
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                indexAxis: 'y',
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
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
            <div class="cardGraph">
                <strong>Quantidade de Anomalias</strong>
                <Chart type="bar" :data="qtdAnomaliesData" style="width: 100%; height: 100%;"/>
            </div>
            <div class="cardGraph">
                <strong>Tipos de Anomalias</strong>
                <Chart type="bar" :data="typeAnomaliesData" :options="optionsChartData" style="width: 100%; height: 100%;"/>
            </div>
            <div class="cardGraph">
                <strong>Anomalias por Bases</strong>
                <Chart type="pie" :data="baseAnomaliesData" style="width: 100%; height: 100%; display: flex; justify-content: center;"/>
            </div>
            <div class="cardGraph">
                <strong>Anomalias por Mês</strong>
                <Chart type="bar" :data="monthAnomaliesData" style="width: 100%; height: 100%;"/>
            </div>
        </div>
    </div>
    <Dialog
        v-model:visible="visible" 
        modal
        :draggable="false"
        @hide="clearForm()"
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
    max-width: 100dvw;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    margin: 30px 0px ;
    gap: 20px;
    flex-wrap: wrap;
    
}
.vesselSide, .reportSide{
    width: 45%;
    height: 40rem;
    border-radius: 20px;
    background-color: var(--white-gc);
}
.rigthSide, leftSide{
    width: 50%;

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