<template>
    <div class="data">
        <div class="d-flex">
            <span class="data-modal"> Empresa: <span class="data-modal-valor">{{ dataRepresentante['vendorname'] }}</span> </span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> dni: <span class="data-modal-valor">{{ dataRepresentante['dni'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Correo: <span class="data-modal-valor">{{ dataRepresentante['email'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Tel: <span class="data-modal-valor">{{ dataRepresentante['telephonenumber'] }}</span></span>
            <span class="data-modal"> País: <span class="data-modal-valor">{{ dataRepresentante['country'] }}</span></span>
        </div>
        <div class="d-flex">
            <span class="data-modal">fecha: <span class="data-modal-valor">{{ dataRepresentante['relationshipinitiation'] }}</span> </span>
        </div>
    </div>
</template>


<script setup>
const propsProveedorModal = defineProps([
    'dataRepresentante'
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