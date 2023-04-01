<template>
  <div id="vista-inventario">
    <MenuSpace />
    <div class="cuerpo-vista">
      <div class="cabecera-filtros">
        <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
        <cabeceraComp nombreModulo="INVENTARIO" nombreSucursal="Bodega Central" codigoSucursal="BDC001"
          departamento="Francisco Morazán" colonia="Carrizal" />

        <div class="controles-filtrado-inventario container-fluid">
          <div class="barra-filtros d-flex">
            <barraBusqueda vista="inventario" />
            <button @click="mostrarModalFiltros" type="button" class="btn boton-filtros">
              <div class="contenido-boton d-flex">
                <span class="d-block icono-boton"><font-awesome-icon icon="arrow-down-wide-short" /></span>
                <span class=" d-block nombre-boton"> Filtros </span>
              </div>
            </button>
          </div>
          <button @click="Ordenar" id="boton-generar-orden" type="button" class="btn boton-desplegable">
            <div v-if="modoOrdenar === false" class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="file-circle-plus" /></span>
              <span class=" d-block nombre-boton"> Generar Orden </span>
            </div>
            <div v-if="modoOrdenar === true" class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="file-circle-xmark" /></span>
              <span class=" d-block nombre-boton"> Terminar orden </span>
            </div>
          </button>
          <button v-if="modoOrdenar === false" @click="mostrarModalAgregarProductos" id="boton-generar-orden"
            type="button" class="btn boton-desplegable">
            <div class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="circle-plus" /></span>
              <span class=" d-block nombre-boton"> Nuevo Producto </span>
            </div>
          </button>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <tarjetaInventario v-for="producto, index in dataProductos" :data="producto" modulo="Inventario" />
        </div>
      </div>
    </div>
  </div>
  <modalFiltros v-if="mostrandoFiltros === true" @ocultar-modal="() => mostrarModalFiltros()" />
  <modalCRUD v-if="mostrandoAgregar === true" modulo="Inventario" accion="Crear"
    @ocultar-modal="() => mostrarModalAgregarProductos()" />
</template>
  
<script setup>
import alerta from 'sweetalert';
import { generalStore } from '@/store/index.js'

import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaInventario from '@/components/tarjeta.vue'
import barraBusqueda from '@/components/barraBusqueda.vue'
import modalFiltros from '@/components/modalFiltros.vue'
import modalCRUD from '@/components/modalCRUD.vue'

import { ref } from 'vue'

/**
 * variable que contiene los metodos y variables de la store que retornamos (a modo de ser utilizadas como variables globales)
 */
const store = generalStore()

const mostrandoFiltros = ref(false)
const mostrandoAgregar = ref(false)
const modoOrdenar = ref(store.ordenarModo)

const dataProductos = ref(
  [{
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P1',
    'name': "Aceminofen",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Tylenol",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  },
  {
    'productcode': 'P2',
    'name': "Amoxicilina",
    'categoryname': "Pastillas",
    'productdescription': "Prueba de descripción del producto, para tenerlo estático"
  }
  ])

/**
 * Función para cambiar el valor de la bool para mostrar u ocultar el modal de los filtros
 */
const mostrarModalFiltros = () => {
  mostrandoFiltros.value = !mostrandoFiltros.value
}

/**
 * La función cambia el valor de la bool para activar o desactivar el modo para Ordenar
 * El valor de la variable activará o no el botón para agregar a la orden un producto de las tarjetas
 * despues de actualizar la variable en el store, volvemos a actualizar la variable local
 */
const Ordenar = () => {
  store.setModoOrden()
  modoOrdenar.value = store.ordenarModo
  if (modoOrdenar.value === true){
    alerta('Orden Abierta','Agrega los productos',"success")
  }else{
    alerta('Orden Cerrada')
  }
}

/**
 * Función que servirá para abrir el modal con el formulario para agregar los productos al inventario general
 */
const mostrarModalAgregarProductos = () => {
  mostrandoAgregar.value = !mostrandoAgregar.value
}
</script>

<style scoped>
#vista-inventario .cuerpo-vista {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  position: relative;
  margin: 5px 8px 00px 15px;
}

#vista-inventario .cuerpo-vista .cabecera-filtros {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

#vista-inventario .cuerpo-vista .cabecera-filtros .controles-filtrado-inventario .barra-filtros .boton-filtros {
  border-radius: 13px;
  border-bottom: 1.2px solid #3581B8;
  margin: 0 0 0 10px;
  color: #3581B8;
  background-color: #fff;
  transition: all 100ms ease-in-out;
}

#vista-inventario .cuerpo-vista .cabecera-filtros .controles-filtrado-inventario .barra-filtros .boton-filtros:hover {
  border: 1.2px solid #3581B8;
}

.icono-boton {
  font-size: large;
  margin: auto 8px auto 0;
}

.nombre-boton {
  font-weight: 500;
  font-size: small;
}

.contenido-boton {
  width: max-content;
  align-items: center;
}

.btn {
  font-family: 'fredoka-family';
}

.btn:hover {
  cursor: pointer;
}


#vista-inventario {
  width: 100%;
  display: inline-flex;
}

#vista-inventario .cuerpo-vista .controles-filtrado-inventario .boton-desplegable {
  color: #fff;
  background-color: #3581B8;
  width: 36px;
  overflow-x: hidden;
  padding: 3px 10px 3px 8.5px !important;
  border-radius: 20px;
  transition: all 200ms ease-out;
  margin: 3px 0 15px 0;
}

#vista-inventario .cuerpo-vista .controles-filtrado-inventario .boton-desplegable:hover {
  width: 140px;
}

.row {
  padding-left: 25px;
  padding-right: 5px;
}
</style>