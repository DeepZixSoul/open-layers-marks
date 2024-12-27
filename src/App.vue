<!-- src/App.vue -->
<template>
  <div id="app">
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from "./components/map/MapComponent.vue";

export default {
  name: "App",
  components: {
    MapComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
