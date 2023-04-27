<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex detalle-sucursal-pedido">
                <span class="key-texto">Código de orden: <span class="resultado-texto"> {{ data['ordercode'] }}</span>
                </span>
                <span class="key-texto"> Sucursal: <span class="resultado-texto"> {{ data['sucursalname']
                }}</span></span>
                <span class="key-texto"> Realizada por: <span class="resultado-texto"> {{ data['sender']
                }}</span></span>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="producto in dataDetalle" :key="producto['sucursalinventorycode']" class="list-group-item">
                <div class="d-flex data-detalles">
                    <div class="grupo-uno">
                        <div class="d-flex nombre">
                            <span>Nombre producto: {{ producto['productname'] }}</span>
                            <span>Lote: {{ producto['lotnumber'] }}</span>
                        </div>
                        <div class="nombre">
                            <span>Fecha de expiración: {{ producto['expirationdate'] }}</span>
                        </div>
                    </div>
                    <div class="cantidad">
                        <span>Cantidad solicitada: {{ producto['quantity'] }}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="card-footer">
            <button v-if="data['status'] == 'G' && sucursalname !== 'Bodega Central'" type="button" class="btn btn-cancelar"
                @click="actualizarOrden('D')">Recibida</button>
            <button v-if="data['status'] == 'G' && sucursalname == 'Bodega Central'" type="button" class="btn btn-aceptar"
                @click="actualizarOrden('A')">Aceptar</button>
            <button v-if="data['status'] == 'G' && sucursalname == 'Bodega Central'" type="button" class="btn btn-rechazar"
                @click="actualizarOrden('R')">Rechazar</button>
            <button v-if="data['status'] == 'G' && sucursalname !== 'Bodega Central'" type="button" class="btn btn-cancelar"
                @click="actualizarOrden('C')">Cancelar
                orden</button>
            <button type="button" class="btn btn-cerrar" @click="cerrarModal">Cerrar</button>
        </div>
    </div>
    <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" :error="err" />
</template>

<script setup>
import { supabase } from '@/lib/supabaseClient';
import alerta from './minicomponents/alerta.vue';
import { ref } from 'vue';
import { generalStore } from '@/store';
import { useProductoStore } from '@/store/productos';

const dataDetalle = ref([{}])
const mostrandoAlerta = ref(false)
const mensaje = ref('')
const err = ref(false)
const store = generalStore()
const storeProductos = useProductoStore()
const sucursalname = JSON.parse(localStorage.getItem('usuario'))[0]['sucursalname']

const propsDetalle = defineProps([
    'data'
])

const emisiones = defineEmits([
    'cerrarmodal'
])

/**
 * dev: Oned Gómez
 * Función que nos cargará la información del detalle de la orden
 */
const cargarDetalles = async () => {
    try {

        let { data, error } = await supabase
            .rpc('detalleorden', {
                ordercode: propsDetalle.data['ordercode']
            })

        if (error) {
            mensaje.value = error
            err.value = 'true'
            usarAlerta()
        }

        if (data !== '') {
            dataDetalle.value = data
            console.log(dataDetalle.value)
        }

    } catch (error) {
        mensaje.value = error
        err.value = 'true'
        usarAlerta()
    }
}
cargarDetalles()

const cerrarModal = () => {
    emisiones('cerrarmodal')
}

/**
 * dev: Oned Gómez
 * Función para cancelar una orden especifica
 * @param {*} ordercode: Contiene el hash code de la orden que deseamos cancelar
 * @returns: retorna el mensaje de exito o fracaso que mostrará la alerta
 */
const actualizarOrden = async (estatus) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status: estatus })
            .eq('ordercode', propsDetalle.data['ordercode'])

        if (!error) {
            mensaje.value = 'Orden actualizada exitosamente'
            err.value = 'false'
            storeProductos.updateAuth = false
            usarAlerta()
            setTimeout(() => { cerrarModal() }, 1500)
        }

    } catch (error) {
        mensaje.value = error
        err.value = 'true'
        usarAlerta()
    }
}

const usarAlerta = () => {
    mostrandoAlerta.value = !mostrandoAlerta.value
    setTimeout(() => { mostrandoAlerta.value = !mostrandoAlerta.value; }, 1500);
}
</script>

<style scoped>
.card {
    font-family: 'fredoka-family';
    position: absolute;
    width: 75%;
    right: 12%;
    top: 50%;
    padding: 0;
}

.nombre span:first-child{
    margin-right: 20px;
}

.data-detalles{
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
}

.card-header .detalle-sucursal-pedido {
    justify-content: space-between;
}


.key-texto {
    font-weight: 400;
}

.resultado-texto {
    font-weight: 100 !important;
}

.card .card-footer {
    display: flex;
    justify-content: end;
}

.card .card-footer .btn {
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.9em + 0.04vw);
    margin-left: 12px;
}

.btn-cancelar {
    color: rgb(97, 0, 19) !important;
    border: 1.6px solid rgb(97, 0, 19) !important;
}

.btn-aceptar {
    color: rgb(255, 151, 47) !important;
    border: 1.6px solid rgb(255, 151, 47) !important;
}

.btn-aceptar:hover {
    color: #fff !important;
    background-color: rgb(255, 151, 47) !important;
    border: 1.6px solid rgb(255, 151, 47) !important;
}

.btn-rechazar {
    color: red !important;
    border: 1.6px solid red !important;
}

.btn-rechazar:hover {
    color: #fff !important;
    background-color: red !important;
    border: 1.6px solid red !important;
}

.card .card-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

.btn-cancelar:hover {
    color: #fff !important;
    background-color: rgb(97, 0, 19) !important;
    border: 1.6px solid rgb(97, 0, 19) !important;
}
</style>