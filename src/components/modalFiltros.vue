<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="filtros-secundarios">
                        <selectBox class="filtro" label="Categorias:" :data="categorias" />
                        <selectBox class="filtro" label="Sucursales:" :data="sucursales" />
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
    font-size: calc(.9em + 0.04vw);
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
import { ref } from 'vue';
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const categorias = ref('')
const sucursales = ref('')

const cerrarModal = () => {
    emisiones('ocultarModal')
}

const cargarSelect = () => {
    categorias.value = localStorage.getItem('categorias');
    categorias.value = categorias.value.replaceAll('"categorycode":','"code":')
    categorias.value = categorias.value.replaceAll('"categoryname":','"name":')
    categorias.value = JSON.parse(categorias.value)

    sucursales.value = localStorage.getItem('sucursales');
    sucursales.value = sucursales.value.replaceAll('"sucursalcode":','"code":')
    sucursales.value = sucursales.value.replaceAll('"sucursalname":','"name":')
    sucursales.value = JSON.parse(sucursales.value)
}
cargarSelect()
</script>