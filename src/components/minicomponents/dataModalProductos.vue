<template>
    <div class="data">
        <p class="data-text">{{ dataProducto['productdescription'] }}</p>
        <div class="d-flex">
            <span class="data-modal">{{ dataProducto['categoryname'] }}</span>
            <span class="data-modal"> Lote: {{ dataProducto['lotnumber'] }} </span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Precio: {{dataProducto['purchaseprice']}} </span>
            <span class="data-modal"> Expira: {{ dataProducto['expirationdate'] }} </span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> {{ dataProducto['units'] }}/caja</span>
            <span class="data-modal"> {{ dataProducto['stock'] }} </span>
        </div>
    </div>
</template>


<script setup>
const propsProductoModal = defineProps([
    'dataProducto'
])
</script>

<style scoped>
.data{
    font-size: medium;
    font-family: sans-serif;
}

.data .data-text{
    text-align: center;
}

.data div{
    justify-content: space-between;
}
</style>