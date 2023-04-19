<template>
    <div class="contenedor col-12">
        <div class="contenido-tarjeta">
            <div class="informacion">
                <div class="cabecera-informacion">
                    <span class="key-texto"> Código: <span class="resultado-texto"> 1151asabxasd</span> </span>
                    <span class="key-texto"> Fecha: <span class="resultado-texto"> 2023-30-12</span> </span>
                    <span class="key-texto"> Tipo de orden: <span class="resultado-texto"> Pedido </span> </span>
                </div>
                <div class="d-flex detalle-informacion">
                    <div class="detalle-pedido-sucursales-central">
                        <div class="detalle-sucursal-pedido">
                            <span class="key-texto"> Realizada por: <span class="resultado-texto"> Byron Eliel
                                    Gómez</span></span>
                            <span class="key-texto"> Sucursal: <span class="resultado-texto"> Sucursal #2</span></span>
                        </div>
                        <div class="detalle-central-pedido">
                            <span class="key-texto"> Revisada por: <span class="resultado-texto"> Oned Alejandro
                                    Gómez</span></span>
                            <span class="key-texto"> Cancelada por: <span class="resultado-texto"> Oned Alejandro
                                    Gómez</span></span>
                            <span class="key-texto"> Fecha de revisión: <span class="resultado-texto">
                                    2023-30-12</span></span>
                        </div>
                    </div>
                    <div class="estatus">
                        <span> <font-awesome-icon icon="circle" /> </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor{
    border-bottom-right-radius: 30px;
    border-bottom: 1.5px #3581B8 solid;
}

.contenedor .contenido-tarjeta{
    margin: 4px;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
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
    color: greenyellow;
}

.descargada{
    color: #3581B8;
}
</style>