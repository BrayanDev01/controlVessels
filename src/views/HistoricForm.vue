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
      async getAnomalie(id){
        const options ={
          method: 'GET',
          url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${id}`,
          params:{include:'reportFor'},
          headers: {
            'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
            'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
          }
        }

        await axios.request(options).then((response)=>{
          console.log(response)
          this.infos = response.data
          this.loading = false
          
          document.title = "Relatorio de anomalia - "+this.infos.numericId
        }).catch((error)=>{
          console.log(error)
        })
      },
      formatDate(x){
        return new Date(x).toLocaleString()
      },
      printRelatorio(){
        window.print()
      }
    },
    created(){
      this.getAnomalie(this.$route.params.id);
    }
  };
</script>

<template>
    <div style="width: 100%; min-height: 29.7cm; height: 100%;background-color: gray;" class="backgroundPrint">
      <div class="form-container">
        <div class="titleCenter" style="display: flex; flex-direction: column; align-items: center;">
          <strong>Relatorio de Anomalia:  {{ infos?.numericId }}</strong>
          <div style="border: 1px solid gray; padding: 10px; border-radius: 10px; margin: 10px;">{{ infos?.status }}</div>
        </div>
        <section class="sectionActual">
          <div style="display: flex; width: 100%; margin: 5px;">
            <div class="inputGroup">
              <strong>Resumo da anomalia :</strong>
              <div>{{ infos?.resumeAnomalie }}</div>
            </div>
          </div>
          <div style="display: flex; width: 100%; margin: 5px;">
            <div class="inputGroup">
              <strong>Causa da anomalia :</strong>
              <div style="max-width: 100%;">{{ infos?.reasonAnomalie }}</div>
            </div>
            <div class="inputGroup">
                  <strong>Envolvidos na anomalia :</strong>
                  <div style="max-width: 100%;">{{ infos?.envolvedInAnomalie }}</div>
              </div>
          </div>
          <div style="display: flex; justify-content: center; padding: 20px;">
          </div>
        </section>
        <section class="sectionActual">
          <div style="display: flex; width: 100%; margin: 5px;">
            <div class="inputGroup">
              <strong>Base:</strong>
              <div>{{ infos?.base }}</div>
            </div>
            <div class="inputGroup">
              <strong>Departamento responsável:</strong>
              <div>{{ infos?.departmentResp }}</div>
            </div>
            <div class="inputGroup">
              <strong>Email do responsável: :</strong>
              <div>{{ infos?.emailResp }}</div>
            </div>
          </div>
          <div style="display: flex; width: 100%; margin: 5px;">
            <div class="inputGroup">
              <strong>Equipamento :</strong>
              <div style="max-width: 100%;">{{ infos?.equipament }}</div>
            </div>
            <div class="inputGroup">
              <strong>Nome do equipamento :</strong>
              <div style="max-width: 100%;">{{ infos?.nameEquipament }}</div>
            </div>
            <div class="inputGroup">
              <strong>Impacto :</strong>
              <div style="max-width: 100%;">{{ infos?.impact }}</div>
            </div>
          </div>
          <div style="display: flex; width: 100%; margin: 5px;">
            <div class="inputGroup">
              <strong>Local :</strong>
              <div style="max-width: 100%;">{{ infos?.place }}</div>
            </div>
            <div class="inputGroup">
              <strong>Tipo de anomalia :</strong>
              <div style="max-width: 100%;">{{ infos?.typeAnomalie }}</div>
            </div>
            <div class="inputGroup">
              <strong>Criado da anomalia :</strong>
              <div style="max-width: 100%;">{{ infos.reportFor?.fullName }}</div>
            </div> 
          </div>
        </section>
        <section class="sectionActual">
          <div style="display: flex; flex-wrap: wrap;width: 100%; margin: 5px;">
            <div v-for="(image, index) in infos.imageFacts" :key="index">
              <Image :src="image.location" alt="image" width="200" style="margin: 10px;" preview></Image>
            </div>
          </div>
        </section>

        <div class="titleCenter" style="display: flex; flex-direction: column; align-items: center;">
          <strong>Retratação do setor :</strong>
        </div>
        <section class="sectionActual">
          <div class="inputGroup">
            <strong>Resumo do setor :</strong>
            <div style="width: 90%;">{{ infos?.gestorArgument }}</div>
          </div>
          <div class="inputGroup">
            <strong>Causa :</strong>
            <div style="width: 90%;">{{ infos?.causeAfterAnalise }}</div>
          </div>
          <div class="inputGroup">
            <strong>Ação de contenção :</strong>
            <div style="width: 90%;">{{ infos?.actionOfContention }}</div>
          </div> 
          <div class="inputGroup">
            <strong>Contramedida :</strong>
            <div style="width: 90%;">{{ infos?.contramedida }}</div>
          </div>   
        </section>

        <div class="titleCenter" style="display: flex; flex-direction: column; align-items: center;">
          <strong>Analise da qualidade :</strong>
        </div>
        <section class="sectionActual">
          <div class="inputGroup">
            <strong>Analise :</strong>
            <div style="width: 90%;">{{ infos?.resumeQuality }}</div>
            <div style="display: flex; flex-wrap: wrap;width: 100%; margin: 5px;">
              <div v-for="(image, index) in infos.archives" :key="index">
                <Image :src="image.location" alt="image" width="200" style="margin: 10px;" preview></Image>
              </div>
            </div>
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
    margin: 20px 0px;
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
    min-height: 29.7cm;
    height: 100%;
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
    .backgroundPrint{
      background-color: white;
    }
  }
  </style>
  