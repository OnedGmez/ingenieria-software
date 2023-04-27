import { generalStore } from '.'
import { SHA256 } from 'crypto-js'
import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import { supabase } from '@/lib/supabaseClient'


export const useRepresentanteStore = defineStore("representanteStore", () => {

    const dataNoFiltradaRepresentantes = ref([{}])
    const store = generalStore()
    const respuesta = ref('')

    const nuevoRepresentante = ref('')

    /**
 * @param {*} valores: Contiene la información necesaria para efectuar correctamente la actualización
 * @returns: Devuelve un mensaje de éxito o fracaso al realizar la actualización
 */
    // const actualizarRepresentante = async (valores) => {
    //     store.filtradaDisponibildad = false
    //     try {

    //         const { data, error } = await supabase
    //             .from('vendors')
    //             .update({
    //                 country: valores.country,
    //                 urlimage: valores.urlimage
    //             })
    //             .eq('vendorcode', valores.vendorcode)

    //         if (error) {
    //             respuesta.value = [{
    //                 'mensaje': error,
    //                 'error': 'true'
    //             }]
    //         } else {
    //             respuesta.value = [{
    //                 'mensaje': '¡Proveedor actualizado exitosamente!',
    //                 'error': 'false'
    //             }]
    //         }
    //     } catch (error) {
    //         respuesta.value = [{
    //             'mensaje': error,
    //             'error': 'true'
    //         }]
    //     } finally {
    //         return respuesta.value
    //     }
    // }

    /**
 * @param {*} valores: Contiene la información necesaria para efectuar correctamente la adición
 * @returns: Devuelve un mensaje de éxito o fracaso al realizar la actualización
 */

    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        return edad;
    }

    const agregarRepresentante = async (valores) => {
        try {
            //Insertar en la tabla persons
            const { data, error } = await supabase
                .from('persons')
                .insert([
                    {
                        dni: valores.dni,
                        firstname: valores.pNombre,
                        secondname: valores.sNombre,
                        paternalsurname: valores.pApellido,
                        maternalsurname: valores.sApellido,
                        dayofbirth: valores.fechaNacimiento,
                        ageperson: calcularEdad(valores.fechaNacimiento),
                        genre: valores.genero,
                        urlprofilephoto: valores.urlimage
                    },
                ])
                
                if (error) {
                    respuesta.value = [{
                      'mensaje': error,
                      'error': 'true'
                    }]
                } else {
                    //Insertar en la tabla contactinformation
                    const { data, error } = await supabase 
                        .from('contactinformation')
                        .insert([
                            {
                                telephonenumber: valores.telefono,
                                email: valores.correo,
                                dniperson: valores.dni
                            },
                        ])

                        if (error) {
                            respuesta.value = [{
                              'mensaje': error,
                              'error': 'true'
                            }]
                        } else {
                            //Insertar en la tabla vendorrepresentatives
                            const { data, error } = await supabase 
                            .from('vendorrepresentatives')
                            .insert([
                                {
                                    dniperson: valores.dni,
                                    vendorcode: valores.vendorcode,
                                    active: true
                                },
                            ])
                            if (error) {
                                respuesta.value = [{
                                  'mensaje': error,
                                  'error': 'true'
                                }]
                            }
                        }
                }  

            if (!error) {
                respuesta.value = [{
                    'mensaje': 'Representante agregado éxitosamente',
                    'error': 'false'
                }]
            }

            // nuevoRepresentante.value = {
            //     'dni': valores.dni,
            //     'name': valores.pNombre,
            //     'dayofbirth': valores.fechaNacimiento,
            //     'urlimage': valores.urlimage,
            //     'telephonenumber': valores.telefono,
            //     'email': valores.correo,
            //     'available': true,
            //     'vendorname': valores.vendorname,
            //     'relationshipinitiation': valores.relationshipinitiation
            // }

            // console.log(nuevoRepresentante.value);
            // else{
            //     respuesta.value = [{
            //         'mensaje': error,
            //         'error': 'true'
            //     }]
            // }
        } catch (error) {
            respuesta.value = [{
                'mensaje': error,
                'error': 'true'
            }]
        } finally {
            return respuesta.value
        }
    }


    // watchEffect(() => {
    //     const representante = supabase.channel('custom-all-channel')
    //         .on(
    //             'postgres_changes',
    //             { event: '*', schema: 'public', table: 'persons' },
    //             (payload) => {
    //                 switch (payload.eventType) {
    //                     case 'INSERT':
    //                         dataNoFiltradaRepresentantes.value.push(nuevoRepresentante.value)
    //                         break;
                        // case 'UPDATE':
                        //     const proveedorTMP = dataNoFiltradaProveedores.value.filter(proveedor => proveedor.vendorcode == payload.old['vendorcode']);
                        //     const productoActualizado = {
                        //         'available': proveedorTMP[0].available,
                        //         'country': payload.new['country'],
                        //         'name': proveedorTMP[0].name,
                        //         'relationshipinitiation': proveedorTMP[0].relationshipinitiation,
                        //         'representativename': proveedorTMP[0].representativename,
                        //         'urlimage': proveedorTMP[0].urlimage,
                        //         'vendorcode': proveedorTMP[0].vendorcode
                        //     }
                        //     dataNoFiltradaProveedores.value = (JSON.parse(JSON.stringify(dataNoFiltradaProveedores.value).replaceAll(JSON.stringify(proveedorTMP[0]), JSON.stringify(productoActualizado))))
                        //     break;
            //         }
            //     }
            // )
            // .subscribe()

    //     return () => supabase.removeChannel(representante);
    // })

    return {
        // actualizarRepresentante,
        agregarRepresentante,
        dataNoFiltradaRepresentantes
    }
})