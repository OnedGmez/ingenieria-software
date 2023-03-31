<template>
    <div @click="mostrarModal" class="contenedor col-6 col-md-4 col-lg-2">
        <div :id=data.code class="card">
            <div class="encabezado-img">
                <img src="../assets/img/aceta.jpg" class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body">
                <div class="card-title">
                    <span>{{ data['name'] }}</span>
                </div>
                <miniItemsProducto v-if="modulo === 'Inventario'" :dataProducto="data" />
            </div>
        </div>
    </div>
    <!--Condicionamos con una bool la visibilidad del modal y escuchamos el evento emitido, así como le pasamos un objeto con la información que debe mostrar-->
    <modal v-if="mostrandoModal" @ocultar-modal="() => mostrarModal()" :data=data modulo="Inventario" />
</template>

<style scoped>
.contenedor {
    padding: 0 3px;
}

.card {
    margin: 4px;
    border-radius: 15px;
    filter: drop-shadow(0px 0px 3px #3f596bbf);
}

.card:hover {
    filter: drop-shadow(2px 4px 6px #3f596bbf);
    cursor: pointer;
}

.card .encabezado-img {
    width: 80%;
    height: 30%;
    margin: 0px auto;
}

.card .encabezado-img img {
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
}

.card .card-body {
    padding: 0px 4px 5px 4px;
}

.card .card-body .card-title {
    font-size: large;
    font-weight: 600;
    color: #3581B8;
    margin: 0;
    text-align: center;
    font-family: 'fredoka-family';
}
</style>

<script setup>
import { ref } from "vue";
import modal from '@/components/modal.vue'
import miniItemsProducto from '@/components/minicomponents/itemsCardProductos.vue'

const proposTarjeta = defineProps([
    'data',
    'modulo'
])
const mostrandoModal = ref(false)

const mostrarModal = () => {
    mostrandoModal.value = !mostrandoModal.value
}
</script>