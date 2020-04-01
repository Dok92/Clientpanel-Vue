<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{name: 'Dashboard'}">
          <h3 class="white--text">ClientPanel</h3>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="darken-1 primary" id="login">
        <router-link :to="{name: 'Login'}">
          <h4 class="white--text">Login</h4>
        </router-link>
      </v-btn>
      <v-btn class="mr-3" id="register">
        <router-link :to="{name: 'Register'}">
          <h4 class="white--text">Signin</h4>
        </router-link>
      </v-btn>
      <router-link :to="{name: 'Settings'}">
        <v-btn color="darken-1 primary">
          <h3 class="white--text">
            <font-awesome-icon :icon="['fas', 'users-cog']" />
          </h3>
        </v-btn>
      </router-link>
      <v-btn>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-menu left bottom></v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-toolbar__title a {
  text-decoration: none;
}
#login a {
  text-decoration: none;
}
#register a {
  text-decoration: none;
}
.addMore {
  border: none;
  width: 32px;
  height: 32px;
  background-color: #eee;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
}
.addMore:hover {
  border: 1px solid #888;
  background-color: #ddd;
}
</style>
