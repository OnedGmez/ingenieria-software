<template>
  <div class="logo d-flex justify-content-center">
    <img class="" src="@/assets/logo.png" alt="Logo">
  </div>
  <LoginSpace />
</template>

<script>
// @ is an alias to /src
import LoginSpace from '@/components/LoginSpace.vue'

export default {
  name: 'LoginView',
  components: {
    LoginSpace
  }
}
</script>

<style scoped>
.logo{
  position: absolute;
  left: 50%;
  right: 50%;
  height: calc(1.9em + 4vw);
  z-index: 100;
}
</style>
