<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div v-if="modulo === 'Inventario'" class="formulario">
                        <formularioProductos v-if="accion === 'Actualizar'" :data = data :accion = accion />
                        <formularioProductos v-if="accion === 'Crear'" :accion = accion />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-confirmar">Confirmar</button>
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

.modal .modal-dialog .modal-content .modal-footer .btn {
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn{
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
}


.modal .modal-dialog .modal-content .modal-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

.modal .modal-dialog .modal-content .modal-footer {
    justify-content: flex-end;
    padding: 0 4px 2px 4px;
    margin: 0;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-body{
    padding: 5px 7px 5px 7px;
}

</style>

<script setup>
import formularioProductos from '@/components/minicomponents/formularioACProducto.vue.js'
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const cerrarModal = () => {
    emisiones('ocultarModal')
}

const productoModal = defineProps([
    'data',
    'modulo',
    'accion'
])
</script>