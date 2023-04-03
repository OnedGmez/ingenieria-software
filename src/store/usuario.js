/*
    dev: Oned Gómez
    description: Store para almacenar la información relacionada al usuario al momento de iniciar sesión 
*/
import { defineStore } from 'pinia'
import { generalStore } from '.'
import { ref } from 'vue'
import { SHA256 } from 'crypto-js'

export const useUsuarioStore = defineStore("usuariosStore", () => {
    const pub = generalStore()

    const crearToken = (data) => {
        const header = {
            "alg": "HS256",
            "typ": "JWT"
        }
        const firma = 'Corporación de salud Valenciana'

        const token = SHA256(
            (header) + "." +
            (data),
            firma);

        sessionStorage.setItem('token', data)
    }



    /*
    description: Ponemos a disposición todos los elementos que deseamos que sean accedidos desde fuera.
    */
    return {
        crearToken
    }
})