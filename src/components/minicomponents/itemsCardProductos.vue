<template>
    <div class="items-card">
        <div class="d-flex">
            <span class="item-card"> {{ dataProducto['categoryname'] }} </span>
        </div>
        <p class="card-text"> {{ dataProducto['productdescription'] }} </p>
    </div>
</template>

<script setup>
const propsProducto = defineProps([
    'dataProducto'
])
</script>

<style scoped>
.items-card div{
    justify-content: center;
}

.items-card {
    flex-direction: column;
}

.card .card-body .items-card .item-card,
.card .card-body .items-card .card-text {
    font-size: x-small;
    text-align: center;
    font-family: sans-serif;
}
</style>