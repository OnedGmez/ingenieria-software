<template>
    <div class="col-lg-2">
        <div class="card">
            <div class="encabezado-img">
                <img src="../assets/img/aceta.webp" class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body">
                <span class="card-title">{{ nombre }}</span>
                <div class="items-card">
                    <span class="item-card">{{ categoria }}</span>
                    <span class="item-card">{{ empresaRepresentada }}</span>
                    <span class="item-card">{{ puestoTrabajo }}</span>
                    <span class="item-card">{{ sucursal }}</span>
                    <span class="item-card">{{ telefono }}</span>
                    <span class="item-card">{{ correo }}</span>
                    <span class="item-card">{{ fechaRegistro }}</span>
                    <span class="item-card">{{ sueldo }}</span>
                    <p class="card-text">{{ descripcionProducto }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 4px;
}

.card:hover {
    filter: drop-shadow(2px 4px 6px #3f596bbf);
}

.encabezado-img {
    width: 100%;
    height: 30%;
}
</style>

<script setup>
const propsTarjeta = defineProps([
    'nombre',
    'categoria',
    'descripcionProducto',
    'urlFoto',
    'empresaRepresentada',
    'telefono',
    'correo',
    'fechaRegistro',
    'puestoTrabajo',
    'sucursal',
    'sueldo'
])
</script>