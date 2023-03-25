<template>
  <div id="vista-inventario">
    <div class="menu">
      <MenuSpace />
    </div>
    <div class="cuerpo-vista">
      <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
      <cabeceraComp 
      nombreModulo="INVENTARIO" 
      nombreSucursal="Bodega Central" 
      codigoSucursal="BDC001"
      departamento="Francisco Morazán"
      colonia="Carrizal"/>

      <div class="container">
        <div class="row">
          <tarjetaInventario class="col-3"/>
          <tarjetaInventario class="col-3"/>
          <tarjetaInventario class="col-3"/>
          <tarjetaInventario class="col-3"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaInventario from '@/components/tarjeta.vue'

export default {
  name: 'Menu',
  components: {
    MenuSpace,
    cabeceraComp,
    tarjetaInventario
  }
}
</script>

<style scoped>
#vista-inventario .cuerpo-vista {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 8px 00px 8px;
  text-align: center;
}

#vista-inventario {
  width: 100%;
  display: inline-flex;
}

/*
  * al div con clase row, se le asigna un padding heredado, para que tenga el mismo padding que su padre y se centre dentro de su padre
*/
#vista-inventario .cuerpo-vista .container .row{
  padding: inherit;
}

#vista-inventario .menu {
  position: relative;
}
</style>