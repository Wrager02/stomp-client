<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500600&display=swap');

html {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 100%;
  color: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font: inherit;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>
