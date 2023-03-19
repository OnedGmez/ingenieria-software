<template>
    <div class="navegacion">
        <div class="logo">
            <img class="img-fluid" src="../assets/logo.png" alt="Valenciana">
        </div>
        <div id="menu-opciones">
            <div v-for="opcion, index in opciones" class="opcion-menu" :key="opcion.key"
                :class="{ active: IDitem === index }" @click="cambiarID(index)">
                <a class="d-flex" href="#">
                    <span class="d-block icono-opcion"><font-awesome-icon :icon="opcion.icono" /></span>
                    <span class=" d-block nombre-opcion"> {{ opcion.nombreElemento }} </span>
                </a>
            </div>
        </div>
        <div class="user_info">
            <div class="foto">
                <img class="img-fluid" src="../assets/img/prueba.jpg" alt="Foto ">
            </div>
            <div class="info">
                <span class="nombre">Nombre Usuario</span>
                <span class="rol">Rol</span>
            </div>
        </div>
        <div class="logout">
            <span class="exit"><font-awesome-icon icon="door-open" /></span>
        </div>
    </div>
</template>

<style scoped>
.navegacion {
    position: relative;
    width: 65px;
    box-shadow: 8px 0 0 #3581B8;
    height: 100%;
    border-left: 5px solid #fff;
    overflow-x: hidden;
    transition: all 350ms ease-out;
}

.navegacion .logo {
    width: 100%;
    height: 10%;
}

.user_info .info,
.logout {
    visibility: hidden;
}

.navegacion:hover {
    width: 225px;
}

.navegacion:hover .user_info .info,
.navegacion:hover .logout {
    visibility: visible;
}

.navegacion:hover .user_info {
    display: flex;
}

.navegacion #menu-opciones {
    position: relative;
    padding: 3% 0 0 3%;
    margin: 40px 0;
}

.navegacion #menu-opciones .opcion-menu {
    position: relative;
    list-style: none;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
}

.navegacion #menu-opciones .opcion-menu a {
    position: relative;
    width: 100%;
    color: #000 !important;
    align-items: center;
    padding: 2px 10px;
}

.navegacion #menu-opciones .opcion-menu a .icono-opcion,
.logout {
    position: relative;
    min-width: 40px;
    height: auto;
    text-align: center;
    font-size: 25px
}

.navegacion #menu-opciones .opcion-menu a .nombre-opcion {
    position: relative;
    padding-left: 15px;
    height: auto;
    font-size: calc(.9em + 0.3vw);
}

.navegacion #menu-opciones .active {
    background-color: #3581B8;
}

.navegacion #menu-opciones .active span {
    color: #fff !important;
}

.navegacion #menu-opciones .active a::before {
    content: '';
    position: absolute;
    top: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #ffffff00;
    border-radius: 50%;
    box-shadow: 15px 15px #3581B8;
}

.navegacion #menu-opciones .active a::after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #ffffff00;
    border-radius: 50%;
    box-shadow: 15px -15px #3581B8;
}

.img-fluid {
    height: 100%;
}

.user_info {
    padding: 0;
    position: absolute;
    display: -webkit-box;
    bottom: 0;
}

.logout {
    position: absolute;
    bottom: 1%;
    right: 0;
}

.logout:hover{
    cursor: pointer;
    color:#3581B8
}

.user_info .foto {
    height: 50px;
    border-radius: 50%;
    width: 50px;
}

.user_info .foto .img-fluid {
    width: 100%;
    border-radius: 50%;
}

.user_info .info {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 5px;
}

.user_info .info .nombre {
    font-weight: bold;
}
</style>

<script setup>
import { ref, reactive } from "vue";
//importamos el store para poder obtener las variables con la información
import { useUsuarioStore } from '@/store/usuario.js'
import { generalStore } from '@/store/index.js'
const props = defineProps(['rol', 'nombreUsuario'])
const gralStore = generalStore();
const usuario = useUsuarioStore();

const opciones = gralStore.menu;
const rol = usuario.rol
console.log(rol)

const IDitem = ref(0)

/**
 * dev: Oned Gómez
 * @param {*} ID recibe el ID de la opción a la que se le ha dado click
 */
const cambiarID = (ID) => {
    IDitem.value = ID
}

</script>