import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import menuOpciones from '@/jsons/elementosMenu.json'
import { useUsuarioStore } from './usuario.js'
import { supabase } from '@/lib/supabaseClient'

export const generalStore = defineStore('store', () => {
  //Variables que hacen referencia al o los stores que maneja el proyecto
  const storeUsuario = useUsuarioStore()
  const menu = ref(menuOpciones.elementos); 

  //Booleanas para definir si están activados unos u otros filtros
  const filtradaDisponibildad = ref(false)
  const filtradaCategoria = ref(false)
  const filtradaBusqueda = ref(false)

  let date = new Date();
  const fechaActual = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  const fechaEdadValida = String(date.getFullYear() - 18) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
/**
 * dev: Oned Gómez
 * Función que utilizamos para limpiar la data del localstorage una vez que salgamos de la sesión
 */
  const limpiarStorages = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('productos')
    localStorage.removeItem('sucursales')
    localStorage.removeItem('categorias')
    localStorage.removeItem('proveedores')
  }

  /**
   * dev: Oned Gómez
   * Función que es utilizada para eliminar el registro de los filtros al iniciar la aplicación y al cerrar sesión 
   */
  const limpiarFiltros = () => {
    localStorage.removeItem('filtro-existencia')
    localStorage.removeItem('filtro-categoria')
    localStorage.removeItem('filtro-sucursal')
    localStorage.removeItem('filtro-activo')
  }
  limpiarFiltros()

  /**
   * dev: Oned Gómez
   * Función que nos ayudará a guardar en el LocalStorage toda la información que necesitamos que persista para ser manipulada más adelante
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
   * Función para hacer la petición de categorias a la API de la base de datos para posteriormente almacenar la data en localStorge y utilizarla donde sea requerida
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
 * Función para hacer la petición de sucursales a la API de la base de datos para posteriormente almacenar la data en localStorge y utilizarla donde sea requerida
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
* Función para hacer la petición de proveedores a la API de la base de datos para posteriormente almacenar la data en localStorge y utilizarla donde sea requerida
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
/**
 * dev: Oned Gómez
 * Función utilizada para encriptar data, especificamente textos, cantidades, etc. con el algoritmo de MD5
 * @param {*} data: Contiene la información que deseamos encriptar
 * @param {*} key: Identificador que solicita el algoritmo para poder encriptar de mejor manera
 * @returns devuelve una cadena de texto de 32 caracteres que representa la data ya pasada por el algoritmo de encriptado 
 */
  const encriptarData = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  /**
   * dev: Oned Gómez
   * Función utilizada básicamente para revertir el proceso de encriptación, porque el algoritmo permite encriptar y desencriptar teniendo la key con la que fue la data encriptada
   * @param {*} data: Contiene cadena de texto que deseamos desencriptar (cabe recalcar que el algoritmo detecta si es MD5 la encriptación porque los primeros caracteres representan un patrón del algoritmo)
   * @param {*} key: Identificador para desencriptar, debe ser el mismo con el que fue encriptada la data
   * @returns devuelve la información desencriptada y lista para utilizarse
   */
  const desencriptarData = (data, key) => {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }

  /**
   * dev: Oned Gómez
   * Función que evalua un texto para validar que tenga la estructura de un correo valido
   * @param {*} correo: texto que se desea evaluar para obtener la retroalimentación si es o no válido
   * @returns: devuelve true si el correo cumple con la expresión regular y false sino
   */
  const validarCorreo = (correo) => {
    if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo)) {
      return true
    } else {
      return false
    }
  }

  /**
   * dev: Oned Gómez
   * Función que nos devuelve la edad, con relación a la fecha actual y la fecha de nacimiento, es decir, (fechaHoy - fechaNacimiento)
   * @param {*} fechaNacimiento: Contiene la infmormación de fecha de nacimiento de la cuál deseamos obtener la edad
   * @returns devuelve un entero que representa la edad que se obtuvo por medio de la fecha que se indicó
   */
  const calcularEdad = (fechaNacimiento) => {
    var fechaFin = new Date(fechaActual).getTime();
    var fechaInicio = new Date(fechaNacimiento).getTime();
    return Math.round((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24 * 365))
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
    validarCorreo,
    calcularEdad,
    fechaActual,
    filtradaDisponibildad,
    filtradaCategoria,
    filtradaBusqueda,
    fechaEdadValida
  }
})