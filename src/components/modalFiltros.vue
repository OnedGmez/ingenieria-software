<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="etiquetas-filtros">
                        <div class="contenedor-etiqueta">
                            <span class="icono"> <font-awesome-icon icon="filter" /> </span>
                            <span class="detalle">{{ existencia }}</span>
                        </div>
                        <div v-if="categoriaNombre !== ''" class="contenedor-etiqueta">
                            <span class="icono"> <font-awesome-icon icon="filter" /> </span>
                            <span class="detalle"> {{ categoriaNombre }}</span>
                            <span @click="elimiarFiltroCat" class="icono-close"> <font-awesome-icon icon="xmark" /> </span>
                        </div>
                    </div>
                    <div class="filtros-secundarios">
                        <div class="filtro-existencia d-flex filtro">
                            <input v-model="available" type="checkbox" name="checkExistencia" id="existencia">
                            <label v-if="modulo === 'Inventario'" for="existencia">En existencia</label>
                            <label v-if="modulo === 'Proveedores'" for="existencia">Activo</label>
                        </div>
                        <selectBox v-if="modulo === 'Inventario'" class="filtro" label="Categorias:" :data="categorias"
                            :seleccionado="categoria" @codigo="(codigoC) => modificarCodigoCategoria(codigoC)" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-cerrar" @click="aplicarFiltros">Aplicar</button>
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

.etiquetas-filtros {
    display: flex;
}

.contenedor-etiqueta {
    margin-right: 12px;
    background-color: #3581b828;
    color: #3F596B;
    width: max-content;
    padding: 0 7px;
}

.contenedor-etiqueta .icono {
    margin-right: 8px;
}

.contenedor-etiqueta .detalle {
    font-weight: 600;
    font-size: calc(.5em + .45vw);
}

.contenedor-etiqueta .icono-close {
    margin-left: 8px;
    font-size: calc(.5em + .35vw);
}

.contenedor-etiqueta .icono-close:hover {
    color: red !important;
    ;
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
    font-weight: 500;
}
</style>

<script setup>
import selectBox from '@/components/selectBox.vue'
import { generalStore } from '@/store';
import { ref } from 'vue';
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal', 'aplicarFiltros'])
const propsFiltros = defineProps([
    'modulo'
])

const categorias = ref('')
const store = generalStore()

//Constantes reactivas que se utilizaran para los filtros
const available = ref('')
const existencia = ref('')
const categoria = ref('')
const categoriaNombre = ref('')

const cerrarModal = () => {
    emisiones('ocultarModal')
}

/**
 * dev: Oned Gomez
 * Funcion que sirve para emitir el evento de aplicación de filtros a la información, adicional se guarda el valor de los filtros al localStorage para ayudar a la persistencia de esos filtros
 */
const aplicarFiltros = () => {
    switch (propsFiltros.modulo) {
        case 'Inventario':
            emisiones('aplicarFiltros', available.value, categoria.value)
            localStorage.setItem('filtro-existencia', available.value)
            if (categoria.value !== ''){
                localStorage.setItem('filtro-categoria', categoria.value)
            }
            break;
        case 'Proveedores':
            emisiones('aplicarFiltros', available.value)
            localStorage.setItem('filtro-activo', available.value)
            break;
    }
    emisiones('ocultarModal')
}

const modificarCodigoCategoria = (codigoC) => {
    categoria.value = codigoC
}


/**
 * dev: Oned Gómez
 * Función para inicializar el valor de los filtros cada vez que aparezca el modal (hacer que los aplicados filtros prevalezcan entre cada aparición del modal)
 */
/**
 * dev: Oned Gómez
 * Función para inicializar el valor de los filtros cada vez que aparezca el modal (hacer que los aplicados filtros prevalezcan entre cada aparición del modal)
 */
const iniciarlizarFiltros = () => {
    switch (propsFiltros.modulo) {
        case 'Inventario':
            if (localStorage.getItem('filtro-existencia') !== null) {
                available.value = localStorage.getItem('filtro-existencia')
            } else {
                available.value = true
            }

            if (localStorage.getItem('filtro-categoria') !== null) {
                categoria.value = localStorage.getItem('filtro-categoria')
            } else {
                categoria.value = ''
            }
            break;
        case 'Proveedores':
            if (localStorage.getItem('filtro-activo') !== null) {
                available.value = localStorage.getItem('filtro-activo')
            } else {
                available.value = true
            }
            break;
    }
}
iniciarlizarFiltros()

/**
 * dev: Oned Gomez
 * Función para cargar la información de las categorias y sucursales a los filtros
 */
const cargarSelect = () => {
    categorias.value = localStorage.getItem('categorias');
    categorias.value = categorias.value.replaceAll('"categorycode":', '"code":')
    categorias.value = categorias.value.replaceAll('"categoryname":', '"name":')
    categorias.value = JSON.parse(categorias.value)
}
cargarSelect()

if (propsFiltros.modulo === 'Inventario') {
    if (available.value == true || available.value == 'true') {
        existencia.value = "En existencia"
    } else {
        existencia.value = "Sin existencia"
    }
}

if (propsFiltros.modulo === 'Proveedores') {
    if (available.value == true || available.value == 'true') {
        existencia.value = "Activo"
    } else {
        existencia.value = "Inactivo"
    }
}


const buscarNombreCategoria = () => {
    if (categoria.value !== '') {
        categoriaNombre.value = categorias.value.filter(cate => cate['code'] == categoria.value)[0]['name']
    }
}
buscarNombreCategoria()

const elimiarFiltroCat = () => {
    categoria.value = ''
    store.filtradaCategoria = false
    localStorage.removeItem('filtro-categoria')
    categoriaNombre.value = ''
}

</script>