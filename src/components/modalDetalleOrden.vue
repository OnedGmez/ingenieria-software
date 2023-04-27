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
        <ul v-for="producto in dataDetalle" class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
        </ul>
        <div class="card-footer">
            <button v-if="data['status'] == 'G' && sucursalname !== 'Bodega Central'" type="button" class="btn btn-cancelar" @click="cancelarOrden">Cancelar
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
const cancelarOrden = async () => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status: 'C' })
            .eq('ordercode', propsDetalle.data['ordercode'])

        if (!error) {
            mensaje.value = 'Orden cancelada exitosamente'
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