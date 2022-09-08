<template>
  <v-container fluid class="page-wrapper">
    <v-card class="pa-5">
      <BaseBreadcrumb
        :title="page.title"
        :breadcrumbs="breadcrumbs"
      >
      </BaseBreadcrumb>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12">
<!--        <v-card>-->
          <div class="pa-5">
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
              <v-col v-if="currentUser" cols="12" lg="8" md="6" class="text-right">
                <v-dialog v-model="dialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-btn color="deep-purple" v-bind="props" class="ml-auto">
                      <v-icon class="mr-2">mdi-cash-100</v-icon>
                      Créer une nouvelle Enchère
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="pa-4 bg-deep-purple">
                      <span class="title text-white">Création Enchère</span>
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
            <v-row class="mt-5">
              <v-card v-for="(auction, ind) in filteredList" :key="ind" class="mx-auto my-12" max-width="374">
                <v-img
                  height="250"
                  src="https://picsum.photos/200"
                  cover
                ></v-img>

                <v-card-item>
                  <v-card-title>{{ auction.name }}</v-card-title>
                </v-card-item>

                <v-card-text>
                  <div class="overflow-y-auto">{{ auction.description }}</div>
                </v-card-text>

                <div class="px-4 d-flex justify-end">
                  <v-chip>{{ auction.price }} crédit</v-chip>
                </div>

                <v-card-actions>
                  <v-btn
                    color="deep-purple-lighten-2"
                    :to="{
            name: 'AuctionDetails',
            params: {
              id: auction.id
            }
            }"
                  >
                    Plus d'infos
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </div>
<!--        </v-card>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { computed, onMounted, ref, watch } from "vue";
import UserService from "../../services/user.service";
import BaseBreadcrumb from "/src/components/BaseBreadcrumb.vue";
import { useStore } from "vuex";
import AuctionService from "@/services/auction.service";
import Auction from "@/models/auction";
import AuctionTypeService from "@/services/auctionType.service";

export default {
  name: "list-Auction",
  components: {BaseBreadcrumb},

  props: {
    selectedAuction: {type: Object },
  },

  setup(props, context) {
    const selectedAuction = ref(new Auction());
    const valid = ref(true);
    const dialog = ref(false);
    const auctionList = ref([]);
    const typeList = ref([]);
    const userList = ref([]);
    const search = ref("");
    const store = useStore();
    const { currentUser } = store.getters;

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

    function save() {
      if (!selectedAuction.value.name || !selectedAuction.value.description || !selectedAuction.value.userId || !selectedAuction.value.auctionTypeId){
        return;
      }
      AuctionService.saveAuction(selectedAuction.value).then(response => {
        context.emit('saved', response.data);
        if (selectedAuction.value.id === null){
          auctionList.value.push(selectedAuction.value);
        } else {
          if (selectedAuction.value.id) {
            auctionList.value.splice(selectedAuction.value, 1);
          }
          auctionList.value.unshift(selectedAuction.value);
        }

        close();
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

    const page = ref({title: "Enchères" });
    const breadcrumbs = ref([
      {
        title:"Accueil",
        disable: false,
        href: "/home"
      },
      {
        title: "Liste des Enchères",
        disable: false,
      }
    ]);

    return {
      currentUser,
      selectedAuction,
      valid,
      dialog,
      search,
      filteredList,
      typeList,
      userList,
      page,
      breadcrumbs,
      save,
      close
    }
  }
}
</script>

<style scoped>

</style>
