<template>
    <div class="data">
        <p class="data-text">{{ dataProducto['productdescription'] }}</p>
        <div class="d-flex">
            <span class="data-modal"> Código: <span class="data-modal-valor">{{ dataProducto['productcode'] }}</span></span>
            <span class="data-modal"> Proveedor: <span class="data-modal-valor">{{ dataProducto['vendorname'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Categoría: <span class="data-modal-valor">{{ dataProducto['categoryname'] }}</span></span>
            <span class="data-modal"> Lote: <span class="data-modal-valor">{{ dataProducto['lotnumber'] }}</span> </span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Precio: <span class="data-modal-valor">{{dataProducto['purchaseprice']}}</span></span>
            <span class="data-modal"> Expira: <span class="data-modal-valor">{{ dataProducto['expirationdate'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> <span class="data-modal-valor">{{ dataProducto['units'] }}</span>/caja</span>
            <span class="data-modal"> Stock: <span class="data-modal-valor">{{ dataProducto['stock'] }}</span>  Unidades </span>
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
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.data .data-text{
    text-align: center;
    font-weight: 100;
}

.data .data-modal{
    font-weight: 400;
}

.data .data-modal .data-modal-valor{
    font-weight: 100;
}

.data div{
    justify-content: space-between;
}
</style>