<template>
    <div class="select-group d-flex">
        <select @change="filtrar" id="disabledSelect" class="form-select">
            <option disabled selected>{{ label }}</option>
            <option>Disabled select2</option>
            <option>Disabled select3</option>
        </select>
    </div>
</template>

<style scoped>

.select-group{
    flex-direction: column;
}

.select-group .form-select{
    border-radius: 25px 25px 25px 25px;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-size: calc(.9em + 0.04vw) !important;
    font-family: 'fredoka-family';
}


.select-group .form-select:focus{
    box-shadow: none;
}

</style>

<script setup>
import { ref, defineEmits } from "vue";

const propsTarjeta = defineProps([
    'label',
])

const filtrar = (event) =>{
    console.log(event.target.value)
}
</script>