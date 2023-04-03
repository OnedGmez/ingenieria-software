import { defineStore } from 'pinia'
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import menuOpciones from '@/jsons/elementosMenu.json'

export const generalStore = defineStore('store', () => {

  const menu = ref(menuOpciones.elementos);
  const ordenarModo = ref(false)
  const nuevoMenu = ref([])

  const filtrar = (rol) =>{
    nuevoMenu.value = []
    for (let i = 0; i < (menu.value).length; i++) {
      const element = (menu.value)[i];
      const index = (JSON.stringify(element,['permitidoPara'])).indexOf(rol)
      if(index !== -1){
        nuevoMenu.value.push(element)
      }
    }
  }




  /**
   * Función que nos ayuda a cambiar el valor del modo para ordenar productos
   */
  const setModoOrden = () => {
    ordenarModo.value = !ordenarModo.value
  }


  /**
   * Funciones de utilidad pública
   */
  const encriptarData = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  const desencriptarData = (data, key) => {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }


  return {
    nuevoMenu,
    setModoOrden,
    ordenarModo,
    encriptarData,
    desencriptarData,
    filtrar
  }
})