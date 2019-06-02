<template>
  <div class="ngos">
    <h1 class="subheading grey--text">NGOs Around</h1>

    <v-container class="my-5">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="ngo in ngosList" :key="ngo.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="ngo.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ ngo.name }}</div>
              <div class="grey--text">{{ ngo.title }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>fas fa-donate</v-icon>
                <span class="">Donate</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>
export default {
  name: 'ngosList',
  data() {
    return {
      ngosList: [
        { name: 'iVolunteer', title: 'we help people', avatar: '/avatar-1.png' },
        { name: 'Small Change', title: 'we help people', avatar: '/avatar-2.png' },
        { name: 'Enable India', title: 'we help people', avatar: '/avatar-3.png' },
        { name: 'My One Tenth', title: 'we help people', avatar: '/avatar-4.png' },
        { name: 'Girl Child NGO', title: 'we help people', avatar: '/avatar-5.png'}
      ]
    }
  }
}
</script>
