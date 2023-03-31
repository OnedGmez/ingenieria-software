<template>
  <div id="vista-inventario">
    <MenuSpace />
    <div class="cuerpo-vista">
      <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
      <cabeceraComp nombreModulo="INVENTARIO" nombreSucursal="Bodega Central" codigoSucursal="BDC001"
        departamento="Francisco Morazán" colonia="Carrizal" />

      <div id="controles-filtrado-inventario" class="container-fluid">
        <barraBusqueda vista="inventario" />
        <div class="filtros-secundarios d-flex">
          <selectBox class="filtro" label="Sucursal:" />
          <selectBox class="filtro" label="Categoría:" />
          <div class="filtro-existencia d-flex filtro">
            <input type="checkbox" name="checkExistencia" id="existencia">
            <label for="existencia">Sin existencias</label>
          </div>
        </div>

        <button type="button" class="btn boton-desplegable">
          <div class="d-flex">
            <span class="d-block icono-boton"><font-awesome-icon icon="file-circle-plus" /></span>
            <span class=" d-block nombre-boton"> Generar Orden </span>
          </div>
        </button>
      </div>

      <div class="container-fluid">
        <div class="row">
          <tarjetaInventario v-for="producto, index in dataProductos" :data="producto" modulo="Inventario" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaInventario from '@/components/tarjeta.vue'
import barraBusqueda from '@/components/barraBusqueda.vue'
import selectBox from '@/components/selectBox.vue'

import { ref } from 'vue'

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
  }
  ])
</script>

<style scoped>
#vista-inventario .cuerpo-vista {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 8px 00px 15px;
}

#vista-inventario .cuerpo-vista label {
  font-size: small;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios {
  margin: 15px 0px;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .boton-desplegable .icono-boton {
  font-size: large;
  margin: auto 4px auto 0;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .boton-desplegable .nombre-boton {
  font-size: small;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios>.filtro:not(:first-child) {
  margin: 0px 0px 0px 25px;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios>.filtro:last-child {
  align-items: center;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios>.filtro:last-child #existencia {
  margin-right: 5px;
}

#vista-inventario {
  width: 100%;
  display: inline-flex;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .boton-desplegable {
  color: #fff;
  background-color: #3581B8;
  width: 36px;
  overflow-x: hidden;
  padding: 3px 10px 3px 10px !important;
  border-radius: 20px;
  transition: all 200ms ease-out;
  font-family: 'fredoka-family';
  margin: 3px 0 15px 0;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .boton-desplegable:hover {
  width: 140px;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .boton-desplegable div {
  width: max-content;
  align-items: center;
}

.row {
  padding-left: 25px;
  padding-right: 5px;
}
</style>