<template>
  <div id="vista-inventario">
    <MenuSpace />
    <div class="cuerpo-vista">
      <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
      <cabeceraComp 
      nombreModulo="INVENTARIO" 
      nombreSucursal="Bodega Central" 
      codigoSucursal="BDC001"
      departamento="Francisco Morazán"
      colonia="Carrizal"/>

      <div id="controles-filtrado-inventario" class="container-fluid">
        <barraBusqueda vista="inventario"/>
        <div class="filtros-secundarios d-flex">
          <selectBox class="filtro" label="Sucursal:"/>
          <selectBox class="filtro" label="Categoría:"/>
          <div class="filtro-existencia d-flex filtro">
            <input type="checkbox" name="checkExistencia" id="existencia">
            <label for="existencia">Sin existencias</label>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
          <tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          /><tarjetaInventario 
          nombre="Aceminofen"
          categoria="Pastillas"
          descripcionProducto="Prueba de descripción del producto, para tenerlo estático"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaInventario from '@/components/tarjeta.vue'
import barraBusqueda from '@/components/barraBusqueda.vue'
import selectBox from '@/components/selectBox.vue'

export default {
  name: 'inventarioView',
  components: {
    MenuSpace,
    cabeceraComp,
    tarjetaInventario,
    barraBusqueda,
    selectBox
  },
  setup(){
    //Utilizamos las sintaxis de composition API

    return{

    }
  }
}
</script>

<style scoped>
#vista-inventario .cuerpo-vista {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 8px 00px 8px;
}

#vista-inventario .cuerpo-vista label{
  font-size: small;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios{
  margin: 15px 0px;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios > .filtro:not(:first-child){
  margin: 0px 0px 0px 25px;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios > .filtro:last-child{
  align-items: center;
}

#vista-inventario .cuerpo-vista #controles-filtrado-inventario .filtros-secundarios > .filtro:last-child #existencia{
  margin-right: 5px;
}

#vista-inventario {
  width: 100%;
  display: inline-flex;
}

#vista-inventario .cuerpo-vista .container-fluid .row > *{
  padding: 0!important;
}
</style>