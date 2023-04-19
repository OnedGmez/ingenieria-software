import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import menuOpciones from '@/jsons/elementosMenu.json'
import { useUsuarioStore } from './usuario.js'
import { supabase } from '@/lib/supabaseClient'

export const generalStore = defineStore('store', () => {
  const storeUsuario = useUsuarioStore()
  const menu = ref(menuOpciones.elementos); 
  const filtradaDisponibildad = ref(false)
  const filtradaCategoria = ref(false)
  const filtradaBusqueda = ref(false)

  let date = new Date();
  const fechaActual = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  const limpiarStorages = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('productos')
    localStorage.removeItem('sucursales')
    localStorage.removeItem('categorias')
    localStorage.removeItem('proveedores')
  }

  const limpiarFiltros = () => {
    localStorage.removeItem('filtro-existencia')
    localStorage.removeItem('filtro-categoria')
    localStorage.removeItem('filtro-sucursal')
    localStorage.removeItem('filtro-activo')
  }
  limpiarFiltros()

  /**
   * dev: Oned Gómez
   * Función que nos ayudará a guardar en el LocalStorage toda la información que necesitamos que persista
   * @param {*} data Recibe la información que deseamos guardar en el localStorage
   * @param {*} key Se usa como la key de la tupla {key: value} y se usa como filtro para saber que tipo de información guardamos
   * @constant {*} usuario Almacena la información que respecta al usuario (rol, nombre, foto) para crear un JSON que utilizaremos para crear el token de sesión
   */
  const guardarLocalStorage = (data, key) => {
    if (key === 'usuario') {
      data['rol'] = encriptarData(data['rol'], 'rol')
      const usuario = ref([
        {
          rol: data['rol'],
          nombreusuario: data['nombreUsuario'],
          urlphoto: data['urlphoto']
        }
      ])
      storeUsuario.crearToken(JSON.stringify(usuario.value))
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * dev: Oned Gómez
   * Función para hacer la petición de categorias a la API de la base de datos para posteriormente almacenar la data en localStorge
   */
  const cargaCategorias = async () => {
    try {
      let { data: categories, error } = await supabase
        .from('categories')
        .select('*')

      if (error instanceof Error) {
        alert(error)
      }

      if (categories != '') {
        guardarLocalStorage(categories, 'categorias')
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
 * dev: Oned Gómez
 * Función para hacer la petición de sucursales a la API de la base de datos para posteriormente almacenar la data en localStorge
 */
  const cargarSucursales = async () => {
    try {

      let { data: sucursals, error } = await supabase
        .from('sucursals')
        .select('sucursalcode,sucursalname')


      if (error instanceof Error) {
        alert(error)
      }

      if (sucursals != '') {
        guardarLocalStorage(sucursals, 'sucursales')
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
* dev: Oned Gómez
* Función para hacer la petición de proveedores a la API de la base de datos para posteriormente almacenar la data en localStorge
*/
  const cargarProveedores = async () => {
    try {
      let { data: vendors, error } = await supabase
        .from('vendors')
        .select('vendorcode, vendorname')
        .eq('active', 'TRUE')

      if (error instanceof Error) {
        alert(error)
      }

      if (vendors != '') {
        guardarLocalStorage(vendors, 'proveedores')
      }
    } catch (error) {
      alert(error)
    }
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
    menu,
    encriptarData,
    desencriptarData,
    guardarLocalStorage,
    cargarProveedores,
    cargarSucursales,
    cargaCategorias,
    limpiarStorages,
    limpiarFiltros,
    fechaActual,
    filtradaDisponibildad,
    filtradaCategoria,
    filtradaBusqueda
  }
})