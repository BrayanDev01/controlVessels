<script>
import MenuBar from '../components/MenuBar.vue';
import axios from 'axios'
import { FilterMatchMode, FilterOperator  } from 'primevue/api';

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("loggedUser")),
            anomalies:[],
            isLoading: true,
            uploadedFile: null,
            active: 0,
            loadingCreate: false,
            visible: false,
            objectId: null,
            resumeAnomalie: '',
            dateAnomalie: null,
            departmentResp: '',
            reasonAnomalie:'',
            envolvedInAnomalie: '',
            typeAnomalie:'',
            baseAnomalie:'',
            placeAnomalie:'',
            equipamentAnomalie:'',
            nameEquipament:null,
            impactAnomalie:'',
            statusAnomalie:'',
            resumeQuality:'',
            gestorArgument: '',
            causeAfterAnalise: '',
            actionOfContention: '',
            contramedida: '',
            criticalityAnomalie: null,
            pendencies: [],
            selectedPendencie: null,
            archives:[],
            imageFacts:[],
            archivesRetrated: [],
            qtdAnomaliesData: null,
            typeAnomaliesData: null,
            baseAnomaliesData: null,
            monthAnomaliesData: null,
            typeCall: null,
            classification: null,

            timeToCheck: null,
            observations: null,
            isEffective: false,
            dateToFinish: null,
            respToCheck: null,

            actionImmediate: [],
            actionImmediateText: null,
            respEmailAction: null,
            dateLimit: null,

            actionCorrectives: [],
            what: null,
            why: null,
            where: null,
            when: null,
            who: null,
            how: null,
            howMuch: null,

            needRevision: null,
            revisionDate: null,
            revisionNumber: null,
            reasonRevision: null,

            fiveWhys: [],
            firstWhy: null,
            secondWhy: null,
            thirdWhy: null,
            fourthWhy: null,
            fifthWhy: null,

            evidencesAnalises: [],

            sectorsEnvolveds: null,
            classificationOptions: [
                {name: "Processo"},
                {name: "Auditoria Externa"},
                {name: "Auditoria Interna"},
                {name: "Outros"},
                {name: "Indicadores"},
                {name: "Cliente"},
                {name: "Provedor Externo"},                
            ],
            typeCallOptions:[
                {name: "Anomalia"},
                {name: "Não Conformidade"}
            ],
            criticalityOptions:[
                {name: "Prioridade Alta"},
                {name: "Prioridade Media"},
                {name: "Prioridade Baixa"}
            ],
            departments:[
                {name:"Comercial", email:''},
                {name:"Controladoria", email:'controller@3nf.com.br'},
                {name:"SGI", email:'qualidade@3nf.com.br'},
                {name:"Inspeção", email:'gestornav@3nf.com.br'},
                {name:"Manutenção", email:'sup.manutencao@3nf.com.br'},
                {name:"Navegação", email:'planejamento@3nf.com.br'},
                {name:"Patrimonial", email:'patrimonio@3nf.com.br'},
                {name:"RH", email:'comunicacao@3nf.com.br'},
                {name:"Rodoviário", email:'supervisor.rod@3nf.com.br'},
                {name:"SESMT", email:'sesmt@3nf.com.br'},
                {name:"Suprimentos", email:'compras2@3nf.com.br'},
                {name:"TI", email:'ti@3nf.com.br'},
                {name:"Terceirizado"}
            ],
            typesOptions:[
                {name:"Ambiental"},
                {name:"Atendimento de Legal"},
                {name:"Controle de pragas"},
                {name:"Equipamento"},
                {name:"Infraestrutura"},
                {name:"Operacional"},
                {name:"Processo"},
                {name:"Programação"},
                {name:"Segurança"},
                {name:"Terceiros"},
                {name:"5S"}
            ],
            baseOptions:[
                {name:"Itacoatiara"},
                {name:"Itaituba"},
                {name:"Manaus"},
                {name:"Peru"},
                {name:"Porto Velho"},
                {name:"Santarém"},
                {name:"Viagem"}
            ],
            localOptions:[
                {name:"Boia Porto 3NF"},
                {name:"Boia do Vigia"},
                {name:"EQD (Equador)"},
                {name:"Escritório"},
                {name:"Porto 3NF"},
                {name:"Porto Cidade"},
                {name:"Refinaria (REAM)"},
                {name:"Terminal ABI"},
                {name:"Viagem"},
                {name:"Terminal TFB"}
            ],
            equipamentTypeOptions:[
                {name:"Balsa"},
                {name:"Caminhão"},
                {name:"Empurrador"},
                {name:"Carreta"},
                {name:"Outros"}
            ],
            impactOptions:[
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
            ],
            statusOptions:[
                {name:"Ainda não analisado"},
                {name:"Em análise"},
                {name:"Solucionado"},
                {name:"Em tratativa"},
                {name:"Análise de eficácia"}, 
                {name:"Fechado"}
            ],
            equipamentOptions:[
                {name:"ABI-01"},
                {name:"BT BEATRIZ FARIAS II"},
                {name:"BT CITY I"},
                {name:"BT CITY III"},
                {name:"BT CITY IX"},
                {name:"BT CITY LI"},
                {name:"BT CITY XV"},
                {name:"BT CITY XX"},
                {name:"BT CITY XXI"},
                {name:"BT CITY XXII"},
                {name:"BT CITY XXV"},
                {name:"BT CITY XXXIV"},
                {name:"BT CITY XXXIX"},
                {name:"BT CITY XXXV"},
                {name:"BT CT 01"},
                {name:"BT CT 02"},
                {name:"BT CT 10"},
                {name:"BT CT 11"},
                {name:"BT CT 16"},
                {name:"BT CT 18"},
                {name:"BT CT 20"},
                {name:"BT CT 21"},
                {name:"BT CT 22"},
                {name:"BT CT 23"},
                {name:"BT CT 30"},
                {name:"BT CT 33"},
                {name:"BT CT 34"},
                {name:"BT CT 35"},
                {name:"BT CT 39"},
                {name:"BT CT 4"},
                {name:"BT CT 5"},
                {name:"BT CT 40"},
                {name:"BT CT 41"},
                {name:"BT CT 42"},
                {name:"BT CT 43"},
                {name:"BT CT 44"},
                {name:"BT CT 45"},
                {name:"BT CT 47"},
                {name:"BT CT 48"},
                {name:"BT CT 49"},
                {name:"BT CT 5"},
                {name:"BT CT 51"},
                {name:"BT CT 53"},
                {name:"BT CT 54"},
                {name:"BT CT 55"},
                {name:"BT CT 56"},
                {name:"BT CT 58"},
                {name:"BT CT 59"},
                {name:"BT CT 6"},
                {name:"BT CT 60"},
                {name:"BT CT 61"},
                {name:"BT CT 63"},
                {name:"BT CT 64"},
                {name:"BT CT 66"},
                {name:"BT CT 67"},
                {name:"BT CT 68"},
                {name:"BT CT 69"},
                {name:"BT CT 70"},
                {name:"BT CT 71"},
                {name:"BT CT 72"},
                {name:"BT CT 73"},
                {name:"BT CT 74"},
                {name:"BT CT 75"},
                {name:"BT CT 79"},
                {name:"BT CT 80"},
                {name:"BT CT 81"},
                {name:"BT CT 82"},
                {name:"BT CT 85"},
                {name:"BT CT 86"},
                {name:"BT CT 88"},
                {name:"BT CT 9"},
                {name:"BT EUDOCIA"},
                {name:"BT GDS 62"},
                {name:"BT GDS 63"},
                {name:"BT GLORIA DE DEUS I"},
                {name:"BT ITL I"},
                {name:"BT ITL 12"},
                {name:"BT NOSSA SENHORA DE NAZARÉ"},
                {name:"BT PRECIOSA DE DEUS"},
                {name:"BT PRECIOSA DE DEUS I"},
                {name:"BT REBECCA GISLAINE"},
                {name:"BT EDLOPES 34"},
                {name:"CARGA"},
                {name:"CT 43 - BALSA TANQUE"},
                {name:"DESCARGA"},
                {name:"EMP BONECA DA JUJU"},
                {name:"EMP CT 100"},
                {name:"EMP CT 12"},
                {name:"EMP CT 13"},
                {name:"EMP CT 14"},
                {name:"EMP CT 19"},
                {name:"EMP CT 27"},
                {name:"EMP CT 29"},
                {name:"EMP CT 32 - EMPURRADOR"},
                {name:"EMP CT 36"},
                {name:"EMP CT 37"},
                {name:"EMP CT 38"},
                {name:"EMP CT 46"},
                {name:"EMP CT 52"},
                {name:"EMP CT 57"},
                {name:"EMP CT 65"},
                {name:"EMP CT 68"},
                {name:"EMP CT 77"},
                {name:"EMP CT 78"},
                {name:"EMP CT 8"},
                {name:"EMP CT 83"},
                {name:"EMP CT 84"},
                {name:"EMP EL REFUGIO"},
                {name:"EMP ESDRAS X"},
                {name:"EMP ITL 11"},
                {name:"EMP ITL 13"},
                {name:"EMP ITL 14"},
                {name:"EMP ITL 4"},
                {name:"EMP ITL 5"},
                {name:"EMP ITL 6"},
                {name:"EMP ITL 7"},
                {name:"EMP ITL 8"},
                {name:"EMP ITL 9"},
                {name:"EMP ITL 10"},
                {name:"EMP ITL I"},
                {name:"EMP ITL II"},
                {name:"EMP ITL III"},
                {name:"EMP ITL IX"},
                {name:"EMP ITL X"},
                {name:"EMP ITL XII"},
                {name:"EMP LH III"},
                {name:"EMP MAXIMUS"},
                {name:"EMP NM VI"},
                {name:"EMP NM VII"},
                {name:"EMP NM XXVII"},
                {name:"EMP PETRODADO I"},
                {name:"EMP SEU JUAREZ"},
                {name:"EMP VALENTE DE DEUS I"},
                {name:"EMP CT 76"},
                {name: "Wacco"},
                {name: "Pranchinha"},
                {name:"Outros"},
                {name:"Não aplicável"},
                {name:"Caminhão "},
                {name:"Chopin"},
                {name: "CT 28"}
            ],
            filters:{
                global:{ value: null, matchMode: FilterMatchMode.CONTAINS},
                numericId:{value: null, matchMode: FilterMatchMode.CONTAINS},
                objectId: { value: null, matchMode: FilterMatchMode.CONTAINS},
                base: { value: null, matchMode: FilterMatchMode.CONTAINS},
                departmentResp: { value: null, matchMode: FilterMatchMode.CONTAINS},
                equipament: { value: null, matchMode: FilterMatchMode.CONTAINS},
                impact: { value: null, matchMode: FilterMatchMode.CONTAINS},
                nameEquipament: { value: null, matchMode: FilterMatchMode.CONTAINS},
                place: { value: null, matchMode: FilterMatchMode.CONTAINS},
                resumeAnomalie: { value: null, matchMode: FilterMatchMode.CONTAINS},
                status: { value: null, matchMode: FilterMatchMode.CONTAINS},
                typeAnomalie: { value: null, matchMode: FilterMatchMode.CONTAINS},
                'classification.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
            }
        }
    },
    methods:{
        async getRNC(){
            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}functions/getNonConformityAnomalies`,
                params: {include: 'reportFor', order: '-createdAt', limit: 300},
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }

            await axios.request(options).then((response) =>{
                console.log(response)
                this.anomalies = response.data.result
                this.isLoading = false
            }).catch(error =>{
                console.log(error)
            })
        },
        async createAnomalie(){
            this.loadingCreate = true;

            const options = {
                method: 'POST',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    resumeAnomalie: this.resumeAnomalie,
                    date: this.dateAnomalie,
                    departmentResp: this.departmentResp?.name,
                    typeAnomalie: this.typeAnomalie?.name,
                    base: this.baseAnomalie?.name,
                    place: this.placeAnomalie?.name,
                    equipament: this.equipamentAnomalie?.name,
                    nameEquipament: this.nameEquipament?.name,
                    impact: this.impactAnomalie?.name,
                    status: this.statusAnomalie?.name,
                    archives: this.archives,
                    imageFacts: this.imageFacts,
                    reasonAnomalie: this.reasonAnomalie,
                    envolvedInAnomalie: this.envolvedInAnomalie,
                    resumeQuality: this.resumeQuality,
                    emailResp: this.departmentResp?.email,
                    reportFor: { "__type": "Pointer", "className": "_User", "objectId": this.userInfo.objectId },
                    causeAfterAnalise: this.causeAfterAnalise,
                    actionOfContention: this.actionOfContention,
                    contramedida: this.contramedida,
                    gestorArgument: this.gestorArgument,
                    archivesRetrated: this.archivesRetrated,
                    criticalityAnomalie: this.criticalityAnomalie.name,
                    purgatory: this.typeCall,
                    actionImmediate: this.actionImmediate,
                    actionCorrectives: this.actionCorrectives,
                    timeToCheck: this.timeToCheck,
                    observations: this.observations,
                    isEffective: this.isEffective,
                    dateToFinish: this.dateToFinish,
                    respToCheck: this.respToCheck,
                    fiveWhys: this.fiveWhys,
                    classifications: this.classification,
                    evidencesAnalises: this.evidencesAnalises,
                    needRevision: this.needRevision,
                    revisionDate: this.revisionDate,
                    revisionNumber: this.revisionNumber,
                    reasonRevision: this.reasonRevision,
                }

            }

            await axios.request(options).then((response) =>{
                
                this.clearForm();
                this.closeModal();
                this.tostAdvice('success', 'Anomalia Registrada');
                this.resetData()           
                this.loadingCreate = false;  
                // console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.clearForm();
                this.loadingCreate = false;
                console.log(error)
            })
            
        },
        async updateAnomalie(){
            
            this.loadingCreate = true;

            const options = {
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${this.objectId}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    resumeAnomalie: this.resumeAnomalie,
                    date: new Date(this.dateAnomalie).toISOString(),
                    departmentResp: this.departmentResp?.name,
                    typeAnomalie: this.typeAnomalie?.name,
                    base: this.baseAnomalie?.name,
                    place: this.placeAnomalie?.name,
                    equipament: this.equipamentAnomalie?.name,
                    nameEquipament: this.nameEquipament?.name,
                    impact: this.impactAnomalie?.name,
                    status: this.statusAnomalie?.name,
                    archives: this.archives,
                    imageFacts: this.imageFacts,
                    reasonAnomalie: this.reasonAnomalie,
                    envolvedInAnomalie: this.envolvedInAnomalie,
                    resumeQuality: this.resumeQuality,
                    emailResp: this.departmentResp?.email,
                    causeAfterAnalise: this.causeAfterAnalise,
                    actionOfContention: this.actionOfContention,
                    contramedida: this.contramedida,
                    gestorArgument: this.gestorArgument,
                    archivesRetrated: this.archivesRetrated,
                    criticalityAnomalie: this.criticalityAnomalie.name,
                    purgatory: this.typeCall,
                    actionImmediate: this.actionImmediate,
                    actionCorrectives: this.actionCorrectives,
                    timeToCheck: this.timeToCheck,
                    observations: this.observations,
                    isEffective: this.isEffective,
                    dateToFinish: this.dateToFinish,
                    respToCheck: this.respToCheck,
                    fiveWhys: this.fiveWhys,
                    classification: this.classification,
                    evidencesAnalises: this.evidencesAnalises,
                    needRevision: this.needRevision,
                    revisionDate: this.revisionDate,
                    revisionNumber: this.revisionNumber,
                    reasonRevision: this.reasonRevision
                }

            }

            await axios.request(options).then((response) =>{
                
                this.clearForm();
                this.closeModal();
                this.tostAdvice('success', 'Anomalia Atualizada');
                this.resetData()     
                this.loadingCreate = false;           
                // console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.clearForm();
                this.resetData();
                this.loadingCreate = false;
                console.log(error)
            })
            
        },
        async fasterUpdateAnomalie(){
            if(!this.objectId) {
                return
            }
            
            this.loadingCreate = true;

            const options = {
                method: 'PUT',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${this.objectId}`,
                headers: {
                    'X-Parse-Rest-API-Key':`${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                },
                data:{
                    resumeAnomalie: this.resumeAnomalie,
                    date: new Date(this.dateAnomalie).toISOString(),
                    departmentResp: this.departmentResp?.name,
                    typeAnomalie: this.typeAnomalie?.name,
                    base: this.baseAnomalie?.name,
                    place: this.placeAnomalie?.name,
                    equipament: this.equipamentAnomalie?.name,
                    nameEquipament: this.nameEquipament?.name,
                    impact: this.impactAnomalie?.name,
                    status: this.statusAnomalie?.name,
                    archives: this.archives,
                    imageFacts: this.imageFacts,
                    reasonAnomalie: this.reasonAnomalie,
                    envolvedInAnomalie: this.envolvedInAnomalie,
                    resumeQuality: this.resumeQuality,
                    emailResp: this.departmentResp?.email,
                    causeAfterAnalise: this.causeAfterAnalise,
                    actionOfContention: this.actionOfContention,
                    contramedida: this.contramedida,
                    gestorArgument: this.gestorArgument,
                    archivesRetrated: this.archivesRetrated,
                    criticalityAnomalie: this.criticalityAnomalie.name,
                    purgatory: this.typeCall,
                    actionImmediate: this.actionImmediate,
                    actionCorrectives: this.actionCorrectives,
                    timeToCheck: this.timeToCheck,
                    observations: this.observations,
                    isEffective: this.isEffective,
                    dateToFinish: this.dateToFinish,
                    respToCheck: this.respToCheck,
                    fiveWhys: this.fiveWhys,
                    classification: this.classification,
                    evidencesAnalises: this.evidencesAnalises,
                    needRevision: this.needRevision,
                    revisionDate: this.revisionDate,
                    revisionNumber: this.revisionNumber,
                    reasonRevision: this.reasonRevision,
                }

            }

            await axios.request(options).then((response) =>{
                
                this.tostAdvice('success', 'Anomalia Atualizada');
                this.loadingCreate = false;           
                // console.log(response)
            }).catch(error =>{
                this.tostAdvice('error', 'Tivemos um erro')
                this.loadingCreate = false;
                console.log(error)
            })
            
        },
        getStatusLabel(status) {
            switch (status) {
                case 'Fechado':
                    return 'success';

                case 'Em análise':
                    return 'warning';

                case 'Ainda não analisado':
                    return 'danger';
                
                case 'Solucionado':
                    return 'success';
                
                case 'Em tratativa':
                    return 'warning';

                case 'Análise de Eficácia':
                    return 'info'

                default:
                    return null;
            }
        },
        clearForm(){
            this.objectId = null
            this.resumeAnomalie = null;
            this.dateAnomalie = null;
            this.departmentResp = null;
            this.typeAnomalie = null;
            this.baseAnomalie = null;
            this.placeAnomalie = null;
            this.equipamentAnomalie = null;
            this.nameEquipament = null;
            this.impactAnomalie = null;
            this.statusAnomalie = null;
            this.reasonAnomalie = null;
            this.envolvedInAnomalie = null;
            this.imageFacts = [];
            this.resumeQuality = null;
            this.archives = [];
            this.causeAfterAnalise= null,
            this.actionOfContention= null,
            this.contramedida= null,
            this.gestorArgument= null
            this.archivesRetrated = [];
            this.criticalityAnomalie = null;
            this.typeCall = null;
            this.actionImmediate = null;
            this.timeToCheck = null;
            this.observations = null;
            this.isEffective = null;
            this.dateToFinish = null;
            this.respToCheck = null;
            this.actionCorrectives = null;
            this.fiveWhys = [];
            this.classification = null;
            this.evidencesAnalises = [];
            this.needRevision = null,
            this.revisionDate = null,
            this.revisionNumber = null,
            this.reasonRevision = null
        },
        closeModal(){
            this.visible = false
        },
        tostAdvice(cor, msg){
            this.$toast.add({ severity: `${cor}`, summary: `${msg}`, life: 5000 });
        },
        addEvidence(e){
            const response = JSON.parse(e.xhr.responseText);
            // console.log(response);
            this.evidencesAnalises = [...this.evidencesAnalises, ...response.files];
            this.fasterUpdateAnomalie()
        },
        beforeAnalise(e){
            const response = JSON.parse(e.xhr.responseText);
            // console.log(response);
            this.imageFacts = [...this.imageFacts, ...response.files];
        },
        afterAnalise(e){
            const response = JSON.parse(e.xhr.responseText);
            // console.log(response);
            this.archives = [...this.archives, ...response.files];
        },
        afterGestor(e){
            const response = JSON.parse(e.xhr.responseText);
            // console.log(response);
            this.archivesRetrated = [...this.archivesRetrated, ...response.files];
        },
        async teste(){
            let input = document.getElementById('inputFile')

            console.log(input.files[0])

            let formData = new FormData();
            formData.append('files', input.files[0])

            console.log('>> formData >> ', formData);

            await axios.post('https://apiconnect.3nf.com.br/uploadAnomalias', 
                formData, 
                {headers: {'Content-Type': 'multipart/form-data'}}
            ).then((response)=> {
                console.log('SUCCESS!!', response);
            })
            .catch((error)=> {
                console.log('FAILURE!!', error);
            });

        },
        async deleteImageBefore(url, index){
            const options = {
                method: 'DELETE',
                url: `https://connectapi.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'success', summary:'Arquivo Deletado', life:3000})
                this.retirarimageFacts(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um problema', life:3000})
            })
        },
        async deleteImageAfter(url, index){
            const options = {
                method: 'DELETE',
                url: `https://connectapi.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'successs', summary:'Arquivo Deletado', life:3000})
                this.retirarArchives(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um erro', life:3000})
            })
        },
        async deleteImageGestor(url, index){
            const options = {
                method: 'DELETE',
                url: `https://connectapi.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'successs', summary:'Arquivo Deletado', life:3000})
                this.retirarArchivesGestor(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um erro', life:3000})
            })
        },
        async deleteEvidenceAnalyse(url, index){
            const options = {
                method: 'DELETE',
                url: `https://connectapi.3nf.com.br/uploadAnomalias`,
                data:{
                    fileUrl: url
                }
            }

            await axios.request(options).then((response)=>{
                console.log(response)
                this.$toast.add({severity:'successs', summary:'Arquivo Deletado', life:3000})
                this.removeEvidence(index)
            }).catch((error)=>{
                console.log(error)
                this.$toast.add({severity:'error', summary:'Houve um erro', life:3000})
            })
        },
        downloadImage(url){
            window.open(url, '_blank')
        },
        retirarimageFacts(index){
            if (index > -1 && index < this.imageFacts.length) {
                this.imageFacts.splice(index, 1);
            }
        },
        retirarArchives(index){
            if (index > -1 && index < this.archives.length) {
                this.archives.splice(index, 1);   
            }
        },
        retirarArchivesGestor(index){
            if (index > -1 && index < this.archivesRetrated.length) {
                this.archivesRetrated.splice(index, 1);   
            }
        },
        removeEvidence(index){
            if (index > -1 && index < this.evidencesAnalises.length) {
                this.evidencesAnalises.splice(index, 1);   
            }
        },
        editAnomalie(e){
            console.log(e)
            if(!e.data.archivesRetrated){
                this.archivesRetrated = [];
            }else{this.archivesRetrated = e.data.archivesRetrated;}

            this.objectId = e.data.objectId;
            this.resumeAnomalie= e.data.resumeAnomalie;
            this.dateAnomalie= new Date(e.data.date);
            this.departmentResp= {name: e.data.departmentResp, email:e.data.emailResp};
            this.reasonAnomalie= e.data.reasonAnomalie;
            this.envolvedInAnomalie= e.data.envolvedInAnomalie;
            this.typeAnomalie= {name: e.data.typeAnomalie};
            this.baseAnomalie= {name: e.data.base};
            this.placeAnomalie= {name: e.data.place}
            this.equipamentAnomalie= {name: e.data.equipament};
            this.nameEquipament= {name: e.data.nameEquipament};
            this.impactAnomalie= {name: e.data.impact};
            this.statusAnomalie= {name: e.data.status};
            this.resumeQuality= e.data.resumeQuality;
            this.archives= e.data.archives;
            this.imageFacts= e.data.imageFacts;
            this.causeAfterAnalise= e.data.causeAfterAnalise;
            this.contramedida= e.data.contramedida
            this.actionOfContention= e.data.actionOfContention;
            this.gestorArgument = e.data.gestorArgument;
            this.criticalityAnomalie = {name: e.data.criticalityAnomalie};
            this.typeCall = e.data.purgatory;
            this.actionImmediate = e.data.actionImmediate;
            this.timeToCheck = e.data.timeToCheck;
            this.isEffective = e.data.isEffective;
            this.dateToFinish = e.data.dateToFinish;
            this.respToCheck = e.data.respToCheck;
            this.observations = e.data.observations;
            this.actionCorrectives = e.data.actionCorrectives;   
            this.fiveWhys = e.data.fiveWhys; 
            this.classification = e.data.classification; 
            this.evidencesAnalises = e.data.evidencesAnalises||[];   
            this.needRevision = e.data.needRevision,
            this.revisionDate = new Date(e.data.revisionDate).toLocaleDateString() || null,
            this.revisionNumber = e.data.revisionNumber,
            this.reasonRevision = e.data.reasonRevision,

            this.visible= true;
        },
        resetData(){
            this.anomalies = [];
            this.getRNC()
        },
        formatData(x){
            return new Date(x).toLocaleDateString()
        },
        exportCSV(){
            this.$refs.anomalies.exportCSV()
        },
        printAnomalie(id){
            window.open(`/historic/${id}`, '_blank');
        },
        searchPendencie(e){
            this.filters['global'].value = e.value.numericId
        },
        enableButton(){
            if( 
                this.nameEquipament && 
                this.resumeAnomalie && 
                this.dateAnomalie && 
                this.departmentResp && 
                this.typeAnomalie && 
                this.baseAnomalie && 
                this.placeAnomalie && 
                this.equipamentAnomalie && 
                this.impactAnomalie &&
                this.needRevision
            ){
                return false
            }return true
        },
        toggle(event) {
            this.$refs.actionRegister.toggle(event);
        },
        toggle5w2h(event) {
            this.$refs.actionCorrective.toggle(event);
        },
        toggle5w(event) {
            this.$refs.fivewhys.toggle(event);
        },
        closeOp(){
            this.actionImmediateText = null;
            this.respEmailAction = null;
            this.dateLimit = null;
            this.what = null;
            this.why = null;
            this.where = null;
            this.when = null;
            this.who = null;
            this.how = null;
            this.howMuch = null;
            this.firstWhy = null;
            this.secondWhy = null;
            this.thirdWhy = null;
            this.fourthWhy = null;
            this.fifthWhy = null;
        },
        closeOp5w(){

        },
        addAction(){
            if(this.actionImmediate === undefined || this.actionImmediate === null){
                this.actionImmediate = []
            }

            this.actionImmediate.push({
                actionImmediateText: this.actionImmediateText,
                respEmailAction: this.respEmailAction,
                dateLimit: this.dateLimit,
                implement: false,
                newDateLimit: null
            })
            this.$refs.actionRegister.hide();
            this.fasterUpdateAnomalie()
        },
        add5w2h(){
            if(this.actionCorrectives === undefined || this.actionCorrectives === null){
                this.actionCorrectives = []
            }

            this.actionCorrectives.push({
                what: this.what,
                why: this.why,
                where: this.where,
                when: this.when,
                who: this.who,
                how: this.how,
                howMuch: this.howMuch
            })
            this.$refs.actionCorrective.hide();
            this.fasterUpdateAnomalie()            
        },
        addFiveWhys(){
            if(this.fiveWhys === undefined || this.fiveWhys === null){
                this.fiveWhys = []
            }
            this.fiveWhys.push({
                firstWhy: this.firstWhy,
                secondWhy: this.secondWhy,
                thirdWhy: this.thirdWhy,
                fourthWhy: this.fourthWhy,
                fifthWhy: this.fifthWhy
            })
            this.$refs.fivewhys.hide();
            this.fasterUpdateAnomalie() 
        },
        onCellEditCompleteFiveWhys(e) {
            console.log(e)
            const { data, newValue, field } = e; // data = objeto da linha

            // validação simples para marketValue e marginPct
            const numericFields = ['marketValue', 'marginPct'];
            if (numericFields.includes(field) && (newValue === '' || newValue === null || isNaN(newValue))) {
                e.preventDefault(); // cancela o commit
                return;
            }

            // atualiza a propriedade (suporta "a.b.c" se usar campos aninhados)
            this.setByPath(data, field, numericFields.includes(field) ? Number(newValue) : newValue);

            // opcional: força re-render clonando a linha dentro do array
            const i = this.fiveWhys.findIndex(it => it === data);
            if (i !== -1) this.fiveWhys.splice(i, 1, { ...this.fiveWhys[i] });

            this.fasterUpdateAnomalie()
        },
        onCellEditCompleteActionImmediate(e) {
            console.log(e)
            const { data, newValue, field } = e; // data = objeto da linha

            // validação simples para marketValue e marginPct
            const numericFields = ['marketValue', 'marginPct'];
            if (numericFields.includes(field) && (newValue === '' || newValue === null || isNaN(newValue))) {
                e.preventDefault(); // cancela o commit
                return;
            }

            // atualiza a propriedade (suporta "a.b.c" se usar campos aninhados)
            this.setByPath(data, field, numericFields.includes(field) ? Number(newValue) : newValue);

            // opcional: força re-render clonando a linha dentro do array
            const i = this.actionImmediate.findIndex(it => it === data);
            if (i !== -1) this.actionImmediate.splice(i, 1, { ...this.actionImmediate[i] });

            this.fasterUpdateAnomalie()
        },
        onCellEditCompleteFiveWTwoHows(e) {
            console.log(e)
            const { data, newValue, field } = e; // data = objeto da linha

            // validação simples para marketValue e marginPct
            const numericFields = ['marketValue', 'marginPct'];
            if (numericFields.includes(field) && (newValue === '' || newValue === null || isNaN(newValue))) {
                e.preventDefault(); // cancela o commit
                return;
            }

            // atualiza a propriedade (suporta "a.b.c" se usar campos aninhados)
            this.setByPath(data, field, numericFields.includes(field) ? Number(newValue) : newValue);

            // opcional: força re-render clonando a linha dentro do array
            const i = this.actionCorrectives.findIndex(it => it === data);
            if (i !== -1) this.actionCorrectives.splice(i, 1, { ...this.actionCorrectives[i] });

            this.fasterUpdateAnomalie()
        },
        setByPath(obj, path, value) {
            const keys = path.split('.');
            const last = keys.pop();
            let cur = obj;
            for (const k of keys) {
            if (cur[k] == null || typeof cur[k] !== 'object') cur[k] = {};
            cur = cur[k];
            }
            cur[last] = value;
        },
        delete5Whys(data){
            const i = this.fiveWhys.findIndex(it => it === data);
            if (i !== -1) this.fiveWhys.splice(i, 1);
            this.fasterUpdateAnomalie()
        },
        deleteImmediateAction(data){
            const i = this.actionImmediate.findIndex(it => it === data);
            if (i !== -1) this.actionImmediate.splice(i, 1);
            this.fasterUpdateAnomalie()
        },
        delete5w2h(data){
            const i = this.actionCorrectives.findIndex(it => it === data);
            if (i !== -1) this.actionCorrectives.splice(i, 1);
            this.fasterUpdateAnomalie()
        },
        deleteDoc(id){
            const options = {
                method: 'DELETE',
                url: `${import.meta.env.VITE_URL_API}classes/Anomalies/${id}`,
                headers: {
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_XPARSE_REST_API_KEY}`,
                    'X-Parse-Application-Id': `${import.meta.env.VITE_XPARSE_APP_ID}`
                }
            }
            axios.request(options).then((response) => {
                this.$toast.add({severity: 'success', summary: 'Sucesso', detail: 'Anomalia excluida com sucesso', life: 3000});                
                this.getRNC()
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    watch:{
        isEffective(value){
            console.log(value)
        }
    },
    created(){
        this.getRNC();
        document.title="Não Conformidades | Controle de Embarcação"
    }
}
</script>
<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="dataCentral">
            <div class="header">
                <Button @click="visible=true">Nova Não Conformidade</Button>
            </div>
            <div>
                <DataTable
                    :value="anomalies"
                    selectionMode="single"
                    @rowSelect="editAnomalie"
                    filterDisplay="menu"
                    ref="anomalies"
                    dataKey="id"
                    :style="{width:'90dvw'}"
                    scrollable 
                    scrollHeight="600px"
                    removableSort
                    :loading="isLoading"
                    v-model:filters="filters"
                    :globalFilterFields="['global', 'numericId', 'base', 'departmentResp', 'equipament', 'impact', 'nameEquipament', 'place', 'resumeAnomalie', 'status', 'typeAnomalie', 'classification.name']"
                >
                    <template #header>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <FloatLabel>
                                <InputText id="username" v-model="filters['global'].value"/>
                                <label for="username">Procure o desejado</label>
                            </FloatLabel>
                            <div style="display: flex; align-items: center;">
                                <Dropdown
                                    v-model="selectedPendencie"
                                    :options="pendencies"
                                    optionLabel="numericId"
                                    placeholder="Pendências"
                                    @change="searchPendencie($event)"
                                    v-show="userInfo.accessLevel < 1"
                                ></Dropdown>
                                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" v-show="userInfo.accessLevel < 1"/>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <span>Não há anomalias registradas</span>
                    </template>
                    <template #loading>
                        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                            <span class="loader"></span>
                        </div>                        
                    </template>
                    <Column field="numericId" header="Código"></Column>
                    <Column field="typeAnomalie" header="Tipo" sortable></Column>
                    <Column field="base" header="Base" sortable></Column>
                    <Column field="place" header="Local" sortable></Column>
                    <Column field="date" header="Data do ocorrido" sortable>
                        <template #body="{data}">
                            <div>{{ formatData(data.date) }}</div>                            
                        </template>
                    </Column>
                    <Column field="nameEquipament" header="Equipamento" sortable></Column>
                    <Column field="status" header="Status" sortable>
                        <template #body="slotProps">
                            <div style="display: flex; justify-content: center;">
                                <Tag 
                                    :value="slotProps.data.status" 
                                    :severity="getStatusLabel(slotProps.data.status)"
                                    style="text-align: center;"
                                ></Tag>
                            </div>
                        </template>
                    </Column>
                    <Column field="equipament" header="Tipo Equip." sortable></Column>
                    <Column field="classification.name" header="Class.">
                        <template #filter="{filterModel}">
                            <Dropdown
                                v-model="filterModel.value"
                                :options="classificationOptions"
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Selecione..."
                                class="p-column-filter"
                            />
                        </template>
                    </Column>
                    <Column field="criticalityAnomalie" header="Criticidade" sortable></Column>
                    <Column field="departmentResp" header="Depart. Responsável" sortable></Column>
                    <Column header="Ações">
                        <template #body="{data}">
                            <Button
                                rounded
                                icon="pi pi-trash"
                                @click="deleteDoc(data.objectId)"
                            ></Button>
                        </template>
                    </Column>
                    <template #footer> Total de Anomalias:  {{ anomalies ? anomalies.length : 0 }} </template>           
                </DataTable>
            </div>
        </div>
        <Dialog 
            v-model:visible="visible" 
            modal
            :draggable="false"
            :style="{width: '70dvw'}" 
            @hide="clearForm()" 
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
            <template #header>
                <div class="titleDialog">Cadastrar Não Conformidade</div>
            </template>
            <div class="formAnomalies">
                <TabView style="width: 100%;" v-model:activeIndex="active">
                    <TabPanel header="Ocorrência">
                        <div class="topBox">
                            <div>
                                <FloatLabel>
                                    <Textarea v-model="resumeAnomalie" rows="5" cols="40" style="resize: none;"/>
                                    <label>Descrição da Ocorrência:</label>
                                </FloatLabel>
                            </div>
                            <div class="groupQuestion">
                                <span>Data da ocorrência :</span>
                                <Calendar v-model="dateAnomalie" dateFormat="dd/mm/yy" touchUI/>
                            </div>
                            <div class="groupQuestion">
                                <span>Local:</span>
                                <Dropdown
                                    v-model="placeAnomalie" 
                                    :options="localOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o local"
                                >
                                </Dropdown>                            
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Departamentos Envolvidos:</span>
                                <Dropdown 
                                    v-model="departmentResp" 
                                    :options="departments"
                                    optionLabel="name" 
                                    placeholder="Selecione o Departamento">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion">
                                <span>Tipo do chamado :</span>
                                <Dropdown
                                    v-model="typeCall"
                                    :options="typeCallOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o tipo de chamado"
                                    v-if="userInfo?.department === 'ADMINISTRACAO' || userInfo?.department === 'Qualidade'"
                                ></Dropdown>
                            </div>                         
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Tipo de Não Conformidade :</span>
                                <Dropdown 
                                    v-model="typeAnomalie" 
                                    :options="typesOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o tipo">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion">
                                <span>Base:</span>
                                <Dropdown 
                                    v-model="baseAnomalie" 
                                    :options="baseOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione a base">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion">
                                <span>Nome do Equipamento:</span>
                                <Dropdown 
                                    v-model="nameEquipament" 
                                    :options="equipamentOptions"
                                    filter
                                    optionLabel="name" 
                                    placeholder="Selecione o equipamento">
                                </Dropdown>
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion">
                                <span>Tipo de equipamento:</span>
                                <Dropdown 
                                    v-model="equipamentAnomalie" 
                                    :options="equipamentTypeOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o tipo de equipamento">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion">
                                <span>Selecione o impacto:</span>
                                <Dropdown 
                                    v-model="impactAnomalie" 
                                    :options="impactOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o impacto">
                                </Dropdown>
                            </div>
                        </div>
                        <div class="topBox">
                            <div class="groupQuestion" style="width: 30%;" v-show="userInfo?.accessLevel === 0">
                                <span>Selecione o status</span>
                                <Dropdown 
                                    v-model="statusAnomalie" 
                                    :options="statusOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione o status">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion" style="width: 30%;">
                                <span>Selecione a criticidade :</span>
                                <Dropdown 
                                    v-model="criticalityAnomalie" 
                                    :options="criticalityOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione a criticidade">
                                </Dropdown>
                            </div>
                            <div class="groupQuestion" style="width: 30%;">
                                <span>Selecione a classificação :</span>
                                <Dropdown 
                                    v-model="classification" 
                                    :options="classificationOptions"
                                    optionLabel="name" 
                                    placeholder="Selecione a classificação">
                                </Dropdown>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <FileUpload
                                mode="basic" 
                                name="files"
                                :multiple="true"
                                :auto="true"
                                @upload="beforeAnalise($event)"
                                url="https://connectapi.3nf.com.br/uploadAnomalias"
                            >
                            </FileUpload>
                            <div class="boxImages">
                                <div 
                                    v-for="(image, index) in imageFacts" 
                                    :key="index"
                                >
                                    <div 
                                        style="width: 120px; display: flex; flex-direction: column; align-items: center;">
                                        <Image :src="image.location" alt="Teste" width="100" height="100" preview ></Image>
                                        <div style="display: flex;">
                                            <Button  icon="pi pi-times" rounded  @click="deleteImageBefore(image.location, index)" v-show="userInfo?.accessLevel === 0"></Button>
                                            <Button  icon="pi pi-download" rounded @click="downloadImage(image.location)"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Análise">
                        <div class="topBox" style="margin: 10px;">
                            <div style="width: 100%; display: flex; flex-direction: column; gap: 10px;">
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    <strong>Os 5 Porquês :</strong>
                                    <DataTable
                                        :value="fiveWhys"
                                        editMode="cell"
                                        @cell-edit-complete="onCellEditCompleteFiveWhys"
                                        :pt="{
                                            table: { style: 'min-width: 50rem' },
                                            column: {
                                                bodycell: ({ state }) => ({
                                                    class: [{ 'pt-0 pb-0': state['d_editing'] }]
                                                })
                                            }
                                        }"
                                    >
                                        <template #empty>
                                            <span>Nenhum Porquê cadastrado</span>
                                        </template>
                                        <template #header>
                                            <Button @click="toggle5w">Adicionar 5 Porquês</Button>
                                            <OverlayPanel ref="fivewhys" @hide="closeOp()">
                                                <div style="display: flex; gap: 10px;">
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>1º Por quê? :</span>
                                                        <Textarea
                                                            v-model="firstWhy"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>2º Por quê? :</span>
                                                        <Textarea
                                                            v-model="secondWhy"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>3º Por quê? :</span>
                                                        <Textarea
                                                            v-model="thirdWhy"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>4º Por quê? :</span>
                                                        <Textarea
                                                            v-model="fourthWhy"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>5º Por quê? :</span>
                                                        <Textarea
                                                            v-model="fifthWhy"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        label="Salvar"
                                                        @click="addFiveWhys"
                                                    ></Button>
                                                    <Button
                                                        label="Cancelar"
                                                        @click="() => {this.$refs.fivewhys.hide()}"
                                                    ></Button>
                                                </div>                                             
                                            </OverlayPanel>
                                        </template>
                                        <Column field="firstWhy" header="1º Porquê">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.firstWhy"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="secondWhy" header="2º Porquê">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.secondWhy"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="thirdWhy" header="3º Porquê">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.thirdWhy"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="fourthWhy" header="4º Porquê">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.fourthWhy"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="fifthWhy" header="5º Porquê">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.fifthWhy"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column header="Ações">
                                            <template #body="{ data }">
                                                <i 
                                                    class="pi pi-trash" 
                                                    style="font-size: 1rem; cursor: pointer;" 
                                                    @click="delete5Whys(data)"
                                                ></i>
                                            </template>
                                        </Column>
                                    </Datatable>
                                </div>
                            </div>
                        </div>                         
                        <div class="topBox" style="margin: 10px;">
                            <div style="width: 100%; display: flex; flex-direction: column; gap: 10px;">
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    <strong>Ação Imediata:</strong>
                                    <DataTable
                                        :value="actionImmediate"
                                        editMode="cell"
                                        @cell-edit-complete="onCellEditCompleteActionImmediate"
                                        :pt="{
                                            table: { style: 'min-width: 50rem' },
                                            column: {
                                                bodycell: ({ state }) => ({
                                                    class: [{ 'pt-0 pb-0': state['d_editing'] }]
                                                })
                                            }
                                        }"
                                    >
                                        <template #empty>
                                            <span>Nenhuma ação imediata cadastrada</span>
                                        </template>
                                        <template #header>
                                            <Button @click="toggle">Nova Ação Imediata</Button>
                                            <OverlayPanel ref="actionRegister" @hide="closeOp()">
                                                <div style="display: flex; gap: 10px;">
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Ação Imediata :</span>
                                                        <Textarea
                                                            v-model="actionImmediateText"
                                                            :autoResize="false"
                                                            rows="5"
                                                            cols="30"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Email do Responsavel :</span>
                                                        <InputText
                                                            v-model="respEmailAction"
                                                        ></InputText>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Prazo :</span>
                                                        <Calendar
                                                            dateFormat="dd/mm/yy"
                                                            v-model="dateLimit"
                                                        ></Calendar>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        label="Salvar"
                                                        @click="addAction"
                                                    ></Button>
                                                    <Button
                                                        label="Cancelar"
                                                        @click="() => {this.$refs.actionRegister.hide()}"
                                                    ></Button>
                                                </div>                                             
                                            </OverlayPanel>
                                        </template>
                                        <Column field="actionImmediateText" header="Ação Imediata">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.actionImmediateText"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="respEmailAction" header="Responsavel">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.actionImmediateText"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="dateLimit" header="Prazo">
                                            <template #body="{data}">
                                                {{ new Date(data.dateLimit).toLocaleDateString() }}    
                                            </template>
                                            <template #editor="{data}">
                                                <Calendar
                                                    v-model="data.dateLimit"
                                                    dateFormat="dd/mm/yy"
                                                ></Calendar>
                                            </template>
                                        </Column>
                                        <Column field="implant" header="Implementada?">
                                            <template #body="{data}">
                                                {{ data.implant ? "Sim" : "Nao" }}   
                                            </template>
                                            <template #editor="{data}">
                                                <Checkbox
                                                    v-model="data.implant"
                                                    :binary="true"
                                                ></Checkbox>
                                            </template>
                                        </Column>
                                        <Column field="newDataLimit" header="Novo Prazo">
                                            <template #body="{data}">
                                                {{ new Date(data.newDataLimit).toLocaleDateString() }}    
                                            </template>
                                            <template #editor="{data}">
                                                <Calendar
                                                    v-model="data.newDataLimit"
                                                    dateFormat="dd/mm/yy"
                                                ></Calendar>
                                            </template>
                                        </Column>
                                        <Column header="Ações">
                                            <template #body="{data}">
                                                <i 
                                                    class="pi pi-trash"
                                                    style="font-size: 1rem; cursor: pointer;"
                                                    @click="deleteImmediateAction(data)"    
                                                ></i>
                                            </template>
                                        </Column>
                                    </Datatable>
                                </div>
                            </div>
                        </div>
                        <div class="topBox" style="margin: 10px;">
                            <div style="display: flex; flex-direction: column; gap: 10px; justify-content: center; align-items: center;" >
                                <strong>A gestão de riscos e oportunidades do setor precisa ser revisada?</strong>
                                <div style="display: flex; gap: 10px;">
                                    <div>
                                        <RadioButton 
                                            v-model="needRevision"
                                            inputId="revision"
                                            name="revisionSim"
                                            value="true"
                                            :pt="{
                                                box: ({ props, context }) => ({
                                                    ...props, style: context.checked ? 'color: var(--primary-color-gc); background-color: var(--primary-color-gc); border-color: var(--primary-color-gc);' : ''
                                                }),
                                                icon: 'bg-white'
                                            }" 
                                        ></RadioButton>
                                        <label for="revision">Sim</label>
                                    </div>
                                    <div>
                                        <RadioButton 
                                            v-model="needRevision"
                                            inputId="revision"
                                            name="revisionSim"
                                            value="false"
                                            :pt="{
                                                box: ({ props, context }) => ({
                                                    ...props, style: context.checked ? 'color: var(--primary-color-gc); background-color: var(--primary-color-gc); border-color: var(--primary-color-gc);' : ''
                                                }),
                                                icon: 'bg-white'
                                            }" 
                                        ></RadioButton>
                                        <label for="revision">Não</label>
                                    </div>
                                </div>
                            </div>
                            <div v-if="needRevision == 'true'" style="display: flex; gap: 10px;">
                                <div class="inputGroup">
                                    <span>Revisão Nº :</span>
                                    <InputText
                                        v-model="revisionNumber"
                                    ></InputText>
                                </div>
                                <div class="inputGroup">
                                    <span>Data :</span>
                                    <Calendar
                                        v-model="revisionDate"
                                        format="dd/mm/yy"
                                    ></Calendar>
                                </div>
                            </div>
                            <div v-else-if="needRevision == 'false'" style="display: flex; gap: 10px;">
                                <div class="inputGroup" style="">
                                    <span>Motivo :</span>
                                    <Textarea
                                        v-model="reasonRevision"
                                    ></Textarea>
                                </div>
                            </div>                           
                        </div>
                        <div class="topBox" style="margin: 10px;">
                            <div style="width: 100%; display: flex; flex-direction: column; gap: 10px;">
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    <strong>5W2H :</strong>
                                    <DataTable
                                        :value="actionCorrectives"
                                        editMode="cell"
                                        @cell-edit-complete="onCellEditCompleteFiveWTwoHows"
                                        :pt="{
                                            table: { style: 'min-width: 50rem' },
                                            column: {
                                                bodycell: ({ state }) => ({
                                                    class: [{ 'pt-0 pb-0': state['d_editing'] }]
                                                })
                                            }
                                        }"
                                    >
                                        <template #empty>
                                            <span>Nenhuma ação imediata cadastrada</span>
                                        </template>
                                        <template #header>
                                            <Button @click="toggle5w2h">Adicionar 5W2H</Button>
                                            <OverlayPanel ref="actionCorrective" @hide="closeOp()">
                                                <div style="display: flex; gap: 10px;">
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>O Que ?</span>
                                                        <Textarea
                                                            v-model="what"
                                                            :autoResize="false"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Por que ?</span>
                                                        <Textarea
                                                            v-model="why"
                                                            :autoResize="false"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Onde ?</span>
                                                        <Textarea
                                                            v-model="where"
                                                            :autoResize="false"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Quando ?</span>
                                                        <Calendar
                                                            dateFormat="dd/mm/yy"
                                                            v-model="when"
                                                        ></Calendar>
                                                    </div>
                                                </div>
                                                <div style="display: flex; gap: 10px;">
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Quem ?</span>
                                                        <Textarea
                                                            v-model="who"
                                                            :autoResize="false"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Como ?</span>
                                                        <Textarea
                                                            v-model="how"
                                                            :autoResize="false"
                                                        ></Textarea>
                                                    </div>
                                                    <div style="display: flex; flex-direction: column; gap: 10px;">
                                                        <span>Quanto custa ?</span>
                                                        <InputNumber
                                                            v-model="howMuch"
                                                            mode="currency"
                                                            currency="BRL"
                                                            locale="pt-BR"
                                                        ></InputNumber>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        label="Salvar"
                                                        @click="add5w2h"
                                                    ></Button>
                                                    <Button
                                                        label="Cancelar"
                                                        @click="() => {this.$refs.actionCorrective.hide()}"
                                                    ></Button>
                                                </div>                                             
                                            </OverlayPanel>
                                        </template>
                                        <Column field="what" header="O que?">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.what"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="why" header="Por que?">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.why"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="where" header="Onde?">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.where"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="when" header="Quando?">
                                            <template #editor="{data}">
                                                <Calendar
                                                    v-model="data.when"
                                                    dateFormat="dd/mm/yy"
                                                ></Calendar>
                                            </template>
                                            <template #body="{data}">
                                                {{ new Date(data.when).toLocaleDateString() }}
                                            </template>
                                        </Column>
                                        <Column field="who" header="Quem?">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.who"                                                    
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="how" header="Como?">
                                            <template #editor="{data}">
                                                <Textarea
                                                    v-model="data.how"
                                                    :autoResize="false"
                                                ></Textarea>
                                            </template>
                                        </Column>
                                        <Column field="howMuch" header="Quanto Custa?">
                                            <template #editor="{data}">
                                                <InputNumber
                                                    v-model="data.howMuch"
                                                    mode="currency"
                                                    currency="BRL"
                                                    locale="pt-BR"                                                
                                                ></InputNumber>
                                            </template>
                                        </Column>
                                        <Column header="Ações">
                                            <template #body="{data}">
                                                <i 
                                                    class="pi pi-trash"
                                                    style="font-size: 1rem; cursor: pointer;"
                                                    @click="delete5w2h(data)"    
                                                ></i>
                                            </template>
                                        </Column>
                                    </Datatable>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; margin-top: 10px;">
                            <FileUpload
                                mode="basic" 
                                name="files"
                                :multiple="true"
                                :auto="true"
                                @upload="addEvidence($event)"
                                url="https://connectapi.3nf.com.br/uploadAnomalias"
                            >
                            </FileUpload>
                            <div class="boxImages">
                                <div 
                                    v-for="(image, index) in evidencesAnalises" 
                                    :key="index"
                                >
                                    <div 
                                        style="width: 120px; display: flex; flex-direction: column; align-items: center;">
                                        <Image :src="image.location" alt="Teste" width="100" height="100" preview ></Image>
                                        <div style="display: flex;">
                                            <Button  icon="pi pi-times" rounded  @click="deleteEvidenceAnalyse(image.location, index)" v-show="userInfo?.accessLevel === 0"></Button>
                                            <Button  icon="pi pi-download" rounded @click="downloadImage(image.location)"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Verificação da Eficácia">
                        <div style="width: 100%; display: flex; gap: 10px;">
                            <div class="questionInput">
                                <span>Prazo para verificação a eficácia :</span>
                                <Calendar
                                    dateFormat="dd/mm/yy"
                                    v-model="timeToCheck"
                                ></Calendar>
                            </div>
                            <div class="questionInput">
                                <span>Observações :</span>
                                <Textarea
                                    v-model="observations"
                                ></Textarea>
                            </div>
                            <div class="questionInput" style="align-items: center;">
                                <span>A ação corretiva foi eficaz ? :</span>
                                <div style="display: flex; gap: 10px;">
                                    <div style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center;">
                                        <label for="ingredient1">Sim</label>
                                        <RadioButton 
                                            v-model="isEffective" 
                                            inputId="ingredient1" 
                                            name="pizza" 
                                            :value="true"
                                            :pt="{
                                                box: ({ props, context }) => ({
                                                    ...props, style: context.checked ? 'color: var(--primary-color-gc); background-color: var(--primary-color-gc); border-color: var(--primary-color-gc);' : ''
                                                }),
                                                icon: 'bg-white'
                                            }" 
                                        />                                        
                                    </div>
                                    <div style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center;">
                                        <label for="ingredient1">Não</label>
                                        <RadioButton 
                                            v-model="isEffective" 
                                            inputId="ingredient1" 
                                            name="pizza" 
                                            :value="false"
                                            :pt="{
                                                box: ({ props, context }) => ({
                                                    ...props, style: context.checked ? 'color: var(--primary-color-gc); background-color: var(--primary-color-gc); border-color: var(--primary-color-gc);' : ''
                                                }),
                                                icon: 'bg-white'
                                            }"  
                                        />                                        
                                    </div>
                                </div>
                            </div>                                                         
                        </div>
                        <div style="width: 100%; display: flex; gap: 10px; margin: 10px 0px;">
                            <div class="questionInput">
                                <span>Data de Fechamento :</span>
                                <Calendar
                                    dateFormat="dd/mm/yy"
                                    v-model="dateToFinish"
                                ></Calendar>
                            </div>  
                            <div class="questionInput">
                                <span>Responsavel :</span>
                                <InputText
                                    v-model="respToCheck"
                                ></InputText>
                            </div>  
                        </div>
                        <div>
                            <div class="boxUpload">
                                <FileUpload 
                                    mode="basic" 
                                    name="files"
                                    :auto="true"
                                    :multiple="true"
                                    @upload="afterGestor($event)"
                                    url="https://connectapi.3nf.com.br/upload"
                                />
                                <div v-for="(file, i) in archivesRetrated" :key="i" 
                                    style="display: flex; margin: 10px; flex-wrap: wrap;"
                                >
                                    <div 
                                        class="uploadBox"
                                    >
                                        <Image :src="file.location" alt="teste" width="100" height="100" preview ></Image>
                                        <div style="display: flex; gap: 15px; padding: 10px;">
                                            <i class="pi pi-times" style="font-size: 1rem; cursor: pointer;" @click="deleteImageGestor(file.location, i)"></i>
                                            <i class="pi pi-download" style="font-size: 1rem; cursor: pointer;" @click="downloadImage(file.location)"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                    </TabPanel>                    
                </TabView>
                <div class="buttonsBottom">
                    <Button 
                        @click="printAnomalie(this.objectId)"
                        v-show="!!objectId"
                    >
                        Imprimir
                    </Button>                    
                    <Button 
                        @click="createAnomalie()"
                        :disabled="enableButton()"
                        :loading="loadingCreate"
                        v-if="!objectId"

                    >
                        Enviar Anomalia
                    </Button>
                    <Button 
                        @click="updateAnomalie()" 
                        :loading="loadingCreate"
                        :disabled="loadingCreate"
                        v-else
                    >
                        Atualizar RNC
                    </Button>
                    <Button 
                        @click="clearForm() & closeModal()"
                    >   
                        Cancelar
                    </Button>
                </div>
                <div style="width: 100%;">
                    <Message 
                        severity="error"
                        :closable="false"
                        icon="pi pi-exclamation-circle"
                        v-if="!objectId"
                    >
                        Todos os campos são necessarios
                    </Message>
                </div>
            </div>
        </Dialog>
    </div>
    <Toast></Toast>
</template>
<style scoped>
.main{
    width: 100dvw;
    height: 100%;
    min-height: 100dvh;
    background-color: var(--primary-color-gc);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.dataCentral{
    width: 90%;
    height: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
Button{
    margin: 10px;
    background-color: var(--secondary-color-gc);
    color: var(--primary-color-gc);
    font-weight:bold;
    border: none;
}
.titleDialog{
    font-weight: bolder;
    font-size: larger;
}
.topBox{
    display: flex;
    justify-content: center;
    gap: 20px;
}
.bottomBox{
    display: flex;
    width: 100%;
}
.formAnomalies{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.groupQuestion{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}
.questionInput{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
}
.optionsSide{
    width: 100%;
    gap: 10px;
}
.boxUpload{
    width: 100%;
    overflow: auto;
    max-height: 300px; 
    display: flex;
    flex-wrap: wrap;
}
.uploadBox{
    overflow: hidden;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    align-items: center;
    border: 1px solid #cecece;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 6px 10px 22px -9px rgba(89,89,89,1);
}
.boxImages{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.inputGroup{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cardGraph{
    width: 600px;
    height: 400px;
    padding: 10px;
    background-color: #fdfdfd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

}
.collum{
    flex-direction: column;
}

canvas{
    width: 100%;
    height: 100%;
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

@media (max-width:500px){
    .topBox{
        flex-direction: column;
        max-width: 100%;
    }
    .bottomBox{
        flex-direction: column;
    }
    .buttonsBottom{
        display: flex;

    }

}
</style>