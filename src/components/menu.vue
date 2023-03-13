<template>
    <div class="navegacion">
        <div class="logo">
            <img class="img-fluid" src="../assets/logo.png" alt="Valenciana">
        </div>
        <ul>
            <li v-bind:id='0' :class="{ active: IDitem === '0' }" @click="cambiarID('0')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="boxes-stacked" /></span>
                    <span class=" d-block opcion-menu">Inventario</span>
                </a>
            </li>
            <li :class="{ active: IDitem === '1' }" @click="cambiarID('1')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="business-time" /></span>
                    <span class=" d-block opcion-menu">Representante Proveedores</span>
                </a>
            </li>
            <li :class="{ active: IDitem === '2' }" @click="cambiarID('2')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="building" /></span>
                    <span class=" d-block opcion-menu">Proveedores</span>
                </a>
            </li>
            <li :class="{ active: IDitem === '3' }" @click="cambiarID('3')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="user-tie" /></span>
                    <span class=" d-block opcion-menu">Empleados</span>
                </a>
            </li>
            <li :class="{ active: IDitem === '4' }" @click="cambiarID('4')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="truck-moving" /></span>
                    <span class=" d-block opcion-menu">Ordenes</span>
                </a>
            </li>
            <li :class="{ active: IDitem === '5' }" v-if="rol === 'Admin'" @click="cambiarID('5')">
                <a class="d-flex" href="#">
                    <span class="d-block icono-menu"><font-awesome-icon icon="receipt" /></span>
                    <span class=" d-block opcion-menu">Reportes</span>
                </a>
            </li>
        </ul>
        <div class="user_info">
            <div class="foto">
                <img class="img-fluid" src="../assets/logo.png" alt="Foto ">
            </div>
            <div class="info">
                <span class="nombre">Nombre Usuario</span>
                <span class="rol">Rol</span>
            </div>
        </div>
        <div class="logout">
            <span class="exit"></span>
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

.navegacion .logo{
    width: 100%;
    height: 10%;
}

.user_info .info {
    visibility: hidden;
}

.navegacion:hover {
    width: 225px;
}

.navegacion:hover .user_info .info {
    visibility: visible;
}

.navegacion:hover .user_info {
    display: flex;
}

.navegacion ul {
    position: relative;
    padding: 3% 0 0 3%;
    margin: 40px 0;
}

.navegacion ul li {
    position: relative;
    list-style: none;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
}

.navegacion ul li a {
    position: relative;
    width: 100%;
    color: #000 !important;
    align-items: center;
    padding: 2px 10px;
}

.navegacion ul li a .icono-menu {
    position: relative;
    min-width: 40px;
    height: auto;
    text-align: center;
    font-size: 25px
}

.navegacion ul li a .opcion-menu {
    position: relative;
    padding-left: 15px;
    height: auto;
    font-size: calc(.9em + 0.3vw);
}

.navegacion ul .active {
    background-color: #3581B8;
}

.navegacion ul .active span {
    color: #fff !important;
}

.navegacion ul .active a::before {
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

.navegacion ul .active a::after {
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

.user_info .foto {
    height: 50px;
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
const usuario = useUsuarioStore()
const rol = usuario.rol
console.log(rol)

const IDitem = ref('0')

const cambiarID = (ID) => {
    IDitem.value = ID
}

</script>