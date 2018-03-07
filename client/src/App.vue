<template>
  <v-app>
    <v-toolbar app flat dark color="cyan">
      <v-toolbar-title><v-btn flat @click="navigateTo('/')">Forum-App</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="navigateTo('register')">Register</v-btn>
        <v-btn flat @click="navigateTo('login')">Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    navigateTo(name) {
      this.$router.push(name);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
