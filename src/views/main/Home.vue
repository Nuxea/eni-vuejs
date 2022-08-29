<script setup>
import { ref } from "vue";
const show = ref(false);
let show1 = ref(false);
const show2 = ref(false);

</script>

<template>
  <v-parallax width="100%" height="500" src="https://images.unsplash.com/photo-1502847427791-d0194ec4cff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80">

    <div class="d-flex flex-row justify-end align-center mb-6 text-white">
      <div class="d-flex flex-column justify-center text-white ma-4">
        <h1 class="text-h4 font-weight-thin ">
          Eni-Enchères
        </h1>
        <h4 class="subheading ">
          Surenchérissez dés maintenant !
        </h4>
      </div>
      <img class="me-15 my-15 rounded-xl rounded-be-0" width="500" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="">
    </div>
  </v-parallax>
  <v-container class="mt-10">
    <v-row justify="center">
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>

        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show1 = !show1"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show1">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>

        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            cover
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange-lighten-2"
              variant="text"
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show2 = !show2"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show2">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
    </v-row>
  </v-container>

<!--https://picsum.photos/400/400?random-->


</template>
