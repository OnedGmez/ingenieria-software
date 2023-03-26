<template>
  <router-view/>
</template>

<style>
body{
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
a{
  color: #999!important;
  text-decoration: none!important;
  text-align: start;
  width: fit-content;
  font-size: calc(.5em + 0.5vw);
  font-weight: 100;
}

/**Estilos custom a css de bootstrap */
.row{
  padding: inherit;
}

.img-fluid {
    height: 100%!important;
}
</style>
