/*
    dev: Oned Gómez
    description: Store para almacenar la información relacionada al usuario al momento de iniciar sesión 
*/
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useUsuarioStore = defineStore("usuariosStore", () => {   
    const rol = ref('');
    const nombreUsuario = ref('');
    const urlPhoto = ref('')

    /*
    newRol(in): Recibe el valor para la variable especificada
    */
    const setRol = (newRol) => {
        rol.value = newRol
    }

    /*
    description: Ponemos a disposición todos los elementos que deseamos que sean accedidos desde fuera.
    */
    return{
        rol,
        nombreUsuario,
        urlPhoto,
        setRol
    }
})