<template>
    <!-- <div class="formularios">
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
                <label class="etiqueta" for="nombre-input">Nombre del representante:</label>
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
    </div> -->
    <div class="formularios">
        <div v-if="accion === 'Actualizar'" class="formulario">
            <h2>hola actualizar</h2>
        </div>
        <div v-if="accion === 'Crear'" class="formulario">
            <div class="row textbox">
                <div class="col">
                    <label class="etiqueta">Primer Nombre:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="text" class="form-control" v-model="pNombre" placeholder="Primer Nombre" aria-label="Username">
                    </div>

                    <label class="etiqueta">Primer Apellido:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="text" class="form-control" v-model="pApellido" placeholder="Primer Apellido" aria-label="Username">
                    </div>
                </div>
                <div class="col">
                    <label class="etiqueta">Segundo Nombre:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="text" class="form-control" v-model="sNombre" placeholder="Segundo Nombre" aria-label="Username">
                    </div>

                    <label class="etiqueta">Segundo Apellido:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="text" class="form-control" v-model="sApellido" placeholder="Segundo Apellido" aria-label="Username">
                    </div>
                </div>
            </div>

            <div class="row textbox">
                <div class="col">
                    <label class="etiqueta">Fecha de Nacimiento:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="date" class="form-control" v-model="fechaNacimiento" aria-label="Username">
                    </div>
                </div>
                <div class="col">
                    <label class="etiqueta me-2">Genero: </label>
                    <div class="form-check form-check-inline me-2">
                        <label class="form-check-label" for="genero-1">M </label> 
                        <input type="radio" id="genero-1" class="form-check-input" value="M" v-model="genero" aria-label="Username">
                    </div>
                    <div class="form-check form-check-inline">
                        <label class="form-check-label" for="genero-2">F </label> 
                        <input type="radio" id="genero-2" class="form-check-input" value="F" v-model="genero" aria-label="Username">
                    </div>
                </div>
            </div>
            
            <div class="row">
                <label class="etiqueta">DNI Representante:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <!-- <textarea class="form-control" minlength="35" maxlength="250" name="descripcion-input" cols="1" rows="1"></textarea> -->
                    <input type="text" class="form-control" v-model="dni" placeholder="DNI representante" aria-label="Username">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label class="etiqueta">Número de teléfono:</label>
                    <div class="input-group">
                        <span class="input-group-text"></span>
                        <input type="text" class="form-control" v-model="telefono" placeholder="Número de teléfono" aria-label="Username">
                    </div>

                    <selectBox @codigo="(codigo) => asignarProveedor(codigo)" :data="proveedores" label="Empresa:" /> <!-- Faltan atributos -->
                </div>

                <div class="col">
                    <label class="etiqueta">Correo Electrónico:</label>
                    <div class="input-group">
                    <span class="input-group-text"></span>
                    <input type="text" class="form-control" v-model="correo" placeholder="Correo Electrónico" aria-label="Username">
                    </div>
                </div>
            </div>
            <hr />
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Fotografía/Logo: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".pdf,.jpg,.png" />
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
import selectBox from '@/components/selectBox.vue'

const store = generalStore()
const proveedores = ref('')
const vendorcode = ref('')
const vendorname = ref('')

const pNombre = ref('')
const sNombre = ref('')
const pApellido = ref('')
const sApellido = ref('')
const fechaNacimiento = ref('')
const genero = ref('')
const dni = ref('')
const telefono = ref('')
const correo = ref('')
const empresa = ref('')
const relationshipinitiation = store.fechaActual
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

const asignarProveedor = (codigo) => {
    vendorcode.value = codigo
    vendorname.value = proveedores.value.filter(proveedor => proveedor.code === codigo)[0]['name']
}

const cargarSelect = () => {
    proveedores.value = localStorage.getItem('proveedores');
    proveedores.value = proveedores.value.replaceAll('"vendorcode":', '"code":')
    proveedores.value = proveedores.value.replaceAll('"vendorname":', '"name":')
    proveedores.value = JSON.parse(proveedores.value)
}
cargarSelect()

defineExpose({
    vendorname,
    vendorcode,
    pNombre,
    sNombre,
    pApellido,
    sApellido,
    fechaNacimiento,
    genero,
    dni,
    telefono,
    correo,
    relationshipinitiation,
    urlimage
})
</script>