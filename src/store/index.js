import { defineStore } from 'pinia'
import {ref} from 'vue'
import menuOpciones from '@/jsons/elementosMenu.json'

export const generalStore = defineStore('store', () => {
  const menu = ref(menuOpciones.elementos);

  return {
    menu
  }
})