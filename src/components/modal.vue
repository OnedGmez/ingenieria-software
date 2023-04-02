<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <p class="modal-title" id="staticBackdropLabel"> {{ data['name'] }} </p>
                </div>
                <img src="../assets/img/aceta.jpg" class="img-fluid" alt="...">
                <div class="modal-body">
                    <dataModalProducto v-if="modulo === 'Inventario'" :dataProducto="data" />
                </div>
                <div class="modal-footer">
                    <div class="botones izquierda">
                        <button v-if="ordenarModo === false" @click="mostrarModal" id="boton-actualizar" type="button"
                            class="btn boton-desplegable">
                            <div class="d-flex">
                                <span class="d-block icono-boton"><font-awesome-icon icon="pen-to-square" /></span>
                                <span class=" d-block nombre-boton"> Actualizar </span>
                            </div>
                        </button>
                        <button v-if="ordenarModo === true" id="boton-agregar" type="button" class="btn boton-desplegable">
                            <div class="d-flex">
                                <span class="d-block icono-boton"><font-awesome-icon icon="plus" /></span>
                                <span class=" d-block nombre-boton"> Añadir </span>
                            </div>
                            <!--La función de añadir recibe el codigo del elemento (incluido en el objeto con la info)-->
                        </button>
                    </div>
                    <button type="button" class="btn btn-cerrar" @click="cerrarModal">Cancelar</button>
                    <!--Emitimos un evento mediante una función al contenedor padre para avisar que lo queremos cerrar-->
                </div>
            </div>
        </div>
    </div>
    <modalCRUD v-if="mostrandoModalCRUD" @ocultar-modal="() => mostrarModal()" :data=data :modulo=modulo
        accion="Actualizar" />
</template>

<style scoped>
/*Estilos modificados*/
.show {
    backdrop-filter: blur(2px) brightness(0.75);
}

.modal .modal-dialog .modal-content .modal-footer .btn {
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.9em + 0.04vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

.modal .modal-dialog .modal-content .modal-header {
    padding: 0;
    background-color: #3581B8;
}

.modal .modal-dialog .modal-content .modal-footer {
    padding: 0 4px 2px 4px;
    margin: 0;
    justify-content: space-between;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-header img {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px
}

.modal .modal-dialog .modal-content .modal-header .modal-title {
    color: #fff;
    font-family: 'fredoka-family';
    font-size: calc(1em + .85vw);
    position: relative;
    font-weight: 600;
    filter: drop-shadow(8px 10px 10px #000);
}

.modal .modal-dialog .modal-content .modal-body {
    padding: 5px 7px 5px 7px;
}

.modal .modal-dialog .modal-content .modal-footer .boton-desplegable {
    color: #fff;
    background-color: #3581B8;
    width: 26px;
    overflow-x: hidden;
    padding: 0px 1px 0px 4.5px !important;
    border-radius: 20px;
    transition: all 200ms ease-out;
}

.modal .modal-dialog .modal-content .modal-footer #boton-agregar {
    padding: 0px 1px 0px 5.5px !important;
}


.modal .modal-dialog .modal-content .modal-footer .boton-desplegable:hover {
    width: 105px;
}

.modal .modal-dialog .modal-content .modal-footer #boton-agregar:hover {
    width: 80px;
}


.modal .modal-dialog .modal-content .modal-footer .boton-desplegable div .icono-boton {
    margin: auto 4px auto 0;
    font-size: calc(0.75em + .4vw)
}

@media (max-width: 678px) {
    .modal .modal-dialog .modal-content .modal-footer .boton-desplegable {
        width: 105px;
    }

    .modal .modal-dialog .modal-content .modal-footer #boton-agregar {
        width: 80px;
    }

}
</style>

<script setup>
import { ref } from 'vue';
import { generalStore } from '@/store/index.js';
import dataModalProducto from '@/components/minicomponents/dataModalProductos.vue'
import modalCRUD from '@/components/modalCRUD.vue';
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])
const mostrandoModalCRUD = ref(false)

/**
 * Traemos el valor del modo de Ordenar para activar o desactivar el botón de añadir productos a la orden
 */
const store = generalStore()
const ordenarModo = store.ordenarModo

const cerrarModal = () => {
    emisiones('ocultarModal')
}

const mostrarModal = () => {
    mostrandoModalCRUD.value = !mostrandoModalCRUD.value
}

const productoModal = defineProps([
    'data',
    'modulo'
])
</script>