<!-- 
  dev: Oned Gómez       
  description: Junta la vista (pantalla) con el componente que contiene el formulario de inicio de sesión
  última modificación: 12/03/2023
-->

<template>
  <div class="logo d-flex justify-content-center">
    <img src="@/assets/logo.png" alt="Logo">
  </div>
  <div class="container-fluid">
    <div class="row">
      <div id="banner-vertical" class="col-lg-6 d-flex justify-content-center align-items-center">
        <img class="img-fluid" src="@/assets/img/prueba.jpg" alt="Banner">
      </div>
      <!--Iniciar-sesion es el nombre del evento que está emitiendo el componente-->
      <LoginSpace @iniciar-sesion="(usuario, contrasenia) => validarSesion(usuario, contrasenia)" />
    </div>
  </div>
</template>

<script setup>

import router from "@/router";
import { useUsuarioStore } from '@/store/usuario.js'
// @ is an alias to /src
import LoginSpace from '@/components/LoginSpace.vue'

const validarSesion = (usuario, contrasenia) => {
  if (usuario === '' || contrasenia === '') {
    window.alert("Usuario y/o contraseña incorrecta(o)")
  }else{
    //Accedemos a la store de usuario y le enviamos la información (nombre, rol, foto,)
    const usuario = useUsuarioStore()
    usuario.setRol("Admin")
    router.push('/inventario');
  }
};
</script>

<style scoped>
.logo {
  position: absolute;
  left: 50%;
  right: 50%;
  height: calc(1.9em + 4vw);
  z-index: 100;
}

.container-fluid,
.row {
  height: 100%;
  width: 100% !important;
  margin: 0;
}

.container-fluid {
  padding: 0 !important;
}


#banner-vertical,
#banner-vertical img {
  height: 100vh;
  padding: 0;
}

#banner-vertical img {
  width: 100%;
}

@media (max-width: 991.5px) {
  #banner-vertical {
    position: absolute;
    z-index: -10;
    filter: opacity(15%) blur(40px);
    transition: all 420ms ease-in-out;
  }

  .logo {
    height: calc(1.9em + 7vw);
  }
}

@media (min-width: 991.5px) {

  #banner-vertical {
    transition: all 420ms ease-in-out, height 0ms, filter 360ms ease-in-out 200ms;
  }
}
</style>

