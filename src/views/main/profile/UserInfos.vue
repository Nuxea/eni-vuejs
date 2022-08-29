<template>
    <v-container fluid class="page-wrapper">
          <v-list>
            <perfect-scrollbar class="todoheight">
              <v-col cols="12">
                <v-card theme="light" class="card-block">
                  <v-card class="d-flex justify-end mb-5">
                    <v-btn color="primary" @click="editUser(currentUser)">
                      <v-icon class="mr-2">mdi-account</v-icon>
                      Modifier les informations
                    </v-btn>
                  </v-card>

                  <v-divider></v-divider>
                  <div class="d-flex ">
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Pseudo</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.username }}</h6>
                    </v-col>
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Nom</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.firstName }}</h6>
                    </v-col>
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Prénom</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.lastName }}</h6>
                    </v-col>
                  </div>

                  <div class="d-flex ">
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Adresse</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.address }}</h6>
                    </v-col>
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Code Postal</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.zipCode }}</h6>
                    </v-col>
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Ville</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.city }}</h6>
                    </v-col>
                  </div>

                  <div class="d-flex ">
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">E-Mail</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.email }}</h6>
                    </v-col>
                    <v-col cols="4">
                      <p class="m-b-10 f-w-600">Téléphone</p>
                      <h6 class="text-muted f-w-400">{{ currentUser.phone }}</h6>
                    </v-col>
                  </div>
                </v-card>
              </v-col>
            </perfect-scrollbar>
          </v-list>
      <!-- -------------------------------------------------------------------------------------
              Edit Task Drawer
      --------------------------------------------------------------------------------------->
      <v-navigation-drawer
        v-model="editUserDial"
        temporary
        position="right"
        width="500"
      >
        <v-toolbar flat small>
          <v-toolbar-title>Modifier</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon color="error" @click="editUserDial = false">
            <v-icon size="small">mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- -------------------------------------------------------------------------------------
              Todo edit
      --------------------------------------------------------------------------------------->
        <v-list class="pa-2">
          <v-list-item-content v-if="selectedUser" class="pt-0">
            <v-list-item-title>
              <div class="px-3 mt-5">
                <div class="d-flex">
                  <v-col cols="6">
                    <v-text-field
                      label="Pseudo"
                      variant="outlined"
                      v-model="selectedUser.username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Nom"
                      variant="outlined"
                      v-model="selectedUser.firstName"
                    ></v-text-field>
                  </v-col>
                </div>

                <div class="d-flex">
                  <v-col cols="6">
                    <v-text-field
                      label="Prénom"
                      variant="outlined"
                      v-model="selectedUser.lastName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Téléphone"
                      variant="outlined"
                      v-model="selectedUser.phone"
                    ></v-text-field>
                  </v-col>
                </div>

                <div class="d-flex">
                  <v-col cols="6">
                    <v-text-field
                      label="E-Mail"
                      variant="outlined"
                      v-model="selectedUser.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Adresse"
                      variant="outlined"
                      v-model="selectedUser.address"
                    ></v-text-field>
                  </v-col>
                </div>

                <div class="d-flex">
                  <v-col cols="6">
                    <v-text-field
                      label="Code Postal"
                      variant="outlined"
                      v-model="selectedUser.zipCode"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Ville"
                      variant="outlined"
                      v-model="selectedUser.city"
                    ></v-text-field>
                  </v-col>
                </div>

                <v-btn class="mr-2" color="success" @click="save">
                  Enregistrer
                </v-btn>
                <v-btn color="error" @click="editUserDial = false"
                >Annuler</v-btn>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-navigation-drawer>
    </v-container>
</template>

<script>
import { ref } from "vue";
import BaseLeftRightPartVue from "@/components/BaseLeftRightPart.vue";
import "v-calendar/dist/style.css";
import { useStore } from "vuex";
import UserService from "@/services/user.service";
import User from "@/models/user";
import router from "@/router";

export default {
  name: "profile-user",
  components: {BaseLeftRightPartVue},

  props: {
    selectedUser: { type: Object },
  },
  setup(props, context) {
    const store = useStore();
    const { currentUser } = store.getters;
    const dialog = ref(false);
    const editUserDial = ref(false);
    const selectedUser = ref();

    function selectUser() {
      editUserDial.value = !editUserDial.value;
      selectedUser.value = currentUser.value;
    }

    function editUser(user) {
      editUserDial.value = !editUserDial.value;
      selectedUser.value = Object.assign({}, user);
    }

    function save() {
      if (!selectedUser.value.username || !selectedUser.value.email){
        return;
      }
      UserService.saveUser(selectedUser.value).then(response => {
        context.emit('saved', response.data);
        store.dispatch("clearUser");
        router.push("/login");
      }).catch((err) => {
        console.log(err);
      })
    }

    return {
      dialog,
      currentUser,
      selectedUser,
      editUserDial,
      editUser,
      save,
    }
  },
}

</script>
<style lang="scss">
.todoheight {
  height: calc(100vh - 300px);
}

.user-card-full {
  overflow: hidden;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
  box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
  border: none;
  margin-bottom: 30px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.card .card-block p {
  line-height: 25px;
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.card .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #919aa3 !important;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}
</style>
