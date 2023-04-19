<template>
    <div class="formularios">
        <div v-if="accion === 'Actualizar'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del proveedor:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" disabled :value=data.name class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="fecha-input">Fecha de inicio de relaciones:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="fecha-input" type="text" disabled :value=data.relationshipinitiation class="form-control"
                        aria-label="Fecha" aria-describedby="Fecha-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="origen-input">País de origen:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="origen-input" type="text" v-model="country" class="form-control" aria-label="Origen"
                        aria-describedby="Origen-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="representante-input">Representante:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="representante-input" type="text" disabled :value=data.representativename class="form-control"
                        aria-label="Representante" aria-describedby="Representante-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Imagen del proveedor: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".jpg,.png,.svg" />
                </div>
            </div>
        </div>
        <div v-if="accion === 'Crear'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del proveedor:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" maxlength="50" v-model="name" class="form-control"
                        aria-label="Nombre" aria-describedby="nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="country-input">País de origen:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="country-input" type="text" maxlength="56" v-model="country" class="form-control"
                        aria-label="Country" aria-describedby="Country-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Imagen del producto: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".jpg,.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.etiqueta {
    font-weight: 500;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.formularios .formulario .input-group .input-group-text {
    background-color: #3581B8;
    padding: 0.375rem 0.95rem;
    border: none;
    border-radius: 0;
}

.formularios .formulario .zona-numerica .textbox .input-group {
    width: 100px;
}

.formularios .formulario .zona-numerica {
    margin-top: 10px;
}

.formularios .formulario .zona-numerica .row>* {
    padding: 0;
}

.formularios .formulario .zona-numerica .row {
    padding: 0;
    justify-content: space-around;
}

.form-control {
    border-radius: 0 25px 24px 0;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.form-control:focus {
    box-shadow: none;
    border-bottom: #3581B8 solid 2px;
}

.input-group {
    margin: 0 0 20px 0;
}

.form-check {
    margin: 20px 0 20px 0;
}

.select-group {
    margin-bottom: 20px;
}
</style>

<script setup>
import { ref, defineExpose } from 'vue';
import { generalStore } from '@/store/index.js'

const store = generalStore()
const name = ref('')
const vendorcode = ref('')
const relationshipinitiation = store.fechaActual
const country = ref('')
const urlimage = ref('')


const propsFormularioActualizar = defineProps([
    'data',
    'accion'
])

if (propsFormularioActualizar.accion === 'Actualizar') {
    vendorcode.value = propsFormularioActualizar.data['vendorcode']
    urlimage.value = propsFormularioActualizar.data['urlimage']
}

const obtenerNombre = (event) => {
    urlimage.value = event.target.files[0].name
}

defineExpose({
    name,
    relationshipinitiation,
    vendorcode,
    country,
    urlimage
})
</script>