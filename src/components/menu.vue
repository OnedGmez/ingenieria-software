<template>
    <div class="menu">
        <div class="navegacion">
            <div class="logo">
                <img class="img-fluid" src="../assets/logo.png" alt="Valenciana">
            </div>
            <div id="menu-opciones">
                <div v-for="opcion, index in opciones" class="opcion-menu" :key="opcion.key"
                    :class="{ active: IDitem === index }" @click="cambiarID(index, opcion.path)">
                    <a class="d-flex" href="#">
                        <span class="d-block icono-opcion"><font-awesome-icon :icon="opcion.icono" /></span>
                        <span class=" d-block nombre-opcion"> {{ opcion.nombreElemento }} </span>
                    </a>
                </div>
            </div>
            <div class="pie-menu">
                <div class="foto">
                    <img class="img-fluid" src="../assets/img/prueba.jpg" alt="Foto ">
                </div>
                <div class="info">
                    <span class="nombre">Nombre Usuario</span>
                    <span class="rol">{{ rol }}</span>
                </div>
                <div class="logout">
                    <span class="exit"><font-awesome-icon icon="door-open" /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*
* Al contenedor con clase menu, le daremos una posición sticky, para mantener en la misma posición al menú
*/
#vista-inventario .menu {
    position: sticky;
    top: 0;
    height: 100vh;
}

.navegacion {
    position: relative;
    width: 65px;
    box-shadow: 8px 0 0 #3581B8;
    height: 100%;
    border-left: 5px solid #fff;
    z-index: 1;
    background-color: #fff;
    overflow-x: hidden;
    text-align: center;
    transition: all 350ms ease-out;
}

.navegacion .logo {
    width: 100%;
    height: 10%;
    margin: 8px 0 0 0;
}

.navegacion:hover {
    width: 230px;
}


.navegacion #menu-opciones {
    position: relative;
    padding: 3% 0 0 3%;
    margin: 40px 0;
}

.navegacion .pie-menu {
    position: absolute;
    display: -webkit-box;
    bottom: 10px;
}

.navegacion .pie-menu .logout {
    position: relative;
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


.logout:hover {
    cursor: pointer;
    color: #3581B8
}

.pie-menu .foto {
    position: relative;
    height: 50px;
    border-radius: 50%;
    width: 50px;
    margin: 0 5px 0px 3px;
}

.pie-menu .info {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 3px;
    text-align: justify;
    justify-content: center
}

.pie-menu .info .rol {
    font-size: smaller;
}

.pie-menu .logout {
    position: relative;
    margin: auto auto;
}

.pie-menu .foto .img-fluid {
    width: 100%;
    border-radius: 50%;
}


.pie-menu .info .nombre {
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

const IDitem = ref(0)

/**
 * dev: Oned Gómez
 * @param {*} ID recibe el ID de la opción a la que se le ha dado click
 */
const cambiarID = (ID, path) => {
    IDitem.value = ID
    console.log(path)
}

</script>