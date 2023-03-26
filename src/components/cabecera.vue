<template>
<div class="cabecera">
      <div class="titulo fredoka">
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
  position: relative;
  display: flex;
  margin: 5px 0 5px 4px;
  text-align: center;
}

.cabecera .titulo {
  margin: auto;
  font-weight: 900;
  font-size: x-large;
  color: #3581B8;
}

.cabecera .info-sucursal .sucursal {
  /*Sujetas a cambio*/
  font-weight: lighter;
  font-size: smaller;
}

.cabecera .info-sucursal .ubi-sucursal {
  /*Sujetas a cambio*/
  font-weight: lighter;
  font-size:x-small;
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