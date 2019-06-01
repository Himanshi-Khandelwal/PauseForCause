<template>
  <v-app class="grey lighten-4">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PAUSE </span>
        <span class="font-weight-light">FOR CAUSE</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
