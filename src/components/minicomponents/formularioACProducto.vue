<template>
    <div class="formularios">
        <div v-if="accion === 'Actualizar'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del producto:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" disabled :value=data.name class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="lote-input">Número de lote:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="lote-input" type="text" disabled :value=data.lotnumber class="form-control" aria-label="Lote"
                        aria-describedby="Lote-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="descripcion-input">Descripción:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <textarea class="form-control" name="descripcion-input" disabled :value=data.productdescription cols="1"
                        rows="1"></textarea>
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="fecha-input">Fecha de vencimiento:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="fecha-input" type="text" disabled :value=data.expirationdate class="form-control"
                        aria-label="Fecha" aria-describedby="Fecha-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Nombre/Número de proveedor:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="proveedor-input" type="text" disabled :value=data.vendor class="form-control"
                        aria-label="Proveedor" aria-describedby="Proveedor-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="category-input">Categoria:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="category-input" type="text" disabled :value=data.categoryname class="form-control"
                        aria-label="Category" aria-describedby="Category-input">
                </div>
            </div>
            <div class="container zona-numerica d-flex">
                <div class="row">
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="cantidad-input">Cantidad Recibida:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="cantidad-input" type="number" value=0 class="form-control"
                                aria-label="Cantidad" aria-describedby="Cantidad-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="unidades-input">Unidades en caja:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="unidades-input" type="number" disabled :value=data.units class="form-control"
                                aria-label="Unidades" aria-describedby="Unidades-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="precio-input">Precio de compra:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="precio-input" type="number" disabled :value = data.purchaseprice class="form-control" aria-label="Precio"
                                aria-describedby="Precio-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="accion === 'Crear'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del producto:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="lote-input">Número de lote:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="lote-input" type="text" class="form-control" aria-label="Lote"
                        aria-describedby="Lote-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="descripcion-input">Descripción:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <textarea class="form-control" name="descripcion-input" cols="1"
                        rows="1"></textarea>
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="fecha-input">Fecha de vencimiento:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="fecha-input" type="text" class="form-control"
                        aria-label="Fecha" aria-describedby="Fecha-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Nombre/Número de proveedor:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="proveedor-input" type="text" class="form-control"
                        aria-label="Proveedor" aria-describedby="Proveedor-input">
                </div>
            </div>
            <selectBox label="Categoria:" />
            <div class="container zona-numerica d-flex">
                <div class="row">
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="cantidad-input">Cantidad Recibida:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="cantidad-input" type="number" class="form-control"
                                aria-label="Cantidad" aria-describedby="Cantidad-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="unidades-input">Unidades en caja:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="unidades-input" type="number" class="form-control"
                                aria-label="Unidades" aria-describedby="Unidades-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="precio-input">Precio de compra:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="precio-input" type="number" class="form-control" aria-label="Precio"
                                aria-describedby="Precio-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    font-size: calc(.8em + 0.1vw) !important
}

.form-control:focus {
    box-shadow: none;
    border-bottom: #3581B8 solid 2px;
}

.input-group {
    margin: 0 0 20px 0;
}
</style>

<script setup>
import selectBox from '@/components/selectBox.vue';

const propsFormularioActualizar = defineProps([
    'data',
    'accion'
])
</script>