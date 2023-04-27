<template>
  <div id="vista-ordenes">
    <MenuSpace />
    <div class="cuerpo-vista">
      <div class="cabecera-filtros">
        <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
        <cabeceraComp nombreModulo="ORDENES" :nombreSucursal="encabezado['sucursalname']"
          :codigoSucursal="encabezado['sucursalcode']" :departamento="encabezado['department']"
          :colonia="encabezado['colony']" />

        <div class="controles-filtrado-ordenes container-fluid">
          <div class="barra-filtros d-flex align-items-end">
            <barraBusqueda @busqueda="(buscar) => filtrarBusqueda(buscar)" />
            <button @click="mostrarModalFiltros" type="button" class="btn boton-filtros">
              <div class="contenido-boton d-flex">
                <span class="d-block icono-boton"><font-awesome-icon icon="arrow-down-wide-short" /></span>
                <span class=" d-block nombre-boton"> Filtros </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <tarjetaOrden v-for="orden in dataOrdenes" :data="orden" />
        </div>
      </div>
    </div>
  </div>
  <modalFiltros v-if="mostrandoFiltros === true" modulo="Ordenes" @ocultar-modal="() => mostrarModalFiltros()"
    @aplicar-filtros="(estatusF) => configurarFiltros(estatusF)" />

  <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" :error="err" />
</template>
    
<script setup>
import { generalStore } from '@/store/index.js'
import { useProductoStore } from '@/store/productos.js'
import { useOrdenStore } from '@/store/ordenes'
import { supabase } from '@/lib/supabaseClient'
import { ref, watchEffect } from 'vue'

import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaOrden from '@/components/tarjetaOrden.vue'
import barraBusqueda from '@/components/barraBusqueda.vue'
import modalFiltros from '@/components/modalFiltros.vue'
import alerta from '@/components/minicomponents/alerta.vue'

/**
 * variable que contiene los metodos y variables de la store que retornamos (a modo de ser utilizadas como variables globales)
 */
const store = generalStore()
const storeProducto = useProductoStore()
const storeOrden = useOrdenStore()

const mostrandoFiltros = ref(false)
const mostrandoAgregar = ref(false)
const mostrandoAlerta = ref(false)
const mensaje = ref('')
const err = ref(false)
const dataOrdenes = ref([{}])
const available = ref(true)
const valor = ref('')

const cookies = document.cookie.split(';')
const sucursalcode = store.desencriptarData(cookies[2].split('=')[1], 'sucursalcode')
const sucursalname = JSON.parse(localStorage.getItem('usuario'))[0]['sucursalname']
const rol = store.desencriptarData(cookies[1].split('=')[1], 'rol');
const dataVista = ref(JSON.parse(localStorage.getItem('usuario')))

const encabezado = ref({
  sucursalname: dataVista.value[0]['sucursalname'],
  sucursalcode: sucursalcode,
  department: dataVista.value[0]['department'],
  colony: dataVista.value[0]['colony']
})

/**
 * Función para cambiar el valor de la bool para mostrar u ocultar el modal de los filtros
 */
const mostrarModalFiltros = () => {
  mostrandoFiltros.value = !mostrandoFiltros.value
}


const usarAlerta = () => {
  mostrandoAlerta.value = !mostrandoAlerta.value
  setTimeout(() => { mostrandoAlerta.value = !mostrandoAlerta.value; }, 1900);
}

/**
 * Función que servirá para abrir el modal con el formulario para agregar los productos al inventario general
 */
const mostrarModalAgregarProductos = (alerta) => {
  mostrandoAgregar.value = !mostrandoAgregar.value
  if (mostrandoAgregar.value == false && alerta != '') {
    mensaje.value = alerta[0]['mensaje']
    err.value = alerta[0]['error']
    usarAlerta()
  }
}


const cargarOrdenes = async () => {
  try {
    let { data, error } = await supabase
      .rpc('mostrarordenes')

    if (data != '') {
      storeOrden.dataNoFiltradaOrdenes = data
      dataOrdenes.value = (storeOrden.dataNoFiltradaOrdenes).filter(orden => orden.status == 'G')
    }

  } catch (error) {
    mensaje.value = error
    err.value = true
    usarAlerta()
  }
}
cargarOrdenes()


const configurarFiltros = (estatusF) => {
  filtrar(estatusF)
}

const filtrar = (estatusF) => {
  dataOrdenes.value = storeOrden.dataNoFiltradaOrdenes.filter(orden => orden.status == estatusF)
}

const filtrarBusqueda = (buscar) => {
  if (buscar !== '') {
    dataOrdenes.value = dataOrdenes.value.filter(orden => {
      return ((orden.sender).toLowerCase()).match((buscar).toLowerCase())
    })
  }else{
    if(localStorage.getItem('filtro-estatus') !== null){
      valor.value = localStorage.getItem('filtro-estatus')
    }else{
      valor.value = 'G'
    }
    dataOrdenes.value = (storeOrden.dataNoFiltradaOrdenes).filter(orden => orden.status == valor.value)
  }
}

watchEffect(() => {
  dataOrdenes.value = (storeOrden.dataNoFiltradaOrdenes).filter(orden => orden.status == 'G')
})

</script>
  
<style scoped>
#vista-ordenes .cuerpo-vista {
  width: 100%;
  max-width: 100%;
  height: fit-content;
  position: relative;
  margin: 5px 0px 00px 10px;
}

#vista-ordenes .cuerpo-vista .cabecera-filtros {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  margin-bottom: 15px;
}

#vista-ordenes .cuerpo-vista .cabecera-filtros .controles-filtrado-ordenes .barra-filtros .boton-filtros {
  border-radius: 13px;
  border-bottom: 1.2px solid #3581B8;
  margin: 0 0 0 10px;
  color: #3581B8;
  background-color: #fff;
  transition: all 100ms ease-in-out;
  padding: 0.2rem 0.75rem !important;
}

#vista-ordenes .cuerpo-vista .cabecera-filtros .controles-filtrado-ordenes .barra-filtros .boton-filtros:hover {
  border: 1.2px solid #3581B8;
}

.icono-boton {
  font-size: large;
  margin: auto 8px auto 0;
}

.nombre-boton {
  font-weight: 500;
  font-size: small;
}

.contenido-boton {
  width: max-content;
  align-items: center;
}

.btn {
  font-family: 'fredoka-family';
  font-size: calc(.9em + 0.04vw);
}

.btn:hover {
  cursor: pointer;
}


#vista-ordenes {
  width: 100%;
  display: inline-flex;
}

#vista-ordenes .cuerpo-vista .controles-filtrado-ordenes .boton-desplegable {
  color: #fff;
  background-color: #3581B8;
  width: 36px;
  overflow-x: hidden;
  padding: 3px 10px 3px 8.5px !important;
  border-radius: 20px;
  transition: all 200ms ease-out;
  margin: 3px 7px 15px 0;
}

#vista-ordenes .cuerpo-vista .controles-filtrado-ordenes .boton-desplegable:hover {
  width: 140px;
}

.row {
  padding-left: 25px;
  padding-right: 5px;
}

/*
  * Media Query para dispositivos moviles
  * Considerando que: el dispositivo mantiene las configuraciones por defecto de tamaño de texto y tamaños de visualización
   */
@media (max-width: 991.5px) {
  #vista-ordenes .cuerpo-vista .controles-filtrado-ordenes .boton-desplegable {
    width: 140px !important;
  }
}
</style>