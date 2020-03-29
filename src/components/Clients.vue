<template>
  <div>
    <h1>Clients</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th><i class="mdi mdi-account-circle pr-1"></i>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@gmail.com</td>
            <td>100</td>
            <td><v-icon>mdi mdi-account-search</v-icon></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  thead tr th {
    font-size: 20px;
  }
  tbody tr td {
    font-size: 16px;
  }
</style>