<template>
  <v-container>
    <div>
    <v-app-bar
      class="navbar"
      dense
    >
      <v-app-bar-nav-icon color="white" ></v-app-bar-nav-icon>

      <v-toolbar-title>Learning Planet Institut</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="white">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
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
            <v-btn class="adduser" v-on:click="dialog = true">
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
              <v-row >
                <v-col class="edit">
              <font-awesome-icon v-on:click="openedit(user.id)" icon="fa-solid fa-pen"/>
            </v-col>
            <v-col class="delete">
              <i v-on:click="deleteUser(user.id)" :key="user.id" >
                <font-awesome-icon icon="fa-solid fa-trash"  /></i
              ></v-col>
            </v-row>
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
            <v-btn color="black" text @click="reset()"> Close </v-btn>
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
  },
};
</script>
<style scoped>
.edit {
  flex-grow: 0;
  color: darkblue;
}
.delete {
  flex-grow: 0;
  color: red;
}
.adduser {
  color: white !important;
  background: darkblue !important;
}
.navbar {
  color: white;
  background: darkblue !important;
}

</style>