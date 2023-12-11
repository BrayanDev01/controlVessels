import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Listbox from 'primevue/listbox'
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dialog from 'primevue/dialog';
import Row from 'primevue/row';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import '../src/style.scss'
import App from './App.vue'

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '../src/assets/theme.css';

const app = createApp(App);

const pinia = createPinia()



app.use(PrimeVue);
app.component('Button', Button);
app.component('Fieldset', Fieldset)
app.component('FileUpload', FileUpload)
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Toast', Toast);
app.component('Listbox', Listbox);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Textarea', Textarea);    
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Dialog', Dialog)
app.use(ToastService);
app.use(pinia)
app.use(router);
app.mount('#app')


// createApp(App)
// .use(PrimeVue)
// .use(router)
// .mount('#app')
