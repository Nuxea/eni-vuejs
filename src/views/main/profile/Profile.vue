<template>
<!--    <v-container fluid class="page-wrapper">-->
<!--      <v-card class="mt-6" max-height="760">-->
<!--        <v-layout>-->
<!--          <v-navigation-drawer-->
<!--            permanent-->
<!--          >-->
<!--            <v-list>-->
<!--              <v-list-item-->
<!--                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"-->
<!--                :title="currentUser.username"-->
<!--                :subtitle="currentUser.email"-->
<!--              ></v-list-item>-->
<!--            </v-list>-->

<!--            <v-divider></v-divider>-->

<!--            <v-list density="compact" nav>-->
<!--              <v-list-item prepend-icon="mdi-account" title="Mes Infos" value="infos" to="/profile/user"></v-list-item>-->
<!--              <v-list-item prepend-icon="mdi-clipboard-list-outline" title="Mes Enchères" value="auctions" to="/profile/auction"></v-list-item>-->
<!--              <v-list-item prepend-icon="mdi-cash" title="Mes Achats" value="purchases" to="/profile/purchase"></v-list-item>-->
<!--            </v-list>-->
<!--          </v-navigation-drawer>-->

<!--          <v-main>-->
<!--            <v-container>-->
<!--              <h2 class="text-center pb-5">Bienvenue sur votre profil</h2>-->
<!--              <v-divider></v-divider>-->
<!--              <router-view />-->
<!--            </v-container>-->
<!--          </v-main>-->
<!--        </v-layout>-->
<!--      </v-card>-->
<!--    </v-container>-->

  <v-container fluid class="page-wrapper">
    <v-card class="pa-5 my-5">
      <BaseBreadcrumb
        :title="page.title"
        :breadcrumbs="breadcrumbs"
      >
      </BaseBreadcrumb>
    </v-card>

    <v-card>
      <v-toolbar
        color="deep-purple"
      >
        <v-toolbar-title>Bienvenue sur votre profil, {{ currentUser.username }}</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-tabs
          v-model="tab"
          direction="vertical"
          color="deep-purple"
        >
          <v-tab value="option-1">
            <v-icon start>
              mdi-account
            </v-icon>
            Mes Infos
          </v-tab>
          <v-tab value="option-2">
            <v-icon start>
              mdi-lock
            </v-icon>
            Mes Enchères
          </v-tab>
          <v-tab value="option-3">
            <v-icon start>
              mdi-access-point
            </v-icon>
            Mes Achats
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" style="width: 100vw">
          <v-window-item value="option-1">
            <v-card flat="">
              <v-card-text>
                <div class="d-flex justify-end">
                  <v-btn color="deep-purple" @click="editUser(currentUser)">
                    <v-icon class="mr-2">mdi-account</v-icon>
                    Modifier les informations
                  </v-btn>
                </div>

                <v-divider class="my-5"></v-divider>

                <div class="d-flex ">
                        <v-col>
                          <p class="m-b-10 f-w-600">Pseudo</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.username }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Nom</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.firstName }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Prénom</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.lastName }}</h6>
                        </v-col>
                      </div>

                <div class="d-flex ">
                        <v-col>
                          <p class="m-b-10 f-w-600">Adresse</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.address }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Code Postal</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.zipCode }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Ville</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.city }}</h6>
                        </v-col>
                      </div>

                <div class="d-flex ">
                        <v-col>
                          <p class="m-b-10 f-w-600">E-Mail</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.email }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Téléphone</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.phone }}</h6>
                        </v-col>
                        <v-col>
                          <p class="m-b-10 f-w-600">Crédit</p>
                          <h6 class="text-muted f-w-400">{{ currentUser.credit }}</h6>
                        </v-col>
                      </div>

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

                    <v-list class="pa-2">
                      <v-list-item v-if="selectedUser" class="pt-0">
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

                            <v-btn class="mr-2" color="deep-purple" @click="saveUser">
                              Enregistrer
                            </v-btn>
                            <v-btn color="error" @click="editUserDial = false"
                            >Annuler</v-btn>
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-navigation-drawer>
                </v-card-text>
              </v-card>

          </v-window-item>
          <v-window-item value="option-2">
            <v-card flat>
              <v-card-text>
                <div class="d-flex justify-end">
                  <v-btn color="deep-purple" @click="createAuction">
                    <v-icon class="mr-2">mdi-account</v-icon>
                    Ajouter une enchère
                  </v-btn>
                </div>

                <v-divider class="my-5"></v-divider>

                <div class="d-flex ">
                  <v-col>
                    <p class="m-b-10 f-w-600">Nom</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.username }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Description</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.firstName }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Prix</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.lastName }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Date de Fin</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.lastName }}</h6>
                  </v-col>
                </div>

                <v-navigation-drawer
                  v-model="createAuctionDial"
                  rail-width="fit-content"
                  temporary
                  position="right"
                  width="500"
                >
                  <v-toolbar flat small>
                    <v-toolbar-title>Création Enchère</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon color="error" @click="createAuctionDial = false">
                      <v-icon size="small">mdi-window-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-list class="pa-2">
                    <v-list-item v-if="selectedUser" class="pt-0">
                      <v-list-item-title>
                        <div class="px-3 mt-5">
                          <div class="d-flex">
                            <v-col cols="6">
                              <v-text-field
                                label="Nom"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Description"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                          </div>

                          <div class="d-flex">
                            <v-col cols="6">
                              <v-text-field
                                label="Mise"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Date de fin"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                          </div>

                          <v-btn class="mr-2" color="deep-purple">
                            Enregistrer
                          </v-btn>
                          <v-btn color="error" @click="createAuctionDial = false"
                          >Annuler</v-btn>
                        </div>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-navigation-drawer>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="option-3">
            <v-card flat>
              <v-card-text>
                <div class="d-flex ">
                  <div>
                    <v-icon class="mr-2">mdi-account</v-icon>
                    Historique de mes Achats
                  </div>
                </div>

                <v-divider class="my-5"></v-divider>

                <div class="d-flex ">
                  <v-col>
                    <p class="m-b-10 f-w-600">Pseudo</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.username }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Nom</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.firstName }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Prénom</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.lastName }}</h6>
                  </v-col>
                </div>

                <div class="d-flex ">
                  <v-col>
                    <p class="m-b-10 f-w-600">Adresse</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.address }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Code Postal</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.zipCode }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Ville</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.city }}</h6>
                  </v-col>
                </div>

                <div class="d-flex ">
                  <v-col>
                    <p class="m-b-10 f-w-600">E-Mail</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.email }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Téléphone</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.phone }}</h6>
                  </v-col>
                  <v-col>
                    <p class="m-b-10 f-w-600">Crédit</p>
                    <h6 class="text-muted f-w-400">{{ currentUser.credit }}</h6>
                  </v-col>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>


</template>

<script>
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import UserService from "@/services/user.service";
import router from "@/router";

export default {
  name: "profile",
  components: { BaseBreadcrumb },

  props: {
    selectedUser: { type: Object },
  },
  data:() => ({
    tab: 'option-1',
  }),
  setup(props, context){
    const store = useStore();
    const { currentUser } = store.getters;
    const editUserDial = ref(false);
    const createAuctionDial = ref(false);
    const selectedUser = ref();

    function editUser(user) {
      editUserDial.value = !editUserDial.value;
      selectedUser.value = Object.assign({}, user);
    }

    function saveUser() {
      UserService.saveUser(selectedUser.value).then(response => {
        context.emit('saved', response.data);
        store.dispatch("clearUser");
        router.push("/login");
      }).catch((err) => {
        console.log(err);
      })
    }

    function createAuction() {
      createAuctionDial.value = !createAuctionDial.value;
    }

    const page = ref({title: "Profil" });
    const breadcrumbs = ref([
      {
        title:"Accueil",
        disable: false,
        href: "/home"
      },
      {
        title: "Infos Utilisateur",
        disable: false,
      }
    ]);

    return {
      breadcrumbs,
      page,
      currentUser,
      selectedUser,
      editUserDial,
      createAuctionDial,
      editUser,
      saveUser,
      createAuction,
    }
  }

}


</script>

<style scoped>
</style>
