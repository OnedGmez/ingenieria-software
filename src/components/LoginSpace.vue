<!-- 
  dev: Oned Gómez       
  description: Contiene el espacio del formulario de inicio de Sesión
  última modificación: 12/03/2023
-->

<template>
  <div id="space-form" class="d-flex justify-content-center align-content-center flex-wrap col-lg-6">
    <div class="avatar d-flex align-content-center justify-content-center">
      <i class="fa-solid fa-user"></i>
    </div>
    <div class="form d-flex">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1"></span>
        <input type="text" class="form-control" placeholder="Usuario/Correo electrónico" v-model="user"
          aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1"></span>
        <input type="password" class="form-control" placeholder="Contraseña" v-model="password" aria-label="Username"
          aria-describedby="basic-addon1">
      </div>
      <router-link to="/about">Olvidé mi contraseña</router-link>
    </div>
    <div @click="pruebaFunct" class="button">
      Iniciar Sesión
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
/*Importamos desde router para poder navegar entre las rutas*/
import router from "@/router";


//Variables que contendran la información de los inputs
const user = ref('');
const password = ref('');

const pruebaFunct = () => {
  let info = {
    "usuario": user.value,
    "contrasenia": password.value
  }

  if (info.usuario != '' && info.contrasenia != '') {
    router.push('/about');
  }
};
</script>


<style scoped>
/*Estilos de CSS modificados*/
.input-group-text {
  background-color: #3581B8;
  padding: 0.375rem 0.95rem;
  border: none;
  border-radius: 0;
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

/*Estilos CSS creados*/
.form {
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0 25px;
  background-color: #3581b812;
  padding: calc(1em + 3.7vw) 20px 10px 20px;
  border-radius: 35px 0 35px 0;
}

.avatar {
  flex-wrap: wrap;
  width: calc(1em + 3vw);
  height: calc(1em + 3vw);
  border-radius: calc(1em);
  font-size: calc(1em + 3vw);
  background-color: #fff;
  /* vertical-align: middle; */
  color: #3581B8;
  position: relative;
  top: calc(1em - 0.99vw);
}

.button {
  background-color: #3581b8;
  width: 70%;
  border-radius: 0 0 calc(1em + 0.1vw) calc(1em + 0.1vw);
  color: #fff;
  font-weight: 600;
  font-size: calc(1em + 0.18vw)
}

.button:hover {
  cursor: pointer;
  background-color: #3f596b;
}

/*Media Querys*/
@media (max-width: 991.5px) {
  #space-form {
    transition: all 420ms ease-in-out;
  }
}

@media (min-width: 991.5px) {
  #space-form {
    transition: all 420ms ease-in-out, height 0ms, filter 360ms ease-in-out 200ms;
  }
}
</style>
