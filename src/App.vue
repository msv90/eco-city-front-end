<template>
  <div id="app" class="middle">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>


<script>
    export default {
        name: "App",
        mounted() {

            this.$store.dispatch('minimenu/SPECIAL')

        }
    };
</script>