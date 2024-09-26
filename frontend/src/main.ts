import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import {localeRu} from "@/assets/helpers/locale";

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from "primevue/menubar";
import BlockUI from 'primevue/blockui';
import Password from "primevue/password";
import Tooltip from 'primevue/tooltip';
import Message from "primevue/message";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import DataView from 'primevue/dataview';
import Dropdown from "primevue/dropdown";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Image from 'primevue/image';
import Skeleton from 'primevue/skeleton';
import ScrollTop from 'primevue/scrolltop';
import InputSwitch from 'primevue/inputswitch';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import OrderList from "primevue/orderlist";

import './assets/css/main.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';



const app = createApp(App);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Password', Password);
app.component('BlockUI', BlockUI);
app.component('Message', Message);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Timeline', Timeline);
app.component('Card', Card);
app.component('DataView', DataView);
app.component('Dropdown', Dropdown);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Image', Image);
app.component('Skeleton', Skeleton);
app.component('ScrollTop', ScrollTop);
app.component('InputSwitch', InputSwitch);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('OrderList', OrderList);

app.directive('tooltip', Tooltip);

app.use(createPinia());
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    ripple: true, locale: localeRu
},);

app.mount('#app')
