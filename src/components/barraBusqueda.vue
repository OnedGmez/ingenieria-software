<template>
    <div class="input-group">
        <span @click="buscar" class="input-group-text" id="busqueda-input"><font-awesome-icon icon="magnifying-glass" /></span>
        <input type="text" class="form-control" aria-label="Busqueda" aria-describedby="busqueda-input">
    </div>
</template>

<style scoped>
.form-control {
    border-radius: 25px 25px 25px 25px;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-size: calc(.8em + 0.1vw) !important
}

.input-group-text {
    background-color: #3581B8;
    padding: 0.375rem 0.95rem;
    border: none;
    border-radius: 25px 25px;
    width: 45px;
    font-size: 20px;
    color: #fff;
}

.form-control:focus {
    box-shadow: none;
    border-bottom: #3581B8 solid 2px;
}
</style>

<script setup>

const propsBusqueda = defineProps([
    'vista'
])

const buscar = () =>{
    console.log(propsBusqueda.vista)
}
</script>