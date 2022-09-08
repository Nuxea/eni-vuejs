<template>
        <v-main>
          <v-container fluid class="page-wrapper">
            <v-card>
              <v-row class="ma-5">
                <v-col xs="12">
                  <v-img
                    fluid
                    src="https://picsum.photos/200"
                    cover
                    style="border-radius: 5px"
                  ></v-img>
                </v-col>

                <v-col>
                  <v-row class="mt-5">
                    <v-col>
                      <h2><strong>{{ auction.name }}</strong></h2>
                      <small class="pl-5">Se termine le : {{ new Date(auction.endTime).toLocaleString() }}</small>
                    </v-col>
                    <v-col>
                      <v-chip color="deep-purple" class="mt-7 px-9 text-right">{{ user.username }}</v-chip>
                    </v-col>
                    <v-col cols="12">
                      <p>{{ auction.description }}</p>
                      <div class="pt-5">
                        <v-chip class="ma-5">{{ auctionType.name }}</v-chip>
                      </div>

                      <v-card
                        class="mt-10"
                        max-width="500"
                        variant="outlined"
                      >
                        <div class="ma-5">
                          <v-row>
                            <v-col>
                              <small class="text-overline mb-1">
                                Mise actuelle
                              </small>
                            </v-col>
                            <v-col class="text-right">
                              <small v-if="auction.price === 1">
                                {{ auction.price }} crédit
                              </small>
                              <small v-if="auction.price > 1">
                                {{ auction.price }} crédits
                              </small>
                            </v-col>
                          </v-row>

                          <v-container class="mt-11">
                            <v-form ref="form" v-model="valid" >
                              <v-text-field
                                v-model="newPrice.price"
                                min="1"
                                label="Crédit"
                                type="number"
                                variant="outlined"
                              >
                              </v-text-field>
                            </v-form>
                            <v-dialog v-model="dialog" persistent>
                              <template v-slot:activator="{ props }">
                                <v-btn
                                  height="70px"
                                  class="px-10"
                                  block=""
                                  x-large
                                  color="deep-purple"
                                  @click="requestBid(newPrice)"
                                >
                                  Enchérir
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title class="pa-4 bg-secondary">
                                  <span class="title text-white">Enchérir</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <p v-if="newPrice.price === 1">
                                      Voulez-vous vraiment enchérir {{ auction.name }} de {{ newPrice.price }} crédit ?
                                    </p>
                                    <p v-if="newPrice.price > 1">
                                      Voulez-vous vraiment enchérir {{ auction.name }} de {{ newPrice.price }} crédits ?
                                    </p>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                  <v-spacer></v-spacer>
                                  <v-btn color="error" @click="close">Annuler</v-btn>
                                  <v-btn
                                    color="secondary"
                                    variant="tonal"
                                    @click="bid"
                                  >
                                    Enchérir
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-container>
                        </div>
                      </v-card>

                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
              <v-row class="ma-5 justify-center">
                  <v-card max-width="50%">
                    <v-tabs
                      v-model="tab"
                      fixed-tabs=""
                      background-color="deep-purple"
                      next-icon="mdi-arrow-right-bold-box-outline"
                      prev-icon="mdi-arrow-left-bold-box-outline"
                      show-arrows
                    >
                      <v-tab value="desc">Description</v-tab>
                      <v-tab value="deta">Détails</v-tab>
                      <v-tab value="hist">Historique d'enchérissement</v-tab>

                    </v-tabs>

                    <v-card-text>
                      <v-window v-model="tab">
                        <v-window-item value="desc">
                          {{ auction.description }}
                        </v-window-item>

                        <v-window-item value="deta">
                          <v-row>
                            <v-col cols="6">
                              <ul>
                                <li><small>Intitulé de l'enchère </small>:</li>
                                <li><small>Créateur :</small></li>
                                <li><small>Date de création :</small></li>
                                <li><small>Date de fin :</small></li>
                                <li><small>Catégorie :</small></li>
                                <li><small>Mise :</small></li>
                              </ul>
                            </v-col>
                            <v-col cols="6">
                              <ul class="text-right">
                                <li><strong>{{ auction.name }}</strong></li>
                                <li><strong>{{ user.username }}</strong></li>
                                <li><strong>{{ new Date(auction.createTime).toLocaleString() }}</strong></li>
                                <li><strong>{{ new Date(auction.endTime).toLocaleString() }}</strong></li>
                                <li><strong>{{ auctionType.name }}</strong></li>
                                <li><strong>{{ auction.price }} crédit</strong></li>
                              </ul>
                            </v-col>
                          </v-row>
                        </v-window-item>

                        <v-window-item value="hist">
                          <v-row>
                            <v-col cols="6">
                              <ul>
                                <li><small>Un a enchéri</small></li>
                                <li><small>Deux a enchéri</small></li>
                                <li><small>Trois a enchéri</small></li>
                                <li><small>Quatre a enchéri</small></li>
                                <li><small>Cinq a enchéri</small></li>
                              </ul>
                            </v-col>
                            <v-col cols="6">
                              <ul class="text-right">
                                <li><strong>1 Crédit</strong></li>
                                <li><strong>2 Crédits</strong></li>
                                <li><strong>5 Crédits</strong></li>
                                <li><strong>3 Crédits</strong></li>
                                <li><strong>7 Crédits</strong></li>
                              </ul>
                            </v-col>
                          </v-row>

                        </v-window-item>


                      </v-window>
                    </v-card-text>
                  </v-card>
              </v-row>
            </v-card>
          </v-container>
        </v-main>
</template>

<script>

import { onMounted, ref } from "vue";
import Auction from "@/models/auction";
import { useRouter } from "vue-router";
import AuctionService from "@/services/auction.service";
import User from "@/models/user";
import UserService from "@/services/user.service";
import AuctionTypeService from "@/services/auctionType.service";
import AuctionType from "@/models/auction-type";
import { useStore } from "vuex";
import BidService from "@/services/bid.service";
import Bid from "@/models/bid";

export default {
  name: "Auction-Details",

  props: {
    auction: { type: Object },
    newPrice: { type: Object },
  },

  data: () => ({
    tab: null,
  }),
  setup(props, context) {
    let auction = ref(new Auction());
    const newPrice = ref(new Bid());
    let user = ref(new User());
    let auctionType = ref(new AuctionType());
    const valid = ref(true);
    const router = useRouter();
    const dialog = ref(false);
    const store = useStore();
    const { currentUser } = store.getters;

    onMounted( () => {
      AuctionService.getAuctionById(router.currentRoute.value.params.id).then(response => {
        auction.value = response.data;
        UserService.getUserById(auction.value.userId).then(response => {
          user.value = response.data;
        });
        AuctionTypeService.getAuctionById(auction.value.auctionTypeId).then(response => {
          auctionType.value = response.data;
        });
      });
    });

    function requestBid(auction){
      newPrice.value = Object.assign({}, auction);
      dialog.value = true;
    }

    function close() {
      dialog.value = false;
    }

    function bid(){
      if (!newPrice.value.price) {
        return;
      }
      if (currentUser.credit >= newPrice.value){
        BidService.saveBid(newPrice.value).then(response => {
          currentUser.credit.decrement(newPrice.value);
          auction.value.price.increment(newPrice.value);
          context.emit('saved', response.data);
        }).catch((err) => {
          console.log(err);
        });
      }

    }

    return {
      auction,
      newPrice,
      user,
      auctionType,
      valid,
      dialog,
      requestBid,
      bid,
      close
    }
  }
}
</script>

<style scoped>
.v-card-text {
  background-color: #111218;
}

ul {
  list-style-type: none;
}
</style>
