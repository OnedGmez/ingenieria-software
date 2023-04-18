<template>
    <div class="data">
        <div class="d-flex">
            <span class="data-modal"> Representante: <span class="data-modal-valor">{{ dataProveedor['representativename'] }}</span> </span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Código: <span class="data-modal-valor">{{ dataProveedor['vendorcode'] }}</span></span>
            <span class="data-modal"> País: <span class="data-modal-valor">{{ dataProveedor['country'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal">Inicio de relación: <span class="data-modal-valor">{{ dataProveedor['relationshipinitiation'] }}</span> </span>
        </div>
    </div>
</template>


<script setup>
const propsProveedorModal = defineProps([
    'dataProveedor'
])
</script>

<style scoped>
.data{
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
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

.data div:first-child, .data div:last-child{
    justify-content: center;
}
</style>