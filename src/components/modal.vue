<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <span class="modal-title" id="staticBackdropLabel">Modal title</span>
                    <img src="../assets/img/aceta.jpg" class="img-fluid" alt="...">
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal">Close</button>
                    <!--Emitimos un evento al contenedor padre para avisar que lo queremos cerrar-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.show{
    backdrop-filter: blur(2px) brightness(0.75);
}
.modal .modal-content .modal-header{
    padding: 0;
}
.modal .modal-content .modal-header img{
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px
}

.modal .modal-content .modal-header .modal-title{
    bottom: 36%;
    color: #3581B8;
    font-family: 'fredoka-family';
    font-size:calc(1.2em + 2vw);
    position: absolute;
    font-weight: 600;
    box-shadow: coral;
    filter: drop-shadow(8px 10px 10px #000);
}
</style>

<script setup>

//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const cerrarModal = () => {
    emisiones('ocultarModal')
}


</script>