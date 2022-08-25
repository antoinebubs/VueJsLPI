<template>
  <v-app>
    <v-main>
      <UserTable />
    </v-main>
  </v-app>
</template>

<script>
import UserTable from "./components/UserTable";

export default {
  name: "App",

  components: {
    UserTable,
  },

  data: () => ({
    //
  }),
};
</script>
