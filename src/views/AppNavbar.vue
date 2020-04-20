<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{name: 'Dashboard'}">
          <h3 class="white--text">
            <v-icon class="mr-1">mdi-account-multiple</v-icon>ClientPanel
          </h3>
        </router-link>
      </v-toolbar-title>
      <v-menu left bottom></v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
      class="deep-purple darken-4 accent-4"
      width="200px"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h3 class="pt-2">ClientPanel</h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>

      <v-list>
        <div v-if="!isAuthenticated">
          <v-list-item :to="{name: 'Login'}">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <h4 class="white--text">Login</h4>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name: 'Register'}">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <h4 class="white--text">Signin</h4>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-if="isAuthenticated">
          <v-list-item link :to="{name: 'Settings'}">
            <v-list-item-content>
              <v-list-item-title>
                <p class="white--text mb-0 subtitle-1 pl-3">
                  <font-awesome-icon :icon="['fas', 'users-cog']" class="mr-3" />Settings
                </p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <template v-slot:append v-if="isAuthenticated">
        <div class="pa-2">
          <v-btn width="100%" @click="logout">
            <v-icon class="mr-1">mdi-logout</v-icon>
            <h4 class="ml-1">logout</h4>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "AppNavbar",
  components: {
  },
  data() {
    return {
      isAuthenticated: null,
      drawer: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.isAuthenticated = user;
        } else {
          this.isAuthenticated = null;
        }
      },
      err => console.log(err)
    );
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
.v-toolbar__title a {
  text-decoration: none;
}
</style>
