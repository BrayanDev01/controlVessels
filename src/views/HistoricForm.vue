<script>
import MapView from '../components/map/MapComponent.vue';
import axios from 'axios';

  export default {
    components:{
      MapView
    },
    data() {
      return {
        latitude: "38.376129",
        longitude: "-75.055186",
        infos: null   
      };
    },
    methods: {
      async getVessel(id){
        const options ={
          method: 'GET',
          url: `${import.meta.env.VITE_URL_API}classes/Vessels/${id}`,
          headers: {
            'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
            'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
          }
        }

        await axios.request(options).then((response)=>{
          console.log(response)
          this.infos = response.data
        }).catch((error)=>{
          console.log(error)
        })
      },
      formatDate(x){
        return new Date(x).toLocaleString()
      },
      arrayConcat(array){
        const toString = array.map(item => item.name);

        return toString.join(', ')
      },
      printRelatorio(){
        window.print()
      }
    },
    created(){
      this.getVessel(this.$route.params.id)      
    }
  };
</script>

<template>
    <div style="width: 100%; height: 100%; background-color: gray;">
        <div class="form-container">
            <strong class="titleCenter">Relatorio da embarcação:  {{ infos.name }}</strong>
            <section class="sectionActual">
                <strong style="margin: 10px; width: 100%; display: flex; justify-content: center;">Ultima atualização</strong>
                <div style="display: flex; width: 100%; margin: 5px;">
                    <div class="inputGroup">
                        <span>Comandante :</span>
                        <div>{{ infos?.captain }}</div>
                    </div>  
                    <div class="inputGroup">
                        <span>Destino :</span>
                        <div>{{ infos?.destination }}</div>
                    </div>
                    <div class="inputGroup">
                        <span>Posição Atual :</span>
                        <div>{{ infos?.actualPosition }}</div>
                    </div>
                    <div class="inputGroup">
                        <span>Previsão :</span>
                        <div>{{ infos?.prevision }}</div>
                    </div>
                </div>
                <div style="display: flex; width: 100%; margin: 5px;">
                    <div class="inputGroup">
                        <span>Balsas no comboio :</span>
                        <div style="max-width: 100%;">{{ arrayConcat(infos?.convoy) }}</div>
                    </div>
                    <div class="inputGroup">
                        <span>Ultima Atualização :</span>
                        <div>{{ formatDate(infos?.updatedAt) }}</div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; padding: 20px;">
                    <MapView 
                        :latitude="infos?.latitude"
                        :longitude="infos?.longitude"
                        class="adjust"
                    ></MapView>                    
                </div>
            </section>
            <section>
                <strong>Historico :</strong>
                <div>
                  <DataTable
                    :value="infos.history"
                    dataKey="objectId" 
                  >
                  <Column field="captain" header="Comandante"></Column>
                    <Column field="convoy" header="Comboio">
                      <template #body="{data}">
                        <div>{{ arrayConcat(data.convoy) }}</div>
                      </template>
                    </Column>
                    <Column field="actualPosition" header="Posição atual"></Column>
                    <Column field="prevision" header="Previsão"></Column>
                    <Column field="destination" header="Destino"></Column>
                    <Column field="date" header="Data">
                      <template #body="{data}">
                        <div>{{ new Date(data.date).toLocaleDateString() }}</div>
                      </template>
                    </Column>
                  </DataTable>
                </div>
            </section>         
        </div>
        <Button class="printBtn" @click="printRelatorio()">Imprimir</Button>
    </div>
  </template>
  
  <style scoped>
  .printBtn{
    position: fixed;
    bottom: 10%;
    left: 50%;
  }
  .titleCenter{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 5px;
    font-size: x-large;
  }
  div#app{
    background-color: gray;
  }
  .adjust{
    width: 100%;
  }
  .sectionActual{
    border: 1px solid black;
  }
  .inputGroup{
    display: flex;
    flex-direction: column;
    margin: 10px;
    gap: 5px;
    width: 100%;
  }
  .form-container {
    width: 21cm;
    height: 29.7cm;
    padding: 1cm;
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin: 0 auto;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.7em 1.5em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }

  @media print {
    .printBtn{
      display: none;
    }
  }
  </style>
  