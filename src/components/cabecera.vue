<template>
  <div class="cabecera">
    <div class="titulo">
      <span>{{ nombreModulo }}</span>
    </div>
    <div class="info-sucursal">
      <div class="sucursal">
        <span>{{ nombreSucursal }} - {{ codigoSucursal }}</span>
      </div>
      <div class="ubi-sucursal">
        <span>{{ departamento }} - {{ colonia }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cabecera {
  width: 100%;
  height: fit-content;
  display: flex;
  margin: 0px 0 5px 0px;
  text-align: center;
}

.cabecera .titulo {
  margin: auto;
  font-family: 'fredoka-family';
  font-weight: 900;
  font-size: calc(1em + 1.1vw);
  color: #3581B8;
}

.cabecera .info-sucursal {
  transition: all 250ms ease-in-out;
}

.cabecera .info-sucursal .sucursal {
  /*Sujetas a cambio*/
  font-weight: 600;
  font-size: smaller;
}

.cabecera .info-sucursal .ubi-sucursal {
  /*Sujetas a cambio*/
  font-weight: lighter;
  font-size: x-small;
}

/*
  Ajustes para diferentes tamaños de pantalla
*/
@media (max-width: 991.5px) {
  .cabecera .info-sucursal {
    display: none;
  }
}
</style>

<script setup>

/*
    *propsCabecera propiedades que se deben llenar desde la vista donde se va a llamar el componente
*/
const propsCabecera = defineProps([
  'nombreModulo',
  'nombreSucursal',
  'codigoSucursal',
  'departamento',
  'colonia'
])

</script>