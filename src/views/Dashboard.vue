<template>
  <div>
    <v-container>
      <v-row justify="center" class="lg-10">
        <v-col lg="9">
          <v-card>
            <Clients />
          </v-card>
        </v-col>
        <v-col lg="1">
          <v-card>
            <Sidebar />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

  
<script>
import Clients from "@/components/Clients";
import Sidebar from "@/components/Sidebar";
export default {
  name: "Dashboard",
  components: {
    Clients,
    Sidebar
  }
};
</script>

<style>
</style>