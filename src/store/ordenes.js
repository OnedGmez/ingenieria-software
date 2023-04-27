import { generalStore } from '.'
import { SHA256 } from 'crypto-js'
import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import { supabase } from '@/lib/supabaseClient'


export const useOrdenStore = defineStore("OrdenStore", () => {

    const dataNoFiltradaOrdenes = ref([{}])
    const store = generalStore()
    const respuesta = ref('')

    return {
        dataNoFiltradaOrdenes
    }
})