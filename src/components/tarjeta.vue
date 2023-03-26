<template>
    <div class="col-xs-6 col-lg-2">
        <div class="card">
            <div class="encabezado-img">
                <img src="../assets/img/aceta.jpg" class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body">
                <div class="card-title">
                    <span>{{ nombre }}</span>
                </div>
                <div class="items-card">
                    <div class="g-uno d-flex">
                        <span class="item-card">{{ categoria }}</span>
                        <span class="item-card">{{ empresaRepresentada }}</span>
                    </div>
                    <div class="g-dos d-flex">
                        <span class="item-card">{{ puestoTrabajo }}</span>
                        <span class="item-card">{{ sucursal }}</span>
                    </div>
                    <div class="g-tres d-flex">
                        <span class="item-card">{{ telefono }}</span>
                        <span class="item-card">{{ correo }}</span>
                    </div>
                    <div class="g-cuatro d-flex">
                        <span class="item-card">{{ fechaRegistro }}</span>
                        <span class="item-card">{{ sueldo }}</span>
                    </div>
                    <p class="card-text">{{ descripcionProducto }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 4px;
    border-radius: 15px;
}

.card:hover {
    filter: drop-shadow(2px 4px 6px #3f596bbf);
}

.card .encabezado-img {
    width: 80%;
    height: 30%;
    margin: 0px auto;
}

.card .encabezado-img img {
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
}

.card .card-body {
    padding: 0px 4px 5px 4px;
}

.card .card-body .card-title {
    font-size: calc(0.85em + 0.1vw);
    font-weight: 700;
    color: #3581B8;
    margin: 0;
    text-align: center;
}

.card .card-body .items-card {
    flex-direction: column;
}

.card .card-body .items-card .g-uno {
    justify-content: center;
}

.card .card-body .items-card .g-dos, .g-tres {
    justify-content: space-around;
}

.card .card-body .items-card .g-tres {
    justify-content: space-between;
}
.card .card-body .items-card .g-cuatro {
    flex-direction: column;
    justify-content: center;
}

.card .card-body .items-card .item-card,
.card .card-body .items-card .card-text {
    font-size: x-small;
    text-align: center;
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