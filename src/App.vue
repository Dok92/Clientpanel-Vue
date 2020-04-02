<template>
  <v-app id="app">
    <AppNavbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from "./views/AppNavbar";
export default {
  name: "App",
  components: {
    AppNavbar
  },

  data: () => ({
    //
  })
};
</script>
