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


    watchEffect(() => {
        const orders = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log(dataNoFiltradaOrdenes.value)
                    dataNoFiltradaOrdenes.value = (dataNoFiltradaOrdenes.value).filter(orden => {
                        return orden.ordercode != payload.old['ordercode']
                    })
                    console.log(dataNoFiltradaOrdenes.value)
                }
            )
            .subscribe()
        return () => supabase.removeChannel(orders);
    })

    return {
        dataNoFiltradaOrdenes
    }
})