import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'

//Importamos librerias/frameworks externos instalados
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import axios from 'axios'

//Configuramos los frameworks a utilizar
//Configuramos el axios
//montamos el código en el contenedor #app
const pinia = createPinia()
const app = createApp(App).use(router).use(bootstrap)
app.config.globalProperties.axios=axios
app.use(pinia)
app.mount('#app')

