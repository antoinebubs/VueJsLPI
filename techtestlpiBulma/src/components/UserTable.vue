<template>
  <v-container>
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="Position">ID</abbr></th>
          <th><abbr title="Played">First Name</abbr></th>
          <th><abbr title="Won">Last Name</abbr></th>
          <th><abbr title="Drawn">Email</abbr></th>
          <th><abbr title="Lost">Country</abbr></th>
          <th><abbr title="Goals for">City</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
          <td>{{ user.address.country }}</td>
          <td>
            <v-btn v-on:click="openedit(user.id)">Edit</v-btn>
            <v-btn v-on:click="deleteUser(user.id)" :key="user.id">
              Delete</v-btn
            >
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      users: [],
      user: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        address: {
          city: "",
          country: "",
        },
      },
    };
  },
  computed: mapGetters(["usersList"]),
  props: [],
  methods: {
    ...mapActions(["getUsers", "deleteUser", "editUser", "createUser"]),
    deleteuser(id) {
      this.users = this.users.filter((u) => u.id != id);
    },
    openedit(id) {
      this.user = { ...this.usersList.find((u) => u.id === id) };
      this.dialog = true;
    },
    saveuser() {
      if (this.user.id) {
        this.editUser(this.user);
      } else {
        this.createUser(this.user);
      }
      this.reset();
    },
    reset() {
      this.user = {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        address: {
          city: "",
          country: "",
        },
      };
      this.dialog = false;
    },
  },
  created: function () {
    this.getUsers();
  },
};
</script>