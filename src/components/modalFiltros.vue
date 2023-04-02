<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="filtros-secundarios">
                        <selectBox class="filtro" label="Sucursal:" />
                        <selectBox class="filtro" label="Categoría:" />
                        <div class="filtro-existencia d-flex filtro">
                            <input type="checkbox" name="checkExistencia" id="existencia">
                            <label for="existencia">Sin existencias</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-cerrar">Aplicar</button>
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
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}


.modal .modal-dialog .modal-content .modal-footer {
    padding: 0 4px 2px 4px;
    margin: 0;
    justify-content: end;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-body {
    padding: 5px 7px 5px 7px;
}

.modal-body .filtros-secundarios {
    margin: 15px 0px;
}

/**rework */

.modal-body .filtros-secundarios .filtro {
    margin: 20px 5px;
}

.modal-body .filtros-secundarios>.filtro:last-child #existencia {
    margin-right: 5px;
}


label {
    font-size: calc(.9em + 0.04vw) !important;
    font-family: 'fredoka-family';
}
</style>

<script setup>
import selectBox from '@/components/selectBox.vue'
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const cerrarModal = () => {
    emisiones('ocultarModal')
}
</script>