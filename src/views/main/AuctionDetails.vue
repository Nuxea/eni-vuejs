<template>
        <v-main>
          <v-container fluid class="page-wrapper">
            <v-card>
              <v-row class="ma-5">
                <v-col cols="6">
                  <v-img
                    src="https://picsum.photos/200"
                    cover
                    style="border-radius: 5px"
                  ></v-img>
                </v-col>

                <v-col cols="6">
                  <v-row class="mt-5">
                    <v-col cols="9">
                      <h2><strong>{{ auction.name }}</strong></h2>

                      <small class="pl-5">Crée le : {{ new Date(auction.createTime).toLocaleDateString() }}</small>
                      <small class="pl-5">Se termine le : {{ new Date(auction.endTime).toLocaleDateString() }}</small>


                    </v-col>
                    <v-col cols="3">
                      <v-chip color="purple" class="mt-7 px-9 text-right">{{ user.username }}</v-chip>
                    </v-col>
                    <v-col cols="12">
                      <p>{{ auction.description }}</p>
                      <div class="pt-5">
                        <v-chip class="ma-5">{{ auctionType.name }}</v-chip>
                      </div>

                      <v-row class="d-flex align-center">
                        <v-col cols="6">
                          <v-card
                            class="mt-10"
                            max-width="500"
                            variant="outlined"
                          >
                            <div class="ma-5">
                              <small class="text-overline mb-1">
                                Mise
                              </small>
                              <div v-if="auction.price === 1" class="text-h6 mb-1 text-center">
                                {{ auction.price }} crédit
                              </div>
                              <div v-if="auction.price > 1" class="text-h6 mb-1 text-center">
                                {{ auction.price }} crédits
                              </div>
                            </div>
                          </v-card>
                        </v-col>
                        <v-col cols="6">
                          <v-form v-model="valid" >
                            <v-container class="mt-11">
                              <v-dialog v-model="dialog" persistent>
                                <template v-slot:activator="{ props }">
                                  <v-btn
                                    height="70px"
                                    class="px-10"
                                    block="true"
                                    x-large
                                    color="error"
                                    @click="requestBid"
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
                                      <v-text-field
                                        label="Enchérir"
                                        type="number"
                                        variant="outlined"
                                      >

                                      </v-text-field>
                                      <p>Voulez-vous vraiment enchérir {{auction.name }} ?</p>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="secondary" @click="close">Annuler</v-btn>
                                    <v-btn
                                      color="error"
                                      :disabled="auction.name === ''"
                                      variant="contained"

                                    >Enchérir
                                    </v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-container>
                          </v-form>

                        </v-col>
                      </v-row>

                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
              <v-row class="ma-5">
                <v-col cols="6"></v-col>
                <v-col cols="6">
                  <v-card>
                    <v-tabs
                      v-model="tab"
                      fixed-tabs=""
                      background-color="error"
                    >
                      <v-tab value="one">Description</v-tab>
                      <v-tab value="two">Enchérissement</v-tab>
                      <!--                    <v-tab value="three">Item Three</v-tab>-->
                    </v-tabs>

                    <v-card-text>
                      <v-window v-model="tab">
                        <v-window-item value="one">
                          {{ auction.description }}
                        </v-window-item>

                        <v-window-item value="two">
                          <li>Un a enchéri</li>
                          <li>Deux a enchéri</li>
                          <li>Trois a enchéri</li>
                          <li>Quatre a enchéri</li>
                          <li>Cinq a enchéri</li>
                        </v-window-item>

                        <!--                      <v-window-item value="three">-->
                        <!--                        Three-->
                        <!--                      </v-window-item>-->
                      </v-window>
                    </v-card-text>
                  </v-card>
                </v-col>

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

export default {
  name: "Auction-Details",

  props: {
    auction: { type: Object },
  },

  data: () => ({
    tab: null,
  }),
  setup() {
    let auction = ref(new Auction());
    let user = ref(new User());
    let auctionType = ref(new AuctionType());
    const valid = ref(true);
    const router = useRouter();
    const dialog = ref(false);

    onMounted( () => {
      AuctionService.getAuctionById(router.currentRoute.value.params.id).then(response => {
        auction.value = response.data;
        UserService.getUserById(auction.value.userId).then(response => {
          user.value = response.data;
        })
        AuctionTypeService.getAuctionById(auction.value.auctionTypeId).then(response => {
          auctionType.value = response.data;
        })
      });
    });

    function requestBid(){
      // auction.value.price = Object.assign({}, price);
      dialog.value = true;
    }

    function close() {
      dialog.value = false;
    }

    return {
      auction,
      user,
      auctionType,
      valid,
      dialog,
      requestBid,
      close
    }
  }
}
</script>

<style scoped>
</style>
