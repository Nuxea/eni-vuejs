<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card>
        <v-card-text class="pa-5">
          <v-row>
            <v-col cols="12" lg="4" md="6">
              <v-text-field
                density="compact"
                v-model="search"
                label="Rechercher"
                hide-details
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="8" md="6" class="text-right">
              <v-dialog v-model="dialog" persistent>
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" v-bind="props" class="ml-auto">
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                    Nouvel Utilisateur
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 bg-secondary">
                    <span class="title text-white">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.username"
                              label="Pseudo"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.firstName"
                              label="Nom"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.lastName"
                              label="Prénom"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.email"
                              label="E-Mail"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.phone"
                              label="Téléphone"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.address"
                              label="Adresse"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.zipCode"
                              label="Code Postal"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.city"
                              label="Ville"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedUser.password"
                              label="Mot de Passe"
                              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show1 ? 'text' : 'password'"
                              @click:append-inner="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="close">Annuler</v-btn>
                    <v-btn
                      color="secondary"
                      :disabled="selectedUser.username === '' || selectedUser.email === ''"
                      variant="contained"
                      @click="save"
                    >Sauvegarder
                    </v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-table density="compact" class="mt-5">
            <thead>
            <tr>
              <th>#</th>
              <th>Infos</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Date Création</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, ind) in filteredList" :key="ind">
              <td>{{ ind + 1 }}</td>
              <td>
                <div class="d-flex align-center py-4">
                  <div>
                    <v-img
                      :src="`/assets/images/users/2.jpg`"
                      width="45px"
                      class="rounded-circle img-fluid"
                    ></v-img>
                  </div>

                  <div class="ml-5">
                    <h4>{{ user.username }}</h4>
                    <span class="subtitle-2 d-block font-weight-regular">{{
                        user.email
                      }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ user.address }}</h4>
                    <span class="subtitle-2 d-block font-weight-regular">
                      {{ user.zipCode }} {{ user.city }}
                    </span>
                  </div>
                </div>
              </td>
              <td>{{ user.phone }}</td>
              <td>{{ new Date(user.createTime).toLocaleDateString() }}</td>
              <td>
                <v-chip @click="changeRole(user)">
                  {{ user.role }}
                </v-chip>
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2 text-info cursor-pointer"
                  @click="editUser(user)"
                  title="Modifier"
                >mdi-pencil
                </v-icon>
                <v-dialog v-model="deleteDialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-icon
                      small
                      class="text-error cursor-pointer"
                      title="Supprimer"
                      @click="deleteRequest(user)"
                    >mdi-delete
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                      <span class="title text-white">Supprimer</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <p>Voulez-vous vraiment supprimer {{selectedUser.username }} ?</p>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" @click="closeDelete">Annuler</v-btn>
                      <v-btn
                        color="error"
                        :disabled="selectedUser.username === '' || selectedUser.email === ''"
                        variant="contained"
                        @click="deleteUser"
                      >Supprimer
                      </v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import { computed, onMounted, ref, watch } from "vue";
import User from "../../models/user";
import UserService from "../../services/user.service";
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import UserRole from "../../models/user-role";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "list-user",
  components: {BaseBreadcrumb},

  props: {
    selectedUser: { type: Object },
  },
  setup(props, context) {
    const show1 = ref(false);
    const selectedUser = ref(new User());
    const selectedIndex = ref(undefined);
    const defaultUser = ref(new User());
    const userList = ref([]);
    const valid = ref(true);
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const search = ref("");
    const store = useStore();
    const router = useRouter();
    const { currentUser, clearUser } = store.getters;
    const userRoles = ref([
      UserRole.USER,
      UserRole.ADMIN,
    ])

    onMounted(() => {
      UserService.getAllUsers().then(response => {
        userList.value = response.data;
      })
    })

    const filteredList = computed(() => {
      return userList.value.filter((user) => {
        const full = user.firstName || user.lastName || user.username ;
        return full.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    function editUser(user) {
      selectedUser.value = Object.assign({}, user);
      dialog.value = true;
    }

    // function deleteUser(user, ind) {
    //   selectedUser.value = user;
    //   selectedIndex.value = ind;
    //   UserService.deleteUser(user).then(() => {
    //     confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?") &&
    //     userList.value.splice(ind, 1);
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }

    function deleteRequest(user) {
      selectedUser.value = Object.assign({}, user);
      deleteDialog.value = true;
    }

    function deleteUser(){
      UserService.deleteUser(selectedUser.value).then(() => {
        userList.value.splice(selectedIndex.value, 1);
        deleteDialog.value = false;
      }).catch((err) => {
        console.log(err);
      })
    }

    function close() {
      dialog.value = false;
      setTimeout(() => {
        selectedUser.value = Object.assign({}, defaultUser.value);
      }, 300);
    }

    function closeDelete() {
      deleteDialog.value = false;
    }

    function save() {
      if (!selectedUser.value.username || !selectedUser.value.email || !selectedUser.value.password){
        return;
      }
      UserService.saveUser(selectedUser.value).then(response => {
        context.emit('saved', response.data);
        if (selectedUser.value.id === null){
          userList.value.push(selectedUser.value);
        } else {
          if (selectedUser.value.id){
            userList.value.splice(selectedUser.value, 1);
          }
          userList.value.unshift(selectedUser.value);
        }

        close();
      }).catch((err) => {
        console.log(err);
      })
    }

    function changeRole(user) {
      selectedUser.value = Object.assign({}, user);
      const newRole = selectedUser.value.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER;

      UserService.changeRole(user, newRole).then(() => {
        if (store.getters.currentUser.id === selectedUser.value.id){
          store.dispatch("clearUser");
          router.push("/login");
        }
      }).catch((err) => {
        console.log(err);
      })
    }

    const formTitle = computed(() => {
      const userId = selectedUser.value.id;
      return userId === undefined ? "Nouvel Utilisateur" : "Modifier Utilisateur";
    });

    const page = ref({title: "Utilisateurs" });
    const breadcrumbs = ref([
      {
        text:"Admin",
        disable: false,
        to: "/admin"
      },
      {
        text: "Liste Utilisateur",
        disable: false,
      }
    ])

    return {
      show1,
      filteredList,
      formTitle,
      page,
      breadcrumbs,
      userRoles,
      userList,
      valid,
      dialog,
      deleteDialog,
      search,
      selectedUser,
      currentUser,
      clearUser,
      changeRole,
      editUser,
      deleteRequest,
      deleteUser,
      close,
      closeDelete,
      save
    }
  }
}
</script>
