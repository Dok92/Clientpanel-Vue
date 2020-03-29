<template>
   <div>
      <v-app-bar color="deep-purple accent-4" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>ClientPanel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon >mdi-login</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-singnin</v-icon>
        </v-btn>
        <v-menu left bottom>
        </v-menu>
      </v-app-bar>
    </div>
</template>

<script>
export default {
  // name: 'AppNavbar'
}
</script>