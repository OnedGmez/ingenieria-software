import { defineStore } from 'pinia'
import { ref } from 'vue'
import CryptoJS from 'crypto-js'
import menuOpciones from '@/jsons/elementosMenu.json'
import { useUsuarioStore } from './usuario.js'
import { supabase } from '@/lib/supabaseClient'

export const generalStore = defineStore('store', () => {
  const storeUsuario = useUsuarioStore()
  const menu = ref(menuOpciones.elementos);
  const ordenarModo = ref(false)
  const nuevoMenu = ref([])

  const filtrar = (rol) => {
    nuevoMenu.value = []
    for (let i = 0; i < (menu.value).length; i++) {
      const element = (menu.value)[i];
      const index = (JSON.stringify(element, ['permitidoPara'])).indexOf(rol)
      if (index !== -1) {
        nuevoMenu.value.push(element)
      }
    }
  }

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
      } else {
        alert('Categorias vacías')
      }
    } catch (error) {
      alert(error)
    }
  }
  cargaCategorias()

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
      } else {
        alert('Sucursales vacías')
      }
    } catch (error) {
      alert(error)
    }
  }
  cargarSucursales()


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
    filtrar,
    guardarLocalStorage
  }
})