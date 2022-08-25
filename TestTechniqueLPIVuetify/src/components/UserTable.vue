<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">City</th>
            <th class="text-left">Country</th>
            <th class="text-left">
              Actions<v-btn color="primary" v-on:click="dialog = true">
                Add user</v-btn
              >
            </th>
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
      </template>
    </v-simple-table>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal first name*"
                    required
                    v-model="user.firstname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                    v-model="user.lastname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required v-model="user.email">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Country"
                    v-model="user.address.country"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="City"
                    v-model="user.address.city"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="reset()"> Close </v-btn>
            <v-btn color="blue darken-1" text @click="saveuser()"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    // this.$store.watch(
    //   (state) => state.users,
    //   () => {
    //     this.users = this.$store.state.users;
    //     this.$store.dispatch("users/getUsers");
    //   }
    // );
    // axios({
    //   method: "get",
    //   url: "https://fakerapi.it/api/v1/persons?_locale=fr_FR",
    // })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data.data[0]);
    //     this.users = res.data.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>