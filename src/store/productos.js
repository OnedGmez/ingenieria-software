import { generalStore } from '.'
import { SHA256 } from 'crypto-js'
import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import { supabase } from '@/lib/supabaseClient'

export const useProductoStore = defineStore("productoStore", () => {
  const cookies = document.cookie.split(';')
  const dataNoFiltradaProductos = ref([{}])
  const store = generalStore()
  const respuesta = ref('')
  const ordenarModo = ref(false)
  const productosOrdenados = ref([])

  const nuevoProducto = ref('')

  /**
   * dev: Oned Gómez
   * Función para actualizar un producto que seleccionamos en las tarjetas
   * @param {*} valores: Contiene la información que deseamos actualizar y el código del producto que deseamos actualizar
   * @returns: Devuelve una respuesta de éxito o fracaso después de actualizar
   */
  const actualizarProducto = async (valores) => {
    store.filtradaCategoria = false
    store.filtradaDisponibildad = false
    try {
      const { data, error } = await supabase
        .from('sucursalsinventory')
        .update({ stock: valores.stock })
        .eq('sucursalinventorycode', valores.sucursalinventorycode)

      if (error) {
        respuesta.value = [{
          'mensaje': error,
          'error': 'true'
        }]
      } else {
        respuesta.value = [{
          'mensaje': '¡Producto actualizado exitosamente!',
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
   * Función que nos sirve para enviar los datos de la orden y sus productos a la base de datos 
   * @returns retorna una respuesta con un mensaje y un bool de error, para poder mostrar la alerta
   */
  const generarOrden = async () => {
    const codigoempleado = store.desencriptarData(cookies[3].split('=')[1], 'employeecode')
    const sucursalcode = store.desencriptarData(cookies[2].split('=')[1], 'sucursalcode')
    try {
      let date = new Date();
      const fechaHora = store.fechaActual + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
      const codigoOrden = CryptoJS.MD5(codigoempleado + '-' + sucursalcode + '-' + '1' + '-' + fechaHora).toString()
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            ordercode: codigoOrden.substring(0,9),
            timedateofshipment: fechaHora,
            ordertypecode: 1,
            sender: codigoempleado,
            sucursalcode: sucursalcode,
            status: 'G'
          },
        ])

      if (error) {
        respuesta.value = [{
          'mensaje': error,
          'error': 'true'
        }]
      } else {
        for (const producto of productosOrdenados.value) {
          const { data, error } = await supabase
            .from('detailsorder')
            .insert([
              {
                ordercode: codigoOrden.substring(0, 9),
                sucursalinventorycode: producto.sucursalinventorycode,
                expirationdate: producto.expirationdate,
                quantity: producto.quantity
              }
            ])

          if (error) {
            respuesta.value = [{
              'mensaje': error,
              'error': 'true'
            }]
            break;
          }
        }
        respuesta.value = [{
          'mensaje': 'Orden añadida correctamente',
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

  //ref: funcion en DB
  const agregarProducto = async (valores) => {
    store.filtradaCategoria = false
    store.filtradaDisponibildad = false
    const cookies = document.cookie.split(';')
    const sucursalcode = store.desencriptarData(cookies[2].split('=')[1], 'sucursalcode')
    const codigoempleado = store.desencriptarData(cookies[3].split('=')[1], 'employeecode')
    try {
      //Primero buscamos si existe el producto que deseamos almacenar
      let { data: products, error } = await supabase
        .from('products')
        .select("*")
        .eq('productcode', valores.productcode)
        .eq('lotnumber', valores.lotnumber)
        .eq('categorycode', valores.categorycode)
        .eq('vendorcode', valores.vendorcode)
        .eq('purchaseprice', valores.purchaseprice)

      //En caso de no existir ningun producto igual al que vamos a ingresar, se hará la inserción en la tabla productos y en el inventario
      if (products.length < 1) {
        //tabla productos
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              productcode: valores.productcode,
              productname: valores.name,
              purchaseprice: valores.purchaseprice,
              productdescription: valores.productdescription,
              lotnumber: valores.lotnumber,
              unitsale: valores.unitsale,
              units: valores.units,
              categorycode: valores.categorycode,
              vendorcode: valores.vendorcode,
              urlimage: valores.urlimage
            }
          ])

        if (error) {
          respuesta.value = [{
            'mensaje': error,
            'error': 'true'
          }]
        } else {
          //guardar en el inventario
          const { data, error } = await supabase
            .from('sucursalsinventory')
            .insert([
              {
                stock: valores.stock,
                expirationdate: valores.expirationdate,
                lotnumber: valores.lotnumber,
                sucursalcode: sucursalcode,
                productcode: valores.productcode,
                registeredby: codigoempleado,
              }
            ])

          if (error) {
            respuesta.value = [{
              'mensaje': error,
              'error': 'true'
            }]
          } else {
            respuesta.value = [{
              'mensaje': '¡Producto guardado exitosamente!',
              'error': 'false'
            }]
            //Variable para capturar la información completa del producto ingresado
            const available = ref(false)
            if (valores.stock >= 1) {
              available.value = true
            }
            nuevoProducto.value = {
              'available': available.value,
              'expirationdate': valores.expirationdate,
              'lotnumber': valores.lotnumber,
              'sucursalcode': sucursalcode,
              'productcode': valores.productcode,
              'registeredby': codigoempleado,
              'stock': valores.stock,
              'name': valores.name,
              'purchaseprice': valores.purchaseprice,
              'productdescription': valores.productdescription,
              'unitsale': valores.unitsale,
              'units': valores.units,
              'categorycode': valores.categorycode,
              'categoryname': valores.categoryname,
              'vendorcode': valores.vendorcode,
              'vendorname': valores.vendorname,
              'urlimage': valores.urlimage
            }
          }
        }
      } else {
        //En caso de que si exista un producto igual al que estamos ingresando
        //Consultamos su codigo en la sucursal
        let { data: sucursalinventorycode, error } = await supabase
          .from('sucursalsinventory')
          .select("sucursalinventorycode")
          .eq('sucursalcode', sucursalcode)
          .eq('productcode', valores.productcode)
          .eq('expirationdate', valores.expirationdate)

        if (error) {
          respuesta.value = [{
            'mensaje': error,
            'error': 'true'
          }]
        } else {
          //Actualizamos el stock con su codigo de sucursal
          const { data, error } = await supabase
            .from('sucursalsinventory')
            .update({ stock: valores.stock })
            .eq('sucursalinventorycode', sucursalinventorycode[0]['sucursalinventorycode'])

          if (error) {
            respuesta.value = [{
              'mensaje': error,
              'error': 'true'
            }]
          } else {
            respuesta.value = [{
              'mensaje': '¡Producto actualizado exitosamente!',
              'error': 'false'
            }]
          }
        }
      }

      if (error) {
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

  /**
 * Función que nos ayuda a cambiar el valor del modo para ordenar productos
 */
  const setModoOrden = () => {
    ordenarModo.value = !ordenarModo.value
  }

  watchEffect(() => {
    const sucursalsinventory = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sucursalsinventory' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              dataNoFiltradaProductos.value.unshift(nuevoProducto.value)
              break;
            case 'UPDATE':
              const productoTMP = dataNoFiltradaProductos.value.filter(producto => producto.sucursalinventorycode == payload.old['sucursalinventorycode']);
              const productoActualizado = {
                'available': payload.new['available'],
                'categorycode': productoTMP[0].categorycode,
                'categoryname': productoTMP[0].categoryname,
                'expirationdate': productoTMP[0].expirationdate,
                'lotnumber': productoTMP[0].lotnumber,
                'name': productoTMP[0].name,
                'productcode': productoTMP[0].productcode,
                'productdescription': productoTMP[0].productdescription,
                'purchaseprice': productoTMP[0].purchaseprice,
                'stock': payload.new['stock'],
                'sucursalinventorycode': productoTMP[0].sucursalinventorycode,
                'units': productoTMP[0].units,
                'unitsale': productoTMP[0].unitsale,
                'urlimage': productoTMP[0].urlimage,
                'vendorcode': productoTMP[0].vendorcode,
                'vendorname': productoTMP[0].vendorname
              }
              dataNoFiltradaProductos.value = (JSON.parse(JSON.stringify(dataNoFiltradaProductos.value).replaceAll(JSON.stringify(productoTMP[0]), JSON.stringify(productoActualizado))))
              break;
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(sucursalsinventory);
  })


  return {
    setModoOrden,
    ordenarModo,
    agregarProducto,
    actualizarProducto,
    dataNoFiltradaProductos,
    productosOrdenados,
    generarOrden
  }
})