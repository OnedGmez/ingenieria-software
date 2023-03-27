<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <p class="modal-title" id="staticBackdropLabel">Modal title</p>
                </div>
                <img src="../assets/img/aceta.jpg" class="img-fluid" alt="...">
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn boton-desplegable">
                        <div class="d-flex">
                            <span class="d-block icono-boton"><font-awesome-icon icon="plus" /></span>
                            <span class=" d-block nombre-boton"> Añadir </span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-cerrar" @click="cerrarModal">Cancelar</button>
                    <!--Emitimos un evento mediante una función al contenedor padre para avisar que lo queremos cerrar-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*Estilos modificados*/
.show {
    backdrop-filter: blur(2px) brightness(0.75);
}


.modal .modal-dialog .modal-content .modal-footer {
    justify-content: space-between;
}

.modal .modal-dialog .modal-content .modal-footer .btn {
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
}

.modal .modal-dialog .modal-content .modal-header {
    padding: 0;
    background-color: #3581B8;
}

.modal .modal-dialog .modal-content .modal-footer .btn-cerrar {
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
}

.modal .modal-dialog .modal-content .modal-footer {
    padding: 0 4px 2px 4px;
    margin: 0;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-footer .btn-cerrar {
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn-cerrar:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

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

.modal .modal-dialog .modal-content .modal-footer .boton-desplegable {
    color: #fff;
    background-color: #3581B8;
    width: 20px;
    overflow-x: hidden;
    padding: 0 15px 0 5px !important;
    border-radius: 15px;
    transition: all 200ms ease-out;
}



.modal .modal-dialog .modal-content .modal-footer .boton-desplegable:hover {
    width: 75px;
}

.modal .modal-dialog .modal-content .modal-footer .boton-desplegable div .icono-boton {
    margin: auto 4px auto 0;
    font-size: calc(0.75em + .3vw)
}
</style>

<script setup>

//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const cerrarModal = () => {
    emisiones('ocultarModal')
}


</script>