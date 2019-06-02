<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Pause </span>
        <span>FOR CAUSE</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" dark>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-5.png">
          </v-avatar>
          <p class="white--text subheading mt-1"> {{ $store.state.userInfo.name }}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in $store.state.links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
        this.$store.state.links = [];
        this.$store.state.userInfo = {};
      })
    }
  }
}
</script>

<style>
</style>
