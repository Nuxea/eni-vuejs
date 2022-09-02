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
                    <v-icon class="mr-2">mdi-cash-100</v-icon>
                    Nouvelle Enchère
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
                              v-model="selectedAuction.name"
                              label="Nom"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedAuction.description"
                              label="Description"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedAuction.price"
                              label="Prix"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              variant="outlined"
                              hide-details
                              v-model="selectedAuction.endTime"
                              label="Date de fin"
                              type="datetime-local"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="selectedAuction.auctionTypeId"
                              :items="typeList.map(type => ({key: type.id, title: type.name, value: type.id}))"
                              label="Catégorie"
                              class="mt-0 pt-0"
                              variant="outlined"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="selectedAuction.userId"
                              :items="userList.map(user => ({key: user.id, title: user.username, value: user.id}))"
                              label="Utilisateur"
                              class="mt-0 pt-0"
                              variant="outlined"
                            ></v-select>
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
                      :disabled="selectedAuction.name === '' || selectedAuction.description === '' || selectedAuction.price === ''"
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
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Date de Fin</th>
              <th>Catégorie</th>
              <th>Utilisateur</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(auction, ind) in filteredList" :key="ind">
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
                    <h4>{{ auction.name }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ auction.description }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <v-chip>
                  {{ auction.price }} crédit
                </v-chip>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ new Date(auction.endTime).toLocaleDateString() }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ auction.auctionTypeId }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-center py-4">
                  <div class="ml-5">
                    <h4>{{ auction.userId }}</h4>
                  </div>
                </div>
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2 text-info cursor-pointer"
                  @click="editAuction(auction)"
                  title="Modifier"
                >mdi-pencil
                </v-icon>
                <v-dialog v-model="deleteDialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-icon
                      small
                      class="text-error cursor-pointer"
                      title="Supprimer"
                      @click="deleteRequest(auction)"
                    >mdi-delete
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                      <span class="title text-white">Supprimer</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <p>Voulez-vous vraiment supprimer {{selectedAuction.name }} ?</p>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                      <v-spacer></v-spacer>
                      <v-btn color="secondary" @click="closeDelete">Annuler</v-btn>
                      <v-btn
                        color="error"
                        :disabled="selectedAuction.name === '' || selectedAuction.description === ''"
                        variant="contained"
                        @click="deleteAuction"
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

import { computed, onMounted, ref } from "vue";
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import Auction from "../../models/auction";
import AuctionService from "../../services/auction.service";
import AuctionTypeService from "../../services/auctionType.service";
import UserService from "../../services/user.service";
import AuctionType from "../../models/auction-type";
import User from "../../models/user";

export default {
  name: "list-auction",
  components: {BaseBreadcrumb},

  props: {
    selectedAuction: { type: Object },
    selectedUser : { type: Object },
    selectedType: { type: Object }
  },
  setup(props, context) {
    const selectedAuction = ref(new Auction());
    const selectedUser = ref(new User());
    const selectedType = ref(new AuctionType());
    const selectedIndex = ref(undefined);
    const defaultAuction = ref(new Auction());
    const auctionList = ref([]);
    const typeList = ref([]);
    const userList = ref([]);
    const valid = ref(true);
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const search = ref("");

    onMounted(() => {
      AuctionService.getAllAuctions().then(response => {
        auctionList.value = response.data;
      });
      AuctionTypeService.getAllAuctionTypes().then(response => {
        typeList.value = response.data;
      });
      UserService.getAllUsers().then(response => {
        userList.value = response.data;
      })
    })

    const filteredList = computed(() => {
      return auctionList.value.filter((auction) => {
        const full = auction.name ;
        return full.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    function editAuction(auction) {
      selectedAuction.value = Object.assign({}, auction);
      dialog.value = true;
    }

    function deleteRequest(auction) {
      selectedAuction.value = Object.assign({}, auction);
      deleteDialog.value = true;
    }

    function deleteAuction(){
      AuctionService.deleteAuction(selectedAuction.value).then(() => {
        auctionList.value.splice(selectedIndex.value, 1);
        deleteDialog.value = false;
      }).catch((err) => {
        console.log(err);
      })
    }

    function close() {
      dialog.value = false;
      setTimeout(() => {
        selectedAuction.value = Object.assign({}, defaultAuction.value);
      }, 300);
    }

    function closeDelete() {
      deleteDialog.value = false;
    }

    function save() {
      if (!selectedAuction.value.name || !selectedAuction.value.description || !selectedAuction.value.userId || !selectedAuction.value.auctionTypeId){
        return;
      }
      AuctionService.saveAuction(selectedAuction.value).then(response => {
        context.emit('saved', response.data);
        auctionList.value.push(selectedAuction.value);
        close();
      }).catch((err) => {
        console.log(err);
      })
    }


    const formTitle = computed(() => {
      const auctionId = selectedAuction.value.id;
      return auctionId === undefined ? "Nouvelle Enchère" : "Modifier Enchère";
    });

    const page = ref({title: "Enchères" });
    const breadcrumbs = ref([
      {
        text:"Admin",
        disable: false,
        to: "/admin"
      },
      {
        text: "Liste des Enchères",
        disable: false,
      }
    ])

    return {
      filteredList,
      formTitle,
      page,
      breadcrumbs,
      auctionList,
      typeList,
      userList,
      valid,
      dialog,
      deleteDialog,
      search,
      selectedAuction,
      selectedUser,
      selectedType,
      editAuction,
      deleteRequest,
      deleteAuction,
      close,
      closeDelete,
      save
    }
  }
}
</script>
