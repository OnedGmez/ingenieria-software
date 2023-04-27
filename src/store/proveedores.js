import { generalStore } from '.'
import { SHA256 } from 'crypto-js'
import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import { supabase } from '@/lib/supabaseClient'


export const useProveedorStore = defineStore("proveedorStore", () => {

    const dataNoFiltradaProveedores = ref([{}])
    const store = generalStore()
    const respuesta = ref('')

    const nuevoProveedor = ref('')

    /**
 * dev: Oned Gómez
 * Función que nos facilitará la actualización del proveedor 
 * @param {*} valores: Contiene la información necesaria para efectuar correctamente la actualización
 * @returns: Devuelve un mensaje de éxito o fracaso al realizar la actualización
 */
    const actualizarProveedor = async (valores) => {
        store.filtradaDisponibildad = false
        try {

            const { data, error } = await supabase
                .from('vendors')
                .update({
                    country: valores.country,
                    urlimage: valores.urlimage
                })
                .eq('vendorcode', valores.vendorcode)

            if (error) {
                respuesta.value = [{
                    'mensaje': error,
                    'error': 'true'
                }]
            } else {
                respuesta.value = [{
                    'mensaje': '¡Proveedor actualizado exitosamente!',
                    'error': 'false'
                }]
            }
        } catch (error) {
            respuesta.value = [{
                'mensaje': error,
                'error': 'true'
            }]
        } finally {
            return respuesta.value
        }
    }

    /**
 * dev: Oned Gómez
 * Función que nos facilitará la adición de un nuevo proveedor 
 * @param {*} valores: Contiene la información necesaria para efectuar correctamente la adición
 * @returns: Devuelve un mensaje de éxito o fracaso al realizar la actualización
 */
    const agregarProveedor = async (valores) => {
        try {
            const { data, error } = await supabase
                .from('vendors')
                .insert([
                    {
                        vendorname: valores.name,
                        country: valores.country,
                        urlimage: valores.urlimage
                    },
                ])
            const vendorcode = CryptoJS.MD5(valores.name + '-' + valores.relationshipinitiation + '-' + valores.country).toString()
            nuevoProveedor.value = {
                'available': false,
                'country': valores.country,
                'name': valores.name,
                'relationshipinitiation': valores.relationshipinitiation,
                'representativename': 'define un representante',
                'urlimage': valores.urlimage,
                'vendorcode': vendorcode.substring(0, 11)
            }

            if (!error) {
                respuesta.value = [{
                    'mensaje': 'Proveedor agregado éxitosamente, estado: Inactivo',
                    'error': 'false'
                }]
            }else{
                respuesta.value = [{
                    'mensaje': error,
                    'error': 'true'
                }]
            }
        } catch (error) {
            respuesta.value = [{
                'mensaje': error,
                'error': 'true'
            }]
        } finally {
            return respuesta.value
        }
    }


    watchEffect(() => {
        const vendors = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'vendors' },
                (payload) => {
                    switch (payload.eventType) {
                        case 'INSERT':
                            dataNoFiltradaProveedores.value.push(nuevoProveedor.value)
                            break;
                        case 'UPDATE':
                            const proveedorTMP = dataNoFiltradaProveedores.value.filter(proveedor => proveedor.vendorcode == payload.old['vendorcode']);
                            console.log(proveedorTMP);
                            const productoActualizado = {
                                'available': proveedorTMP[0].available,
                                'country': payload.new['country'],
                                'name': proveedorTMP[0].name,
                                'relationshipinitiation': proveedorTMP[0].relationshipinitiation,
                                'representativename': proveedorTMP[0].representativename,
                                'urlimage': proveedorTMP[0].urlimage,
                                'vendorcode': proveedorTMP[0].vendorcode
                            }
                            dataNoFiltradaProveedores.value = (JSON.parse(JSON.stringify(dataNoFiltradaProveedores.value).replaceAll(JSON.stringify(proveedorTMP[0]), JSON.stringify(productoActualizado))))
                            break;
                    }
                }
            )
            .subscribe()

        return () => supabase.removeChannel(vendors);
    })

    return {
        actualizarProveedor,
        agregarProveedor,
        dataNoFiltradaProveedores
    }
})