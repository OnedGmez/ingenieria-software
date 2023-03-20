<template>
  <div id="vista-inventario">
    <div class="menu">
      <MenuSpace />
    </div>
    <div class="cabecera">
      <div class="titulo">
        <span>INVENTARIO</span>
      </div>
      <div class="info-sucursal">
        <div class="sucursal">
          <span>Nombre Sucursal - Código Sucursal</span>
        </div>
        <div class="ubi-sucursal">
          <span>Departamento - Colonia</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import MenuSpace from '@/components/menu.vue'
export default {
  name: 'Menu',
  components: {
    MenuSpace
  }
}
</script>

<style scoped>
#vista-inventario {
  height: 100%;
  width: 100%;
  display: inline-flex;
  padding-right: 5px;
}

#vista-inventario .menu {
  position: relative;
}

#vista-inventario .cabecera {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  margin: 10px 0 10px 8px;
  text-align: center;
}

#vista-inventario .cabecera .titulo {
  margin: auto;
  font-weight: 900;
  font-size: larger;
  color: #3581B8;
}

#vista-inventario .cabecera .info-sucursal .sucursal {
  /*Sujetas a cambio*/
  font-weight: lighter;
  font-size: smaller;
}

#vista-inventario .cabecera .info-sucursal .ubi-sucursal {
  /*Sujetas a cambio*/
  font-weight: lighter;
  font-size:x-small;
}
</style>