<template>
    <div class="contenedor col-12">
        <div @click="abrirDetalles" class="contenido-tarjeta">
            <div class="informacion">
                <div class="cabecera-informacion">
                    <span class="key-texto"> Código: <span class="resultado-texto"> {{ data['ordercode'] }}</span> </span>
                    <span class="key-texto"> Fecha: <span class="resultado-texto"> {{ data['shipmentdate'] }}</span> </span>
                    <span class="key-texto"> Tipo de orden: <span class="resultado-texto"> {{ data['descriptiontype'] }} </span> </span>
                </div>
                <div class="d-flex detalle-informacion">
                    <div class="detalle-pedido-sucursales-central">
                        <div class="detalle-sucursal-pedido">
                            <span class="key-texto"> Realizada por: <span class="resultado-texto"> {{ data['sender'] }} </span></span>
                            <span class="key-texto"> Sucursal: <span class="resultado-texto"> {{ data['sucursalname'] }} </span></span>
                        </div>
                        <div class="detalle-central-pedido">
                            <span v-if="data['receipdate'] != null" class="key-texto"> Fecha de revisión: <span class="resultado-texto">
                                    {{ data['receiptdate'] }}</span></span>
                        </div>
                    </div>
                    <div class="estatus">
                        <span :class="[data['status'] == 'G'?'generada': data['status'] == 'R'?'rechazada':data['status'] == 'C'?'cancelada': data['status'] =='A'?'aceptada': data['status']=='D'?'descargada':'' ]"> <font-awesome-icon icon="circle" /> </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modalDetalleOrden v-if="mostrandoModal == true" :data="data" @cerrarmodal="() => abrirDetalles()"/>
</template>

<style scoped>
.contenedor{
    margin-top: 10px;
    border-bottom-right-radius: 30px;
    border-bottom: 1.5px #3581B8 solid;
}

.contenedor .contenido-tarjeta{
    margin: 10px;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.contenedor .contenido-tarjeta:hover{
    cursor: pointer;
}

.contenido-tarjeta .informacion .cabecera-informacion span{
    margin-right: 20px ;
}

.contenido-tarjeta .informacion .detalle-informacion .detalle-pedido-sucursales-central .detalle-sucursal-pedido span:first-child, .detalle-central-pedido span:not(:last-child){
    margin-right: 20px ;
}

.contenido-tarjeta .informacion .detalle-informacion{
    align-items: center;
    justify-content: space-between;
}

.key-texto{
    font-weight: 400;
}

.resultado-texto{
    font-weight: 100 !important;
}

.generada{
    color: rgb(255, 255, 0);
}

.rechazada{
    color: red;
}

.cancelada{
    color: rgb(97, 0, 19);
}

.aceptada{
    color: rgb(255, 151, 47);
}

.descargada{
    color: #3581B8;
}
</style>

<script setup>
import modalDetalleOrden from './modalDetalleOrden.vue';
import { ref } from 'vue';

const mostrandoModal = ref(false)

const propsOrden = defineProps([
    'data'
])

const abrirDetalles = () =>{
    mostrandoModal.value = !mostrandoModal.value
}
</script>